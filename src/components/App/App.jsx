import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from "../Header/Header";
import Navigator from "../Navigator/Navigator";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { withStyles, ThemeProvider } from "@material-ui/core";
import { appTheme, styles } from "./AppStyle"
import clsx from 'clsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { title: this.props.title ?? "", navigatorOpen: false };
	}

	setTitle = (title) => {
		this.setState({ title: title });
	};

	toggleNavigator = () => {
		this.setState(previousState => ({
			navigatorOpen: !previousState.navigatorOpen
		}
		));
	};

	render() {
		const { classes } = this.props;
		return (
			<ThemeProvider theme={appTheme}>
				<div className="App">
					<div className={clsx(classes.notNavShift, !this.state.navigatorOpen && classes.notNavSteady)}>
						<Header
							title={this.state.title}
							toggleNavigator={this.toggleNavigator}
						/>
					</div>
					<Navigator open={this.state.navigatorOpen} toggleNavigator={this.toggleNavigator} activeTab={'Patients'} switchTab={this.setTitle} />
					<div className={clsx(classes.notNavShift, !this.state.navigatorOpen && classes.notNavSteady)}>
						<Main />
						<Footer />
					</div>
				</div>
			</ThemeProvider>
		);
	}
}

App.propTypes = {
	title: PropTypes.string
};

export default withStyles(styles)(App);
