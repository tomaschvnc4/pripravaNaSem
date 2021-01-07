import React from 'react';
import moment from 'moment';

import Loading from '../components/Loading';
import { withStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
   Paper,
   TableRow,
   TableHead,
   TableContainer,
   TableCell,
   TableBody,
   Table,
   Grid,
   IconButton,
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import { useGlobalContext } from '../context';
import { green, red } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom';

function createData(no, model, car_id, zakaznik, rezervacia, pozicane, vratene) {
   return { no, model, car_id, zakaznik, rezervacia, pozicane, vratene };
}
let time = moment.now();
time = moment(time).format('DD/MM/YYYY');
const rows = [
   createData(1, 'Fabia II', 14, 'Jakub Hrana', time, time, 'N'),
   createData(2, 'Fabia II', 15, 'Jakub Hrana', time, 'A', 'N'),
   createData(3, 'Fabia II', 9, 'Jakub Hrana', time, 'A', 'N'),
   createData(4, 'Fabia II', 3, 'Jakub Hrana', time, 'N', 'A'),
   createData(5, 'Fabia II', 19, 'Jakub Hrana', time, 'NA', 'N'),
];

const headerCol = [
   'Model',
   'ID_auto',
   'Zákaznik',
   'Rezervácia',
   'Požičané',
   'Vrátené',
   // 'Pozn.',
];
// const headerCol = ['Model', 'ID_auto', 'Zákaznik', 'Požičané', 'Vrátené'];

const A_vypozicky = () => {
   const classes = useStyles();
   const {
      isLoading,
      dataVypozicky,
      dataCars,
      isLogin,
      zmazVypozicku,
      potvrdPozicanie,
      isAdmin,
   } = useGlobalContext();

   //tu vytvaram objekty do pola
   const vypozickyTabulka = dataVypozicky.map((vypozicka) => {
      const tmpaAto = dataCars.find((auto) => auto.id === vypozicka.id_auto);
      const { id: id_auto, model } = tmpaAto;
      const d_rezervacie_f = moment(vypozicka.d_rezervacie).format('DD/MM/YYYY');
      const d_pozicane = vypozicka.d_pozicane
         ? moment(vypozicka.d_pozicane).format('DD/MM/YYYY')
         : '--/--/--';
      const d_vratene = vypozicka.d_vratene
         ? moment(vypozicka.d_vratene).format('DD/MM/YYYY')
         : '--/--/--';
      return {
         ...vypozicka,
         id_auto,
         model,
         d_rezervacie_f,
         d_pozicane,
         d_vratene,
      };
   });

   console.log(vypozickyTabulka);

   //===RENDER===
   if (!isLogin) {
      return <Redirect to={{ pathname: '/' }} />;
   }

   if (isLoading) {
      return <Loading />;
   }

   return (
      <div>
         Vypozicky_admin
         <ThemeProvider theme={themeGreenRed}>
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
                           {vypozickyTabulka.map((row) => {
                              return (
                                 <StyledTableRow key={row.d_rezervacie}>
                                    <StyledTableCell component='th' scope='row'>
                                       {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>{row.model}</StyledTableCell>
                                    <StyledTableCell align='center'>{row.id_auto}</StyledTableCell>
                                    <StyledTableCell align='center'>{row.meno}</StyledTableCell>
                                    <StyledTableCell align='center'>
                                       <div className='column-center'>{row.d_rezervacie_f}</div>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                       <div className='column-center'>
                                          {row.d_pozicane}
                                          {row.d_pozicane === '--/--/--' && isAdmin && (
                                             <span className={classes.icons}>
                                                <IconButton
                                                   color='primary'
                                                   size='small'
                                                   onClick={() =>
                                                      potvrdPozicanie({
                                                         id_vypozicka: row.id,
                                                         column: 'd_pozicane',
                                                      })
                                                   }>
                                                   <CheckCircleOutlineIcon />
                                                </IconButton>
                                                <IconButton
                                                   color='secondary'
                                                   size='small'
                                                   onClick={() => zmazVypozicku(row.id)}>
                                                   <DeleteIcon />
                                                </IconButton>
                                             </span>
                                          )}
                                       </div>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                       <div className='column-center'>
                                          {row.d_vratene}
                                          {row.d_vratene === '--/--/--' &&
                                             row.d_pozicane !== '--/--/--' &&
                                             isAdmin(
                                                <IconButton
                                                   color='primary'
                                                   size='small'
                                                   onClick={() =>
                                                      potvrdPozicanie({
                                                         id_vypozicka: row.id,
                                                         column: 'd_vratene',
                                                      })
                                                   }>
                                                   <CheckCircleOutlineIcon />
                                                </IconButton>
                                             )}
                                       </div>
                                    </StyledTableCell>
                                 </StyledTableRow>
                              );
                           })}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Grid>
            </Grid>
         </ThemeProvider>
      </div>
   );
};

export default A_vypozicky;

const themeGreenRed = createMuiTheme({
   palette: {
      primary: green,
      secondary: red,
   },
});

const useStyles = makeStyles({
   table: {
      minWidth: 700,
   },
   icons: {
      display: 'flex',
      justifyContent: 'space-around',
   },
});

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
