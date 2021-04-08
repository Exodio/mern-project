import React, { useEffect, useState } from "react";

import { Tooltip, Icon } from "antd";

import axios from "axios";

import { useSelector } from "react-redux";

function LikesDislikes(props) {
  const user = useSelector(state => state.user);

  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);

  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let data = {};

  if (props.movie) {
    data = { movieId: props.movieId, userId: props.userId };
  } else {
    data = { commentId: props.commentId, userId: props.userId };
  };

  useEffect(() => {
    axios
      .post("/api/likes/getLikes", data)
      .then((response) => {
        if (response.data.success) {
          // 1. Check how many likes this movie has
          setLikes(response.data.likes.length);
          // 2. Check, if you have already clicked this like button
          response.data.likes.map((like) => {
            if (like.userId === props.userId) {
              return setLikeAction("liked");
            }

            return setLikeAction;
          });
        } else {
          alert("Failed to Get Likes");
        }
      })
      .catch((error) => console.error("Error:", error));

    axios
      .post("/api/likes/getDislikes", data)
      .then((response) => {
        if (response.data.success) {
          setDislikes(response.data.dislikes.length);

          response.data.dislikes.map((dislike) => {
            if (dislike.userId === props.userId) {
              return setDislikeAction("disliked");
            }

            return setDislikeAction;
          });
        } else {
          alert("Failed to Get Dislikes");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const onLike = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log In first...!");
    }

    if (LikeAction === null) {
      axios
        .post("/api/likes/upLike", data)
        .then((response) => {
          if (response.data.success) {
            setLikes((oldUpLikes) => oldUpLikes + 1);
            setLikeAction("liked");
            // Validate, If the dislike button is already clicked
            if (DislikeAction !== null) {
              setDislikeAction(null);
              setDislikes((oldDislikes) => oldDislikes - 1);
            }
          } else {
            alert("Failed to Increase Likes");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      axios
        .post("/api/likes/unLike", data)
        .then((response) => {
          if (response.data.success) {
            setLikes((oldUnLikes) => oldUnLikes - 1);
            setLikeAction(null);
          } else {
            alert("Failed to Decrease Likes");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const onDislike = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log In first...!");
    }
    
    if (DislikeAction !== null) {
      axios
        .post("/api/likes/unDislike", data)
        .then((response) => {
          if (response.data.success) {
            setDislikes((oldUnDislikes) => oldUnDislikes - 1);
            setDislikeAction(null);
          } else {
            alert("Failed to Decrease Dislikes");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      axios
        .post("/api/likes/upDislike", data)
        .then((response) => {
          if (response.data.success) {
            setDislikes((oldUpDislikes) => oldUpDislikes + 1);
            setDislikeAction("disliked");
            // Validate, If the like button is already clicked
            if (LikeAction !== null) {
              setLikeAction(null);
              setLikes((oldUpLikes) => oldUpLikes - 1);
            }
          } else {
            alert("Failed to Increase Dislikes");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === "liked" ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "3px", paddingRight: "3px", cursor: "auto" }}>
          {Likes}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={DislikeAction === "disliked" ? "filled" : "outlined"}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "3px", cursor: "auto" }}>
          {Dislikes}
        </span>
      </span>
    </React.Fragment>
  );
};

export default LikesDislikes;