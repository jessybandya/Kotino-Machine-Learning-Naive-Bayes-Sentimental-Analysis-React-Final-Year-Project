import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import SignIn from './components/Header/SignIn';
import Button from '@mui/material/Button';

function App() {
  const authId = useSelector((state) => state.authId);
  const [modalShowAuth, setModalShowAuth] = React.useState(false);
  return (
    <div>
     <Header />
     {authId !== '' ?(
      <Home />
     ):(
      <div style={{
        margin:'auto',
        display:'table',
        marginTop:200
      }}>
      <Button onClick={() => setModalShowAuth(true)} variant="contained"  disableElevation>
     Click here to sign in to view the panel
</Button>
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