import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {withRouter, useLocation} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NavigatorItem from './NavigatorItem';

import PostAddIcon from '@material-ui/icons/PostAdd';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import InputIcon from '@material-ui/icons/Input';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { styles } from './NavigatorStyle.jsx'
import logo from '../../images/logo.png';
import clsx from 'clsx';
import {navigatorWidth} from "../App/AppStyle";

var categories = [
	{ id: 'Patients', icon: <PeopleIcon />, route: '/patients' },
	{ id: 'Custom Fields', icon: <InputIcon />, route: '/fields' },
	{ id: 'Tests', icon: <AssignmentIndIcon />, route: '/tests' },
	{ id: 'Templates', icon: <PostAddIcon />, route: '/templates' },
];

class Navigator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			location: this.props.location.pathname,
			activeTab: this.props.activeTab
		}
	}

	setActiveTab = (newActiveTab) => {
		this.setState({
			activeTab: newActiveTab
		});
	};

	render() {
		const { classes, ...other } = this.props;
		return (
			<Drawer
				open={this.props.open}
				onClose={this.props.toggleNavigator}
				PaperProps={{ style: { width: navigatorWidth } }}
				variant="persistent"
			>
				<ListItem className={clsx(classes.itemCategory)}>
					<img src={logo} width='144' height='75' />
				</ListItem>
				{categories.map(category =>
					<Fragment key={category.id}>
						<NavigatorItem
							active={category.id === this.state.activeTab}
							id={category.id}
							icon={category.icon}
							switchTabs={this.setActiveTab}
							route={category.route}
						/>
						<Divider />
					</Fragment>
				)}
			</Drawer>
		);
	}
}

Navigator.propTypes = {
	open: PropTypes.bool.isRequired,
	toggleNavigator: PropTypes.func.isRequired,
};

export default withStyles(styles)(withRouter(Navigator));