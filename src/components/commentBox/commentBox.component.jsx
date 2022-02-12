import React, { useState, useEffect } from "react";
import { Link } from "@chakra-ui/react";

import "./commentBox.styles.css";
import ReplyForm from "../replyForm/replyForm.component";
import axios from "axios";
import ReplyBox from "../replyBox/replyBox.component";

export default function CommentBox(props) {
  const { comment, user_name, date, commentInfo } = props;
  const [isReplyClicked, setIsReplyClicked] = useState(false);
  const [replies, setReplies] = useState(null);
  var dt = new Date(date);

  const handleReply = () => {
    setIsReplyClicked(true);
    console.log(commentInfo.comment_id);
  };

  useEffect(() => {
    //   get request to load all replies related to a particlualr comment
    axios
      .get(`http://localhost:4000/allreplies/${commentInfo.comment_id}`)
      .then((res) => {
        setReplies(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="comment-box">
      <div className="comment">{comment}</div>
      <div className="comment-info">
        <h2 className="comment-user"> User Name:{user_name}</h2>
        <h2 className="comment-date">added on: {dt.toLocaleString()}</h2>
      </div>

      <div className="replies">
        {replies
          ? replies.map((reply) => {
              return (
                <ReplyBox
                  reply_body={reply.reply_body}
                  date={reply.created_at}
                  user_name={reply.user_name}
                />
              );
            })
          : null}
      </div>
      <button>
        <Link onClick={handleReply}>Reply</Link>
      </button>
      {isReplyClicked ? <ReplyForm commentInfo={commentInfo} /> : null}
    </div>
  );
}
