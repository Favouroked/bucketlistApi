import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Item from '../Item/Item';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '10px',
        marginLeft: '20px',
        marginRight: '20px'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    },
});

class IndividualBucket extends React.Component {

    state = {
        open: false,
        bucketlist: {},
        add_name: ''
    };
    handleSubmit = () => {
        const data = {name: this.state.add_name};
        const {match: {params}} = this.props;
        axios.post(`/api/v1/bucketlists/${params.id}/items`, data)
            .then(response => {
                this.setState({bucketlist: response.data});
                this.handleClose();
            });
    };
    handleDelete = (id) => {
        const {match: {params}} = this.props;
        axios.delete(`/api/v1/bucketlists/${params.id}/items/${id}`)
            .then(response => {
                this.setState({bucketlist: response.data});
            });
    };

    handleEdit = (data) => {
        const {match: {params}} = this.props;
        const {name, done, id} = data;
        axios.put(`/api/v1/bucketlists/${params.id}/items/${id}`, {name, done})
            .then(response => {
                this.setState({bucketlist: response.data});
            });
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };

    componentWillReceiveProps(nextProps) {
        console.log('Component will receive props');
        if (this.props.match.params.id !== nextProps.match.params.id) {
            const {match: {params}} = this.props;
            axios.get(`/api/v1/bucketlists/${params.id}`)
                .then(response => this.setState({bucketlist: response.data}));
        }
    };

    componentDidMount() {
        console.log('component did mount');
        const {match: {params}} = this.props;
        axios.get(`/api/v1/bucketlists/${params.id}`)
            .then(response => this.setState({bucketlist: response.data}));
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <Grid container spacing={24}>
                    {this.state.bucketlist.items ? this.state.bucketlist.items.map(item => {
                        return (
                            <Grid item xs={12} sm={4} key={item._id}>
                                <Item item={item} handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>
                            </Grid>
                        )
                    }) : null}
                </Grid>
                <Button variant={'fab'} className={classes.fab} onClick={this.handleClickOpen}
                        color={'primary'}><AddIcon/></Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Name"
                            label="Name"
                            onChange={e => this.setState({add_name: e.target.value})}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Add Item
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

IndividualBucket.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndividualBucket);
