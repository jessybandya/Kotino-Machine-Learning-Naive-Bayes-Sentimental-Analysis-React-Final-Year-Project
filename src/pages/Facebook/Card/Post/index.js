import { CardActions } from '@mui/material'
import React from 'react'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Modal from 'react-bootstrap/Modal';
import Comments from './Comments';
import Sentiment from 'sentiment';
import { useEffect } from 'react';


const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};





function Post({ comments,media_type, description }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [commentResult, setCommentResult] = React.useState("");


  useEffect(() => {
    let positiveCount = 0;
    let negativeCount = 0;

    comments.forEach((comment) => {
      const sentimentAnalyzer = new Sentiment();
         // Perform sentiment analysis
    const result = sentimentAnalyzer.analyze(comment?.message);
    const result2 = result.score //0


      if (result2 > 0) {
        positiveCount++;
        console.log('positive', positiveCount)
      } else if (result2 < 0) {
        negativeCount++;
        console.log('negative', negativeCount)
      }
    });

    if (positiveCount > negativeCount) {
      setCommentResult("positive");
    } else if (positiveCount < negativeCount) {
      setCommentResult("negative");
    } else {
      setCommentResult("neutral");
    }
  
  }, [comments]);




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
    <span>
    {commentResult === "negative" ? (
      <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',color:'#FF5C5C'}} key="comment-basic-reply-to">{commentResult}</span>
  ): commentResult === "positive" ? (
    <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',color:'#00FF00'}}  key="comment-basic-reply-to">{commentResult}</span>
  ):(
    <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',color:'#A3A3A3'}} key="comment-basic-reply-to">{commentResult}</span>
  )}
    </span>
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
      {description} - {commentResult === "negative" ? (
        <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',fontSize:14, color:'#FF5C5C'}} key="comment-basic-reply-to">{commentResult}</span>
    ): commentResult === "positive" ? (
      <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',fontSize:14, color:'#00FF00'}}  key="comment-basic-reply-to">{commentResult}</span>
    ):(
      <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',fontSize:14, color:'#A3A3A3'}} key="comment-basic-reply-to">{commentResult}</span>
    )}
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
