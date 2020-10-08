import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  fragmentContext: {
    flex: 1,
  },
  hideMe: {
    visibility:'hidden'
  },
  normal: {}
});


export default function PlayerFragment(props) {
  const classes = useStyles();
  const {  player } = props;
  const soli =  'Soli: ' + player.soli;
  const soliHidden =  player.soli === 0 ? true : false;
  const top = '' + player.rank +'.   ' + player.name;
  let bottom = 'GeberAufspiel';
  let hidden = true;
  if (player.lead) {
    bottom = 'Aufspiel';
    hidden = false;
  }
  if (player.dealer) {
    bottom = 'Geber'; 
    hidden = false;
  } 
  return (
    <React.Fragment>
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          {top}
        </Typography>
        <Typography component="p" variant="h4">
          {player.points}
        </Typography>
        <Typography color="textSecondary" className={soliHidden ? classes.hideMe : classes.normal}>
          {soli}
        </Typography>
        <Typography color="textSecondary" className={hidden ? classes.hideMe : classes.normal}>
          {bottom}
        </Typography>
    </React.Fragment>
  );
}