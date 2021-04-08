import React, { useState } from "react";

import { Button, Input, Typography, Icon } from "antd";

import axios from "axios";

import { useSelector } from "react-redux";

import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const { TextArea } = Input;
const { Title } = Typography;

function Comments(props) {
  const user = useSelector((state) => state.user);
  
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log In first...!");
    }

    const commentData = {
      content: Comment,
      writer: user.userData._id,
      postId: props.postId,
    };

    axios.post("/api/comments/saveComment", commentData)
    .then((response) => {
      if (response.data.success) {
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to Save Comment");
      }
    })
    .catch(error => console.error("Error:", error));
  };

  return (
    <div>
      <br />
      <Title level={3} style={{ color:"#19adf4" }}>Share your opinion about {props.movieTitle}</Title>
      <hr />
      {/* Comment lists */}
      {props.CommentLists &&
        props.CommentLists.map((comment, index) =>
            !comment.responseTo && (
              <div key={index}>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </div>
            )
        )}
      {props.CommentLists && props.CommentLists.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px", fontFamily: "cursive" }}
        >Be the first one who shares his thoughts about this movie..<Icon type="smile" />
        </div>
      )}
      {/* Comment form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px", resize:"none" }}
          onChange={handleChange}
          value={Comment}
          placeholder="Add a public comment..."
        />
        <br />
        <Button style={{ width: "20%", height: "52px", marginLeft:"1px", }} onClick={onSubmit}>
          Submit<Icon type="enter" />
        </Button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default Comments;