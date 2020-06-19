import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import * as PropTypes from 'prop-types';
import Patients from "../Patients/Patients";
import Fields from "../Fields/Fields";
import Templates from "../Templates/Templates";
import {AnimatedSwitch} from "react-router-transition";

class Main extends Component {
    render() {
        return (
            <Fragment>
                <AnimatedSwitch atEnter={{opacity: 0}}
                        atLeave={{opacity: 0}}
                        atActive={{opacity: 1}}
                        className="switch-wrapper">
                    <Route exact path="/" component={Patients}/>
                    <Route path="/patients" component={Patients}/>
                    <Route path="/fields" component={Fields}/>
                    <Route path="/templates" component={Templates}/>
                </AnimatedSwitch>
            </Fragment>
        );
    }
}

Main.propTypes = {};

export default Main;
