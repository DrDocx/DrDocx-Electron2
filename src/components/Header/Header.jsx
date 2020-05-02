import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Header extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <h1>
                { this.props.title }
            </h1>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
