import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap"

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
import Dropzone from "react-dropzone"
import axios from "axios"

const Register = props => {
  //meta title
  document.title = "Register | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const agreements = [
    { id: 1, label: "14세 이상입니다(필수)", key: "overTwenty" },
    { id: 2, label: "이용약관(필수)", key: "agreeOfTerm" },
    {
      id: 3,
      label: "개인정보수집 및 이용동의(필수)",
      key: "agreeOfPersonalInfo",
    },
    {
      id: 4,
      label: "개인정보 마케팅 활용 동의(선택)",
      key: "agreeOfMarketing",
    },
    { id: 5, label: "이벤트, 특가 알림 및 SMS 등 수신(선택)", key: "etc" },
  ]

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // userName: "",
      nickName: "",
      email: "",
      phone: "",
      // profileImg: [
      // "https://example.com/profile1.jpg",
      // "https://example.com/profile2.jpg",
      // ],
      password: "",
      passwordconfirm: "",
      consent: {
        overTwenty: true,
        agreeOfTerm: true,
        agreeOfPersonalInfo: true,
        agreeOfMarketing: true,
        etc: true,
      },
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Please enter your email"),
      nickName: Yup.string().required("Please Enter Your Nickname"),
      password: Yup.string()
        .required("Please enter your password")
        .min(6, "Password must be at least 6 characters"),
      passwordconfirm: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      phone: Yup.string().required("Please Enter Your Phone"),
      // profileImg: Yup.string().required("Please Upload Your Images"),
      consent: Yup.object({
        overTwenty: Yup.boolean().oneOf([true], "필수 약관에 동의해주세요."),
        agreeOfTerm: Yup.boolean().oneOf([true], "필수 약관에 동의해주세요."),
        agreeOfPersonalInfo: Yup.boolean().oneOf(
          [true],
          "필수 약관에 동의해주세요."
        ),
        agreeOfMarketing: Yup.boolean(),
        etc: Yup.boolean(),
      }),
    }),
    onSubmit: async values => {
      const userInput = {
        email: values.email,
        nickName: values.nickName,
        userName: values.nickName,
        password: values.password,
        profileImg: ["https://example.com/profile1.jpg"],
        phone: values.phone,
        consent: values.consent,
      }
      console.log("userInput", userInput)

      try {
        const url = "http://localhost/api/auth/signup"
        const res = await axios.post(url, userInput)
        console.log("res", res)
      } catch (e) {
        console.log("회원가입 제출 에러", e)
      }
      console.log("Serialized JSON:", JSON.stringify(userInput))
    },
  })

  const handleSingleCheck = (checked, key) => {
    validation.setFieldValue(`consent.${key}`, checked)

    const allChecked = Object.values({
      ...validation.values.consent,
      [key]: checked,
    }).every(Boolean)

    document.getElementById("select-all").checked = allChecked
  }

  const handleAllCheck = checked => {
    const updatedConsent = agreements.reduce((acc, cur) => {
      acc[cur.key] = checked
      return acc
    }, {})
    validation.setFieldValue("consent", updatedConsent)
  }

  // 이미지 업로드
  const [selectedFiles, setselectedFiles] = useState([])

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

  const AccountProperties = createSelector(
    state => state.Account,
    account => ({
      user: account.user,
      registrationError: account.registrationError,
      success: account.success,
      // loading: account.loading,
    })
  )

  const {
    user,
    registrationError,
    success,
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
                  <Form
                    className="form-horizontal p-2"
                    onSubmit={validation.handleSubmit}
                  >
                    {user && user ? (
                      <Alert color="success">Register User Successfully</Alert>
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
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Nickname</Label>
                      <Input
                        name="nickName"
                        type="text"
                        placeholder="Enter nickname"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.nickName || ""}
                        invalid={
                          validation.touched.nickName &&
                          validation.errors.nickName
                            ? true
                            : false
                        }
                      />
                      {validation.touched.nickName &&
                      validation.errors.nickName ? (
                        <FormFeedback type="invalid">
                          {validation.errors.nickName}
                        </FormFeedback>
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
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.password}
                        </FormFeedback>
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
                          validation.touched.passwordconfirm &&
                          validation.errors.passwordconfirm
                            ? true
                            : false
                        }
                      />
                      {validation.touched.passwordconfirm &&
                      validation.errors.passwordconfirm ? (
                        <FormFeedback type="invalid">
                          {validation.errors.passwordconfirm}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Phone</Label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="01012345678"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone || ""}
                        invalid={
                          validation.touched.phone && validation.errors.phone
                            ? true
                            : false
                        }
                      />
                      {validation.touched.phone && validation.errors.phone ? (
                        <FormFeedback type="invalid">
                          {validation.errors.phone}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <label className="form-label fw-bold">Images</label>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Drop files here or click to upload.</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>

                    <Row>
                      <Col xl={12}>
                        <label className="form-label fw-bold">Consent</label>
                        <div className="signup-consent p-3 border border-2 rounded">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id="select-all"
                              className="form-check-input"
                              onChange={e => handleAllCheck(e.target.checked)}
                              checked={Object.values(
                                validation.values.consent
                              ).every(Boolean)}
                            />
                            <label
                              htmlFor="select-all"
                              className="form-check-label"
                            >
                              전체 선택
                            </label>
                          </div>

                          <hr className="border-2" />

                          {agreements.map(item => (
                            <div key={item.id} className="form-check mb-2">
                              <input
                                type="checkbox"
                                id={`agreement-${item.id}`}
                                className="form-check-input"
                                checked={validation.values.consent[item.key]}
                                onChange={e =>
                                  handleSingleCheck(e.target.checked, item.key)
                                }
                              />
                              <label
                                htmlFor={`agreement-${item.id}`}
                                className="form-check-label"
                              >
                                {item.label}
                              </label>
                            </div>
                          ))}
                        </div>

                        {validation.touched.consent &&
                          Object.keys(validation.errors.consent || {}).some(
                            key =>
                              [
                                "overTwenty",
                                "agreeOfTerm",
                                "agreeOfPersonalInfo",
                              ].includes(key) && validation.errors.consent[key]
                          ) && (
                            <div className="text-danger mt-2">
                              Please agree to all the required terms.
                            </div>
                          )}
                      </Col>
                    </Row>

                    <div className="mt-4 d-grid">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
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
