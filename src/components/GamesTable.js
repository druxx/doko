import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { Table, TableContainer, TableHead, TableBody } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const styles = theme => ({
  header: {
      fontSize: '150%'
  },
  table: {
      maxWidth: 800,
      paddingTop: theme.spacing(4),
      display: 'flex'

  },
  box: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(4)
  }

});

const mapStateToProps = state => {
    const { players } = state.players || {};
    const { games } = state.games || [];
    return {players, games};
}


const getFoxInfo = (foxes) => {
    let info = '';
    if (foxes.reduce((accumulator, item) => accumulator + item) > 0) {
        let caught = 0;
        if (foxes[0])
            caught += 1;
        if (foxes[1])
            caught += 1;
        if (caught === 1)
            info += ', Fuchs gefangen';
        else if (caught === 2)
            info += ', 2 Füchse gefangen';
        let lost = 0;
        if (foxes[2])
            lost += 1;
        if (foxes[3])
            lost += 1;
        if (lost == 1)
            info += ', Fuchs verloren';
        else if (lost === 2)
            info += ', 2 Füchse verloren';
    }
    return info;
}

const getCharlyInfo = (charlies) => {
    let info = '';
    if (charlies.reduce((accumulator, item) => accumulator + item) > 0) {
        if (charlies[0])
            return ', Karlchen';

        let caught = 0;
        if (charlies[1])
            caught += 1;
        if (charlies[2])
            caught += 1;
        if (caught == 1)
            info += ', Karlchen gefangen';
        else if (caught == 2)
            info += ', 2 Karlchen gefangen';
        let lost = 0;
        if (charlies[3])
            lost += 1;
        if (charlies[4])
            lost += 1;
        if (lost == 1)
            info += ', Karlchen verloren';
        else if (lost == 2)
            info += ', 2 Karlchen verloren';
    }
    return info;
}

const getPointsInfo = (points) => {
    const pointsList = ['keine 120', 'keine 90', 'keine 60', 'keine 30', 'schwarz'];
    let firstFalse = points.findIndex(element => element === false);
    if (firstFalse === -1)
        firstFalse = points.length;
    firstFalse -= 1;
    return ', ' + pointsList[firstFalse];
}

const getAnnouncementsInfo = (announced) => {
    const pointsList = ['re', 'kontra', 'keine 120', 'keine 90', 'keine 60', 'keine 30', 'schwarz'];

    if (!announced[0] && !announced[1])
        return '';
    let info = ', Ansage: ';
    if (announced[0])
        info += 'RE ';
    if (announced[1])
        info += 'KONTRA ';

    let firstFalse = announced.findIndex((element,index) => element === false && index > 1);
    if (firstFalse === -1)
        firstFalse = announced.length;
    if (firstFalse == 2)
        return info;
    if (firstFalse != 3)
        info += '... ';
    info += pointsList[firstFalse - 1];
    return info;
}

const getGameDetails = (game, players) => {
    let info = game.time + ' Gewinner:';
    game.winningPlayers.forEach( (winner,index) => {
        if (winner)
            info += ' ' + players[index].name;
    });
    if (game.contra)
        info += ', gegen die Alten';
    info += getFoxInfo(game.foxes);
    info += getCharlyInfo(game.charlies);
    info += getPointsInfo(game.points);
    info += getAnnouncementsInfo(game.announced);
    
    return info;
}

function Row(props) {
  const { row, players, classes } = props;
  const [open, setOpen] = React.useState(false);

  const details = getGameDetails(row, players);

  return (
    <React.Fragment>
      <TableRow>
        {row.playersPoints.map((points) => {
            return (
                <TableCell align='right'>{points}</TableCell>
            );
        })}
        <TableCell align="right">{row.result}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h7" gutterBottom component="div">
                {details}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


class GamesTable extends Component {

    

    render() {
        const { classes, players, games } = this.props;
        return (
            <Box className={classes.box}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table size="small">
                        <TableHead className={classes.header}>
                            <TableRow>
                                {players.map((player) => {
                                    return (
                                        <TableCell align='right'>
                                            {player.name}
                                        </TableCell>
                                    );
                                })}
                                <TableCell align='right'>
                                    Spiel    
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {games.map((row) => (
                            <Row row={row} players={players} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(withRouter(GamesTable)));

