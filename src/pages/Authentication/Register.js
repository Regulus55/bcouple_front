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

// Formik registerformik
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
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Dropzone from "react-dropzone"
import axios from "axios"

// 이메일보내기
const EmailSendForm = ({ setEmail, setCheckedEmail }) => {
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
      const url = "http://localhost/api/auth/email/send"
      const promise = axios.post(url, values)
      toast.promise(
        promise,
        {
          pending: "로딩 중...",
          success: "이메일 발송 성공",
          error: "요청 실패",
        },
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          draggable: true,
        }
      )

      try {
        const res = await promise
        // console.log("이멜보내기 res", res)
        if (res.status === 201) {
          console.log("발송성공")
          setCheckedEmail(true)
        }
      } catch (e) {
        console.log(e)
      }
    },
  })

  return (
    <Form
      className="form-horizontal"
      onSubmit={e => {
        e.preventDefault()
        sendformik.handleSubmit()
        return false
      }}
    >
      <div className="mb-2">
        <Label className="form-label">Email</Label>
        <Input
          name="email"
          className="form-control"
          placeholder="Enter email"
          type="email"
          onChange={e => {
            sendformik.handleChange(e)
            setEmail(e.target.value)
          }}
          onBlur={sendformik.handleBlur}
          value={sendformik.values.email || ""}
          invalid={
            sendformik.touched.email && sendformik.errors.email ? true : false
          }
        />
        {sendformik.touched.email && sendformik.errors.email ? (
          <FormFeedback type="invalid">{sendformik.errors.email}</FormFeedback>
        ) : null}
      </div>

      <div className="mb-2 d-grid">
        <button className="btn btn-primary btn-block" type="submit">
          이메일로 인증코드 받기
        </button>
      </div>
    </Form>
  )
}

// 이메일 체크
const EmailCheckForm = ({ email, setCheckedEmail }) => {
  const checkformik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email,
      code: "",
    },
    checkformikSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      code: Yup.string().required("Please Enter Code"),
    }),
    onSubmit: async values => {
      const userInput = {
        email,
        code: values.code.toString(),
      }
      // console.log("이멜체크 values", userInput)

      const url = "http://localhost/api/auth/email/check"
      const promise = axios.post(url, userInput)
      toast.promise(
        promise,
        {
          pending: "로딩 중...",
          success: "이메일 인증 성공",
          error: "인증 실패",
        },
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          draggable: true,
        }
      )
      try {
        const res = await promise
        console.log("이멜체크 res", res)
        if (res.status === 201) {
          console.log("인증성공")
          setCheckedEmail(false)
        }
      } catch (e) {
        console.log(e)
      }
    },
  })

  return (
    <Form
      className="form-horizontal"
      onSubmit={e => {
        e.preventDefault()
        checkformik.handleSubmit()
        return false
      }}
    >
      <div className="mb-3">
        <Label className="form-label">Code</Label>
        <Input
          name="code"
          className="form-control"
          placeholder="Enter Code"
          type="text"
          onChange={checkformik.handleChange}
          onBlur={checkformik.handleBlur}
          value={checkformik.values.code || ""}
          invalid={
            checkformik.touched.code && checkformik.errors.code ? true : false
          }
        />
        {checkformik.touched.code && checkformik.errors.code ? (
          <FormFeedback type="invalid">{checkformik.errors.code}</FormFeedback>
        ) : null}
      </div>

      <div className="mb-3 d-grid">
        {/*<Col >*/}
        <button className="btn btn-primary btn-block" type="submit">
          인증코드 인증하기
        </button>
        {/*</Col>*/}
      </div>
    </Form>
  )
}

