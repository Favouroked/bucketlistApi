import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
    card: {
        minWidth: 275,
    },
    button: {
        fontWeight: '600'
    },
    deletebutton: {
        fontWeight: '600',
        marginLeft: 'auto'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Item extends React.Component {

    state = {
        name: '',
        done: false,
        open: false
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleEdit = () => {
        const name = this.state.name;
        const done = this.state.done;
        const id = this.props.item._id;
        this.props.handleEdit({name, done, id});
        this.handleClose();
    };

    componentDidMount() {
        this.setState({name: this.props.item.name, done: this.props.item.done})
    }

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        Item
                    </Typography>
                    <Typography variant="headline" component="h2">
                        Name: {this.state.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        done: {this.state.done.toString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" className={classes.button}
                            onClick={() => this.setState({open: true})}
                            color={'primary'}>Edit</Button>
                    <Button size="large" className={classes.deletebutton}
                            onClick={() => this.props.handleDelete(this.props.item._id)}
                            color={'secondary'}>Delete</Button>
                </CardActions>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Name"
                            label="Name"
                            onChange={e => this.setState({name: e.target.value})}
                            value={this.state.name}
                            type="text"
                            fullWidth
                        />
                        <FormControlLabel control={
                            <Switch
                                checked={this.state.done}
                                onChange={e => this.setState({done: e.target.checked})}
                                value="checkedB"
                                color="primary"
                            />
                        } label={"Done"}/>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleEdit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    }
}

Item.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);
