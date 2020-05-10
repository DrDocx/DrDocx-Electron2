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
import MomentUtils from '@date-io/moment';
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {title: this.props.title ?? "", navigatorOpen: false};
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

    // TODO: There has to be a way to refactor all these providers so we don't just nest these infinitely
    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={appTheme}>
                <SnackbarProvider maxSnack={3}>
                    <div className="App">
                        <div className={clsx(classes.notNavShift, !this.state.navigatorOpen && classes.notNavSteady)}>
                            <Header
                                title={this.state.title}
                                toggleNavigator={this.toggleNavigator}
                            />
                        </div>
                        <Navigator open={this.state.navigatorOpen} toggleNavigator={this.toggleNavigator}
                                   activeTab={'Patients'} switchTab={this.setTitle}/>
                        <div className={clsx(classes.notNavShift, !this.state.navigatorOpen && classes.notNavSteady)}>
                            <Main/>
                            <Footer className={classes.footer}/>
                        </div>
                    </div>
                </SnackbarProvider>
            </ThemeProvider>
        );
    }
}

App.propTypes = {
    title: PropTypes.string
};

export default withStyles(styles)(App);
