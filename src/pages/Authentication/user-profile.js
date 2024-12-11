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
  Form,
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

const UserProfile = () => {
  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)

  const ProfileProperties = createSelector(
    state => state.Profile,
    profile => ({
      error: profile.error,
      success: profile.success,
    })
  )
  const { error, success } = useSelector(ProfileProperties)

  const {
    data: profileInfo,
    isLoading: profileLoading,
    isError: profileError,
  } = useProfile()

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName)
        setemail(obj.email)
        setidx(obj.uid)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username)
        setemail(obj.email)
        setidx(obj.uid)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  const profileformik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      nickName: profileInfo?.nickName || "",
      email: profileInfo?.email || "",
      phone: profileInfo?.phone || "",
      id: profileInfo?.id || "",
    },
    profileformikSchema: Yup.object({
      nickName: Yup.string().required("Please Enter Your UserName"),
      email: Yup.string().required("Please Enter Your UserName"),
      phone: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: async values => {
      const userInput = {
        profileImg: ["https://example.com/profile1.jpg"],
        userName: values.nickName,
        nickName: values.nickName,
        email: values.email,
        phone: values.phone,
      }
      console.log("우저인풋", userInput)
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const url = "http://localhost/api/member"
        const res = await axios.put(url, userInput, config)
        console.log("프로필 수정 res", res)
      } catch (e) {
        console.log(e)
      }
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="BeeCouple" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={profileInfo?.profileImg[0]}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
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
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change Profile Info</h4>

          <Card>
            <CardBody>
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
                  <Button type="submit" color="danger">
                    Update Profile Info
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>

          {/* <Card>
            <CardBody>
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

                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update Profile Info
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

export default withRouter(UserProfile)
