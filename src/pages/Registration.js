import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().min(4).required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3000/auth", data).then(() => {
      console.log(data);
      navigate("/login");
    });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />

          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. Kirvs)"
          />
          <label>Password:</label>
          <ErrorMessage name="password" component="span" />

          <Field
            id="inputCreatePost"
            type="password"
            name="password"
            placeholder="Your Password..."
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
