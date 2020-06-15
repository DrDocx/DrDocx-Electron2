import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MainContainer from "../common/MainContainer";
import FieldGroupsTable from "./FieldGroupsTable";

class FieldsIndex extends Component {
    render() {
        return (
            <MainContainer title={"Field Groups"}>
                <FieldGroupsTable />
            </MainContainer>
        );
    }
}

FieldsIndex.propTypes = {};

export default FieldsIndex;
