import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import FieldsIndex from "./FieldsIndex";
import NewFieldGroup from "./Forms/NewFieldGroup";

class Fields extends Component {
    render() {
        const matchPath = this.props.match.path;
        return (
            <Switch>
                <Route exact path={matchPath}>
                    <FieldsIndex/>
                </Route>
                <Route path={`${matchPath}/new`} component={NewFieldGroup}/>
            </Switch>
        );
    }
}

Fields.propTypes = {};

export default Fields;
