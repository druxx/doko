import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Grid, Card, CardHeader, CardContent, TextField, IconButton } from '@material-ui/core';
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

        return (
            <div className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
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
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                    <Grid item xs={1}>
                        <IconButton aria-label="delete">
                            <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
              </Container>
            </div>
        )
    }
}

const StyledPlayers = withStyles(styles, { withTheme: true })(Players)
export default connect(mapStateToProps)(StyledPlayers);