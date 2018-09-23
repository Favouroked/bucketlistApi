import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    editbutton: {
        fontWeight: '600',
        marginLeft: 'auto',
        marginRight: 'auto'
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

class BucketList extends React.Component {

    state = {
        open: false,
        name: ''
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        const name = this.state.name;
        const id = this.props.bucketlist._id;
        this.props.handleEdit({name, id});
        this.handleClose();
    };

    componentDidMount() {
        this.setState({name: this.props.bucketlist.name})
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            <span className={classes.button}>BucketList</span>
                            <Button size="medium"
                                    onClick={this.handleClickOpen}
                                    className={classes.button}
                                    color={'default'}>Edit</Button>
                        </Typography>
                        <Typography variant="headline" component="h2">
                            {this.props.bucketlist.name}
                        </Typography>
                        <Typography component="p">
                            Items: {this.props.bucketlist.items.length}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" component={Link} to={`/bucketlists/${this.props.bucketlist._id}`}
                                className={classes.button} color={'primary'}>Open</Button>

                        <Button size="medium" className={classes.deletebutton}
                                onClick={() => this.props.handleDelete(this.props.bucketlist._id)}
                                color={'secondary'}>Delete</Button>
                    </CardActions>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit BucketList</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Name"
                            label="Name"
                            onChange={e => this.setState({name: e.target.value})}
                            type="text"
                            value={this.state.name}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}

BucketList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BucketList);
