// import PropTypes from "prop-types";
// import React from "react";
// import { Container } from "reactstrap";
//
// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
//
// //i18n
// import { withTranslation } from "react-i18next";
//
// const Dashboard = props => {
//
//   //meta title
//   document.title = "Dashboard | Skote - React Admin & Dashboard Template";
//
//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           {/* Render Breadcrumb */}
//           <Breadcrumbs title={props.t("Dashboards")} breadcrumbItem="Profile"/>
//
//           <div>ddddd</div>
//
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };
//
// Dashboard.propTypes = {
//   t: PropTypes.any,
//   chartsData: PropTypes.any,
//   onGetChartsData: PropTypes.func,
// };
//
// export default withTranslation()(Dashboard);

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
  CardTitle
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

const optionGroup = [
  {
    label: "Picnic",
    options: [
      { label: "Mustard", value: "Mustard" },
      { label: "Ketchup", value: "Ketchup" },
      { label: "Relish", value: "Relish" }
    ]
  },
  {
    label: "Camping",
    options: [
      { label: "Tent", value: "Tent" },
      { label: "Flashlight", value: "Flashlight" },
      { label: "Toilet Paper", value: "Toilet Paper" }
    ]
  }
]

const orderSummary = [
  {


    id: 1,
    img: img1,
    productTitle: "Half sleeve T-shirt (64GB)",
    price: 450,
    qty: 1
  },
  { id: 2, img: img7, productTitle: "Wireless Headphone", price: 225, qty: 1 }
]

