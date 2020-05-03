import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.props.toggleNavigator}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            {this.props.title}
                        </Typography>
                        <Button color="inherit" onClick={() => { this.props.history.push("/patients");}}>Patients</Button>
                        <Button color="inherit" onClick={() => { this.props.history.push("/fields");}}>Fields</Button>
                    </Toolbar>
                </AppBar>
            </Fragment>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    toggleNavigator: PropTypes.func.isRequired
};

export default withRouter(Header);
