import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import TemplatesTable from "./TemplatesTable";
import MainContainer from "../common/MainContainer";

class TemplatesIndex extends Component {

    render() {
        return (
            <Fragment>
                <MainContainer title={"Report Templates"}>
                    <TemplatesTable/>
                </MainContainer>
            </Fragment>
        );
    }
}

TemplatesIndex.propTypes = {};

export default TemplatesIndex;
