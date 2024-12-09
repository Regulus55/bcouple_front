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
import Select from "react-select"
import Dropzone from "react-dropzone"

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
  const [haveChildren, setHaveChildren] = useState([])
  const [educationLevel, setEducationLevel] = useState([])
  const [haveChildButton, setHaveChildButton] = useState(false)

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

  // const [textareabadge, settextareabadge] = useState(false)
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

  //Inline forms
  const inlineformik = useFormik({
    initialValues: {
      username: "",
      select: "",
      check: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("This field is required"),
      select: Yup.string().required("This field is required"),
      check: Yup.string().required("This field is required"),
    }),

    onSubmit: values => {
      // console.log("valuessss", values);
    },
  })

  const validation = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      states: "",
      order: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter your Name"),
      email: Yup.string().email().required("Please Enter your Email Address"),
      phone: Yup.string().required("Please Enter your Phone"),
      address: Yup.string().required("Please Enter your Address"),
      country: Yup.string().required("Please Enter your Country Name"),
      states: Yup.string().required("Please Enter your States"),
      order: Yup.string().required("Please Enter your Order Note"),
    }),

    onSubmit: values => {
      // console.log('valuessssss',values)
    },
  })

  const fffffformik = useFormik({
    initialValues: {
      name: "",
      country: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required"),
      country: Yup.string().required("This field is required"),
    }),
    onSubmit: values => {
      console.log("valueddd", values)
    },
  })

  //Floating labels forms
  const basicInfoFormik = useFormik({
    initialValues: {
      // name: "",
      // email: "",
      birth: "1970-01-01",
      height: 160,
      weight: 60,
      bornArea: "",
      country: "",
      textarea: "",
      addressOfHome: "",
      activityArea: "",
      // select: "",
      bloodType: "",
      mbti: "",
    },
    validationSchema: Yup.object({
      // name: Yup.string().required("This field is required"),
      birth: Yup.string().required("This field is required"),
      height: Yup.string().required("This field is required"),
      weight: Yup.string().required("This field is required"),
      bornArea: Yup.string().required("This field is required"),
      country: Yup.string().required("This field is required"),
      textarea: Yup.string().required("This field is required"),
      // email: Yup.string()
      //   .email()
      //   .matches(/^(?!.*@[^,]*,)/)
      //   .required("Please Enter Your Email"),
      // select: Yup.string().required("This field is required"),
      addressOfHome: Yup.string().required("This field is required"),
      activityArea: Yup.string().required("This field is required"),
      bloodType: Yup.string().required("This field is required"),
      mbti: Yup.string().required("This field is required"),
    }),

    onSubmit: values => {
      console.log("valuesssssdsssss", values)
      console.log("크크킄")
    },
  })

  //Floating labels forms
  const floatingformik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birth: "1970-01-01",
      height: 160,
      weight: 60,
      bornArea: "",
      addressOfHome: "",
      activityArea: "",
      select: "",
      check: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required"),
      email: Yup.string()
        .email()
        .matches(/^(?!.*@[^,]*,)/)
        .required("Please Enter Your Email"),
      select: Yup.string().required("This field is required"),
      check: Yup.string().required("This field is required"),
    }),

    onSubmit: values => {
      console.log("valuesssssdsssss", values)
      console.log("크크킄")
    },
  })

  const marrigeformik = useFormik({
    initialValues: {
      marriged: "",
      divorce: "",
      children: "",
    },
    validationSchema: Yup.object({
      marriged: Yup.string().required("This field is required"),
      divorce: Yup.string().required("This field is required"),
      children: Yup.string().required("This field is required"),
    }),

    onSubmit: values => {
      console.log("valuesssssdsssss", values)
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
                                  value={basicInfoFormik.values.select}
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
                                  {basicInfoFormik.errors.select &&
                                  basicInfoFormik.touched.select ? (
                                    <span className="text-danger">
                                      {basicInfoFormik.errors.select}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </Col>

                            <Col xl={6}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="mbti"
                                  value={basicInfoFormik.values.select}
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

                          {/*  <Col xl={6}>*/}
                          {/*    <div className="mb-3">*/}
                          {/*      <label className="control-label">*/}
                          {/*        MBTI (2개까지 가능)*/}
                          {/*      </label>*/}
                          {/*      <Select*/}
                          {/*        value={selectedMulti}*/}
                          {/*        isMulti={true}*/}
                          {/*        onChange={() => {*/}
                          {/*          handleMulti()*/}
                          {/*        }}*/}
                          {/*        options={mbtiTypeOptionGroup}*/}
                          {/*        className="select2-selection"*/}
                          {/*      />*/}
                          {/*    </div>*/}
                          {/*  </Col>*/}
                          {/*</Row>*/}

                          {/*<Row>*/}
                          {/*  <Col xl={6}>*/}
                          {/*    <div className="form-floating mb-3">*/}
                          {/*      <select*/}
                          {/*        className="form-select"*/}
                          {/*        name="select"*/}
                          {/*        value={floatingformik.values.select}*/}
                          {/*        onChange={floatingformik.handleChange}*/}
                          {/*        onBlur={floatingformik.handleBlur}*/}
                          {/*      >*/}
                          {/*        <option defaultValue="0">*/}
                          {/*          Open this select your drinking type*/}
                          {/*        </option>*/}
                          {/*        <option value="1">음주 안함</option>*/}
                          {/*        <option value="2">주에 한번</option>*/}
                          {/*        <option value="3">주에 3번 이상</option>*/}
                          {/*      </select>*/}
                          {/*      <label htmlFor="floatingSelectGrid">*/}
                          {/*        음주여부*/}
                          {/*      </label>*/}
                          {/*      <div>*/}
                          {/*        {floatingformik.errors.select &&*/}
                          {/*        floatingformik.touched.select ? (*/}
                          {/*          <span className="text-danger">*/}
                          {/*            {floatingformik.errors.select}*/}
                          {/*          </span>*/}
                          {/*        ) : null}*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </Col>*/}

                          {/*  <Col xl={6}>*/}
                          {/*    <div className="form-floating mb-3">*/}
                          {/*      <select*/}
                          {/*        className="form-select"*/}
                          {/*        name="select"*/}
                          {/*        value={floatingformik.values.select}*/}
                          {/*        onChange={floatingformik.handleChange}*/}
                          {/*        onBlur={floatingformik.handleBlur}*/}
                          {/*      >*/}
                          {/*        <option defaultValue="0">*/}
                          {/*          Open this select your smoking type*/}
                          {/*        </option>*/}
                          {/*        <option value="1">비흡연</option>*/}
                          {/*        <option value="2">가끔 핌</option>*/}
                          {/*        <option value="3">자주 핌</option>*/}
                          {/*      </select>*/}
                          {/*      <label htmlFor="floatingSelectGrid">*/}
                          {/*        흡연여부*/}
                          {/*      </label>*/}
                          {/*      <div>*/}
                          {/*        {floatingformik.errors.select &&*/}
                          {/*        floatingformik.touched.select ? (*/}
                          {/*          <span className="text-danger">*/}
                          {/*            {floatingformik.errors.select}*/}
                          {/*          </span>*/}
                          {/*        ) : null}*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </Col>*/}
                          {/*</Row>*/}

                          {/*<Row>*/}
                          {/*  <Col xl={12}>*/}
                          {/*    <div className="form-floating mb-3">*/}
                          {/*      <select*/}
                          {/*        className="form-select"*/}
                          {/*        name="select"*/}
                          {/*        value={floatingformik.values.select}*/}
                          {/*        onChange={floatingformik.handleChange}*/}
                          {/*        onBlur={floatingformik.handleBlur}*/}
                          {/*      >*/}
                          {/*        <option defaultValue="0">*/}
                          {/*          Select your love story*/}
                          {/*        </option>*/}
                          {/*        <option value="1">one</option>*/}
                          {/*        <option value="2">two</option>*/}
                          {/*        <option value="3">three</option>*/}
                          {/*      </select>*/}
                          {/*      <label htmlFor="floatingSelectGrid">*/}
                          {/*        결혼 / 연애 계획*/}
                          {/*      </label>*/}
                          {/*      <div>*/}
                          {/*        {floatingformik.errors.select &&*/}
                          {/*        floatingformik.touched.select ? (*/}
                          {/*          <span className="text-danger">*/}
                          {/*            {floatingformik.errors.select}*/}
                          {/*          </span>*/}
                          {/*        ) : null}*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </Col>*/}
                          {/*</Row>*/}

                          <Row>
                            <Col xl={12}>
                              <div className="mt-3">
                                <Label>
                                  회원님의 간략한 소개를 적어주세요.
                                </Label>
                                <Input
                                  type="textarea"
                                  name="textarea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="자기소개"
                                  value={basicInfoFormik.values.name}
                                  onChange={basicInfoFormik.handleChange}
                                  onBlur={basicInfoFormik.handleBlur}
                                />
                                {/*{textareabadge ? (*/}
                                {/*  <span className="badgecount badge bg-success">*/}
                                {/*    {" "}*/}
                                {/*    {textcount} / 225{" "}*/}
                                {/*  </span>*/}
                                {/*) : null}*/}
                              </div>
                            </Col>
                          </Row>

                          {/*<Row>*/}
                          {/*  <Col xl={12}>*/}
                          {/*    <div className="form-floating mt-3">*/}
                          {/*      <input*/}
                          {/*        type="text"*/}
                          {/*        name="bornArea"*/}
                          {/*        className="form-control"*/}
                          {/*        id="floatingnameInput"*/}
                          {/*        placeholder="bornArea"*/}
                          {/*        value={basicInfoFormik.values.bornArea}*/}
                          {/*        onChange={basicInfoFormik.handleChange}*/}
                          {/*        onBlur={basicInfoFormik.handleBlur}*/}
                          {/*      />*/}
                          {/*      <label htmlFor="floatingnameInput">*/}
                          {/*        매칭에서 거절할 전화번호 (ex. 3개까지 등록*/}
                          {/*        가능)*/}
                          {/*      </label>*/}
                          {/*      {basicInfoFormik.errors.bornArea &&*/}
                          {/*      basicInfoFormik.touched.bornArea ? (*/}
                          {/*        <span className="text-danger">*/}
                          {/*          {basicInfoFormik.errors.bornArea}*/}
                          {/*        </span>*/}
                          {/*      ) : null}*/}
                          {/*    </div>*/}
                          {/*  </Col>*/}
                          {/*</Row>*/}

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

                    {/*/////////////////*/}
                    {/*<Form onSubmit={fffffformik.handleSubmit}>*/}
                    {/*  <div className="form-floating mb-3">*/}
                    {/*    <input*/}
                    {/*      type="text"*/}
                    {/*      name="name"*/}
                    {/*      className="form-control"*/}
                    {/*      id="floatingnameInput"*/}
                    {/*      placeholder="Enter Name"*/}
                    {/*      value={fffffformik.values.name}*/}
                    {/*      onChange={fffffformik.handleChange}*/}
                    {/*      onBlur={fffffformik.handleBlur}*/}
                    {/*    />*/}
                    {/*    <label htmlFor="fffffformikInput">Name</label>*/}
                    {/*    {*/}
                    {/*      fffffformik.errors.name && fffffformik.touched.name ? (*/}
                    {/*        <span className="text-danger">{fffffformik.errors.name}</span>*/}
                    {/*      ) : null*/}
                    {/*    }*/}
                    {/*  </div>*/}
                    {/*  <div className="form-floating mb-3">*/}
                    {/*    <select className="form-select" name="country"*/}
                    {/*            value={fffffformik.values.select}*/}
                    {/*            onChange={fffffformik.handleChange}*/}
                    {/*            onBlur={fffffformik.handleBlur}>*/}
                    {/*      <option defaultValue="0">Open this select menu</option>*/}
                    {/*      <option value="1">One</option>*/}
                    {/*      <option value="2">Two</option>*/}
                    {/*      <option value="3">Three</option>*/}
                    {/*    </select>*/}
                    {/*    <label htmlFor="floatingSelectGrid">Works with selects</label>*/}
                    {/*    <div>*/}
                    {/*      {*/}
                    {/*        fffffformik.errors.select && fffffformik.touched.select ? (*/}
                    {/*          <span className="text-danger">{fffffformik.errors.select}</span>*/}
                    {/*        ) : null*/}
                    {/*      }*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*  <div>*/}
                    {/*    <button type="submit" className="btn btn-primary w-md">Submit</button>*/}
                    {/*  </div>*/}
                    {/*</Form>*/}
                    {/*/////////////////////////*/}

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          결혼관련
                        </CardTitle>

                        <Form onSubmit={marrigeformik.handleSubmit}>
                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="name"
                                  value={marrigeformik.values.select}
                                  onChange={marrigeformik.handleChange}
                                  onBlur={marrigeformik.handleBlur}
                                >
                                  <option defaultValue="0">
                                    Open this select your marriage info
                                  </option>
                                  <option value="1">이혼</option>
                                  <option value="2">사별</option>
                                  <option value="3">미혼</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">
                                  결혼 여부
                                </label>
                                <div>
                                  {marrigeformik.errors.select &&
                                  marrigeformik.touched.select ? (
                                    <span className="text-danger">
                                      {marrigeformik.errors.select}
                                    </span>
                                  ) : null}
                                </div>
                              </div>

                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="text"
                                      name="divorce"
                                      className="form-control"
                                      id="floatingnameInput"
                                      placeholder="bornArea"
                                      value={marrigeformik.values.bornArea}
                                      onChange={marrigeformik.handleChange}
                                      onBlur={marrigeformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">
                                      이혼사유
                                    </label>
                                    {marrigeformik.errors.bornArea &&
                                    marrigeformik.touched.bornArea ? (
                                      <span className="text-danger">
                                        {marrigeformik.errors.bornArea}
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
                                      name="children"
                                      value={marrigeformik.values.select}
                                      onChange={marrigeformik.handleChange}
                                      onBlur={marrigeformik.handleBlur}
                                    >
                                      <option defaultValue="0">
                                        Open this select your kids
                                      </option>
                                      <option value="1">있음</option>
                                      <option value="2">없음</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">
                                      자녀유무
                                    </label>
                                    <div>
                                      {marrigeformik.errors.select &&
                                      marrigeformik.touched.select ? (
                                        <span className="text-danger">
                                          {marrigeformik.errors.select}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </Col>

                                {haveChildren.length === 0 &&
                                marrigeformik.values.children === "1" &&
                                haveChildButton === false
                                  ? (() => {
                                      setHaveChildren(["1"])
                                      setHaveChildButton(true)
                                    })()
                                  : null}

                                <Col xl={3}>
                                  <button
                                    type="button"
                                    disabled={
                                      marrigeformik.values.children === "1"
                                        ? false
                                        : true
                                    }
                                    onClick={() => {
                                      setHaveChildren([...haveChildren, "1"])
                                    }}
                                    className="btn btn-primary w-100"
                                  >
                                    +<div>추가하기</div>
                                  </button>
                                </Col>
                              </Row>

                              {haveChildren.map((child, index) => (
                                <Row key={index}>
                                  <Col xl={3}>
                                    <div className="form-floating mb-3">
                                      <select
                                        className="form-select"
                                        name="children"
                                        value={marrigeformik.values.select}
                                        onChange={marrigeformik.handleChange}
                                        onBlur={marrigeformik.handleBlur}
                                      >
                                        <option defaultValue="0">
                                          select the gender of your kid
                                        </option>
                                        <option value="1">남자</option>
                                        <option value="2">여자</option>
                                      </select>
                                      <label htmlFor="floatingSelectGrid">
                                        자녀성별
                                      </label>
                                      <div>
                                        {marrigeformik.errors.select &&
                                        marrigeformik.touched.select ? (
                                          <span className="text-danger">
                                            {marrigeformik.errors.select}
                                          </span>
                                        ) : null}
                                      </div>
                                    </div>
                                  </Col>

                                  <Col xl={3}>
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
                                        자녀 출생연도
                                      </label>
                                      {floatingformik.errors.bornArea &&
                                      floatingformik.touched.bornArea ? (
                                        <span className="text-danger">
                                          {floatingformik.errors.bornArea}
                                        </span>
                                      ) : null}
                                    </div>
                                  </Col>

                                  <Col xl={3}>
                                    <div className="form-floating mb-3">
                                      <select
                                        className="form-select"
                                        name="select"
                                        value={floatingformik.values.select}
                                        onChange={floatingformik.handleChange}
                                        onBlur={floatingformik.handleBlur}
                                      >
                                        <option defaultValue="0">
                                          select the Parental Status
                                        </option>
                                        <option value="1">직접양육</option>
                                        <option value="2">배우자가 양육</option>
                                      </select>
                                      <label htmlFor="floatingSelectGrid">
                                        양육여부
                                      </label>
                                      <div>
                                        {floatingformik.errors.select &&
                                        floatingformik.touched.select ? (
                                          <span className="text-danger">
                                            {floatingformik.errors.select}
                                          </span>
                                        ) : null}
                                      </div>
                                    </div>
                                  </Col>

                                  <Col xl={3}>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setHaveChildren(haveChildren.slice(1))
                                      }
                                      className="btn btn-primary w-100"
                                    >
                                      -<div>삭제하기</div>
                                    </button>
                                  </Col>
                                </Row>
                              ))}

                              <div className={"mt-3"}>
                                <button
                                  type="submit"
                                  className="btn btn-primary w-md"
                                >
                                  결혼 관련 저장
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          종교관련
                        </CardTitle>

                        <Form onSubmit={floatingformik.handleSubmit}>
                          <Row>
                            <Col xl={12}>
                              <div className="form-floating mb-2">
                                <select
                                  className="form-select"
                                  name="select"
                                  value={floatingformik.values.select}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
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
                                  {floatingformik.errors.select &&
                                  floatingformik.touched.select ? (
                                    <span className="text-danger">
                                      {floatingformik.errors.select}
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
                                  name="select"
                                  value={floatingformik.values.select}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
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
                                  {floatingformik.errors.select &&
                                  floatingformik.touched.select ? (
                                    <span className="text-danger">
                                      {floatingformik.errors.select}
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

                        <Form onSubmit={floatingformik.handleSubmit}>
                          <Row>
                            <Col xl={9}>
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  name="select"
                                  value={floatingformik.values.select}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
                                >
                                  <option defaultValue="0">
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
                                  {floatingformik.errors.select &&
                                  floatingformik.touched.select ? (
                                    <span className="text-danger">
                                      {floatingformik.errors.select}
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

                          {educationLevel.map(edu => (
                            <>
                              <Row>
                                <Col xl={4}>
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
                                      학교이름
                                    </label>
                                    {floatingformik.errors.bornArea &&
                                    floatingformik.touched.bornArea ? (
                                      <span className="text-danger">
                                        {floatingformik.errors.bornArea}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>

                                <Col xl={4}>
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
                                      전공 (3개까지 입력 가능)
                                    </label>
                                    {floatingformik.errors.bornArea &&
                                    floatingformik.touched.bornArea ? (
                                      <span className="text-danger">
                                        {floatingformik.errors.bornArea}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>

                                <Col xl={4}>
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
                                      캠퍼스 위치
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
                                <Col xl={5}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name="select"
                                      value={floatingformik.values.select}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    >
                                      <option defaultValue="0">
                                        Select your education level
                                      </option>
                                      <option value="1">고등학교 졸업</option>
                                      <option value="3">대학 중퇴</option>
                                      <option value="2">전문대 졸업</option>
                                      <option value="3">대학교 재학</option>
                                      <option value="3">대학교 졸업</option>
                                      <option value="3">
                                        대학원(석사) 졸업
                                      </option>

                                      <option value="3">
                                        대학원(석사) 졸업
                                      </option>
                                      <option value="3">
                                        대학원(박사) 졸업
                                      </option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">
                                      학력구분
                                    </label>
                                    <div>
                                      {floatingformik.errors.select &&
                                      floatingformik.touched.select ? (
                                        <span className="text-danger">
                                          {floatingformik.errors.select}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </Col>

                                <Col xl={5}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name="select"
                                      value={floatingformik.values.select}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    >
                                      <option defaultValue="0">
                                        Select your graduation status
                                      </option>
                                      <option value="1">졸업</option>
                                      <option value="2">재학</option>
                                      <option value="3">자퇴</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">
                                      졸업구분
                                    </label>
                                    <div>
                                      {floatingformik.errors.select &&
                                      floatingformik.touched.select ? (
                                        <span className="text-danger">
                                          {floatingformik.errors.select}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </Col>

                                <Col xl={2}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setEducationLevel(
                                        educationLevel.splice(1)
                                      )
                                    }
                                    className="btn btn-primary w-100"
                                  >
                                    -<div>추가하기</div>
                                  </button>
                                </Col>
                              </Row>
                            </>
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
                                  직장명
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
                                <label htmlFor="floatingnameInput">직급</label>
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
                                  직장주소
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
                            <Col xl={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
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

                            <Col xl={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
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

                            <Col xl={4}>
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="bornArea"
                                  className="form-control"
                                  id="floatingnameInput"
                                  placeholder="bornArea"
                                  value={floatingformik.values.bornArea}
                                  onChange={floatingformik.handleChange}
                                  onBlur={floatingformik.handleBlur}
                                />
                                <label htmlFor="floatingnameInput">
                                  총수입
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
