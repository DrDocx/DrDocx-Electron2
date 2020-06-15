import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Container, Grid, Typography} from "@material-ui/core";
import PatientsTable from "../Patients/PatientsTable";

class MainContainer extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Grid
                        container
                        direction="column"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        spacing={2}
                    >
                        <br/>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="left">{this.props.title}</Typography>
                        </Grid>
                        {React.Children.map(this.props.children, (child) =>
                            <Fragment>
                                <Grid item xs={12}>
                                    {child}
                                </Grid>
                            </Fragment>
                        )}
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

MainContainer.propTypes = {
    title: PropTypes.string.isRequired
};

export default MainContainer;
