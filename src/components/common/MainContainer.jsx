import React, {Component, Fragment} from 'react';
import * as PropTypes from 'prop-types';
import {Container, Grid, Typography} from "@material-ui/core";
import {TitleContext} from "../App/App";

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {titleSet: false}
    }


    setTitle = (contextSetTitle) => {
        contextSetTitle(this.props.title);
        this.setState({titleSet: true});
    }

    render() {
        return (
            <Fragment>
                <TitleContext.Consumer>
                    {context => {
                        !this.state.titleSet && this.setTitle(context.setTitle)
                    }}
                </TitleContext.Consumer>
                <Container style={{width: "100%", maxWidth: "100%"}}>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        alignContent="center"
                        spacing={2}
                    >
                        <br/>
                        <Grid item container alignContent={"flex-start"} alignItems={"flex-start"}>
                            <Typography variant="h5" style={{width: "100%"}}>{this.props.title}</Typography>
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
