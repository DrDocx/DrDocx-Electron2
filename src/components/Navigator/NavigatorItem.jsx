import React, {Component, Fragment} from 'react';
import {styles} from './NavigatorStyle';
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import {ListItemIcon, ListItemText} from '@material-ui/core';
import clsx from 'clsx';

class NavigatorItem extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <ListItem
                    key={this.props.id}
                    button={true}
                    className={clsx(classes.item, this.props.active && classes.itemActiveItem)}
                    onClick={() => {
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
            </Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(NavigatorItem));
