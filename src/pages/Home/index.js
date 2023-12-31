import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Facebook from '../Facebook'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import Twitter from '../Twitter'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');


  const handleClickOpen = (name) => {
    setOpen(true);
    setName(name)
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <motion.center
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    style={{
      marginTop: 100,
      color:'#fff'
    }}
  >
  <center><img src={logo} className="App-logo" alt="logo" /></center>
<div >
  <i style={{fontSize:25, fontWeight:'bold'}}>Sentym</i>
</div>
    <p style={{fontSize:16}}>
   System for Sentiment Analysis of Social Media Data using Machine Learning Naive Bayes Algorithm to train the data from Twitter and Facebook to predict the sentiment of the data.
    </p>
    <p>
    <br />
    <i>Making it easy to analyse and predict the next plan...</i>
    </p>
  </motion.center>

  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, delay: 1 }}
    className="cta-button"
  >
  <center>

  <Button style={{
    marginLeft:10,
    fontWeight:'bold'
  }} variant="contained" onClick={() =>handleClickOpen('Facebook')}>
  Facebook <span style={{marginLeft:10}}><FacebookIcon/></span>
</Button>
<Button style={{
  marginLeft:10,
  fontWeight:'bold'
}} variant="contained" onClick={() =>handleClickOpen('Twitter')}>
Twitter <span style={{marginLeft:10}}><TwitterIcon/></span>
</Button>
</center>
  </motion.div>

    <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    <AppBar sx={{ position: 'fixed' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Button autoFocus color="inherit" onClick={handleClose}>
        {name}
        </Button>
      </Toolbar>
    </AppBar>
    <List style={{
      marginTop:55
    }}>
    {name === 'Facebook' ?(
      <Facebook />
    ):(
      <Twitter />
    )}
    </List>
  </Dialog>
    </>
  )
}

export default Home