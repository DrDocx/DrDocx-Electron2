import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

class Footer extends Component {
    render() {
        return (
            <footer className={this.props.className}>
                {/*<Typography variant="body2" color="textSecondary" align="center">*/}
                {/*    {'Copyright © '}*/}
                {/*    <Link color="inherit" href="https://github.com/DrDocx">*/}
                {/*        DrDocx*/}
                {/*    </Link>{' '}*/}
                {/*    {new Date().getFullYear()}*/}
                {/*    {'.'}*/}
                {/*</Typography>*/}
            </footer>
        );
    }
}

export default Footer;
