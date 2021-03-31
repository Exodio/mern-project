import React, { useEffect, useState } from "react";

import { Icon } from "antd";

import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    
    props.CommentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
      
      return commentNumber;
    });

    setChildCommentNumber(commentNumber);
  }, [props.CommentLists, props.parentCommentId]);

  const renderReplyComment = (parentCommentId) =>
    props.CommentLists.map((comment, index) => (
      <div key={index}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
            <ReplyComment
              CommentLists={props.CommentLists}
              parentCommentId={comment._id}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </div>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p style={{ fontSize: "14px", margin: 0, color: "darkGray" }}
        onClick={handleChange}
        >
        View({ChildCommentNumber}) more comment(s) <Icon type="arrow-down" />
        </p>
      )}
      {OpenReplyComments &&
      renderReplyComment(props.parentCommentId)}
      <br />
    </div>
  );
};

export default ReplyComment;