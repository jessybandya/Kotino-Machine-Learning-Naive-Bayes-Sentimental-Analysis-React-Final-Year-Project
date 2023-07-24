import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import SignIn from './components/Header/SignIn';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import logo from './logo.svg';


function App() {
  const authId = useSelector((state) => state.authId);
  const [modalShowAuth, setModalShowAuth] = React.useState(false);
  return (
    <div>
     <Header />
     {authId !== '' ?(
      <Home />
     ):(
      <div>
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
    <Button style={{fontWeight:'bold'}} onClick={() => setModalShowAuth(true)} variant="contained"  disableElevation>
    sign in to view the panel
</Button>   
    </center>
    </motion.div>
      </div>
     )}


     <Modal
     show={modalShowAuth}
     onHide={() => setModalShowAuth(false)}
     size="lg"
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <Modal.Body>
     <SignIn setModalShowAuth={setModalShowAuth}/>
     </Modal.Body>
     <Modal.Footer>
       <Button onClick={() => setModalShowAuth(false)}>Close</Button>
     </Modal.Footer>
   </Modal>
    </div>
  );
}

export default App;