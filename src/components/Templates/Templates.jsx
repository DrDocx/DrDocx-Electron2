import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import TemplatesIndex from "./TemplatesIndex";

class Templates extends Component {
    render() {
        return (
            <Fragment>
                <TemplatesIndex/>
            </Fragment>
        );
    }
}

Templates.propTypes = {};

export default Templates;
