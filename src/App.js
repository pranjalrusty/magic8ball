import './App.css';
import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


function App() {

  

  const [data,setdata]=useState(null) 
  const[simu,setsimu]=useState([])
  const[bg,setbg]=useState("#ffffff")

  function getData(val)
  {
    setdata(val.target.value)
  }

  const setStyle = () => {
    if(simu.type==='Affirmative')
    {
      setbg("#7FFF00")
    }
    else if(simu.type==='Neutral')
    {
      setbg("#FFFF00")
    }
    else if(simu.type==='Contrary')
    {
      setbg("#FF0000")
    }
  }


  const apiGet = () => {
    let params = encodeURIComponent(data);
    let url = "https://8ball.delegator.com/magic/JSON/" + params;

    fetch(url).then(resp=>resp.json())
    .then(resp=> {console.log(resp);setsimu(resp.magic)})

    

    setStyle();
  };


    



  const finalcall = () => {
    apiGet();    
    console.log(bg);
  }

  const useStyles = makeStyles((theme) => ({
    rooti: {
      width:400,
      height:100,
      textAlign:'center',
      position:'inherit',
      backgroundColor:bg
  
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  }));


  const classes = useStyles();
  






  return (
    <div className="App">   
   

      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
 
          <Typography component="h1" variant="h5">
           Magic 8 ball Simulator
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="text"
              label="question"
              name="text"
              autoFocus
              onChange={getData}

            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={finalcall}
            >
              Find Your Answer
            </Button>
          </form>

          <br></br>
          <br></br>
          <br></br>
          <Card className={classes.rooti}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {
            <div>{simu.answer}</div>
          }
        </Typography>
        <Typography variant="h5" component="h2">
          {
            <div>{simu.type}</div>
          }
        </Typography>
      </CardContent>
    </Card>
        </div>
      </Grid>
    </Grid>
    </div>

    

    
  );
}

export default App;
