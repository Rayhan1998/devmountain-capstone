import React, { useContext } from "react";
import "./commentForm.styles.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Context } from "../../Context";
import { useNavigate } from "react-router-dom";

export default function CommentForm(props) {
  const { setLastComment } = props;
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
      comment: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("hello");
      let comment = {
        comment: values.comment,
        user_id: userData.id,
        thread_id: currentThreadId,
      };
      if (isLoggedIn) {
        if (values.comment.length > 0) {
          axios
            .post("http://localhost:4000/comment", comment)
            .then((res) => {
              console.log(res);
              setLastComment(res.data[0]);
              resetForm();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        navigate("/signin");
      }
    },
  });

  return (
    <div className="comment-form">
      <h3 class="heading">Add A Comment Below</h3>
      <div class="container">
        <form onSubmit={formik.handleSubmit}>
          <div class="form-group">
            <textarea
              name="comment"
              className="comment-field"
              onChange={formik.handleChange}
              value={formik.values.comment}
              rows="3"
              placeholder="Enter your comment here..."
            ></textarea>
          </div>
          <button type="submit" class="submit">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}
