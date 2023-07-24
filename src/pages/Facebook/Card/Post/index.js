import { CardActions } from '@mui/material'
import React from 'react'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Modal from 'react-bootstrap/Modal';
import Comments from './Comments';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};





function Post({ comments,media_type, description }) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
    <CardActions
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <ThumbUpOutlinedIcon />
    <ReplyOutlinedIcon />
    <ForumOutlinedIcon onClick={() => setModalShow(true)} style={{cursor:'pointer'}}/>
  </CardActions>




  <Modal
  show={modalShow}
  onHide={() => setModalShow(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  style={{
    zIndex:1500
  }}
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      {description}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {comments.length === 0 ? <center>No comments yet</center> :(
   <>
   {media_type === '' ?(
    <>
    {comments.map((comment, index) => (
      <Comments 
      key={index}
      comment={comment?.message}
      timestamp1={formatTimestamp(comment?.timestamp)}
      media_type={media_type}
    />
    ))}
    </>
  ):(
    <>
    {comments.map((comment, index) => (
      <Comments 
      key={index}
      comment={comment?.message}
      timestamp2={formatTimestamp(comment?.created_time)}
      media_type={media_type}
    />
    ))}
    </>
  )}
   </>
  )}
  </Modal.Body>
</Modal>
    </div>
  )
}

export default Post
