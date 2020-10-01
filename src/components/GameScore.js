import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Container, Grid, Paper, Typography, Checkbox, TextField, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save'
import CheckboxTable from './CheckboxTable';
import { addGameResult } from "../redux/actions";


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
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        width: '5ch'
    }
})


const mapStateToProps = state => {
    const { players } = state.players || {};
    const game = {dealer: state.games.lead - 1};
    return {players, game};
}

class GameScore extends Component {

    constructor(props) {
        super(props);
        this.pointsList = ['keine 120', 'keine 90', 'keine 60', 'keine 30', 'schwarz'];
        this.announcedList = ['re', 'kontra', 'keine 120', 'keine 90', 'keine 60', 'keine 30', 'schwarz'];
        this.foxes = ['gefangen', 'gefangen', 'verloren', 'verloren'];
        this.charlies = ['erfolgreich', 'gefangen', 'gefangen', 'verloren', 'verloren'];
        const state = {
            contra: false,
            points: Array(this.pointsList.length).fill(false),
            announced: Array(this.announcedList.length).fill(false),
            foxes: Array(4).fill(false),
            hideFoxes: [false,true,false,true],
            charlies: Array(this.charlies.length).fill(false),
            hideCharlies: [false,false,true,false,true],
            result: 1
        };
        state.points[0] = true;
        this.state = state;
    }

    componentDidMount() {
        this.setState( {winningPlayers: Array(this.props.players.length).fill(false)});
    }

    handleSave = () => { 
        this.props.addGameResult(this.state);
        this.props.history.push('/');
    }

    onPlayersClick = (event, index) => {
        let newSelected = [...this.state.winningPlayers];
        newSelected[index] = !this.state.winningPlayers[index];
        this.setState({winningPlayers: newSelected});
    };

    onPointsClick = (event, index) => {
        let firstFalse = this.state.points.findIndex(element => element === false);
        if (firstFalse === -1)
            firstFalse = this.state.points.length;
        const oldMax = firstFalse - 1;
        let newSelected = [...this.state.points];
        const selected = !this.state.points[index];
        let newMax = 0;
        if ( selected ) {
            newMax = index;
            for (let i = 0; i <= index; i++)
                newSelected[i] = true;
        }
        else {
            newMax = index - 1;
            for (let i = index; i < newSelected.length; i++)
                newSelected[i] = false;
        }
        this.setState( {points: newSelected, 
                        result: this.state.result + newMax - oldMax
        });
    };

    onAnnouncedClick = (event, index) => {
        let firstFalse = this.state.announced.findIndex(element => element === false);
        if (firstFalse === -1)
            firstFalse = this.state.announced.length;
        let newSelected = [...this.state.announced];
        const selected = !this.state.announced[index];
        if ( selected ) {
            for (let i = 2; i <= index; i++)
                newSelected[i] = true;
            newSelected[index] = true;
        }
        else {
            for (let i = index; i < newSelected.length; i++)
                newSelected[i] = false;
        }
        this.setState( {announced: newSelected} );
    };

    onContraClicked = (event) => {
        const contra = !this.state.contra;
        this.setState({contra: contra});
        if (contra)
            this.setState({result: this.state.result + 1});
        else
            this.setState({result: this.state.result - 1});
    }

    onFoxClicked = (event, index) => {
        let newSelected = [...this.state.foxes];
        let newHidden = [...this.state.hideFoxes];
        const selected = !this.state.foxes[index];
        newSelected[index] = selected;
        const newState = {foxes:newSelected};
        if (index < 2) { // caught
            if (selected) {
                newState.result = this.state.result + 1;
                if (index === 0) {
                    newHidden[1] = false; 
                    newState.hideFoxes = newHidden;
                }
            }
            else
                newState.result = this.state.result - 1;
        }
        else {
            if (selected) {
                newState.result = this.state.result - 1;
                if (index === 2) {
                    newHidden[3] = false; 
                    newState.hideFoxes = newHidden;
                }
            }
            else
                newState.result = this.state.result + 1;           
        };
        this.setState(newState);
    }

    onCharlyClicked = (event, index) => {
        let newSelected = [...this.state.charlies];
        let newHidden = [...this.state.hideCharlies];
        const selected = !this.state.charlies[index];
        newSelected[index] = selected;
        const newState = {charlies:newSelected};
        if (index === 0) { // caught
            if (selected) {
                newState.result = this.state.result + 1;
            }
            else
                newState.result = this.state.result - 1;
        }
        else if (index < 3) {
            if (selected) {
                newState.result = this.state.result + 1;
                if (index === 1) {
                    newHidden[2] = false; 
                }
            }
            else
                newState.result = this.state.result - 1;           
        }
        else {
            if (selected) {
                newState.result = this.state.result - 1;
                if (index === 3) {
                    newHidden[4] = false; 
                }
            }
            else
                newState.result = this.state.result + 1;           
        };
        newState.hideCharlies = newHidden;
        this.setState(newState);
    }

    render() {
        const { classes, players, game } = this.props;
        const playerNames = players.map(player => player.name);
        const nonPlayers = Array(playerNames.length).fill(false);
        if (playerNames.length > 4) {
            const dealer = game.dealer >= 0 ? game.dealer : playerNames.length - 1;
            nonPlayers[dealer] = true;
        }

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={10} direction="column" justify="space-evenly" alignItems="center">
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems='stretch'>
                        <Grid item xs={2}>
                            <CheckboxTable title={'gewonnen:'} items={playerNames} selected={this.state.winningPlayers} onClick={this.onPlayersClick} hideItems={nonPlayers}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper>
                                <Typography component="h2" variant="h5" color="primary" align='center'>
                                    gegen die Alten?
                                </Typography>
                                <Typography align='center'>
                                    <Checkbox checked={this.state.contra} onClick={this.onContraClicked}/>
                                </Typography>
                            </Paper>
                            <Box mt={2}>
                                <CheckboxTable title={'Fuchs'} items={this.foxes} selected={this.state.foxes} onClick={this.onFoxClicked} hideTable={true} hideItems={this.state.hideFoxes}/>
                            </Box>
                            <Box mt={2}>
                                <CheckboxTable title={'Karlchen'} items={this.charlies} selected={this.state.charlies} onClick={this.onCharlyClicked} hideTable={true} hideItems={this.state.hideCharlies}/>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <CheckboxTable title={'Punkte'} items={this.pointsList} selected={this.state.points} onClick={this.onPointsClick}/>
                        </Grid>
                        <Grid item xs={2}>
                            <CheckboxTable title={'Ansage'} items={this.announcedList} hideTable={true} selected={this.state.announced} onClick={this.onAnnouncedClick}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper>
                                <Typography component="h2" variant="h5" color="primary" align='center'>
                                    Punkte
                                </Typography>
                                <Typography align='center'>
                                <TextField
                                    className={classes.textField}
                                    inputProps={{style: {fontSize: '250%'}}}
                                    label=''
                                    value={this.state.result}
                                    inputRef={(c) => {this.resultInput = c}}
                                />
                                </Typography>
                            </Paper>
                            <Box mt={10} align='center'>
                                <Button onClick={this.handleSave} variant="contained" size="large" className={classes.button} startIcon={<SaveIcon />}>
                                    Speichern
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
              </Container>
            </div>
        )
    }
}

const StyledGameScore = withStyles(styles, { withTheme: true })(withRouter(GameScore))
export default connect(mapStateToProps,{addGameResult})(StyledGameScore);