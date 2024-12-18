import PropTypes from "prop-types"
import React from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// 로그인
import * as Yup from "yup"
import { useFormik } from "formik"

// actions
import { loginUser, socialLogin } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"
import axios from "axios"

const Login = props => {
  const navigate = useNavigate()
  //meta title
  document.title = "Login | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const loginFormik = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "qwe@qwe.com",
      password: "qwe123!@#",
    },
    loginFormikSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async values => {
      const userInput = {
        email: values.email,
        password: values.password,
      }
      console.log("로그인 values", userInput)

      try {
        const url = "http://localhost/api/auth/login"
        const res = await axios.post(url, userInput)
        console.log("res", res)
        if (res.status === 200) {
          localStorage.setItem("token", res.data.accessToken)
          localStorage.setItem("authUser", JSON.stringify(res.data.user))
          navigate("/dashboard")
        }
      } catch (e) {
        console.log(e)
      }
    },
  })

  const LoginProperties = createSelector(
    state => state.Login,
    login => ({
      error: login.error,
    })
  )

  const { error } = useSelector(LoginProperties)

  const signIn = type => {
    dispatch(socialLogin(type, props.router.navigate))
  }

  const socialInfos = [
    {
      title: "google",
      img: "/images/google.png",
      func: () => console.log("google"),
    },
    {
      title: "kakao",
      img: "/images/kakao.png",
      func: () => console.log("kakao"),
    },
    {
      title: "naver",
      img: "/images/naver.png",
      func: () => console.log("naver"),
    },
  ]

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">로그인</h5>
                        <p>Sign in to continue to BeeCouple.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="logo-light-element">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        loginFormik.handleSubmit()
                        return false
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">이메일</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="이메일"
                          type="email"
                          onChange={loginFormik.handleChange}
                          onBlur={loginFormik.handleBlur}
                          value={loginFormik.values.email || ""}
                          invalid={
                            loginFormik.touched.email &&
                            loginFormik.errors.email
                              ? true
                              : false
                          }
                        />
                        {loginFormik.touched.email &&
                        loginFormik.errors.email ? (
                          <FormFeedback type="invalid">
                            {loginFormik.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">비밀번호</Label>
                        <Input
                          name="password"
                          value={loginFormik.values.password || ""}
                          type="password"
                          placeholder="비밀번호"
                          onChange={loginFormik.handleChange}
                          onBlur={loginFormik.handleBlur}
                          invalid={
                            loginFormik.touched.password &&
                            loginFormik.errors.password
                              ? true
                              : false
                          }
                        />
                        {loginFormik.touched.password &&
                        loginFormik.errors.password ? (
                          <FormFeedback type="invalid">
                            {loginFormik.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          나를 기억해줘
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block fs-5"
                          type="submit"
                        >
                          로그인
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-13 mb-3 text-muted">
                          SNS계정으로 간편 로그인/회원가입
                        </h5>

                        {/* <ul className="list-inline">
                          <li className="list-inline-item">
                            <button
                              // onClick={signWithGoogle}
                              icon={() => (
                                <img
                                  src="/images/google.png"
                                  className="mr-2 w-7 h-7"
                                />
                              )}
                              className="mt-6 w-full max-w-sm rounded-lg border border-gray-300 bg-white py-4 font-semibold text-slate-500 hover:bg-gray-50"
                            >
                              Sign with Google
                            </button>
                          </li>

                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-danger text-white border-danger"
                              onClick={e => {
                                e.preventDefault()
                                socialResponse("google")
                              }}
                            >
                              <i className="mdi mdi-google" />
                            </Link>
                          </li>
                        </ul> */}
                        {/*소셜로그인*/}
                        <div className="d-flex justify-content-center align-items-center">
                          {socialInfos?.map(social => (
                            <div
                              className="border-0 bg-white mx-2 rounded-lg"
                              onClick={social.func}
                              key={social.title}
                              style={{
                                transition: "filter 0.3s ease",
                                cursor: "pointer",
                              }}
                              onMouseOver={e =>
                                (e.currentTarget.style.filter =
                                  "brightness(0.9)")
                              }
                              onMouseOut={e =>
                                (e.currentTarget.style.filter = "brightness(1)")
                              }
                            >
                              <img
                                src={social.img}
                                className="img-fluid rounded-circle"
                                width="40"
                                height="40"
                                alt={social.title}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Row>
                        <Col md={6}>
                          <div className="mt-4 text-center">
                            <Link to="/forgot-email" className="text-muted">
                              <i className="mdi mdi-lock me-1" />
                              이메일 찾기
                            </Link>
                          </div>
                        </Col>

                        <Col>
                          <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock me-1" />
                              비밀번호 찾기
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  아직 아이디가 없으신가요?{" "}
                  <Link
                    to="/register"
                    className="font-weight-medium text-primary text-decoration-underline fw-bold"
                  >
                    {" "}
                    회원가입
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} BeeCouple. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Beecouple
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
