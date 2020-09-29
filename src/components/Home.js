import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Grid, Card, CardHeader, CardContent, TextField, Button, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { withStyles } from '@material-ui/core/styles';


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

    render() {
        const { classes, players } = this.props;
        this.players = players;

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={10} direction="column" justify="space-evenly" alignItems="center">
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems="center">
                        {players.map((player,index) => {
                            return (
                                <Grid item xs={2}>
                                    <Card>
                                        <CardHeader title={player.name}/>
                                        <CardContent>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
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

const StyledPlayers = withStyles(styles, { withTheme: true })(Players)
export default connect(mapStateToProps)(StyledPlayers);