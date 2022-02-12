import React, { useState, useContext } from "react";

import "./register.styles.css";
import Navbar from "../navbar/navbar.component";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../Context";
import { Spinner } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Register() {
  const [name, SetName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setIsRegistering] = useState("");
  const { setIsLoggedIn, setUserData } = useContext(Context);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      let register = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      axios
        .post("http://localhost:4000/register", register)
        .then((res) => {
          console.log(res);
          setUserData(res.data[0]);
          setIsLoggedIn(true);
          navigate(-1);
        })
        .catch((err) => {
          alert("account already exist");
        });
    },
  });

  const onNamelChange = (e) => {
    SetName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //   let register = {
    //     name: name,
    //     email: email,
    //     password: password,
    //   };

    //   setIsRegistering("registering");
    //   axios
    //     .post("https://immense-citadel-91247.herokuapp.com/register", register)
    //     .then((res) => {
    //       if (res.data.id) {
    //         navigate(-1);
    //         setIsLoggedIn(true);
    //         setUserData(res.data);
    //         setIsRegistering("registered");
    //       }

    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       setIsRegistering("not registered");
    //       alert("account already exist please sign in or use different email");
    //     });

    //   setEmail("");
    //   SetName("");
    //   setPassword("");
  };

  console.log(formik.values);
  return (
    <div className="register">
      {registering === "registering" ? (
        <Spinner
          size="xl"
          w="50px"
          h="50px"
          position="absolute"
          top="49%"
          left="49%"
          zIndex="9999"
        />
      ) : null}
      <Navbar />

      <div className={registering === "registering" ? "overlay" : null}>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div class="title">Welcome</div>
          <div class="subtitle">Let's create your account!</div>
          <div class="input-container ic1">
            <input
              id="firstname"
              class="input"
              type="text"
              placeholder=" "
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <div class="cut"></div>
            <label for="firstname" class="placeholder">
              name
            </label>
          </div>

          <div class="input-container ic2">
            <input
              id="email"
              class="input"
              type="email"
              placeholder=" "
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
            <div class="cut cut-short"></div>
            <label for="email" class="placeholder">
              Email
            </label>
          </div>

          <div class="input-container ic2">
            <input
              id="password"
              class="input"
              type="password"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
            <div class="cut cut-short"></div>
            <label for="password" class="placeholder">
              password
            </label>
          </div>
          <button type="text" class="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
