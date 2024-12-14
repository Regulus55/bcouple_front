import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap"

//redux
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { Link, useLocation, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// Formik changeformik
import * as Yup from "yup"
import { useFormik } from "formik"

// import images
import profile from "../../assets/images/profile-img.png"
import axios from "axios"

const ChangePassword = props => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get("token")

  //meta title
  document.title =
    "Forget Password | BeeCouple - React Admin & Dashboard Template"

  const changeformik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      token: token,
      password: "",
      passwordconfirm: "",
    },
    changeformikSchema: Yup.object({
      token: Yup.string().required("Please Enter Your Toe"),
      password: Yup.string().required("Please Enter Your New Password"),
      passwordconfirm: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async values => {
      const userInput = {
        token,
        password: values.password,
      }
      console.log("유저인풋", userInput)
      try {
        const url = "http://localhost/api/auth/change/password"
        const res = await axios.put(url, userInput)
        console.log("프로필 수정 res", res)
        if (res.status === 200) {
          alert("비밀번호 변경 성공")
          navigate("/login")
        }
      } catch (e) {
        console.log(e)
      }
    },
  })

  const ForgotPasswordProperties = createSelector(
    state => state.ForgetPassword,
    forgetPassword => ({
      forgetError: forgetPassword.forgetError,
      forgetSuccessMsg: forgetPassword.forgetSuccessMsg,
    })
  )

  const { forgetError, forgetSuccessMsg } = useSelector(
    ForgotPasswordProperties
  )

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
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to BeeCouple.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-2">
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        changeformik.handleSubmit()
                        return false
                      }}
                    >
                      <Row>
                        <Col xl={12}>
                          <div className="mb-3">
                            <Label className="form-label">New Password</Label>
                            <Input
                              name="password"
                              className="form-control"
                              placeholder="Enter New Password"
                              type="password"
                              onChange={changeformik.handleChange}
                              onBlur={changeformik.handleBlur}
                              value={changeformik.values.password || ""}
                              invalid={
                                changeformik.touched.password &&
                                changeformik.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {changeformik.touched.password &&
                            changeformik.errors.password ? (
                              <FormFeedback type="invalid">
                                {changeformik.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xl={12}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Password Confirm
                            </Label>
                            <Input
                              name="passwordconfirm"
                              type="password"
                              placeholder="Enter Password"
                              onChange={changeformik.handleChange}
                              onBlur={changeformik.handleBlur}
                              value={changeformik.values.passwordconfirm || ""}
                              invalid={
                                changeformik.touched.passwordconfirm &&
                                Boolean(changeformik.errors.passwordconfirm)
                              }
                            />
                            {changeformik.touched.passwordconfirm &&
                            changeformik.errors.passwordconfirm ? (
                              <FormFeedback type="invalid">
                                {changeformik.errors.passwordconfirm}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <div className="mb-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          비밀번호 변경하기
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
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

ChangePassword.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ChangePassword)
