import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Grid, Paper, Typography } from '@material-ui/core';
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

class GameScore extends Component {

    render() {
        const { classes, players } = this.props;
        this.players = players;

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={10} direction="column" justify="space-evenly" alignItems="center">
                    <Grid container item xs={12} spacing={1} justify="space-evenly" alignItems='stretch'>
                        <Grid item xs={2}>
                            <Paper>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Gewinner:
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