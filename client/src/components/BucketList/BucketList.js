import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

class BucketList extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        BucketList
                    </Typography>
                    <Typography variant="headline" component="h2">
                        {this.props.bucketlist.name}
                    </Typography>
                    <Typography component="p">
                        Items: {this.props.bucketlist.items.length}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" className={classes.button} color={'primary'}>Open</Button>
                    <Button size="large" className={classes.deletebutton}
                            onClick={() => this.props.handleDelete(this.props.bucketlist._id)}
                            color={'secondary'}>Delete</Button>
                </CardActions>
            </Card>
        );
    }
}

BucketList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BucketList);
