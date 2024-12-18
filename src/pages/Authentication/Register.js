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
import { apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"

import { Link, useNavigate } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
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
        <Label className="form-label">이메일</Label>
        <Input
          name="email"
          className="form-control"
          placeholder="이메일"
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
        <button className="btn btn-primary btn-block fs-5" type="submit">
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
        <Label className="form-label">
          이메일로 받은 인증코드를 입력해주세요
        </Label>
        <Input
          name="code"
          className="form-control"
          placeholder="인증코드 6자리"
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
        <button className="btn btn-primary btn-block fs-5" type="submit">
          인증코드 인증하기
        </button>
        {/*</Col>*/}
      </div>
    </Form>
  )
}

// 회원가입 폼
const RegistForm = ({ email }) => {
  const registerformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nickName: "",
      email,
      phone: "",
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
        email,
        nickName: values.nickName,
        userName: values.nickName,
        password: values.password,
        phone: values.phone,
        consent: values.consent,
      }
      console.log("유저인풋", userInput)
      try {
        const url = "http://localhost/api/auth/signup"
        const res = await axios.post(url, userInput)
        console.log("res", res)
        if (res.status === 201) {
          alert("회원가입 성공")
          navigate("/login")
        }
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
      <div className="mb-3">
        <Label className="form-label">
          닉네임
          <div
            className="text-secondary "
            style={{ opacity: "0.5", fontSize: "0.75rem" }}
          >
            다른유저와 겹치지 않도록 입력해주세요. (2~20자)
          </div>
        </Label>
        <Input
          name="nickName"
          type="text"
          placeholder="별명 (2~20자)"
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
        <Label className="form-label">
          비밀번호
          <div
            className="text-secondary "
            style={{ opacity: "0.5", fontSize: "0.75rem" }}
          >
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </div>
        </Label>
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
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
        <Label className="form-label">비밀번호 확인</Label>
        <Input
          name="passwordconfirm"
          type="password"
          placeholder="비밀번호 확인"
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
        <Label className="form-label">전화번호</Label>
        <Input
          name="phone"
          type="tel"
          placeholder="전화번호"
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

      <Row>
        <Col xl={12}>
          <label className="form-label fw-bold">약관동의</label>
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
                전체 선택{" "}
                <span
                  className="text-secondary "
                  style={{ opacity: "0.5", fontSize: "0.75rem" }}
                >
                  선택항목에 대한 동의 포함
                </span>
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
        <button className="btn btn-primary btn-block fs-5" type="submit">
          회원가입하기
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
                        <h5 className="text-primary">회원가입</h5>
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
                  이미 아이디가 있으신가요?{" "}
                  <Link
                    to="/login"
                    className="font-weight-medium text-primary text-decoration-underline fw-bold"
                  >
                    {" "}
                    로그인
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
