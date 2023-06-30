import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Post from './Post';


const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };


  const Card1 = ({ postID,post }) => {
    const [comments, setComments] = useState([]);
  
    const fetchComments = async (postId) => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v12.0/${postId}/comments?access_token=EABfNuyiEO2QBAAqyXZArsFRcXFgWavV7oc5DYKc6xtSB7QorhCD9koKPMdR0ZCxjemFNMk5n3CkWNNLwD5Ju5TEN7x1bfheUc0niCqFGdAbCnpIl5rhquDyVBAnCX3gcEe5JRjBX0qd0DzZAWUOEzI5FfcKnCp7Rdfl1bodVeIjRNcCCD26`
        );
        const comments = await response.json();
        setComments(comments.data);
      } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
      }
    };

    useEffect(() => {
        fetchComments(postID)
    },[postID])
  
  
    return (
      <Card
        key={post.id}
        sx={{
            margin: 1,
            width: '100%', // Full width by default
            '@media (min-width: 600px)': {
             width: 550, // But cards should be full width on larger screens
            },
          }}
      >
        <CardContent>
          {post.attachments && post.attachments.data.length > 0 && (
            <>
              {post.attachments.data.map((attachment, index) => (
                <React.Fragment key={index}>
                  {attachment.media_type === 'photo' && (
                    <>
                    <CardMedia
                    sx={{ height: 180, width: '100%' }}
                    image={attachment.media.image.src}
                    title="green iguana"
                    component="img"
                  />
                      {attachment.title && <h4>{attachment.title}</h4>}
                      {attachment.description && (
                        <p>{attachment.description}</p>
                      )}
                    </>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          <Typography variant="body2" color="text.secondary">
            {post.message} - <span style={{fontWeight:'bold'}}>{comments.length} comments{''}</span>
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            {formatTimestamp(post?.created_time)}
            
          </Typography>
        </CardContent>
        <Post comments={comments} media_type='photo' description={post.message}/>
      </Card>
    );
  };


const PageVideos = () => {
  const [videoData, setVideoData] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const access_token = 'EABfNuyiEO2QBAAqyXZArsFRcXFgWavV7oc5DYKc6xtSB7QorhCD9koKPMdR0ZCxjemFNMk5n3CkWNNLwD5Ju5TEN7x1bfheUc0niCqFGdAbCnpIl5rhquDyVBAnCX3gcEe5JRjBX0qd0DzZAWUOEzI5FfcKnCp7Rdfl1bodVeIjRNcCCD26';
    const pageID = '114749128327332';
  
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v12.0/${pageID}/posts?fields=message,created_time,attachments{media_type,media}&access_token=${access_token}`
        );
        const data = await response.json();
        const postsWithTimestamp = data.data.map((post) => ({
          ...post,
          timestamp: formatTimestamp(post.created_time),
        }));
        setPosts(postsWithTimestamp);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  
  // Helper function to format timestamp to PM/AM format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${month} ${day}, ${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  




  useEffect(() => {
    const access_token = 'EABfNuyiEO2QBAAqyXZArsFRcXFgWavV7oc5DYKc6xtSB7QorhCD9koKPMdR0ZCxjemFNMk5n3CkWNNLwD5Ju5TEN7x1bfheUc0niCqFGdAbCnpIl5rhquDyVBAnCX3gcEe5JRjBX0qd0DzZAWUOEzI5FfcKnCp7Rdfl1bodVeIjRNcCCD26';
    const pageID = '114749128327332';

    const fetchVideos = async () => {
      try {
        // Fetch videos
        const videoResponse = await fetch(
          `https://graph.facebook.com/v12.0/${pageID}/videos?fields=source,id,description,created_time&access_token=${access_token}`
        );
        const videoData = await videoResponse.json();
        const videos = videoData.data;

        // Fetch comments for each video
        const videoDataWithComments = await Promise.all(
          videos.map(async (video) => {
            const commentResponse = await fetch(
              `https://graph.facebook.com/v12.0/${video.id}/comments?access_token=${access_token}`
            );
            const commentData = await commentResponse.json();
            const comments = commentData.data.map((comment) => ({
              message: comment.message,
              timestamp: formatTimestamp(comment.created_time),
            }));

            return {
              ...video,
              comments,
            };
          })
        );

        setVideoData(videoDataWithComments);
      } catch (error) {
        console.error('Error fetching videos and comments:', error);
      }
    };

    fetchVideos();
  }, []);

 


  return (
    <div
      style={{
        display: 'table',
        margin: 'auto',
        justifyContent: 'center',
      }}
    >
      {videoData && (
        <>
          {videoData.map((video) => (
            <Card key={video.id} 
            sx={{
                margin: 1,
                width: '100%', // Full width by default
                '@media (min-width: 600px)': {
                 width: 550, // But cards should be full width on larger screens
                },
              }}
            >
              <CardMedia
                sx={{ height: 180, width: '100%' }}
                image={video.source}
                title="green iguana"
                component="video"
                controls
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {video.description} - <span style={{fontWeight:'bold'}}>{video.comments.length} comments{''}</span>
                </Typography>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  {formatTimestamp(video.created_time)}
                </Typography>
              </CardContent>
              <Post comments={video.comments} media_type='' description={video.description}/>
            </Card>
          ))}
        </>
      )}
      {posts && (
        <>
        {posts.map((post) => (
            <>
            <Card1 key={post.id} postID={post.id} post={post} />
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default PageVideos;
