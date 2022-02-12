import React, { useContext } from "react";
import "./replyForm.styles.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Context } from "../../Context";
import { useNavigate } from "react-router-dom";

export default function ReplyForm(props) {
  const { commentInfo } = props;
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    userData,
    setSavedRecipes,
    currentThreadId,
  } = useContext(Context);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      reply: "",
    },
    onSubmit: (values, { resetForm }) => {
      const replyData = {
        reply: values.reply,
        comment_id: commentInfo.comment_id,
        thread_id: commentInfo.thread_id,
        replier_id: userData.id,
      };

      if (isLoggedIn) {
        if (values.reply.length > 0) {
          axios.post("http://localhost:4000/replies", replyData).then((res) => {
            console.log(res);
          });
        }
      } else {
        navigate("/signin");
      }
    },
  });

  console.log(commentInfo.comment_id);

  return (
    <div className="reply-form">
      <div class="container">
        <form onSubmit={formik.handleSubmit}>
          <div class="form-group">
            <textarea
              name="reply"
              className="reply-field"
              onChange={formik.handleChange}
              value={formik.values.reply}
              rows="3"
              placeholder="Enter your reply here..."
            ></textarea>
          </div>
          <button type="submit" class="submit">
            Post reply
          </button>
        </form>
      </div>
    </div>
  );
}
