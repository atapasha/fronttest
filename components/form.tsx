import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import { useFormik } from "formik";
import type { NextPage } from "next";
import * as yup from "yup";

import "bootstrap/dist/css/bootstrap.min.css";

const FormComponent: NextPage = () => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      category: "",
      id: "",
      title: "",
    },
    onSubmit: (e) => {
      console.log(e);
      setMessage("اطلاعات ارسال شدند");
      setSubmitted(true);
    },
    validationSchema: yup.object({
      category: yup.string().trim().required("وارد کردن نام گروه الزامی است"),
      id: yup.number().required("وارد کردن آیدی الزامی است"),
      title: yup.string().trim().required(" وارد کردن عنوان الزامی میباشد"),
    }),
  });

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <div hidden={!submitted} className="alert alert-primary" role="alert">
        {message}
      </div>

      <form className="w-50" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            گروه بندی
          </label>
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder=""
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.category && (
            <div className="text-danger">{formik.errors.category}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            آیدی
          </label>
          <input
            type="number"
            name="id"
            className="form-control"
            placeholder=""
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.id && (
            <div className="text-danger">{formik.errors.id}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            عنوان
          </label>
          <textarea
            name="title"
            className="form-control"
            placeholder=""
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && (
            <div className="text-danger">{formik.errors.title}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          ارسال پست
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
