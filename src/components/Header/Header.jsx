import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import {appTheme, styles} from "../App/AppStyle"
import clsx from 'clsx';

class Header extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <AppBar position="fixed" className={clsx(classes.notNavShift, !this.props.navigatorOpen && classes.notNavSteady)}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu"
                                    onClick={this.props.toggleNavigator}>
                            <MenuIcon/>
                        </IconButton>
                        <IconButton edge="start" color="inherit" aria-label="back"
                                     onClick={this.props.history.goBack}>
                            <ArrowBackIcon/>
                        </IconButton>
                        <IconButton edge="start" color="inherit" aria-label="forward"
                                    onClick={this.props.history.goForward}>
                            <ArrowForwardIcon/>
                        </IconButton>
                        <div style={{fontSize: "18px"}}>{this.props.title}</div>
                    </Toolbar>
                </AppBar>
            </Fragment>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    toggleNavigator: PropTypes.func.isRequired,
    navigatorOpen: PropTypes.bool.isRequired
};

export default withStyles(styles)(withRouter(Header));
