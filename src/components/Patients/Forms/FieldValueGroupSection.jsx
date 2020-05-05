import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class FieldValueGroupSection extends Component {
    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

FieldValueGroupSection.propTypes = {
    fieldValueGroup: PropTypes.object.isRequired,
    setFvgState: PropTypes.func.isRequired
};

export default FieldValueGroupSection;
