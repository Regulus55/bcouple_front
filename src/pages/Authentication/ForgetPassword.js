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
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// Formik sendformik
import * as Yup from "yup"
import { useFormik } from "formik"

// action
import { userForgetPassword } from "../../store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import axios from "axios"

const ForgetPasswordPage = props => {
  //meta title
  document.title =
    "Forget Password | BeeCouple - React Admin & Dashboard Template"

  const sendformik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    sendformikSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: async values => {
      const userInput = {
        email: values.email,
      }

      try {
        const url = "http://localhost/api/auth/find/password"
        const res = await axios.post(url, userInput)
        console.log("이멜보내기 res", res)
        if (res.status === 201) {
          console.log("이메일 발송 성공")
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
                        sendformik.handleSubmit()
                        return false
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={sendformik.handleChange}
                          onBlur={sendformik.handleBlur}
                          value={sendformik.values.email || ""}
                          invalid={
                            sendformik.touched.email && sendformik.errors.email
                              ? true
                              : false
                          }
                        />
                        {sendformik.touched.email && sendformik.errors.email ? (
                          <FormFeedback type="invalid">
                            {sendformik.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          비밀번호 변경 이메일 보내기
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

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
