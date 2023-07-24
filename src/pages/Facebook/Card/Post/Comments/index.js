import { Avatar, Comment, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import Sentiment from 'sentiment';
import NB from "naivebayes";



function App({ comment,media_type,timestamp1,timestamp2 }){
      // Create a new sentiment variable
  const [commentResult, setCommentResult] = React.useState("");
  var xtest = [];


useEffect(() => {
  // Create a new Sentiment instance
  const sentimentAnalyzer = new Sentiment();

  // Perform sentiment analysis
  const result = sentimentAnalyzer.analyze(comment);
  const result2 = result.score

  kotinoFun(result2)

}, [comment]);

const kotinoFun = (value) => {       
  // Create a new NaiveBayes classifier
  const classifier = new NB();

      // Train the classifier with your training data
      const xtrain = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 1],
        // Add more training data
      ];
      const ytrain = ["negative", "neutral", "positive"];
  
      for (let i = 0; i < xtrain.length; i++) {
        classifier.learn(xtrain[i].toString(), ytrain[i]); //Traing the classifier or dataset
      }
  
      // Classify the test data
      if (value < 0) {
        xtest = [0, 0, 0];
        const result = classifier.categorize(xtest.toString());
        setCommentResult(result)
      } else if (value === 0) {
        xtest = [0, 1, 0];
        const result = classifier.categorize(xtest.toString());
        setCommentResult(result)
      } else {
        xtest = [1, 0, 1];
        const result = classifier.categorize(xtest.toString());
        setCommentResult(result)
      }

}
  

  const actions = [
    <>
    {commentResult === "negative" ? (
        <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',color:'#FF5C5C'}} key="comment-basic-reply-to">{commentResult}</span>
    ): commentResult === "neutral" ? (
        <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',color:'#A3A3A3'}} key="comment-basic-reply-to">{commentResult}</span>

    ):(
        <span style={{backgroundColor:'#E8E8E8',padding:3,borderRadius:5,fontWeight:'bold',color:'#00FF00'}}  key="comment-basic-reply-to">{commentResult}</span>

    )}
    </>
  ];
  return (
    
    <Comment
      actions={actions}
      author={<a>Unknown Editor</a>}
      avatar={<Avatar src="/images/jkuat.jpg" alt="Unknown Editor" />}
      content={
        <p>
          {comment}
        </p>
      }
      datetime={
        <Tooltip>
        {media_type === '' ?(
            <span>{timestamp1}</span>
        ):(
            <span>{timestamp2}</span>
        )}
        </Tooltip>
      }
    />
  );
};
export default App;
