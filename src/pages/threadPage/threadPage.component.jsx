import React, { useContext, useEffect, useState } from "react";
import "./threadPage.styles.css";

import { Heading, Button } from "@chakra-ui/react";

import { useParams, Link } from "react-router-dom";

import ThreadCreatorForm from "../../components/threadCreatorModal/threadCreatorForm.component";
import { Context } from "../../Context";
import axios from "axios";
import CommentBox from "../../components/commentBox/commentBox.component";
import CommentForm from "../../components/commentForm/commentForm.component";
import Navbar from "../../components/navbar/navbar.component";
export default function ThreadPage() {
  const [threadData, setThreadData] = useState("");
  const [comments, setComments] = useState("");
  const [lastComment, setLastComment] = useState("");
  const [likedThreads, setLikedThreads] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  let dt = new Date(threadData.created_at);

  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    userData,
    setSavedRecipes,
    setCurrentThreadId,
  } = useContext(Context);

  console.log(userData);
  const { threadid } = useParams();

  console.log(isLiked);
  console.log(isDisliked + "dislike");

  // const handleLike = () => {
  //   console.log(likedThreads);
  //   const likeData = {
  //     userId: userData.id,
  //     threadId: Number(threadid),
  //     likeType: 0,
  //   };

  //   if (userData) {
  //     if (
  //       likedThreads.some((liked) => liked.thread_id == threadid) &&
  //       likedThreads.some((liked) => liked.like_type === 1)
  //     ) {
  //       console.log("update to like");
  //       // put request to update like type to 0
  //       axios
  //         .put(`http://localhost:4000/user-likes/${threadid}`, {
  //           user_id: userData.id,
  //           like_type: "like",
  //         })
  //         .then((res) => {
  //           setLikedThreads(res.data);
  //         });
  //       console.log(likedThreads.some((liked) => liked.thread_id === threadid));
  //       console.log(likedThreads.some((liked) => liked.like_type === 1));
  //     } else {
  //       axios.post(`http://localhost:4000/user-likes`, likeData).then((res) => {
  //         setLikedThreads(res.data);
  //       });

  //       console.log("row added");
  //       console.log(likedThreads.some((liked) => liked.thread_id === threadid));
  //       console.log(likedThreads.some((liked) => liked.like_type === 1));
  //     }
  //   }
  // };

  // const handleDislike = () => {
  //   const dislikeData = {
  //     userId: userData.id,
  //     threadId: Number(threadid),
  //     likeType: 1,
  //   };

  //   if (userData) {
  //     if (
  //       likedThreads.some((liked) => liked.thread_id == threadid) &&
  //       likedThreads.some((liked) => liked.like_type === 0)
  //     ) {
  //       axios
  //         .put(`http://localhost:4000/user-likes/${threadid}`, {
  //           user_id: userData.id,
  //           like_type: "dislike",
  //         })
  //         .then((res) => {
  //           setLikedThreads(res.data);
  //         });

  //       console.log(likedThreads.some((liked) => liked.thread_id === threadid));
  //       console.log(likedThreads.some((liked) => liked.like_type === 0));
  //     } else {
  //       console.log("dislike row added");
  //       axios
  //         .post(`http://localhost:4000/user-likes`, dislikeData)
  //         .then((res) => {
  //           setLikedThreads(res.data);
  //         });

  //       console.log(likedThreads.some((liked) => liked.thread_id === threadid));
  //       console.log(likedThreads.some((liked) => liked.like_type === 0));
  //     }
  //   }
  //   console.log(likedThreads);
  // };

  const handleLike = () => {
    const likedThread = {
      thread_id: Number(threadid),
      thread_title: threadData.thread_title,
      thread_admin: threadData.user_name,
      user_email: userData.user_email,
      created_at: threadData.created_at,
      thread_comments: threadData.thread_comment_amount,
    };
    if (likedThreads.some((thread) => thread.thread_id == threadid)) {
      console.log("already added");

      axios
        .delete("http://localhost:4000/likes", {
          data: { email: userData.user_email, thread_id: threadid },
        })
        .then((res) => {
          setLikedThreads(res.data);
        });
    } else {
      console.log("not added");
      axios.post("http://localhost:4000/likes", likedThread).then((res) => {
        setLikedThreads(res.data);
      });
    }
  };

  console.log(likedThreads);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/thread/${threadid}`)
      .then((res) => {
        setThreadData(res.data[0]);
        setCurrentThreadId(threadid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:4000/likes/${userData.user_email}`)
        .then((res) => {
          setLikedThreads(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/comments/${threadid}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios call updates thread_comments_amount column after comments state is filled with comments
  }, [lastComment]);

  useEffect(() => {
    if (comments.length > 0) {
      axios
        .put(`http://localhost:4000/comments/${threadid}`, {
          comment_amount: comments.length,
        })
        .then((res) => {});
    }

    console.log("innnn");
  }, [comments]);

  return (
    <div className="thread-page">
      <Navbar />
      <section>
        <Heading>Thread Page</Heading>
      </section>

      <section className="thread-info">
        <div className="thread-info-body">
          <Heading>{threadData.thread_title}</Heading>
          <p className="thread-body">{threadData.thread_body}</p>
        </div>

        <div className="thread-stats">
          <p>
            {" "}
            comments:
            {threadData.thread_comment_amount ? comments.length : 0}
          </p>
          <div className="like">
            <p onClick={handleLike}>
              <img
                src="https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-like-feedback-those-icons-fill-those-icons.png"
                className="like-logo"
              />
            </p>
          </div>
        </div>

        <p className="thread-info-date">Created on: {dt.toLocaleString()}</p>
        <p className="thread-creator"> User:{threadData.user_name}</p>
      </section>
      <section>
        <CommentForm setLastComment={setLastComment} />
      </section>

      <section className="comment-section">
        {comments.length > 0
          ? comments.map((comment) => {
              return (
                <CommentBox
                  key={comment.comment_id}
                  comment={comment.comment_body}
                  user_name={comment.user_name}
                  date={comment.created_at}
                  commentInfo={comment}
                />
              );
            })
          : null}
      </section>
    </div>
  );
}
