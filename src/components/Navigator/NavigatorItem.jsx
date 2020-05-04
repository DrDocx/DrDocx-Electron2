import React, { Fragment } from 'react';
import { styles } from './NavigatorStyle';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import clsx from 'clsx';

class NavigatorItem extends React.Component {

	render() {
		const { classes } = this.props;
		return (
			<ListItem
				key={this.props.id}
				button={true}
				className={clsx(classes.item, this.props.active && classes.itemActiveItem)}
				onClick={()=>{
					this.props.switchTabs(this.props.id);
					this.props.history.push(this.props.route);
				}}
			>
				<ListItemIcon className={this.props.classes.itemIcon}>{this.props.icon}</ListItemIcon>
				<ListItemText
					classes={{
						primary: classes.itemPrimary,
					}}
				>
					{this.props.id}
				</ListItemText>
			</ListItem>
		)
	}
}

export default withStyles(styles)(withRouter(NavigatorItem));