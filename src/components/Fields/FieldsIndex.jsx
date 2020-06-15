import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import MainContainer from "../common/MainContainer";
import FieldGroupsTable from "./FieldGroupsTable";

class FieldsIndex extends Component {
    render() {
        return (
            <Fragment>
                <MainContainer title={"Field Groups"}>
                    <FieldGroupsTable/>
                </MainContainer>
            </Fragment>
        );
    }
}

FieldsIndex.propTypes = {};

export default FieldsIndex;
