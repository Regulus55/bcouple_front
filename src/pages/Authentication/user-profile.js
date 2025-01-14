import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form
} from "reactstrap"

// Formik profileformik
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import withRouter from "components/Common/withRouter"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import useProfile from "hooks/useProfile"
import axios from "axios"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import Consent from "../../components/Common/Consent"

const UserProfile = () => {
  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)


  const {
    data: profileInfo,
    isLoading: profileLoading,
    isError: profileError
  } = useProfile()

  // 이미지
  const [selectedFile, setSelectedFile] = useState(null)
  const handleAcceptedFiles = (e) => {
    setSelectedFile(e.target.files[0])
  }


  const profileformik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      nickName: profileInfo?.nickName || "",
      email: profileInfo?.email || "",
      phone: profileInfo?.phone || "",
      profileImg: profileInfo?.profileImg,
      id: profileInfo?.id || ""
    },
    profileformikSchema: Yup.object({
      nickName: Yup.string().required("Please Enter Your UserName"),
      email: Yup.string().required("Please Enter Your UserName"),
      phone: Yup.string().required("Please Enter Your UserName")
    }),
    onSubmit: async values => {

      const formData = new FormData()
      formData.append("userName", values.nickName)
      formData.append("nickName", values.nickName)
      formData.append("email", values.email)
      formData.append("phone", values.phone)
      formData.append("profileImg", selectedFile)

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
      }
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"

          }
        }
        const url = "http://localhost/api/member"
        const res = await axios.put(url, formData, config)
        console.log("프로필 수정 res", res)
        if (res.status === 200) {
          alert("프로필 수정 완료됐습니다")
        }
      } catch (e) {
        console.log(e)
      }
    }
  })


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="BeeCouple" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">프로필</h4>
                  <div className="d-flex mb-4">
                    <div className="ms-3">
                      <img
                        src={profileformik.values.profileImg}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{profileInfo?.nickName}</h5>
                        <p className="mb-1">{profileInfo?.email}</p>
                        <p className="mb-0">
                          Id no: #{profileInfo?.memberStatus}
                        </p>
                      </div>
                    </div>
                  </div>


                  {/*<Dropzone*/}
                  {/*  onDrop={handleAcceptedFiles}*/}
                  {/*  accept={{ "image/*": [".jpeg",".jpg",".png"]}}*/}
                  {/*  // onDrop={acceptedFiles => {*/}
                  {/*  //   handleAcceptedFiles(acceptedFiles)*/}
                  {/*  // }}*/}
                  {/*>*/}
                  {/*  {({ getRootProps, getInputProps }) => (*/}
                  {/*    <div className="dropzone">*/}
                  {/*      <div*/}
                  {/*        className="dz-message needsclick mt-2"*/}
                  {/*        {...getRootProps()}*/}
                  {/*      >*/}
                  {/*        <input {...getInputProps()} />*/}
                  {/*        <div className="mb-3">*/}
                  {/*          <i className="display-4 text-muted bx bxs-cloud-upload" />*/}
                  {/*        </div>*/}
                  {/*        <h4>Drop files here or click to upload.</h4>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  )}*/}
                  {/*</Dropzone>*/}

                  {/*<div className="dropzone-previews mt-3" id="file-previews">*/}
                  {/*  <Row>*/}
                  {/*    {selectedFiles.map((f, i) => {*/}
                  {/*      return (*/}
                  {/*        <Col key={i + "-file"}>*/}
                  {/*          <Card*/}
                  {/*            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"*/}

                  {/*          >*/}
                  {/*            <div className="p-2">*/}
                  {/*              <Row className="align-items-center">*/}
                  {/*                <Col className="col-auto">*/}
                  {/*                  <img*/}
                  {/*                    data-dz-thumbnail=""*/}
                  {/*                    height="80"*/}
                  {/*                    className="avatar-sm rounded bg-light"*/}
                  {/*                    alt={f.name}*/}
                  {/*                    src={f.preview}*/}
                  {/*                  />*/}
                  {/*                </Col>*/}
                  {/*                <Col>*/}
                  {/*                  <Link*/}
                  {/*                    to="#"*/}
                  {/*                    className="text-muted font-weight-bold"*/}
                  {/*                  >*/}
                  {/*                    {f.name}*/}
                  {/*                  </Link>*/}
                  {/*                  <p className="mb-0">*/}
                  {/*                    <strong>{f.formattedSize}</strong>*/}
                  {/*                  </p>*/}
                  {/*                </Col>*/}
                  {/*              </Row>*/}
                  {/*            </div>*/}
                  {/*          </Card>*/}
                  {/*        </Col>*/}
                  {/*      )*/}
                  {/*    })}*/}
                  {/*  </Row>*/}
                  {/*</div>*/}


                  <div className="input-group">
                    <Input
                      type="file"
                      className="form-control"
                      id="profileImg"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleAcceptedFiles}
                    />
                    <Label className="input-group-text" htmlFor="inputGroupFile02">Upload</Label>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>


          <Card>
            <CardBody>
              <h4 className="card-title mb-4">
                프로필 변경
              </h4>
              <Form
                className="form-horizontal"
                onSubmit={e => {
                  e.preventDefault()
                  profileformik.handleSubmit()
                  return false
                }}
              >
                <div className="form-group mb-2">
                  <Label className="form-label">Nickname</Label>
                  <Input
                    name="nickName"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={profileformik.handleChange}
                    onBlur={profileformik.handleBlur}
                    value={profileformik.values.nickName || ""}
                    invalid={
                      profileformik.touched.nickName &&
                      profileformik.errors.nickName
                        ? true
                        : false
                    }
                  />
                  {profileformik.touched.nickName &&
                  profileformik.errors.nickName ? (
                    <FormFeedback type="invalid">
                      {profileformik.errors.nickName}
                    </FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    // value={email}
                    className="form-control"
                    placeholder="Enter Email"
                    type="text"
                    disabled={true}
                    onChange={profileformik.handleChange}
                    onBlur={profileformik.handleBlur}
                    value={profileformik.values.email || ""}
                    invalid={
                      profileformik.touched.email && profileformik.errors.email
                        ? true
                        : false
                    }
                  />
                  {profileformik.touched.email && profileformik.errors.email ? (
                    <FormFeedback type="invalid">
                      {profileformik.errors.email}
                    </FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>

                <div className="form-group">
                  <Label className="form-label">Phone</Label>
                  <Input
                    name="phone"
                    // value={phone}
                    className="form-control"
                    placeholder="Enter Phone"
                    type="text"
                    onChange={profileformik.handleChange}
                    onBlur={profileformik.handleBlur}
                    value={profileformik.values.phone || ""}
                    invalid={
                      profileformik.touched.phone && profileformik.errors.phone
                        ? true
                        : false
                    }
                  />
                  {profileformik.touched.phone && profileformik.errors.phone ? (
                    <FormFeedback type="invalid">
                      {profileformik.errors.phone}
                    </FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>

                {/* 제출버튼 */}
                <div className="text-center mt-4">
                  <Button type="submit" color="primary">
                    프로필 업데이트
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h4 className="card-title mb-4">약관동의 변경</h4>
              <Consent />
            </CardBody>
          </Card>

          {/* <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={e => {
                  e.preventDefault()
                  privacyformik.handleSubmit()
                  return false
                }}
              >
                <div className="form-group mb-2">
                  <Label className="form-label">Country</Label>
                  <Input
                    name="country"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Country"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.country || ""}
                    invalid={
                      privacyformik.touched.country &&
                      privacyformik.errors.country
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.country &&
                  privacyformik.errors.country ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.country}
                    </FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Gender</Label>
                  <Input
                    name="gender"
                    className="form-control"
                    placeholder="Enter Gender"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.gender || ""}
                    invalid={
                      privacyformik.touched.gender &&
                      privacyformik.errors.gender
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.gender &&
                  privacyformik.errors.gender ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.gender}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Birth</Label>
                  <Input
                    name="birth"
                    className="form-control"
                    placeholder="Enter Birth Date"
                    type="date"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.birth || ""}
                    invalid={
                      privacyformik.touched.birth && privacyformik.errors.birth
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.birth && privacyformik.errors.birth ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.birth}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Age</Label>
                  <Input
                    name="age"
                    className="form-control"
                    placeholder="Enter Age"
                    type="number"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.age || ""}
                    invalid={
                      privacyformik.touched.age && privacyformik.errors.age
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.age && privacyformik.errors.age ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.age}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Height</Label>
                  <Input
                    name="height"
                    className="form-control"
                    placeholder="Enter Height"
                    type="number"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.height || ""}
                    invalid={
                      privacyformik.touched.height &&
                      privacyformik.errors.height
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.height &&
                  privacyformik.errors.height ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.height}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Body Type</Label>
                  <Input
                    name="bodyType"
                    className="form-control"
                    placeholder="Enter Body Type"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.bodyType || ""}
                    invalid={
                      privacyformik.touched.bodyType &&
                      privacyformik.errors.bodyType
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.bodyType &&
                  privacyformik.errors.bodyType ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.bodyType}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Address of Home</Label>
                  <Input
                    name="addressOfHome"
                    className="form-control"
                    placeholder="Enter Address of Home"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.addressOfHome || ""}
                    invalid={
                      privacyformik.touched.addressOfHome &&
                      privacyformik.errors.addressOfHome
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.addressOfHome &&
                  privacyformik.errors.addressOfHome ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.addressOfHome}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Activity Area</Label>
                  <Input
                    name="activityArea"
                    className="form-control"
                    placeholder="Enter Activity Area"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.activityArea || ""}
                    invalid={
                      privacyformik.touched.activityArea &&
                      privacyformik.errors.activityArea
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.activityArea &&
                  privacyformik.errors.activityArea ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.activityArea}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Born Area</Label>
                  <Input
                    name="bornArea"
                    className="form-control"
                    placeholder="Enter Born Area"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.bornArea || ""}
                    invalid={
                      privacyformik.touched.bornArea &&
                      privacyformik.errors.bornArea
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.bornArea &&
                  privacyformik.errors.bornArea ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.bornArea}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Blood Type</Label>
                  <Input
                    name="bloodType"
                    className="form-control"
                    placeholder="Enter Blood Type"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.bloodType || ""}
                    invalid={
                      privacyformik.touched.bloodType &&
                      privacyformik.errors.bloodType
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.bloodType &&
                  privacyformik.errors.bloodType ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.bloodType}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">MBTI Type</Label>
                  <Input
                    name="mbtiType"
                    className="form-control"
                    placeholder="Enter MBTI Type"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.mbtiType || ""}
                    invalid={
                      privacyformik.touched.mbtiType &&
                      privacyformik.errors.mbtiType
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.mbtiType &&
                  privacyformik.errors.mbtiType ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.mbtiType}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Drinking</Label>
                  <Input
                    name="drinking"
                    className="form-control"
                    placeholder="Enter Drinking Habit"
                    type="text"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.drinking || ""}
                    invalid={
                      privacyformik.touched.drinking &&
                      privacyformik.errors.drinking
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.drinking &&
                  privacyformik.errors.drinking ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.drinking}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    name="mExperience"
                    value={privacyformik.values.mExperience}
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                  >
                    <option value="">
                      Open this select your marriage info
                    </option>
                    <option value="1">이혼</option>
                    <option value="2">사별</option>
                    <option value="3">미혼</option>
                  </select>

                  <label htmlFor="reasonForDivorce">이혼 사유</label>

                  {privacyformik.errors.mExperience &&
                  privacyformik.touched.mExperience ? (
                    <span className="text-danger">
                      {privacyformik.errors.mExperience}
                    </span>
                  ) : null}
                </div>

                <div className="form-group mb-2">
                  <Label className="form-label">Self Introduction</Label>
                  <Input
                    name="selfIntroduce"
                    className="form-control"
                    placeholder="Enter Self Introduction"
                    type="textarea"
                    onChange={privacyformik.handleChange}
                    onBlur={privacyformik.handleBlur}
                    value={privacyformik.values.selfIntroduce || ""}
                    invalid={
                      privacyformik.touched.selfIntroduce &&
                      privacyformik.errors.selfIntroduce
                        ? true
                        : false
                    }
                  />
                  {privacyformik.touched.selfIntroduce &&
                  privacyformik.errors.selfIntroduce ? (
                    <FormFeedback type="invalid">
                      {privacyformik.errors.selfIntroduce}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="text-center mt-4">
                  <Button type="submit" color="primary">
                    Update Privacy Info
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UserProfile
