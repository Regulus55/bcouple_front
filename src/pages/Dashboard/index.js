import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Table,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import classnames from "classnames"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Images
import img1 from "../../assets/images/product/img-1.png"
import img7 from "../../assets/images/product/img-7.png"
import Dropzone from "react-dropzone"
import axios from "axios"

const bloodTypeOptionGroup = [
  {
    label: "BloodType",
    options: [
      { label: "A형", value: "A형" },
      { label: "B형", value: "B형" },
      { label: "AB형", value: "AB형" },
      { label: "O형", value: "O형" },
    ],
  },
]
const mbtiTypeOptionGroup = [
  { label: "ENFP", value: "ENFP" },
  { label: "ENFJ", value: "ENFJ" },
  { label: "ENTP", value: "ENTP" },
  { label: "ENTJ", value: "ENTJ" },
]

const orderSummary = [
  {
    id: 1,
    img: img1,
    productTitle: "Half sleeve T-shirt (64GB)",
    price: 450,
    qty: 1,
  },
  { id: 2, img: img7, productTitle: "Wireless Headphone", price: 225, qty: 1 },
]

const Dashboard = () => {
  //meta title
  document.title = "Checkout | Skote - React Admin & Dashboard Template"

  const [activeTab, setActiveTab] = useState("1")
  const [textareabadge, settextareabadge] = useState(0)
  const [selectedGroup, setselectedGroup] = useState(null)
  const [selectedMulti, setselectedMulti] = useState(null)
  const [educationLevel, setEducationLevel] = useState([])

  // 데이트하고싶은거 버튼
  const wannaDoWithYou = [
    { label: "slideshow", value: "TV 보기", index: 0 },
    { label: "walk", value: "산책", index: 1 },
    { label: "slideshow", value: "TV 보기", index: 2 },
    { label: "walk", value: "산책", index: 3 },
    { label: "slideshow", value: "TV 보기", index: 4 },
    { label: "walk", value: "산책", index: 5 },
    { label: "slideshow", value: "TV 보기", index: 6 },
    { label: "walk", value: "산책", index: 7 },
    { label: "slideshow", value: "TV 보기", index: 8 },
    { label: "walk", value: "산책", index: 9 },
    { label: "slideshow", value: "TV 보기", index: 10 },
    { label: "walk", value: "산책", index: 11 },
    { label: "slideshow", value: "TV 보기", index: 12 },
    { label: "walk", value: "산책", index: 13 },
    { label: "slideshow", value: "TV 보기", index: 14 },
    { label: "walk", value: "산책", index: 15 },
    { label: "slideshow", value: "TV 보기", index: 16 },
    { label: "walk", value: "산책", index: 17 },
  ]
  const [isActive, setIsActive] = useState({})
  const handleToggle = value => {
    setIsActive(
      Object.values(isActive).reduce((a, item) => a + item, 0) < 5
        ? prevState => ({
            ...prevState,
            [value]: !prevState[value],
          })
        : console.log(value)
    )
  }

  // 텍스트 에어리어
  const [textcount, settextcount] = useState(0)

  function textareachange(event) {
    const count = event.target.value.length
    if (count > 0) {
      settextareabadge(true)
    } else {
      settextareabadge(false)
    }
    settextcount(event.target.value.length)
  }

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti)
  }

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

  // 기본정보
  const basicInfoFormik = useFormik({
    initialValues: {
      birth: "1970-01-01",
      height: 160,
      weight: 60,
      bornArea: "",
      country: "",
      addressOfHome: "",
      activityArea: "",
      bloodType: "",
      bodyType: "",
      mbtiType: "",
      smoking: "",
      selfIntroduce: "",
    },
    validationSchema: Yup.object({
      birth: Yup.date()
        .required("This field is required")
        .typeError("Invalid date format"),
      height: Yup.number()
        .required("This field is required")
        .typeError("Height must be a number"),
      weight: Yup.number()
        .required("This field is required")
        .typeError("Weight must be a number"),
      bornArea: Yup.string().required("This field is required"),
      country: Yup.string().required("This field is required"),
      addressOfHome: Yup.string().required("This field is required"),
      activityArea: Yup.string().required("This field is required"),
      bloodType: Yup.string().required("This field is required"),
      bodyType: Yup.number().required("This field is required"),
      mbtiType: Yup.string().required("This field is required"),
      smoking: Yup.boolean().required("This field is required"),
      selfIntroduce: Yup.string().required("This field is required"),
    }),
    onSubmit: async values => {
      const currentYear = new Date().getFullYear()
      const birthYear = parseInt(values.birth.split("-")[0], 10)
      const age = currentYear - birthYear

      const userInput = {
        birth: values.birth,
        age,
        height: values.height,
        weight: values.weight,
        bornArea: values.bornArea,
        country: values.country,
        addressOfHome: values.addressOfHome,
        activityArea: values.activityArea,
        bloodType: values.bloodType,
        bodyType: parseInt(values.bodyType, 10),
        mbtiType: values.mbtiType,
        drinking: values.drinking,
        smoking: values.smoking === "true" || values.smoking === true,
        selfIntroduce: values.selfIntroduce,
      }
      console.log("기본정보 userinput", userInput)
      // console.log("기본정보 values", values)

      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const url = "http://localhost/api/profile"
        const res = await axios.post(url, userInput, config)
        console.log("기본정보 res", res)
        if (res.status === 201) {
          alert("기본정보 저장 성공")
        }
      } catch (e) {
        console.log(e)
        if (e?.response?.data?.message?.includes("already")) {
          alert("이미 프로파일이 존재합니다")
        }
      }
    },
  })

  //Floating labels forms
  const floatingformik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required"),
    }),

    onSubmit: values => {
      console.log("valuesssssdsssss", values)
    },
  })

  // 결혼
  const marriageformik = useFormik({
    initialValues: {
      mExperience: "",
      reasonForDivorce: "",
      childrenInfo: [],
    },
    validationSchema: Yup.object({
      mExperience: Yup.string().required("Marriage experience is required"),
      reasonForDivorce: Yup.string().required("Reason for divorce is required"),
      childrenInfo: Yup.array()
        .of(
          Yup.object().shape({
            childrenGender: Yup.string().required(
              "Children gender is required"
            ),
            childrenBirth: Yup.string().required(
              "Children birth year is required"
            ),
            parentingStatus: Yup.string().required(
              "Parenting status is required"
            ),
          })
        )
        .min(1, "At least one child is required"),
    }),
    onSubmit: values => {
      console.log("결혼 관련 values", values)
    },
  })

  const addChild = () => {
    marriageformik.setFieldValue("childrenInfo", [
      ...marriageformik.values.childrenInfo,
      {},
    ])
  }

  const removeChild = index => {
    const updatedChildren = marriageformik.values.childrenInfo.filter(
      (_, i) => i !== index
    )
    marriageformik.setFieldValue("childrenInfo", updatedChildren)
  }

  useEffect(() => {
    console.log("adfasdfasdfqerqwerqwer", marriageformik.values.childrenInfo)
  }, [marriageformik.values.childrenInfo])

  // 학력
  const handleEducationChange = e => {
    const value = e.target.value
    educationformik.handleChange(e)

    let numberOfFields = 0
    if (value === "1") {
      numberOfFields = 1
    } else if (["2", "3", "4", "5"].includes(value)) {
      numberOfFields = 2
    } else if (value === "6") {
      numberOfFields = 3
    }

    const newFields = Array(numberOfFields)
      .fill(null)
      .map((_, index) => ({
        finaledu: value,
        educationLevels: [],
        //  schoolname: "",
        // major: "",
        // location: "",
        // type: "",
        // status: "",
      }))

    setEducationLevel(newFields)
  }
  const removeEducationLevel = index => {
    const updatedEducationLevel = educationLevel.filter((_, i) => i !== index)
    setEducationLevel(updatedEducationLevel)
  }

  useEffect(() => {
    educationformik.setFieldValue("educationLevels", educationLevel)
  }, [educationLevel])

  const educationformik = useFormik({
    initialValues: {
      finaledu: "",
      schoolname: "",
      major: "",
      location: "",
      type: "",
      status: "",
    },
    validationSchema: Yup.object({
      finaledu: Yup.string().required("Final education level is required"),
      schoolname: Yup.string().required("School name is required"),
      major: Yup.string().required("Major is required"),
      location: Yup.string().required("Campus location is required"),
      type: Yup.string().required("Education type is required"),
      status: Yup.string().required("Graduation status is required"),
    }),

    onSubmit: values => {
      console.log("학력 values", values)
    },
  })

  // 종교
  const religionformik = useFormik({
    initialValues: {
      religionName: "",
      attendanceAtReligious: "",
    },
    validationSchema: Yup.object({
      religionName: Yup.string().required("Religion name is required"),
      attendanceAtReligious: Yup.string().required(
        "Attendance status is required"
      ),
    }),

    onSubmit: values => {
      console.log("종교 values", values)
    },
  })

  // 직업
  const jobformik = useFormik({
    initialValues: {
      jobName: "",
      workplace: "",
      roleAtWork: "",
      addressOfCompany: "",
      salary: 0,
      additionalIncome: 0,
      annualIncome: 0,
    },
    validationSchema: Yup.object({
      jobName: Yup.string().required("Job name is required"),
      workplace: Yup.string().required("Workplace is required"),
      roleAtWork: Yup.string().required("Role at work is required"),
      addressOfCompany: Yup.string().required("Company address is required"),
      salary: Yup.number()
        .required("Salary is required")
        .min(0, "Salary cannot be negative"),
      additionalIncome: Yup.number()
        .required("Salary is required")
        .min(0, "Salary cannot be negative"),
      annualIncome: Yup.number()
        .required("Annual income is required")
        .min(0, "Annual income cannot be negative"),
    }),

    onSubmit: values => {
      console.log("직업 values", values)
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboard" breadcrumbItem="Profile" />

          <div className="checkout-tabs">
            <Row>
              <Col xl={3} sm={4}>
                <Nav className="flex-column" pills>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        setActiveTab("1")
                      }}
                    >
                      <i className="bx bxs-truck d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">기본정보 / 결혼 / 종교관련</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        setActiveTab("2")
                      }}
                    >
                      <i className="bx bx-money d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">학력관련 / 직업 / 소득수준</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        setActiveTab("3")
                      }}
                    >
                      <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">자기소개 / 이상형 인터뷰</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        setActiveTab("4")
                      }}
                    >
                      <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">비커플 인터뷰</p>
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "5" })}
                      onClick={() => {
                        setActiveTab("5")
                      }}
                    >
                      <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">증빙서류 업로드</p>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>

              <Col xl={9} sm={8}>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          기본 프로필
                        </CardTitle>

                        <Form onSubmit={basicInfoFormik.handleSubmit}>
                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="country"
                                  value={basicInfoFormik.values.select}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                >
                                  <option defaultValue="0">
                                    Open this select Country
                                  </option>
                                  <option value="1">한국</option>
                                  <option value="2">일본</option>
                                  <option value="3">미국</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">국적</label>
                                <div>
                                  {basicInfoFormik.errors.select &&
                                  basicInfoFormik.touched.select ? (
                                    <span className="text-danger">
                                      {basicInfoFormik.errors.select}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="date"
                                  name="birth"
                                  className="form-control"
                                  id="floatingemailInput"
                                  placeholder="Enter Email address"
                                  value={basicInfoFormik.values.birth}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                                <label htmlFor="floatingemailInput">
                                  생년월일
                                </label>
                                {basicInfoFormik.errors.birth &&
                                basicInfoFormik.touched.birth ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.birth}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="height"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="Enter Name"
                                  value={basicInfoFormik.values.height}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">키</label>
                                {basicInfoFormik.errors.height &&
                                basicInfoFormik.touched.height ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.height}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="weight"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="Enter Name"
                                  value={basicInfoFormik.values.weight}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  몸무게(선택)
                                </label>
                                {basicInfoFormik.errors.weight &&
                                basicInfoFormik.touched.weight ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.weight}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={basicInfoFormik.values.bornArea}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  태어나거나 성장한 지역
                                </label>
                                {basicInfoFormik.errors.bornArea &&
                                basicInfoFormik.touched.bornArea ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.bornArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>

                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="addressOfHome"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder=""
                                  value={basicInfoFormik.values.addressOfHome}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  현재 거주지 주소
                                </label>
                                {basicInfoFormik.errors.addressOfHome &&
                                basicInfoFormik.touched.addressOfHome ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.addressOfHome}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="activityArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder=""
                                  value={basicInfoFormik.values.activityArea}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  주 활동 지역
                                </label>
                                {basicInfoFormik.errors.activityArea &&
                                basicInfoFormik.touched.activityArea ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.activityArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="bloodType"
                                  value={basicInfoFormik.values.bloodType}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                >
                                  <option defaultValue="0">
                                    Open this select your Blood Type
                                  </option>
                                  <option value="1">A형</option>
                                  <option value="2">B형</option>
                                  <option value="3">AB형</option>
                                  <option value="3">O형</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">
                                  혈액형
                                </label>
                                <div>
                                  {basicInfoFormik.errors.bloodType &&
                                  basicInfoFormik.touched.bloodType ? (
                                    <span className="text-danger">
                                      {basicInfoFormik.errors.bloodType}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>

                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="mbtiType"
                                  value={basicInfoFormik.values.mbtiType}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                >
                                  <option defaultValue="0">
                                    Open this select your Blood Type
                                  </option>
                                  {mbtiTypeOptionGroup.map((mbti, index) => (
                                    <option value={mbti.value} key={index}>
                                      {mbti.value}
                                    </option>
                                  ))}
                                </select>
                                <label htmlFor="floatingSelectGrid">MBTI</label>
                                <div>
                                  {basicInfoFormik.errors.mbtiType &&
                                  basicInfoFormik.touched.mbtiType ? (
                                    <span className="text-danger">
                                      {basicInfoFormik.errors.mbtiType}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="drinking"
                                  value={basicInfoFormik.values.drinking}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                >
                                  <option defaultValue="0">
                                    Open this select your Drinking Information
                                  </option>
                                  <option value={"1"}>아예 안마심</option>
                                  <option value={"2"}>가끔 한두잔</option>
                                  <option value={"3"}>주에 한번</option>
                                  <option value={"4"}>주에 두번 이상</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">
                                  음주여부
                                </label>
                                <div>
                                  {basicInfoFormik.errors.drinking &&
                                  basicInfoFormik.touched.drinking ? (
                                    <span className="text-danger">
                                      {basicInfoFormik.errors.drinking}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>

                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="smoking"
                                  value={basicInfoFormik.values.smoking}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                >
                                  <option defaultValue="">
                                    Open this select your Smoking Status
                                  </option>
                                  <option value={true}>흡연자</option>
                                  <option value={false}>비흡연자</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">
                                  흡연여부
                                </label>
                                <div>
                                  {basicInfoFormik.errors.smoking &&
                                  basicInfoFormik.touched.smoking ? (
                                    <span className="text-danger">
                                      {basicInfoFormik.errors.smoking}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="bodyType"
                                  value={basicInfoFormik.values.bodyType}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                >
                                  <option defaultValue="">
                                    Open this select your Body Type
                                  </option>
                                  <option value={"0"}>마름</option>
                                  <option value={"1"}>슬림</option>
                                  <option value={"2"}>보통</option>
                                  <option value={"3"}>볼륨</option>
                                  <option value={"4"}>근육</option>
                                  <option value={"5"}>통통</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">체형</label>
                                <div>
                                  {basicInfoFormik.errors.bodyType &&
                                  basicInfoFormik.touched.bodyType ? (
                                    <span className="text-danger">
                                      {basicInfoFormik.errors.bodyType}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={12}>
                              <div className="mt-3">
                                <Label>
                                  회원님의 간략한 소개를 적어주세요.
                                </Label>
                                <Input
                                  type="textarea"
                                  name="selfIntroduce"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="자기소개"
                                  value={basicInfoFormik.values.selfIntroduce}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                              </div>
                            </Col>
                          </Row>

                          {/* <Row>
                            <Col xl={12}>
                              <div className="form-floating mt-3">
                                <Input
                                  type="text"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={basicInfoFormik.values.bornArea}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  매칭에서 거절할 전화번호 (ex. 3개까지 등록
                                  가능)
                                </label>
                                {basicInfoFormik.errors.bornArea &&
                                basicInfoFormik.touched.bornArea ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.bornArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row> */}

                          <div className={"mt-3"}>
                            <button
                              type="submit"
                              className="btn btn-primary w-md"
                              onClick={console.log("클릭됨")}
                            >
                              기본 프로필 저장
                            </button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          결혼관련
                        </CardTitle>

                        <Form onSubmit={marriageformik.handleSubmit}>
                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="mExperience"
                                  value={marriageformik.values.mExperience}
                                  onChange={marriageformik.handleChange}
                                  onBlur={marriageformik.handleBlur}
                                >
                                  <option value="">
                                    Open this select your marriage info
                                  </option>
                                  <option value="1">이혼</option>
                                  <option value="2">사별</option>
                                  <option value="3">미혼</option>
                                </select>

                                <label htmlFor="reasonForDivorce">
                                  이혼 사유
                                </label>

                                {marriageformik.errors.mExperience &&
                                marriageformik.touched.mExperience ? (
                                  <span className="text-danger">
                                    {marriageformik.errors.mExperience}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="reasonForDivorce"
                                  className="form-control"
                                  placeholder="Reason for Divorce"
                                  value={marriageformik.values.reasonForDivorce}
                                  onChange={marriageformik.handleChange}
                                  onBlur={marriageformik.handleBlur}
                                />
                                <label>이혼사유</label>
                                {marriageformik.errors.reasonForDivorce &&
                                marriageformik.touched.reasonForDivorce ? (
                                  <span className="text-danger">
                                    {marriageformik.errors.reasonForDivorce}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={9}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="childrenInfo"
                                  value={marriageformik.values.childrenInfo}
                                  onChange={e => {
                                    const value = e.target.value
                                    marriageformik.setFieldValue(
                                      "childrenInfo",
                                      value === "1" ? [{}] : []
                                    )
                                  }}
                                  onBlur={marriageformik.handleBlur}
                                >
                                  <option value="">Select Children</option>
                                  <option value="1">있음</option>
                                  <option value="2">없음</option>
                                </select>
                                <label htmlFor="childrenInfo">자녀 여부</label>
                                {/* {marriageformik.errors.childrenInfo &&
                                marriageformik.touched.childrenInfo ? (
                                  <span className="text-danger">
                                    {marriageformik.errors.childrenInfo}
                                  </span>
                                ) : null} */}
                              </div>
                            </Col>

                            <Col xl={3}>
                              <button
                                type="button"
                                disabled={
                                  marriageformik.values.childrenInfo === "1"
                                    ? true
                                    : false
                                }
                                onClick={addChild}
                                className="btn btn-primary w-100"
                              >
                                + 추가하기
                              </button>
                            </Col>
                          </Row>

                          {marriageformik.values.childrenInfo.map(
                            (child, index) => (
                              <Row key={index}>
                                <Col xl={3}>
                                  <div className="form-floating mb-3">
                                    <label>자녀 성별</label>
                                    <select
                                      className="form-select"
                                      name={`childrenInfo[${index}].childrenGender`}
                                      value={child.childrenGender || ""}
                                      onChange={marriageformik.handleChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="1">남자</option>
                                      <option value="2">여자</option>
                                    </select>
                                  </div>
                                </Col>

                                <Col xl={3}>
                                  <div className="form-floating mb-3">
                                    <label>자녀 출생연도</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name={`childrenInfo[${index}].childrenBirth`}
                                      value={child.childrenBirth || ""}
                                      onChange={marriageformik.handleChange}
                                    />
                                  </div>
                                </Col>

                                <Col xl={3}>
                                  <div className="form-floating mb-3">
                                    <label>양육 여부</label>
                                    <select
                                      className="form-select"
                                      name={`childrenInfo[${index}].parentingStatus`}
                                      value={child.parentingStatus || ""}
                                      onChange={marriageformik.handleChange}
                                    >
                                      <option value="">Select</option>
                                      <option value="1">직접양육</option>
                                      <option value="2">배우자가 양육</option>
                                    </select>
                                  </div>
                                </Col>

                                <Col xl={3}>
                                  <button
                                    type="button"
                                    onClick={() => removeChild(index)}
                                    className="btn btn-danger w-100"
                                  >
                                    - 삭제하기
                                  </button>
                                </Col>
                              </Row>
                            )
                          )}

                          <button
                            type="submit"
                            className="btn btn-primary w-md"
                          >
                            결혼 관련 저장
                          </button>
                        </Form>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          종교관련
                        </CardTitle>

                        <Form onSubmit={religionformik.handleSubmit}>
                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-2">
                                <select
                                  className="form-select"
                                  name="religionName"
                                  value={religionformik.values.religionName}
                                  onChange={religionformik.handleChange}
                                  onBlur={religionformik.handleBlur}
                                >
                                  <option defaultValue="0">
                                    Open this select your religion
                                  </option>
                                  <option value="1">개신교</option>
                                  <option value="2">천주교</option>
                                  <option value="3">불교</option>
                                  <option value="4">무교</option>
                                  <option value="5">기타</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">
                                  종교 선택
                                </label>
                                <div>
                                  {religionformik.errors.religionName &&
                                  religionformik.touched.religionName ? (
                                    <span className="text-danger">
                                      {religionformik.errors.religionName}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={12}>
                              <div className="form-floating">
                                <select
                                  className="form-select"
                                  name="attendanceAtReligious"
                                  value={
                                    religionformik.values.attendanceAtReligious
                                  }
                                  onChange={religionformik.handleChange}
                                  onBlur={religionformik.handleBlur}
                                >
                                  <option defaultValue="0">
                                    Open this select attendance at religious
                                  </option>
                                  <option value="1">매주 출석</option>
                                  <option value="2">때때로 출석</option>
                                  <option value="3">출석하지 않음</option>
                                  <option value="3">해당사항 없음</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">
                                  출석 상황
                                </label>
                                <div>
                                  {religionformik.errors
                                    .attendanceAtReligious &&
                                  religionformik.touched
                                    .attendanceAtReligious ? (
                                    <span className="text-danger">
                                      {
                                        religionformik.errors
                                          .attendanceAtReligious
                                      }
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <div className={"mt-3"}>
                            <button
                              type="submit"
                              className="btn btn-primary w-md"
                            >
                              종교 관련 저장
                            </button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </TabPane>

                  <TabPane tabId="2" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          학력관련
                        </CardTitle>

                        <Form onSubmit={educationformik.handleSubmit}>
                          <Row>
                            <Col xl={9}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="finaledu"
                                  value={educationformik.values.finaledu}
                                  onChange={handleEducationChange} // 변경된 함수
                                  onBlur={educationformik.handleBlur}
                                >
                                  <option value="">
                                    Select your education level
                                  </option>
                                  <option value="1">고등학교</option>
                                  <option value="2">대학교(2년제)</option>
                                  <option value="3">대학교(3년제)</option>
                                  <option value="4">
                                    방송통신대학/사이버대학
                                  </option>
                                  <option value="5">대학교(4년제)</option>
                                  <option value="6">대학원</option>
                                </select>

                                <label htmlFor="floatingSelectGrid">
                                  최종학력
                                </label>
                                <div>
                                  {educationformik.errors.finaledu &&
                                  educationformik.touched.finaledu ? (
                                    <span className="text-danger">
                                      {educationformik.errors.finaledu}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>

                            <Col xl={3}>
                              <button
                                type="button"
                                onClick={() =>
                                  setEducationLevel([...educationLevel, "1"])
                                }
                                className="btn btn-primary w-100"
                              >
                                +<div>추가하기</div>
                              </button>
                            </Col>
                          </Row>

                          {educationLevel.map((edu, index) => (
                            <div key={index}>
                              <Row>
                                <Col xl={4}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="text"
                                      name={`educationLevel[${index}].schoolname`}
                                      className="form-control"
                                      placeholder="School Name"
                                      value={edu.schoolname}
                                      onChange={e => {
                                        const updatedFields = [
                                          ...educationLevel,
                                        ]
                                        updatedFields[index].schoolname =
                                          e.target.value
                                        setEducationLevel(updatedFields)
                                      }}
                                    />
                                    <label>학교 이름</label>
                                  </div>
                                </Col>

                                <Col xl={4}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="text"
                                      name={`educationLevel[${index}].major`}
                                      className="form-control"
                                      placeholder="Major"
                                      value={edu.major}
                                      onChange={e => {
                                        const updatedFields = [
                                          ...educationLevel,
                                        ]
                                        updatedFields[index].major =
                                          e.target.value
                                        setEducationLevel(updatedFields)
                                      }}
                                    />
                                    <label>전공</label>
                                  </div>
                                </Col>

                                <Col xl={4}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="text"
                                      name={`educationLevel[${index}].location`}
                                      className="form-control"
                                      placeholder="Campus Location"
                                      value={edu.location}
                                      onChange={e => {
                                        const updatedFields = [
                                          ...educationLevel,
                                        ]
                                        updatedFields[index].location =
                                          e.target.value
                                        setEducationLevel(updatedFields)
                                      }}
                                    />
                                    <label>캠퍼스 위치</label>
                                  </div>
                                </Col>

                                <Col xl={5}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name={`educationLevel[${index}].type`}
                                      value={edu.type}
                                      onChange={e => {
                                        const updatedFields = [
                                          ...educationLevel,
                                        ]
                                        updatedFields[index].type =
                                          e.target.value
                                        setEducationLevel(updatedFields)
                                      }}
                                    >
                                      <option value="">
                                        Select Education Type
                                      </option>
                                      <option value="1">고등학교 졸업</option>
                                      <option value="2">대학 중퇴</option>
                                      <option value="3">전문대 졸업</option>
                                    </select>
                                    <label>학력 구분</label>
                                  </div>
                                </Col>

                                <Col xl={5}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name={`educationLevel[${index}].status`}
                                      value={edu.status}
                                      onChange={e => {
                                        const updatedFields = [
                                          ...educationLevel,
                                        ]
                                        updatedFields[index].status =
                                          e.target.value
                                        setEducationLevel(updatedFields)
                                      }}
                                    >
                                      <option value="">
                                        Select Graduation Status
                                      </option>
                                      <option value="1">졸업</option>
                                      <option value="2">재학</option>
                                      <option value="3">자퇴</option>
                                    </select>
                                    <label>졸업 구분</label>
                                  </div>
                                </Col>

                                <Col xl={2}>
                                  <button
                                    type="button"
                                    className="btn btn-danger w-100"
                                    onClick={() => removeEducationLevel(index)}
                                  >
                                    -<div>삭제하기</div>
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          ))}

                          <div>
                            <button
                              type="submit"
                              className="btn btn-primary w-md"
                            >
                              학력관련 저장
                            </button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          직업관련
                        </CardTitle>

                        <Form onSubmit={jobformik.handleSubmit}>
                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="jobName"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={jobformik.values.jobName}
                                  onChange={jobformik.handleChange}
                                  onBlur={jobformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">직업</label>
                                {jobformik.errors.jobName &&
                                jobformik.touched.jobName ? (
                                  <span className="text-danger">
                                    {jobformik.errors.jobName}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="workplace"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="workplace"
                                  value={jobformik.values.workplace}
                                  onChange={jobformik.handleChange}
                                  onBlur={jobformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  직장명
                                </label>
                                {jobformik.errors.workplace &&
                                jobformik.touched.workplace ? (
                                  <span className="text-danger">
                                    {jobformik.errors.workplace}
                                  </span>
                                ) : null}
                              </div>
                            </Col>

                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="roleAtWork"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="roleAtWork"
                                  value={jobformik.values.roleAtWork}
                                  onChange={jobformik.handleChange}
                                  onBlur={jobformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">직급</label>
                                {jobformik.errors.roleAtWork &&
                                jobformik.touched.roleAtWork ? (
                                  <span className="text-danger">
                                    {jobformik.errors.roleAtWork}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="addressOfCompany"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="addressOfCompany"
                                  value={jobformik.values.addressOfCompany}
                                  onChange={jobformik.handleChange}
                                  onBlur={jobformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  직장주소
                                </label>
                                {jobformik.errors.addressOfCompany &&
                                jobformik.touched.addressOfCompany ? (
                                  <span className="text-danger">
                                    {jobformik.errors.addressOfCompany}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="salary"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="salary"
                                  value={jobformik.values.salary}
                                  onChange={jobformik.handleChange}
                                  onBlur={jobformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  연봉정보
                                </label>
                                {jobformik.errors.salary &&
                                jobformik.touched.salary ? (
                                  <span className="text-danger">
                                    {jobformik.errors.salary}
                                  </span>
                                ) : null}
                              </div>
                            </Col>

                            <Col xl={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="additionalIncome"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="additionalIncome"
                                  value={jobformik.values.additionalIncome}
                                  onChange={jobformik.handleChange}
                                  onBlur={jobformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  부가수입
                                </label>
                                {jobformik.errors.additionalIncome &&
                                jobformik.touched.additionalIncome ? (
                                  <span className="text-danger">
                                    {jobformik.errors.additionalIncome}
                                  </span>
                                ) : null}
                              </div>
                            </Col>

                            <Col xl={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="annualIncome"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="annualIncome"
                                  value={jobformik.values.annualIncome}
                                  onChange={jobformik.handleChange}
                                  onBlur={jobformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  총수입
                                </label>
                                {jobformik.errors.annualIncome &&
                                jobformik.touched.annualIncome ? (
                                  <span className="text-danger">
                                    {jobformik.errors.annualIncome}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <div className={"mt-3"}>
                            <button
                              type="submit"
                              className="btn btn-primary w-md"
                            >
                              직업 / 연소득관련 저장
                            </button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </TabPane>

                  <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle>이상형 인터뷰</CardTitle>

                        <Form onSubmit={floatingformik.handleSubmit}>
                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={floatingformik.values.bornArea}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  이상형 관련인터뷰 첫번째
                                </label>
                                {floatingformik.errors.bornArea &&
                                floatingformik.touched.bornArea ? (
                                  <span className="text-danger">
                                    {floatingformik.errors.bornArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={floatingformik.values.bornArea}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  하고 싶은 데이트 (ex. 금요일 밤에 야간 까페
                                  데이트)
                                </label>
                                {floatingformik.errors.bornArea &&
                                floatingformik.touched.bornArea ? (
                                  <span className="text-danger">
                                    {floatingformik.errors.bornArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={floatingformik.values.bornArea}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  취미 (ex. 캠핑, 영화보기, 자전거타기 등등)
                                </label>
                                {floatingformik.errors.bornArea &&
                                floatingformik.touched.bornArea ? (
                                  <span className="text-danger">
                                    {floatingformik.errors.bornArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <div className="form-floating mb-3 container-fluid">
                            <Row className="icon-demo-content gx-1">
                              {wannaDoWithYou.map((icon, index) => (
                                <Col xl={2} key={index} className="my-1">
                                  <div
                                    className="py-3 rounded-3 w-100 border-0"
                                    onClick={() => handleToggle(icon.index)}
                                    style={{
                                      backgroundColor: isActive[icon.index]
                                        ? "#D3D3D3"
                                        : "#F5F5F5",
                                    }}
                                  >
                                    <i
                                      className={`bx bx-${icon.label} mb-1`}
                                    ></i>
                                    {icon.value}
                                  </div>
                                </Col>
                              ))}
                              <Col xl={2} className="my-1"></Col>
                            </Row>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </TabPane>

                  <TabPane tabId="4" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          직업관련
                        </CardTitle>

                        <Form onSubmit={floatingformik.handleSubmit}>
                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={floatingformik.values.bornArea}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">직업</label>
                                {floatingformik.errors.bornArea &&
                                floatingformik.touched.bornArea ? (
                                  <span className="text-danger">
                                    {floatingformik.errors.bornArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={floatingformik.values.bornArea}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  연봉정보
                                </label>
                                {floatingformik.errors.bornArea &&
                                floatingformik.touched.bornArea ? (
                                  <span className="text-danger">
                                    {floatingformik.errors.bornArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>

                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={floatingformik.values.bornArea}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  부가수입
                                </label>
                                {floatingformik.errors.bornArea &&
                                floatingformik.touched.bornArea ? (
                                  <span className="text-danger">
                                    {floatingformik.errors.bornArea}
                                  </span>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <div className={"mt-3"}>
                            <button
                              type="submit"
                              className="btn btn-primary w-md"
                            >
                              직업 / 연소득관련 저장
                            </button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </TabPane>

                  <TabPane tabId="5" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle>증빙서류 업로드</CardTitle>

                        <Form onSubmit={floatingformik.handleSubmit}>
                          <Row>
                            <Col sm={12}>
                              <div className="mt-4">
                                <div>
                                  <Label
                                    htmlFor="formFileLg"
                                    className="form-label"
                                  >
                                    혼인증명서 (필수)
                                  </Label>
                                  <Input
                                    className="form-control form-control-lg"
                                    id="formFileLg"
                                    type="file"
                                  />
                                </div>
                              </div>
                            </Col>

                            <Col sm={12}>
                              <div className="mt-4">
                                <div>
                                  <Label
                                    htmlFor="formFileLg"
                                    className="form-label"
                                  >
                                    최종학력 졸업증명서 (필수)
                                  </Label>
                                  <Input
                                    className="form-control form-control-lg"
                                    id="formFileLg"
                                    type="file"
                                  />
                                </div>
                              </div>
                            </Col>

                            <Col sm={12}>
                              <div className="mt-4">
                                <div>
                                  <Label
                                    htmlFor="formFileLg"
                                    className="form-label"
                                  >
                                    재직증명서 또는 의료보험증 사본 (필수)
                                  </Label>
                                  <Input
                                    className="form-control form-control-lg"
                                    id="formFileLg"
                                    type="file"
                                  />
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <div className={"mt-3"}>
                            <button
                              type="submit"
                              className="btn btn-primary w-md"
                            >
                              증빙서류 업로드
                            </button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle>프로필 이미지 업로드</CardTitle>

                        <Form onSubmit={floatingformik.handleSubmit}>
                          <Row>
                            <Col sm={12}>
                              <CardSubtitle className="mb-3">
                                {" "}
                                회원님의 평상시 잘 나온 사진들을 업로드 자유롭게
                                업로드 해 주시면 됩니다. (최대 10장까지 가능)
                              </CardSubtitle>
                              <Form>
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
                                        <h4>
                                          Drop files here or click to upload.
                                        </h4>
                                      </div>
                                    </div>
                                  )}
                                </Dropzone>
                                <div
                                  className="dropzone-previews mt-3"
                                  id="file-previews"
                                >
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
                                                <strong>
                                                  {f.formattedSize}
                                                </strong>
                                              </p>
                                            </Col>
                                          </Row>
                                        </div>
                                      </Card>
                                    )
                                  })}
                                </div>
                              </Form>
                            </Col>
                          </Row>

                          <div className={"mt-3"}>
                            <button
                              type="button"
                              className="btn btn-primary w-md"
                            >
                              프로필 이미지 업로드
                            </button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
