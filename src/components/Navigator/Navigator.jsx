import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {withRouter, useLocation} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PostAddIcon from '@material-ui/icons/PostAdd';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import InputIcon from '@material-ui/icons/Input';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useStyles} from './NavigatorStyle.jsx'
import NavigatorHeader from "./NavigatorHeader";

var categories = [
    {id: 'Patients', icon: <PeopleIcon/>},
    {id: 'Patient Fields', icon: <InputIcon/>},
    {id: 'Templates', icon: <PostAddIcon/>},
    {id: 'Tests', icon: <AssignmentIndIcon/>}
];

class Navigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {location: this.props.location.pathname}
    }

    setActiveTab = () => {

    };

    render() {

        return (
            <Drawer>
                <NavigatorHeader/>
                <Divider className={this.props.classes.divider}/>
            </Drawer>
        );
    }
}

Navigator.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleNavigator: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(withRouter(Navigator));
