import React, { useState } from "react";

import { Comment, Avatar, Button, Input, Icon } from "antd";

import axios from "axios";

import { useSelector } from "react-redux";

import LikesDislikes from "./LikesDislikes";

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector((state) => state.user);

  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

    axios.post("/api/comments/saveComment", commentData)
    .then((response) => {
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);

        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to Save Comment");
      }
    });
  };

  const actions = [
    <LikesDislikes
      comment
      commentId={props.comment._id}
      userId={localStorage.getItem("userId")}
    />,
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to <Icon type="wechat" />
    </span>
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image-avatar-comment" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea style={{ width: "100%", borderRadius: "5px", resize: "none" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="Reply to comment..."
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit<Icon type="enter" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;