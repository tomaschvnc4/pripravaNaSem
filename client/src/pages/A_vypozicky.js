import React from 'react';
import moment from 'moment';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Button,
  Grid,
} from '@material-ui/core';
import { useGlobalContext } from '../context';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  no,
  model,
  car_id,
  zakaznik,
  rezervacia,
  pozicane,
  vratene
) {
  return { no, model, car_id, zakaznik, rezervacia, pozicane, vratene };
}
let time = moment.now();
time = moment(time).format('DD/MM/YYYY');
const rows = [
  createData(1, 'Fabia II', 14, 'Jakub Hrana', time, 'N', 'N'),
  createData(2, 'Fabia II', 15, 'Jakub Hrana', time, 'A', 'N'),
  createData(3, 'Fabia II', 9, 'Jakub Hrana', time, 'A', 'N'),
  createData(4, 'Fabia II', 3, 'Jakub Hrana', time, 'N', 'A'),
  createData(5, 'Fabia II', 19, 'Jakub Hrana', time, 'NA', 'N'),
];

const headerCol = [
  'Model',
  'ID_auto',
  'Zakaznik',
  'Rezervacia',
  'Vyzdvihnute',
  'Vratene',
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const A_vypozicky = () => {
  const classes = useStyles();
  // const { showNav } = useGlobalContext();

  return (
    <div>
      Vypozicky_admin
      <Grid container justify='center'>
        <Grid item xs={12} sm={10}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>No</StyledTableCell>
                  {headerCol.map((col, index) => {
                    return (
                      <StyledTableCell align='center' key={index}>
                        {col}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.no}>
                    <StyledTableCell component='th' scope='row'>
                      {row.no}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.model}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.car_id}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.zakaznik}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <div className='column-center'>
                        {row.rezervacia}
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'>
                          Primary
                        </Button>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <div className='column-center'>
                        {row.pozicane}
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'>
                          Primary
                        </Button>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <div className='column-center'>
                        {row.vratene}
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'>
                          Primary
                        </Button>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default A_vypozicky;
