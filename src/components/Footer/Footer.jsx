import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// This is not strictly necessary for the Electron app to work, but is used so the app can still be loaded/debugged in a browser.
const electron = window.require ? window.require('electron') : null;

class Footer extends Component {
    render() {
        return (
            <footer className={this.props.className}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit"
                          onClick={() => electron && electron.remote.shell.openExternal('https://github.com/DrDocx')}>
                        DrDocx
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </footer>
        );
    }
}

export default Footer;
