import React from 'react';
import img from '../img/01fabia_small.png';
import CarInfo from './CarInfo';
import MyDialog from './MyDialog';

//MUI
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Badge,
  IconButton,
  Button,
  Collapse,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { green, red } from '@material-ui/core/colors';

// ==KONTEXT
import { useGlobalContext } from '../context';

const Car = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { handleDialogCar, isOpenDialogCar } = useGlobalContext();

  //==RETURN
  return (
    <article className={classes._rootContainer}>
      <Card className={`${classes._main}`} component='main'>
        <MyDialog
          component={CarInfo}
          title='BA555XX'
          handleDialog={handleDialogCar}
          open={isOpenDialogCar}
        />

        <CardMedia
          component='img'
          className={classes.mymedia}
          image={img}
          height='auto'
          title='Contemplative Reptile'
        />
        <CardContent>
          <div className={classes.price}>
            <Typography variant='h4' component='h2'>
              Fabia II
            </Typography>
            <Typography variant='h6' component='h6' color='primary'>
              ...50€/deň
            </Typography>
          </div>
          <div className={classes._subtitle}>
            <Typography gutterBottom variant='subtitle1' component='h2'>
              Skoda
            </Typography>
            <Typography variant='subtitle2' component='h2'>
              BA555XX
            </Typography>
          </div>
          <Typography variant='body2' color='textPrimary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica Lizards are
            a widespread group of squamate reptiles, with over 6,000 species,
            ranging across all continents except Antarctica
          </Typography>
        </CardContent>

        <CardActions className={classes._actionBar}>
          <div>
            <IconButton aria-label='add to favorites'>
              <Badge badgeContent={4} color='secondary'>
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <Button
              size='small'
              color='primary'
              // onClick={() => setExpanded(!expanded)}
              onClick={() => handleDialogCar()}
              aria-expanded={expanded}>
              Viac info
            </Button>
          </div>
          <div className={classes._disableButton}>
            <ThemeProvider theme={themeButton}>
              <Button
                size='small'
                variant='outlined'
                color='primary'
                // disabled
              >
                Požičať
              </Button>
            </ThemeProvider>
          </div>
        </CardActions>
        {/* <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <CarInfo />
          </CardContent>
        </Collapse> */}
      </Card>
    </article>
  );
};

export default Car;

//MUI-Styles
const useStyles = makeStyles((theme) => ({
  _rootContainer: {
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: '#000000',
  },

  _main: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: 345,

    boxShadow: theme.shadows[5],
    '&:hover': {
      boxShadow: theme.shadows[24],
    },
    '& .MuiButtonBase-root': {
      // cursor: 'unset',
    },
  },

  mymedia: {
    width: 'auto',
    padding: 20,
  },

  price: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '.5px dotted #617d98',
    '& h6': {
      display: 'flex',
      alignItems: 'flex-end',
    },
  },

  _subtitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h2': {
      opacity: 0.6,
    },
  },

  _actionBar: {
    display: 'flex',
    justifyContent: 'space-between',

    '& .btn-pozicat': {
      marginRight: '10px',
    },
    '& .Mui-disabled': {
      color: ' #e53935',
      border: '1px solid #e53935',
    },
  },
}));

const themeButton = createMuiTheme({
  palette: {
    primary: green,
  },
});
