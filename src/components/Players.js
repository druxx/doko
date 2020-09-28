import React, { Component } from 'react';
import { Container, Grid, Paper, Card, CardHeader, CardContent } from '@material-ui/core';
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

class Players extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Grid item xs={2}>
                        <Card>
                            <CardHeader title='Spieler 1' />
                            <CardContent>xxxxx</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={1}>
                        +
                    </Grid>
                </Grid>
              </Container>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Players);