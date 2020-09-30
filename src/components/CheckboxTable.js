import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';


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
  const { title, items, selected = Array(items.length).fill(false), hideTable = false} = props;
  const [tableHidden, setTableHidden] = React.useState(hideTable);
  
  return (
      <Paper className={classes.paper}>
        <Typography variant="h5" id="tableTitle" component="h2" color="primary" align='center'>
            {title}
            {tableHidden && (
                <Checkbox checked={false} onClick={(event) => setTableHidden(!tableHidden)}/>
            )}
            
        </Typography>
        {!tableHidden && (
          <TableContainer>
            <Table className={classes.table}>
              <TableBody>
              {items.map((player,index) => {
                return (
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
                );
              })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
  );
}
