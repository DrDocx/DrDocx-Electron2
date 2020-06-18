import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import './App.css';
import Header from "../Header/Header";
import Navigator from "../Navigator/Navigator";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {withStyles, ThemeProvider} from "@material-ui/core";
import {appTheme, styles} from "./AppStyle"
import clsx from 'clsx';
import {SnackbarProvider} from "notistack";
import LinearProgress from "@material-ui/core/LinearProgress";
import PingService from "../../services/PingService";

// TODO: Make this work
export const TitleContext = React.createContext({});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {title: this.props.title ?? "", navigatorOpen: true, apiLaunchAttempts: 0, apiReady: false};
    }

    componentDidMount() {
        this.pingApi()
    }

    setTitle = (title) => {
        this.setState({title: title});
    };

    toggleNavigator = () => {
        this.setState(previousState => ({
                navigatorOpen: !previousState.navigatorOpen
            }
        ));
    };

    pingApi = () => {
        PingService.pingApi().then(response => {
            this.setState({apiReady: true})
        }).catch(error => {
            this.setState(oldState => ({
                apiLaunchAttempts: oldState.apiLaunchAttempts + 1
            }), (newState) => {
                if (newState.apiLaunchAttempts <= 3) {
                    new Promise(r => setTimeout(r, 250)).then(() => {
                        this.pingApi();
                    });
                }
            })
        })
    }

    renderMain() {
        if (this.state.apiReady || this.state.apiLaunchAttempts > 3) {
            return (
                <Main/>
            );
        }
        return (
            <LinearProgress/>
        );
    }

    // TODO: There has to be a way to refactor all these providers so we don't just nest these infinitely
    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={appTheme}>
                <SnackbarProvider maxSnack={3}>
                    <TitleContext.Provider value={{setTitle: this.setTitle}}>
                        <div className="App">
                            <div
                                className={clsx(classes.notNavShift, !this.state.navigatorOpen && classes.notNavSteady)}>
                                <Header
                                    title={this.state.title}
                                    toggleNavigator={this.toggleNavigator}
                                />
                            </div>
                            <Navigator open={this.state.navigatorOpen} toggleNavigator={this.toggleNavigator}
                                       activeTab={'Patients'} switchTab={this.setTitle}/>
                            <div
                                className={clsx(classes.notNavShift, !this.state.navigatorOpen && classes.notNavSteady)}>
                                {this.renderMain()}
                                <Footer className={classes.footer}/>
                            </div>
                        </div>
                    </TitleContext.Provider>
                </SnackbarProvider>
            </ThemeProvider>
        );
    }
}

App.propTypes = {
    title: PropTypes.string
};

export default withStyles(styles)(App);
