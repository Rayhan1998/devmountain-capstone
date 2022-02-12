import React, { useState, useContext } from "react";
import "./threadCreatorForm.styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "../../Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/navbar.component";
export default function ThreadCreatorForm() {
  const { isLoggedIn, setIsLoggedIn, setUserData, userData, setSavedRecipes } =
    useContext(Context);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "must be 50 charecters or less")
        .required("Required"),
      body: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (isLoggedIn) {
        let threadData = {
          title: values.title,
          body: values.body,
          id: userData.id,
          user_email: userData.user_email,
          user_name: userData.user_name,
        };

        axios
          .post("http://localhost:4000/thread", threadData)
          .then((res) => {
            console.log(res);
            navigate(`/threadpage/${res.data[0].id}`);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } else {
        navigate("/signin");
      }
    },
  });

  console.log(formik.touched);
  console.log(formik.errors.title);

  return (
    <div className="thread-form-body">
      <Navbar />
      <form
        className="thread-form"
        onSubmit={formik.handleSubmit}
        name="threadForm"
      >
        <div class="title">Create Thread</div>

        <div class="input-container ic2">
          <input
            id="title"
            class="form-input"
            type="text"
            placeholder="title "
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
          />

          {formik.errors.title && formik.touched.title ? (
            <p>{formik.errors.title}</p>
          ) : null}
        </div>

        <div class="input-container ic2">
          <textarea
            id="body"
            name="w3review"
            placeholder="body"
            rows="4"
            cols="50"
            className="text-area"
            onChange={formik.handleChange}
            value={formik.values.body}
            form="threadForm"
            name="body"
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.errors.body && formik.touched.body ? (
            <p>{formik.errors.body}</p>
          ) : null}
        </div>
        <button type="text" class="submit">
          Post Thread
        </button>

        {/* <button type="text" class="submit">
                <Link to="/register">Create New Account</Link>
              </button> */}
      </form>
    </div>
  );
}