// 회원가입 폼
const RegistForm = ({ email }) => {
  // 이미지 업로드
  const [selectedFiles, setSelectedFiles] = useState([])

  const handleAcceptedFiles = files => {
    const formattedFiles = files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setSelectedFiles(formattedFiles)
    registerformik.setFieldValue("profileImg", formattedFiles)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const handleFileUpload = async files => {
    const fileUrls = []

    for (let file of files) {
      try {
        const formData = new FormData()
        formData.append("file", file)
        const res = await axios.post("http://localhost/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        fileUrls.push(res.data.fileUrl)
      } catch (e) {
        console.error("파일 업로드 실패", e)
      }
    }

    return fileUrls
  }

  // 제출
  const registerformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nickName: "",
      email,
      phone: "",
      profileImg: [],
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
    registerformikSchema: Yup.object({
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
      profileImg: Yup.array().min(1, "Please Upload Your Images"),
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
      const fileUrls = handleFileUpload(values.profileImg)

      // const formData = new FormData()
      // values.selectedFiles.forEach(file => {
      //   formData.append("files", file)
      // })

      const userInput = {
        email,
        nickName: values.nickName,
        userName: values.nickName,
        password: values.password,
        profileImg: ["https://example.com/profile1.jpg"],
        // profileImg: fileUrls,
        phone: values.phone,
        consent: values.consent,
      }
      console.log("유저인풋", userInput)
      try {
        const url = "http://localhost/api/auth/signup"
        const res = await axios.post(url, userInput)
        console.log("res", res)
        // if (res.status === 201) {
        //   alert("회원가입 성공")
        //   navigate("/login")
        // }
      } catch (e) {
        console.log("회원가입 제출 에러", e)
      }
    },
  })

  // 전체체크
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
  const handleSingleCheck = (checked, key) => {
    registerformik.setFieldValue(`consent.${key}`, checked)

    const allChecked = Object.values({
      ...registerformik.values.consent,
      [key]: checked,
    }).every(Boolean)

    document.getElementById("select-all").checked = allChecked
  }

  const handleAllCheck = checked => {
    const updatedConsent = agreements.reduce((acc, cur) => {
      acc[cur.key] = checked
      return acc
    }, {})
    registerformik.setFieldValue("consent", updatedConsent)
  }

  return (
    <Form
      className="form-horizontal p-2"
      onSubmit={registerformik.handleSubmit}
    >
      {/* <div className="mb-3">
        <Label className="form-label">Email</Label>
        <Input
          id="email"
          name="email"
          className="form-control"
          placeholder={email}
          type="email"
          onChange={registerformik.handleChange}
          onBlur={registerformik.handleBlur}
          value={registerformik.values.email || ""}
          invalid={
            registerformik.touched.email && registerformik.errors.email
              ? true
              : false
          }
        />
        {registerformik.touched.email && registerformik.errors.email ? (
          <FormFeedback type="invalid">
            {registerformik.errors.email}
          </FormFeedback>
        ) : null}
      </div> */}

      <div className="mb-3">
        <Label className="form-label">Nickname</Label>
        <Input
          name="nickName"
          type="text"
          placeholder="Enter nickname"
          onChange={registerformik.handleChange}
          onBlur={registerformik.handleBlur}
          value={registerformik.values.nickName || ""}
          invalid={
            registerformik.touched.nickName && registerformik.errors.nickName
              ? true
              : false
          }
        />
        {registerformik.touched.nickName && registerformik.errors.nickName ? (
          <FormFeedback type="invalid">
            {registerformik.errors.nickName}
          </FormFeedback>
        ) : null}
      </div>

      <div className="mb-3">
        <Label className="form-label">Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={registerformik.handleChange}
          onBlur={registerformik.handleBlur}
          value={registerformik.values.password || ""}
          invalid={
            registerformik.touched.password && registerformik.errors.password
              ? true
              : false
          }
        />
        {registerformik.touched.password && registerformik.errors.password ? (
          <FormFeedback type="invalid">
            {registerformik.errors.password}
          </FormFeedback>
        ) : null}
      </div>

      <div className="mb-3">
        <Label className="form-label">Password Confirm</Label>
        <Input
          name="passwordconfirm"
          type="password"
          placeholder="Enter Password"
          onChange={registerformik.handleChange}
          onBlur={registerformik.handleBlur}
          value={registerformik.values.passwordconfirm || ""}
          invalid={
            registerformik.touched.passwordconfirm &&
            registerformik.errors.passwordconfirm
              ? true
              : false
          }
        />
        {registerformik.touched.passwordconfirm &&
        registerformik.errors.passwordconfirm ? (
          <FormFeedback type="invalid">
            {registerformik.errors.passwordconfirm}
          </FormFeedback>
        ) : null}
      </div>

      <div className="mb-3">
        <Label className="form-label">Phone</Label>
        <Input
          name="phone"
          type="tel"
          placeholder="01012345678"
          onChange={registerformik.handleChange}
          onBlur={registerformik.handleBlur}
          value={registerformik.values.phone || ""}
          invalid={
            registerformik.touched.phone && registerformik.errors.phone
              ? true
              : false
          }
        />
        {registerformik.touched.phone && registerformik.errors.phone ? (
          <FormFeedback type="invalid">
            {registerformik.errors.phone}
          </FormFeedback>
        ) : null}
      </div>

      <label className="form-label fw-bold">Images</label>
      <Dropzone
        onDrop={acceptedFiles => {
          handleAcceptedFiles(acceptedFiles) // 선택한 파일을 handleAcceptedFiles로 처리
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone">
            <div className="dz-message needsclick mt-2" {...getRootProps()}>
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
                    <Link to="#" className="text-muted font-weight-bold">
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
                checked={Object.values(registerformik.values.consent).every(
                  Boolean
                )}
              />
              <label htmlFor="select-all" className="form-check-label">
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
                  checked={registerformik.values.consent[item.key]}
                  onChange={e => handleSingleCheck(e.target.checked, item.key)}
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

          {registerformik.touched.consent &&
            Object.keys(registerformik.errors.consent || {}).some(
              key =>
                ["overTwenty", "agreeOfTerm", "agreeOfPersonalInfo"].includes(
                  key
                ) && registerformik.errors.consent[key]
            ) && (
              <div className="text-danger mt-2">
                Please agree to all the required terms.
              </div>
            )}
        </Col>
      </Row>

      <div className="mt-4 d-grid">
        <button className="btn btn-primary btn-block" type="submit">
          Register
        </button>
      </div>
    </Form>
  )
}

const Register = props => {
  //meta title
  document.title = "Register | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [checkedEmail, setCheckedEmail] = useState(false)

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
                <CardBody className="pt-2">
                  <EmailSendForm
                    email={email}
                    setEmail={setEmail}
                    setCheckedEmail={setCheckedEmail}
                  />

                  {checkedEmail && (
                    <EmailCheckForm
                      email={email}
                      setCheckedEmail={setCheckedEmail}
                    />
                  )}

                  <RegistForm email={email} />
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
      <ToastContainer />
    </React.Fragment>
  )
}

export default Register
