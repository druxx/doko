import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Container, Grid, Paper, IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { withStyles } from '@material-ui/core/styles';
import PlayerFragment from './PlayerFragment';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    root: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
})


const mapStateToProps = state => {
    const { players } = state || {};
    return {players};
}

class Home extends Component {

    handleAddGameResult = () => {
        this.props.history.push('/score');
    }


    render() {
        const { classes, players } = this.props;
        this.players = players;

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={10} direction="column" justify="space-evenly" alignItems="center">
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems='stretch'>
                        {players.map((player,index) => {
                            return (
                                <Grid item xs={2}>
                                    <Paper>
                                        <PlayerFragment player={player} />
                                    </Paper>
                                </Grid>
                            );
                        })}
                        <Grid item xs={1}>
                            <IconButton aria-label="add" onClick={this.handleAddGameResult}>
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>
                        </Grid>
                    </Grid>
                </Grid>
              </Container>
            </div>
        )
    }
}

const StyledHome = withStyles(styles, { withTheme: true })(withRouter(Home))
export default connect(mapStateToProps)(StyledHome);