import React, { useState } from "react"
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
  {
    label: "MBTIType",
    options: [
      { label: "ENFP", value: "ENFP" },
      { label: "ENFJ", value: "ENFJ" },
      { label: "ENTP", value: "ENTP" },
      { label: "ENTJ", value: "ENTJ" },
    ],
  },
]

const wannaDoWithYou = [
  { label: "slideshow", value: 0 },
  { label: "walk", value: 1 },
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

  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(!isActive)
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
      // console.log("value", values.password);
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
      // console.log(values)
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
      // console.log("value", values.password);
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
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name="select"
                                      value={floatingformik.values.select}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    >
                                      <option defaultValue="0">
                                        Open this select Country
                                      </option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">
                                      국적
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
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="date"
                                      name="email"
                                      className="form-control"
                                      id="floatingemailInput"
                                      placeholder="Enter Email address"
                                      value={floatingformik.values.birth}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingemailInput">
                                      생년월일
                                    </label>
                                    {floatingformik.errors.birth &&
                                    floatingformik.touched.birth ? (
                                      <span className="text-danger">
                                        {floatingformik.errors.birth}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="number"
                                      name="신장"
                                      className="form-control"
                                      id="floatingnameInput"
                                      placeholder="Enter Name"
                                      value={floatingformik.values.height}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">
                                      키
                                    </label>
                                    {floatingformik.errors.height &&
                                    floatingformik.touched.height ? (
                                      <span className="text-danger">
                                        {floatingformik.errors.height}
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
                                      value={floatingformik.values.weight}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">
                                      몸무게(선택)
                                    </label>
                                    {floatingformik.errors.weight &&
                                    floatingformik.touched.weight ? (
                                      <span className="text-danger">
                                        {floatingformik.errors.weight}
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
                                      태어나거나 성장한 지역 (지역과 동까지만
                                      적어주심 됩니다.)
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
                                      name="addressOfHome"
                                      className="form-control"
                                      id="floatingnameInput"
                                      placeholder=""
                                      value={
                                        floatingformik.values.addressOfHome
                                      }
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">
                                      현재 거주지 주소 (지역과 동까지만 적어주심
                                      됩니다.)
                                    </label>
                                    {floatingformik.errors.addressOfHome &&
                                    floatingformik.touched.addressOfHome ? (
                                      <span className="text-danger">
                                        {floatingformik.errors.addressOfHome}
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
                                      value={floatingformik.values.activityArea}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">
                                      주 활동 지역 (지역과 동까지만 적어주심
                                      됩니다.)
                                    </label>
                                    {floatingformik.errors.activityArea &&
                                    floatingformik.touched.activityArea ? (
                                      <span className="text-danger">
                                        {floatingformik.errors.activityArea}
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
                                      name="select"
                                      value={floatingformik.values.select}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    >
                                      <option defaultValue="0">
                                        Open this select your BloodType
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
                                      {floatingformik.errors.select &&
                                      floatingformik.touched.select ? (
                                        <span className="text-danger">
                                          {floatingformik.errors.select}
                                        </span>
                                      ) : null}
                                    </div>
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
                                      MBTI (여려개 선택 가능)
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
                                  <div className="mt-3">
                                    <Label>
                                      회원님의 간략한 소개를 적어주세요.
                                    </Label>
                                    <Input
                                      type="textarea"
                                      id="textarea"
                                      onChange={e => {
                                        textareachange(e)
                                      }}
                                      maxLength="225"
                                      rows="3"
                                      placeholder="자기소개"
                                    />
                                    {textareabadge ? (
                                      <span className="badgecount badge bg-success">
                                        {" "}
                                        {textcount} / 225{" "}
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
                                  기본 프로필 저장
                                </button>
                              </div>
                            </Form>
                          </Col>
                          <Col lg={2} />
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          결혼관련
                        </CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name="select"
                                      value={floatingformik.values.select}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
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
                                      {floatingformik.errors.select &&
                                      floatingformik.touched.select ? (
                                        <span className="text-danger">
                                          {floatingformik.errors.select}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>

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
                                          이혼사유
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
                                            Open this select your kids
                                          </option>
                                          <option value="1">있음</option>
                                          <option value="2">없음</option>
                                        </select>
                                        <label htmlFor="floatingSelectGrid">
                                          자녀유무
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
                                          setHaveChildren([
                                            ...haveChildren,
                                            "1",
                                          ])
                                        }
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
                                            name="select"
                                            value={floatingformik.values.select}
                                            onChange={
                                              floatingformik.handleChange
                                            }
                                            onBlur={floatingformik.handleBlur}
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
                                        <div className="form-floating mb-3">
                                          <input
                                            type="text"
                                            name="bornArea"
                                            className="form-control"
                                            id="floatingnameInput"
                                            placeholder="bornArea"
                                            value={
                                              floatingformik.values.bornArea
                                            }
                                            onChange={
                                              floatingformik.handleChange
                                            }
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
                                            onChange={
                                              floatingformik.handleChange
                                            }
                                            onBlur={floatingformik.handleBlur}
                                          >
                                            <option defaultValue="0">
                                              select the Parental Status
                                            </option>
                                            <option value="1">직접양육</option>
                                            <option value="2">
                                              배우자가 양육
                                            </option>
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
                                            setHaveChildren(
                                              haveChildren.slice(1)
                                            )
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
                          </Col>

                          <Col lg={2}></Col>
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          종교관련
                        </CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
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

                              <Row ㅊ>
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
                          </Col>

                          <Col lg={2}></Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>

                  <TabPane tabId="2" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          학력관련
                        </CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
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
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
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
                                      setEducationLevel([
                                        ...educationLevel,
                                        "1",
                                      ])
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
                                          <option value="1">
                                            고등학교 졸업
                                          </option>
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
                                          <option value="2">재학중</option>
                                          <option value="3">중퇴</option>
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
                          </Col>
                          <Col lg={2} />
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          직업관련
                        </CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
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
                                      직업
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
                                      직급
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
                          </Col>

                          <Col lg={2}></Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>

                  <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle>자기소개</CardTitle>
                        {/* <p className="card-title-desc">
                        Fill all information below
                      </p> */}
                        <Row>
                          <Col xl={10}>
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
                                      매칭에서 거절할 전화번호 (ex. 3개까지 등록
                                      가능)
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
                                <Col xl={6}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name="select"
                                      value={floatingformik.values.select}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    >
                                      <option defaultValue="0">
                                        Open this select your drinking type
                                      </option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">
                                      음주여부
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

                                <Col xl={6}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name="select"
                                      value={floatingformik.values.select}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    >
                                      <option defaultValue="0">
                                        Open this select your smoking type
                                      </option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">
                                      흡연여부
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
                                <Col xl={6}>
                                  <div className="mb-3">
                                    <Label>혈액형</Label>
                                    <Select
                                      value={selectedGroup}
                                      onChange={() => {
                                        handleSelectGroup()
                                      }}
                                      options={bloodTypeOptionGroup}
                                      className="select2-selection"
                                    />
                                  </div>
                                </Col>

                                <Col xl={6}>
                                  <div className="mb-3">
                                    <label className="control-label">
                                      MBTI (2개까지 가능)
                                    </label>
                                    <Select
                                      value={selectedMulti}
                                      isMulti={true}
                                      onChange={() => {
                                        handleMulti()
                                      }}
                                      options={mbtiTypeOptionGroup}
                                      className="select2-selection"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="mb-3">
                                    <label className="control-label">
                                      결혼 / 연애 계획
                                    </label>
                                    <select
                                      className="form-select"
                                      name="select"
                                      value={inlineformik.values.select}
                                      onChange={inlineformik.handleChange}
                                      onBlur={inlineformik.handleBlur}
                                    >
                                      <option value="0">
                                        Select your love style
                                      </option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                    {inlineformik.errors.select &&
                                    inlineformik.touched.select ? (
                                      <span className="text-danger">
                                        {inlineformik.errors.select}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div>
                                    <Label htmlFor="formrow-firstname-Input">
                                      회원님의 간략한 소개를 적어주세요.
                                    </Label>
                                    <input
                                      type="text"
                                      name="bornArea"
                                      className="form-control"
                                      id="floatingnameInput"
                                      placeholder="Enter your self-introduction"
                                      value={floatingformik.values.bornArea}
                                      onChange={floatingformik.handleChange}
                                      onBlur={floatingformik.handleBlur}
                                    />
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
                                  자기소개 저장
                                </button>
                              </div>
                            </Form>
                          </Col>
                          <Col lg={2}></Col>
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle>자기소개</CardTitle>
                        {/* <p className="card-title-desc">
                        Fill all information below
                      </p> */}
                        <Row>
                          <Col xl={10}>
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
                                      하고 싶은 데이트 (ex. 금요일 밤에 야간
                                      까페 데이트)
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
                                        onClick={handleToggle}
                                        className="py-3 rounded-3 w-100 border-0"
                                        style={{
                                          backgroundColor: isActive
                                            ? "#D3D3D3"
                                            : "#F5F5F5",
                                        }}
                                      >
                                        <i
                                          className={`bx bx-${icon.label} mb-1`}
                                        ></i>
                                        TV 보기
                                      </div>
                                    </Col>
                                  ))}
                                  <Col xl={2} className="my-1">
                                    <div
                                      onClick={handleToggle}
                                      className="py-3 rounded-3 w-100 border-0"
                                      style={{
                                        backgroundColor: isActive
                                          ? "#D3D3D3"
                                          : "#F5F5F5",
                                      }}
                                    >
                                      <i className="bx bx-slideshow mb-1"></i>
                                      TV 보기
                                    </div>
                                  </Col>
                                  <Col xl={2} className="my-1">
                                    <div
                                      onClick={handleToggle}
                                      className="py-3 rounded-3 w-100 border-0"
                                      style={{
                                        backgroundColor: isActive
                                          ? "#D3D3D3"
                                          : "#F5F5F5",
                                      }}
                                    >
                                      <i className="bx bx-walk mb-1"></i>
                                      산책
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </Form>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>

                  <TabPane tabId="4" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>
                          직업관련
                        </CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
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
                                      직업
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
                          </Col>

                          <Col lg={2}></Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>

                  <TabPane tabId="5" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle>증빙서류 업로드</CardTitle>
                        {/* <p className="card-title-desc">
                        Fill all information below
                      </p> */}
                        <Row>
                          <Col xl={10}>
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
                          </Col>

                          <Col lg={2}></Col>
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle>프로필 이미지 업로드</CardTitle>
                        {/* <p className="card-title-desc">
                        Fill all information below
                      </p> */}
                        <Row>
                          <Col xl={10}>
                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col sm={12}>
                                  <CardSubtitle className="mb-3">
                                    {" "}
                                    회원님의 평상시 잘 나온 사진들을 업로드
                                    자유롭게 업로드 해 주시면 됩니다. (최대
                                    10장까지 가능)
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
                                              Drop files here or click to
                                              upload.
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
                          </Col>

                          <Col lg={2}></Col>
                        </Row>
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
