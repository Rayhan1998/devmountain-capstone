import React from "react";
import "./replyBox.styles.css";

export default function ReplyBox(props) {
  const { reply_body, date, user_name } = props;
  return (
    <div className="reply-container">
      <h1 className="reply-body">{reply_body}</h1>
      <p className="user_name">User:{user_name}</p>

      <p className="reply-date">{new Date(date).toLocaleString()}</p>
    </div>
  );
}
