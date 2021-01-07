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
import MyDialog from '../components/MyDialog';

const headerCol = ['Model', 'ID_auto', 'Zákaznik', 'Rezervácia', 'Požičané', 'Vrátené'];

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
      isOpenDialogPotvrd,
      handleDialogPotvrd,
   } = useGlobalContext();

   const [idVypozicka, setIdVypozicka] = React.useState('');

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

   // console.log(vypozickyTabulka);

   //===RENDER===
   if (!isLogin) {
      return <Redirect to={{ pathname: '/' }} />;
   }

   if (isLoading) {
      return <Loading />;
   }

   return (
      <div>
         <MyDialog
            title='Pozor:'
            text='Určite chcete odstrániť túto rezerváciu?'
            btnText='Potvrď'
            btnFunction={zmazVypozicku}
            open={isOpenDialogPotvrd}
            handleDialog={handleDialogPotvrd}
            id={idVypozicka}
         />
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
                                                   //  onClick={() => zmazVypozicku(row.id)}>
                                                   onClick={() => {
                                                      setIdVypozicka(row.id);
                                                      handleDialogPotvrd();
                                                   }}>
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
                                             isAdmin && (
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
