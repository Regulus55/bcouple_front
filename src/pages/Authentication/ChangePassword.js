import React from "react"
import { Form, Link, useLocation } from "react-router-dom"
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

const ChangePasswordPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get("token")

  const changeformik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      token: token,
      password: "",
    },
    changeformikSchema: Yup.object({
      token: Yup.string().required("Please Enter Your Toe"),
      password: Yup.string().required("Please Enter Your New Password"),
    }),
    onSubmit: async values => {
      const userInput = {
        token,
        password: values.password,
      }
      console.log("유저인풋", userInput)
      try {
        // const url = "http://localhost/api/auth/change/password"
        // const res = await axios.put(url, userInput)
        // console.log("프로필 수정 res", res)
      } catch (e) {
        console.log(e)
      }
    },
  })

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
                        <p>Sign in to continue to Skote.</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-2">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        changeformik.handleSubmit()
                        return false
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          className="form-control"
                          placeholder="Enter Password"
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
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
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

export default withRouter(ChangePasswordPage)
