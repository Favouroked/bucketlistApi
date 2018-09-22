import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class ButtonAppBar extends React.Component {
    state = {
        open: false,
        username: '',
        password: '',
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        axios.post('/api/v1/auth/login', data)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                this.props.toggleLogin();
                this.handleClose();
            });
    };

    handleLogout = () => {
        localStorage.removeItem('token');
        this.props.toggleLogin();
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            Bucket Lists
                        </Typography>
                        {this.props.loggedIn ? <Button color="inherit" onClick={this.handleLogout}>Logout</Button> :
                            <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>}
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Login</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Username: johndoe Password: johndoe
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="username"
                                    label="Username"
                                    onChange={e => this.setState({username: e.target.value})}
                                    type="text"
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    onChange={e => this.setState({password: e.target.value})}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSubmit} color="primary">
                                    Login
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);