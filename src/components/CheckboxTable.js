import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Checkbox, TableContainer, Table, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
  },
  cell: {
      fontSize: '150%'
  }
}));

export default function CheckboxTable(props) {
  const classes = useStyles();
  const { title, items, selected = Array(items.length).fill(false), hideTable = false, hideItems = Array(items.length).fill(false)} = props;
  const [tableHidden, setTableHidden] = React.useState(hideTable);
  
  return (
      <Paper className={classes.paper}>
        <Typography variant="h5" id="tableTitle" component="h2" color="primary" align='center'>
            {title}
            {tableHidden && (
                <IconButton onClick={(event) => setTableHidden(!tableHidden)}>
                    <ExpandMoreIcon className={classes.icon} />
                </IconButton>
            )}
            
        </Typography>
        {!tableHidden && (
          <TableContainer>
            <Table className={classes.table}>
              <TableBody>
              {items.map((player,index) => {
                return !hideItems[index] ? (
                    <TableRow
                      hover
                      onClick={(event) => props.onClick(event, index)}
                      role="checkbox"
                    >
                        <TableCell className={classes.cell}>
                            {player}
                        </TableCell>
                        <TableCell padding="checkbox">
                            <Checkbox checked={selected[index]}/>
                        </TableCell>
                    </TableRow>
                ) : null;
              })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
  );
}
