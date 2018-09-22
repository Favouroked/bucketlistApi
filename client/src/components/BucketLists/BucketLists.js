import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BucketList from '../BucketList/BucketList';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const styles = theme => ({
    root: {
        display: 'flex',
        "align-items": 'center',
        flexWrap: 'wrap',
        marginLeft: '100px',
        marginRight: '100px',
        marginTop: '10px',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    }
});

class BucketLists extends React.Component {

    state = {
        open: false,
        add_name: '',
        bucketlists: []
    };
    handleSubmit = () => {
        const data = {name: this.state.add_name};
        axios.post('/api/v1/bucketlists', data)
            .then(response => {
                let bucketlist = [...this.state.bucketlists];
                bucketlist.push(response.data);
                this.setState({bucketlists: bucketlist});
                this.handleClose();
            });
    };
    handleDelete = (id) => {
        axios.delete('/api/v1/bucketlists/' + id)
            .then(_ => {
                let old_bucketlists = [...this.state.bucketlists];
                let new_bucketlists = old_bucketlists.filter(bucketlist => bucketlist._id !== id);
                this.setState({bucketlists: new_bucketlists});
            });
    };
    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        axios.get('/api/v1/bucketlists')
            .then(response => this.setState({bucketlists: response.data}));
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <GridList cellHeight={180} cols={3} spacing={20} className={classes.gridList}>
                    {this.state.bucketlists.map(bucketlist => {
                        return (
                            <GridListTile cols={1} key={bucketlist._id}>
                                <BucketList bucketlist={bucketlist} handleDelete={this.handleDelete}/>
                            </GridListTile>
                        )
                    })}
                </GridList>
                <Button variant={'fab'} className={classes.fab} onClick={this.handleClickOpen}
                        color={'primary'}><AddIcon/></Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add BucketList</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add to your BucketLists
                        </DialogContentText>
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
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

BucketLists.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BucketLists);
