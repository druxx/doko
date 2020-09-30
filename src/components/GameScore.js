import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Grid, Paper, Typography, Checkbox, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckboxTable from './CheckboxTable';


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
    const { players } = state || {};
    return {players};
}

class GameScore extends Component {

    constructor(props) {
        super(props);
        this.pointsList = ['keine 120', 'keine 90', 'keine 60', 'keine 30', 'schwarz'];
        this.announcedList = ['re', 'kontra', 'keine 120', 'keine 90', 'keine 60', 'keine 30', 'schwarz'];
        const state = {
            contra: false,
            points: Array(this.pointsList.length).fill(false),
            announced: Array(this.announcedList.length).fill(false),
            result: 1
        };
        state.points[0] = true;
        this.state = state;
    }

    componentDidMount() {
        this.setState( {selectedPlayers: Array(this.props.players.length).fill(false)});
    }

    onPlayersClick = (event, index) => {
        let newSelected = [...this.state.selectedPlayers];
        newSelected[index] = !this.state.selectedPlayers[index];
        this.setState({selectedPlayers: newSelected});
    };

    onPointsClick = (event, index) => {
        let firstFalse = this.state.points.findIndex(element => element == false);
        if (firstFalse == -1)
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
        this.setState({points: newSelected});
        this.setState({result: this.state.result + newMax - oldMax});
    };

    onContraClicked = (event) => {
        const contra = !this.state.contra;
        this.setState({contra: contra});
        if (contra)
            this.setState({result: this.state.result + 1});
        else
            this.setState({result: this.state.result - 1});
    }

    render() {
        const { classes, players } = this.props;
        const playerNames = players.map(player => player.name);
        

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={10} direction="column" justify="space-evenly" alignItems="center">
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems='stretch'>
                        <Grid item xs={2}>
                            <CheckboxTable title={'gewonnen:'} items={playerNames} selected={this.state.selectedPlayers} onClick={this.onPlayersClick}/>
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
                        </Grid>
                        <Grid item xs={2}>
                            <CheckboxTable title={'Punkte'} items={this.pointsList} selected={this.state.points} onClick={this.onPointsClick}/>
                        </Grid>
                        <Grid item xs={2}>
                            <CheckboxTable title={'Ansage'} items={this.announcedList} hideTable={true}/>
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

const StyledGameScore = withStyles(styles, { withTheme: true })(GameScore)
export default connect(mapStateToProps)(StyledGameScore);