const Dashboard = () => {

  //meta title
  document.title = "Checkout | Skote - React Admin & Dashboard Template"


  const [activeTab, setActiveTab] = useState("1")
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [textareabadge, settextareabadge] = useState(0)

  const handleSelectGroup = (selectedGroup) => {
    setSelectedGroup(selectedGroup)
  }

  const validation = useFormik({

    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      states: "",
      order: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter your Name"),
      email: Yup.string().email().required("Please Enter your Email Address"),
      phone: Yup.string().required("Please Enter your Phone"),
      address: Yup.string().required("Please Enter your Address"),
      country: Yup.string().required("Please Enter your Country Name"),
      states: Yup.string().required("Please Enter your States"),
      order: Yup.string().required("Please Enter your Order Note")
    }),
    onSubmit: (values) => {
      // console.log(values)
    }
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
      check: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required"),
      email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
      select: Yup.string().required("This field is required"),
      check: Yup.string().required("This field is required")
    }),

    onSubmit: (values) => {
      // console.log("value", values.password);
    }
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
                      <p className="fw-bold mb-4">이상형 인터뷰</p>
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
                        <CardTitle tag="h4" className={"mb-4"}>기본 프로필</CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select Country</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">국적</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <input type="date" name="email" className="form-control"
                                           id="floatingemailInput" placeholder="Enter Email address"
                                           value={floatingformik.values.birth}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingemailInput">생년월일</label>
                                    {
                                      floatingformik.errors.birth && floatingformik.touched.birth ? (
                                        <span className="text-danger">{floatingformik.errors.birth}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <input type="number" name="신장" className="form-control"
                                           id="floatingnameInput"
                                           placeholder="Enter Name"
                                           value={floatingformik.values.height}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">키</label>
                                    {
                                      floatingformik.errors.height && floatingformik.touched.height ? (
                                        <span className="text-danger">{floatingformik.errors.height}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <input type="number" name="weight" className="form-control"
                                           id="floatingnameInput"
                                           placeholder="Enter Name"
                                           value={floatingformik.values.weight}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">몸무게(선택)</label>
                                    {
                                      floatingformik.errors.weight && floatingformik.touched.weight ? (
                                        <span className="text-danger">{floatingformik.errors.weight}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <input type="text" name="bornArea"
                                           className="form-control" id="floatingnameInput"
                                           placeholder="bornArea"
                                           value={floatingformik.values.bornArea}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">태어나거나 성장한 지역 (지역과 동까지만 적어주심 됩니다.)</label>
                                    {
                                      floatingformik.errors.bornArea && floatingformik.touched.bornArea ? (
                                        <span className="text-danger">{floatingformik.errors.bornArea}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <input type="text" name="addressOfHome"
                                           className="form-control" id="floatingnameInput"
                                           placeholder=""
                                           value={floatingformik.values.addressOfHome}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">현재 거주지 주소 (지역과 동까지만 적어주심 됩니다.)</label>
                                    {
                                      floatingformik.errors.addressOfHome && floatingformik.touched.addressOfHome ? (
                                        <span
                                          className="text-danger">{floatingformik.errors.addressOfHome}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <input type="text" name="activityArea"
                                           className="form-control" id="floatingnameInput"
                                           placeholder=""
                                           value={floatingformik.values.activityArea}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">주 활동 지역 (지역과 동까지만 적어주심 됩니다.)</label>
                                    {
                                      floatingformik.errors.activityArea && floatingformik.touched.activityArea ? (
                                        <span
                                          className="text-danger">{floatingformik.errors.activityArea}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={6}>
                                  <div className="form-floating mb-3">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select your BloodType</option>
                                      <option value="1">A형</option>
                                      <option value="2">B형</option>
                                      <option value="3">AB형</option>
                                      <option value="3">O형</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">혈액형</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>
                                </Col>

                                <Col xl={6}>
                                  <div className="form-floating mb-3">
                                    <input type="text" name="bornArea"
                                           className="form-control" id="floatingnameInput"
                                           placeholder="bornArea"
                                           value={floatingformik.values.bornArea}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">MBTI (여려개 선택 가능)</label>
                                    {
                                      floatingformik.errors.bornArea && floatingformik.touched.bornArea ? (
                                        <span className="text-danger">{floatingformik.errors.bornArea}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="mt-3">
                                    <Label>회원님의 간략한 소개를 적어주세요.</Label>
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
                                      <span className="badgecount badge bg-success">{" "}
                                        {textcount} / 225{" "}
                                          </span>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>

                              <div className={"mt-3"}>
                                <button type="submit" className="btn btn-primary w-md">기본 프로필 저장</button>
                              </div>
                            </Form>
                          </Col>
                          <Col lg={2} />
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>결혼관련</CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select your marriage info</option>
                                      <option value="1">이혼</option>
                                      <option value="2">사별</option>
                                      <option value="3">미혼</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">결혼 여부</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>

                                  <Row>
                                    <Col xl={12}>
                                      <div className="form-floating mb-3">
                                        <input type="text" name="bornArea"
                                               className="form-control" id="floatingnameInput"
                                               placeholder="bornArea"
                                               value={floatingformik.values.bornArea}
                                               onChange={floatingformik.handleChange}
                                               onBlur={floatingformik.handleBlur}
                                        />
                                        <label htmlFor="floatingnameInput">이혼사유</label>
                                        {
                                          floatingformik.errors.bornArea && floatingformik.touched.bornArea ? (
                                            <span className="text-danger">{floatingformik.errors.bornArea}</span>
                                          ) : null
                                        }
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col xl={12}>
                                      <div className="form-floating mb-3">
                                        <input type="text" name="addressOfHome"
                                               className="form-control" id="floatingnameInput"
                                               placeholder=""
                                               value={floatingformik.values.addressOfHome}
                                               onChange={floatingformik.handleChange}
                                               onBlur={floatingformik.handleBlur}
                                        />
                                        <label htmlFor="floatingnameInput">자녀유무</label>
                                        {
                                          floatingformik.errors.addressOfHome && floatingformik.touched.addressOfHome ? (
                                            <span
                                              className="text-danger">{floatingformik.errors.addressOfHome}</span>
                                          ) : null
                                        }
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col xl={12}>
                                      <div className="form-floating">
                                        <select className="form-select" name="select"
                                                value={floatingformik.values.select}
                                                onChange={floatingformik.handleChange}
                                                onBlur={floatingformik.handleBlur}>
                                          <option defaultValue="0">Open this select your marriage info</option>
                                          <option value="1">직접 양육</option>
                                          <option value="2">상대 배우자 양육</option>
                                          <option value="3">가족 양육</option>
                                          <option value="3">아이 없음</option>
                                        </select>
                                        <label htmlFor="floatingSelectGrid">자녀 양육 상황</label>
                                        <div>
                                          {
                                            floatingformik.errors.select && floatingformik.touched.select ? (
                                              <span className="text-danger">{floatingformik.errors.select}</span>
                                            ) : null
                                          }
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>

                                  <div className={"mt-3"}>
                                    <button type="submit" className="btn btn-primary w-md">결혼 관련 저장</button>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </Col>

                          <Col lg={2}>

                          </Col>
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>종교관련</CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>

                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-2">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select your religion</option>
                                      <option value="1">개신교</option>
                                      <option value="2">천주교</option>
                                      <option value="3">불교</option>
                                      <option value="4">무교</option>
                                      <option value="5">기타</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">종교 선택</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <Row ㅊ>
                                <Col xl={12}>
                                  <div className="form-floating">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select attendance at religious</option>
                                      <option value="1">매주 출석</option>
                                      <option value="2">때때로 출석</option>
                                      <option value="3">출석하지 않음</option>
                                      <option value="3">해당사항 없음</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">출석 상황</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <div className={"mt-3"}>
                                <button type="submit" className="btn btn-primary w-md">종교 관련 저장</button>
                              </div>
                            </Form>
                          </Col>

                          <Col lg={2}>

                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>




                  <TabPane tabId="2" id="v-pills-confir" role="tabpanel">
                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>기본 프로필</CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select Country</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">국적</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <input type="date" name="email" className="form-control"
                                           id="floatingemailInput" placeholder="Enter Email address"
                                           value={floatingformik.values.birth}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingemailInput">생년월일</label>
                                    {
                                      floatingformik.errors.birth && floatingformik.touched.birth ? (
                                        <span className="text-danger">{floatingformik.errors.birth}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <input type="number" name="신장" className="form-control"
                                           id="floatingnameInput"
                                           placeholder="Enter Name"
                                           value={floatingformik.values.height}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">키</label>
                                    {
                                      floatingformik.errors.height && floatingformik.touched.height ? (
                                        <span className="text-danger">{floatingformik.errors.height}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div className="form-floating mb-3">
                                    <input type="number" name="weight" className="form-control"
                                           id="floatingnameInput"
                                           placeholder="Enter Name"
                                           value={floatingformik.values.weight}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">몸무게(선택)</label>
                                    {
                                      floatingformik.errors.weight && floatingformik.touched.weight ? (
                                        <span className="text-danger">{floatingformik.errors.weight}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <input type="text" name="bornArea"
                                           className="form-control" id="floatingnameInput"
                                           placeholder="bornArea"
                                           value={floatingformik.values.bornArea}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">태어나거나 성장한 지역 (지역과 동까지만 적어주심 됩니다.)</label>
                                    {
                                      floatingformik.errors.bornArea && floatingformik.touched.bornArea ? (
                                        <span className="text-danger">{floatingformik.errors.bornArea}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <input type="text" name="addressOfHome"
                                           className="form-control" id="floatingnameInput"
                                           placeholder=""
                                           value={floatingformik.values.addressOfHome}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">현재 거주지 주소 (지역과 동까지만 적어주심 됩니다.)</label>
                                    {
                                      floatingformik.errors.addressOfHome && floatingformik.touched.addressOfHome ? (
                                        <span
                                          className="text-danger">{floatingformik.errors.addressOfHome}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <input type="text" name="activityArea"
                                           className="form-control" id="floatingnameInput"
                                           placeholder=""
                                           value={floatingformik.values.activityArea}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">주 활동 지역 (지역과 동까지만 적어주심 됩니다.)</label>
                                    {
                                      floatingformik.errors.activityArea && floatingformik.touched.activityArea ? (
                                        <span
                                          className="text-danger">{floatingformik.errors.activityArea}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={6}>
                                  <div className="form-floating mb-3">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select your BloodType</option>
                                      <option value="1">A형</option>
                                      <option value="2">B형</option>
                                      <option value="3">AB형</option>
                                      <option value="3">O형</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">혈액형</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>
                                </Col>

                                <Col xl={6}>
                                  <div className="form-floating mb-3">
                                    <input type="text" name="bornArea"
                                           className="form-control" id="floatingnameInput"
                                           placeholder="bornArea"
                                           value={floatingformik.values.bornArea}
                                           onChange={floatingformik.handleChange}
                                           onBlur={floatingformik.handleBlur}
                                    />
                                    <label htmlFor="floatingnameInput">MBTI (여려개 선택 가능)</label>
                                    {
                                      floatingformik.errors.bornArea && floatingformik.touched.bornArea ? (
                                        <span className="text-danger">{floatingformik.errors.bornArea}</span>
                                      ) : null
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl={12}>
                                  <div className="mt-3">
                                    <Label>회원님의 간략한 소개를 적어주세요.</Label>
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
                                      <span className="badgecount badge bg-success">{" "}
                                        {textcount} / 225{" "}
                                          </span>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>

                              <div className={"mt-3"}>
                                <button type="submit" className="btn btn-primary w-md">기본 프로필 저장</button>
                              </div>
                            </Form>
                          </Col>
                          <Col lg={2} />
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>결혼관련</CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>
                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-3">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select your marriage info</option>
                                      <option value="1">이혼</option>
                                      <option value="2">사별</option>
                                      <option value="3">미혼</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">결혼 여부</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>

                                  <Row>
                                    <Col xl={12}>
                                      <div className="form-floating mb-3">
                                        <input type="text" name="bornArea"
                                               className="form-control" id="floatingnameInput"
                                               placeholder="bornArea"
                                               value={floatingformik.values.bornArea}
                                               onChange={floatingformik.handleChange}
                                               onBlur={floatingformik.handleBlur}
                                        />
                                        <label htmlFor="floatingnameInput">이혼사유</label>
                                        {
                                          floatingformik.errors.bornArea && floatingformik.touched.bornArea ? (
                                            <span className="text-danger">{floatingformik.errors.bornArea}</span>
                                          ) : null
                                        }
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col xl={12}>
                                      <div className="form-floating mb-3">
                                        <input type="text" name="addressOfHome"
                                               className="form-control" id="floatingnameInput"
                                               placeholder=""
                                               value={floatingformik.values.addressOfHome}
                                               onChange={floatingformik.handleChange}
                                               onBlur={floatingformik.handleBlur}
                                        />
                                        <label htmlFor="floatingnameInput">자녀유무</label>
                                        {
                                          floatingformik.errors.addressOfHome && floatingformik.touched.addressOfHome ? (
                                            <span
                                              className="text-danger">{floatingformik.errors.addressOfHome}</span>
                                          ) : null
                                        }
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col xl={12}>
                                      <div className="form-floating">
                                        <select className="form-select" name="select"
                                                value={floatingformik.values.select}
                                                onChange={floatingformik.handleChange}
                                                onBlur={floatingformik.handleBlur}>
                                          <option defaultValue="0">Open this select your marriage info</option>
                                          <option value="1">직접 양육</option>
                                          <option value="2">상대 배우자 양육</option>
                                          <option value="3">가족 양육</option>
                                          <option value="3">아이 없음</option>
                                        </select>
                                        <label htmlFor="floatingSelectGrid">자녀 양육 상황</label>
                                        <div>
                                          {
                                            floatingformik.errors.select && floatingformik.touched.select ? (
                                              <span className="text-danger">{floatingformik.errors.select}</span>
                                            ) : null
                                          }
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>

                                  <div className={"mt-3"}>
                                    <button type="submit" className="btn btn-primary w-md">결혼 관련 저장</button>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </Col>

                          <Col lg={2}>

                          </Col>
                        </Row>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <CardTitle tag="h4" className={"mb-4"}>종교관련</CardTitle>
                        {/*<p className="card-title-desc">*/}
                        {/*  Fill all information below*/}
                        {/*</p>*/}
                        <Row>
                          <Col xl={10}>

                            <Form onSubmit={floatingformik.handleSubmit}>
                              <Row>
                                <Col xl={12}>
                                  <div className="form-floating mb-2">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select your religion</option>
                                      <option value="1">개신교</option>
                                      <option value="2">천주교</option>
                                      <option value="3">불교</option>
                                      <option value="4">무교</option>
                                      <option value="5">기타</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">종교 선택</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <Row ㅊ>
                                <Col xl={12}>
                                  <div className="form-floating">
                                    <select className="form-select" name="select"
                                            value={floatingformik.values.select}
                                            onChange={floatingformik.handleChange}
                                            onBlur={floatingformik.handleBlur}>
                                      <option defaultValue="0">Open this select attendance at religious</option>
                                      <option value="1">매주 출석</option>
                                      <option value="2">때때로 출석</option>
                                      <option value="3">출석하지 않음</option>
                                      <option value="3">해당사항 없음</option>
                                    </select>
                                    <label htmlFor="floatingSelectGrid">출석 상황</label>
                                    <div>
                                      {
                                        floatingformik.errors.select && floatingformik.touched.select ? (
                                          <span className="text-danger">{floatingformik.errors.select}</span>
                                        ) : null
                                      }
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <div className={"mt-3"}>
                                <button type="submit" className="btn btn-primary w-md">종교 관련 저장</button>
                              </div>
                            </Form>
                          </Col>

                          <Col lg={2}>

                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>





                  <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
                    <div>
                      <CardTitle>Payment information</CardTitle>
                      <p className="card-title-desc">
                        Fill all information below
                      </p>
                    </div>
                  </TabPane>

                  <TabPane tabId="4" id="v-pills-confir" role="tabpanel">

                    <div>
                      <CardTitle>Payment information</CardTitle>
                      <p className="card-title-desc">
                        Fill all information below
                      </p>
                    </div>


                  </TabPane>

                  <TabPane tabId="5" id="v-pills-confir" role="tabpanel">
                    <div>
                      <CardTitle>Payment information</CardTitle>
                      <p className="card-title-desc">
                        Fill all information below
                      </p>
                    </div>

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
