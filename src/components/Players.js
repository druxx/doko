import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Container, Grid, Card, CardHeader, CardContent, TextField, Button, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { withStyles } from '@material-ui/core/styles';
import { setPlayerNames, incrementNumberOfPlayers } from "../redux/actions";

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

class Players extends Component {

    handleAddPlayer = () => {
        this.props.incrementNumberOfPlayers();
    }

    handleSave = () => {
        const names = this.textfields.map(textfield => textfield.value);
        this.props.setPlayerNames(names);
        this.props.history.push('/');
    }

    render() {
        const { classes, players } = this.props;
        this.players = players;
        this.textfields = Array(players.length);

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={10} direction="column" justify="space-evenly" alignItems="center">
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems="center">
                        {players.map((player,index) => {
                            const title = 'Spieler ' + (index + 1);
                            return (
                                <Grid item xs={2}>
                                    <Card>
                                        <CardHeader title={title}/>
                                        <CardContent>
                                            <TextField
                                                label='Name'
                                                defaultValue={player.name}
                                                inputRef={(c) => {this.textfields[index] = c}}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                        <Grid item xs={1}>
                            <IconButton aria-label="add" onClick={this.handleAddPlayer}>
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems="center">
                        <Grid item xs={2}>
                            <Button onClick={this.handleSave} variant="contained" size="large" className={classes.button} startIcon={<SaveIcon />}>
                                Speichern
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
              </Container>
            </div>
        )
    }
}

const StyledPlayers = withStyles(styles, { withTheme: true })(withRouter(Players))
export default connect(mapStateToProps, {setPlayerNames, incrementNumberOfPlayers})(StyledPlayers);