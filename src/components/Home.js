import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Container, Grid, Paper, IconButton, Box } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { withStyles } from '@material-ui/core/styles';
import { cloneDeep } from 'lodash';
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
    const { players } = state.players || {};
    const { games } = state.games || [];
    const game = {lead: state.games.lead};
    game.dealer = game.lead - 1;
    let points = null;
    if (games.length > 0)
        points = games[games.length - 1].points;
    return {players, game, points};
}

class Home extends Component {

    handleAddGameResult = () => {
        this.props.history.push('/score');
    }


    render() {
        const { game, points = Array(this.props.players.length).fill(0), classes } = this.props;
        const players = cloneDeep(this.props.players);
        players[game.lead].lead = true;
        const dealer = game.dealer >= 0 ? game.dealer : players.length - 1;
        players[dealer].dealer = true;
        if (points) {
            const sorted = [...points]
            sorted.sort((a, b) => b - a); 
            players.forEach( (player,index) => {
                player.points = points[index];
                player.rank = sorted.findIndex( (element) => element === player.points ) + 1;
            });
        }
        else {
            players.forEach( (player) => {
                player.points = 0;
                player.rank = 1;
            });
        }

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={10} direction="column" justify="space-evenly" alignItems="center">
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems='stretch'>
                        {players.map((player,index) => {
                            return (
                                <Grid item xs={2}>
                                    <Paper>
                                      <Box m={1}>
                                        <PlayerFragment player={player} ml={2}/>
                                      </Box>
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