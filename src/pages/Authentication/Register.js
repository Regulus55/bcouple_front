import React, { useEffect } from "react"
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"

import { Link, useNavigate } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
import logoImg from "../../assets/images/logo.svg"

const Register = props => {

  //meta title
  document.title = "Register | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      username: "",
      nickname: "",
      phone: "",
      password: "",
      passwordconfirm: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password")
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values))
    }
  })

  const agreements = [
    { id: 1, label: "14세 이상입니다(필수)", key: "overTwenty" },
    { id: 2, label: "이용약관(필수)", key: "agreeOfTerm" },
    { id: 3, label: "개인정보수집 및 이용동의(필수)", key: "agreeOfPersonalInfo" },
    { id: 4, label: "개인정보 마케팅 활용 동의(선택)", key: "agreeOfMarketing" },
    { id: 5, label: "이벤트, 특가 알림 및 SMS 등 수신(선택)", key: "etc" }
  ]

  const AccountProperties = createSelector(
    (state) => state.Account,
    (account) => ({
      user: account.user,
      registrationError: account.registrationError,
      success: account.success
      // loading: account.loading,
    })
  )

  const {
    user,
    registrationError, success
    // loading
  } = useSelector(AccountProperties)

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  useEffect(() => {
    success && setTimeout(() => navigate("/login"), 2000)
  }, [success])

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free BeeCouple account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  {/*<div>*/}
                  {/*  <Link to="/">*/}
                  {/*    <div className="avatar-md profile-user-wid mb-4">*/}
                  {/*      <span className="avatar-title rounded-circle bg-light">*/}
                  {/*        <img*/}
                  {/*          src={logoImg}*/}
                  {/*          alt=""*/}
                  {/*          className="rounded-circle"*/}
                  {/*          height="34"*/}
                  {/*        />*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  </Link>*/}
                  {/*</div>*/}
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username ? true : false
                          }
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Nickname</Label>
                        <Input
                          name="nickname"
                          type="text"
                          placeholder="Enter nickname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.nickname || ""}
                          invalid={
                            validation.touched.nickname && validation.errors.nickname ? true : false
                          }
                        />
                        {validation.touched.nickname && validation.errors.nickname ? (
                          <FormFeedback type="invalid">{validation.errors.nickname}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password Confirm</Label>
                        <Input
                          name="passwordconfirm"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.passwordconfirm || ""}
                          invalid={
                            validation.touched.passwordconfirm && validation.errors.passwordconfirm ? true : false
                          }
                        />
                        {validation.touched.passwordconfirm && validation.errors.passwordconfirm ? (
                          <FormFeedback type="invalid">{validation.errors.passwordconfirm}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password Confirm</Label>
                        <input
                          className="form-control"
                          type="tel"
                          placeholder="1-(555)-555-5555"
                        />
                        {validation.touched.passwordconfirm && validation.errors.passwordconfirm ? (
                          <FormFeedback type="invalid">{validation.errors.passwordconfirm}</FormFeedback>
                        ) : null}
                      </div>


                      {/*///////////////////*/}
                      <div className="mb-3">
                        <Label className="form-label">약관동의</Label>
                        {agreements.map((agreement, index) => (
                          <>
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={`agreement.id[${index+1}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                Form Checkbox
                              </label>
                            </div>
                            {validation.touched.consent && validation.errors.consent ? (
                              <FormFeedback type="invalid">{validation.errors.consent}</FormFeedback>
                            ) : null}
                          </>
                        ))}

                      </div>

                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "} <Link to="/login" className="font-weight-medium text-primary">
                  {" "}
                  Login
                </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} BeeCouple. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by BeeCouple
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
