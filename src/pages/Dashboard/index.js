import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Form,
  Label,
  CardSubtitle,
} from "reactstrap"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import classnames from "classnames"

// eslint-disable-next-line
import "boxicons"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Images

import Dropzone from "react-dropzone"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()

import useProfile from "hooks/useProfile"
import { favoriteCategories, mbtiTypeOptionGroup } from "../../common/datas"
import CardContainer from "../../components/Common/CardContainer"

const Dashboard = () => {
  //meta title
  document.title = "Checkout | Skote - React Admin & Dashboard Template"
  const { data: profileInfo } = useProfile()

  const [activeTab, setActiveTab] = useState("1")
  useEffect(() => {
    if (
      ["profile", "marriageInfo", "religionInfo"].some(
        key => profileInfo?.[key] === null || profileInfo?.[key] === undefined
      )
    ) {
      setActiveTab("1")
    } else if (
      ["educationInfo", "jobInfo"].some(
        key => profileInfo?.[key] === null || profileInfo?.[key] === undefined
      )
    ) {
      setActiveTab("2")
    } else {
      setActiveTab("3")
    }
  }, [profileInfo])

  // favorite 버튼
  const [activeStates, setActiveStates] = useState(
    Object.keys(favoriteCategories).reduce((acc, categoryKey) => {
      const items = favoriteCategories[categoryKey].items || []
      acc[categoryKey] = items.reduce((stateAcc, item) => {
        stateAcc[item.value] = false
        return stateAcc
      }, {})
      return acc
    }, {})
  )
  const handleToggle = (category, value) => {
    const selectedCount = Object.values(activeStates[category]).filter(
      active => active
    ).length

    if (selectedCount < 5 || activeStates[category][value]) {
      setActiveStates(prevState => {
        const newActiveStates = {
          ...prevState,
          [category]: {
            ...prevState[category],
            [value]: !prevState[category][value],
          },
        }

        idealloveformik.setFieldValue(
          "selectedItems",
          Object.keys(newActiveStates).reduce((acc, categoryKey) => {
            acc[categoryKey] = Object.keys(newActiveStates[categoryKey]).filter(
              itemValue => newActiveStates[categoryKey][itemValue]
            )
            return acc
          }, {})
        )

        return newActiveStates
      })
    } else {
      toast.error(
        `${favoriteCategories[category].title} 항목은 5개 이상 선택할 수 없습니다.`,
        {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          draggable: true,
        }
      )
    }
  }

  const idealloveformik = useFormik({
    initialValues: {
      myAppearance: "",
      expressOneLine: "",
      characteristicsMyAppearance: "",
      myWorkStrongPoint: "",
      iWantToDo: "",
      selectedItems: {},
    },
    validationSchema: Yup.object({
      myAppearance: Yup.string().required("This field is required"),
      expressOneLine: Yup.string().required("This field is required"),
      characteristicsMyAppearance: Yup.string().required(
        "This field is required"
      ),
      myWorkStrongPoint: Yup.string().required("This field is required"),
      iWantToDo: Yup.string().required("This field is required"),
    }),
    onSubmit: async values => {
      const userInput = {
        myAppearance: values.myAppearance,
        expressOneLine: values.expressOneLine,
        characteristicsMyAppearance: values.characteristicsMyAppearance,
        myWorkStrongPoint: values.myWorkStrongPoint,
        iWantToDo: values.iWantToDo,
        myHobbies: values.selectedItems.myHobbies,
        myExcises: values.selectedItems.myExcises,
        myInterestedInTV: values.selectedItems.myInterestedInTV,
        myInterestedInMovie: values.selectedItems.myInterestedInMovie,
        myInterestedInMusic: values.selectedItems.myInterestedInMusic,
      }
      console.log("이상형 인터뷰 userInput", userInput)

      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const url = "http://localhost/api/introduce"
        const res = await axios.post(url, userInput, config)
        console.log("취미 내용 res", res)
        if (res.status === 201) {
          alert("취미 내용 저장 완료")
        }
      } catch (e) {
        console.log(e)
      }
    },
  })

  // 기본정보
  const basicInfoFormik = useFormik({
    initialValues: {
      birth: "1970-01-01",
      height: 160,
      weight: 60,
      gender: "",
      bornArea: "",
      country: "",
      addressOfHome: "",
      activityArea: "",
      bloodType: 0,
      bodyType: "",
      mbtiType: "",
      smoking: "",
      drinking: "",
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
      gender: Yup.number()
        .required("This field is required")
        .typeError("Gender must be a number"),
      bornArea: Yup.string().required("This field is required"),
      country: Yup.string().required("This field is required"),
      addressOfHome: Yup.string().required("This field is required"),
      activityArea: Yup.string().required("This field is required"),
      bloodType: Yup.number()
        .required("This field is required")
        .typeError("Blood Type must be a number"),
      bodyType: Yup.number()
        .required("This field is required")
        .typeError("Body Type must be a number"),
      mbtiType: Yup.string().required("This field is required"),
      smoking: Yup.boolean().required("This field is required"),
      drinking: Yup.number()
        .required("This field is required")
        .typeError("Drinking must be a number"),
      selfIntroduce: Yup.string().required("This field is required"),
    }),
    onSubmit: async values => {
      const currentYear = new Date().getFullYear()
      const birthYear = parseInt(values.birth.split("-")[0], 10)
      const age = currentYear - birthYear

      const userInput = {
        birth: values.birth,
        age,
        gender: parseInt(values.gender, 10),
        height: values.height,
        weight: values.weight,
        bornArea: values.bornArea,
        country: values.country,
        addressOfHome: values.addressOfHome,
        activityArea: values.activityArea,
        bloodType: parseInt(values.bloodType, 10),
        bodyType: parseInt(values.bodyType, 10),
        mbtiType: values.mbtiType,
        drinking: parseInt(values.drinking, 10),
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
        const method =
          profileInfo?.profile !== null && profileInfo?.profile !== undefined
            ? "put"
            : "post"
        const res = await axios[method](url, userInput, config)
        // const res = await axios.put(url, userInput, config)
        console.log("기본정보 res", res)
        if (method === "post" && res.status === 201) {
          alert("기본정보 저장 성공")
        } else if (method === "put" && res.status === 200) {
          alert("기본정보 수정 성공")
        }
      } catch (e) {
        console.log("기본정보 에러", e)
      }
    },
  })

  useEffect(() => {
    if (profileInfo?.profile) {
      basicInfoFormik.setValues({
        birth: profileInfo.profile.birth
          ? new Date(profileInfo.profile.birth).toISOString().split("T")[0]
          : "1970-01-01",
        height: profileInfo.profile.height || 160,
        weight: profileInfo.profile.weight || 60,
        bornArea: profileInfo.profile.bornArea || "",
        country: profileInfo.profile.country || "",
        addressOfHome: profileInfo.profile.addressOfHome || "",
        gender: profileInfo.profile.gender.toString() || "",
        activityArea: profileInfo.profile.activityArea || "",
        bloodType: profileInfo.profile.bloodType || "",
        bodyType: profileInfo.profile.bodyType.toString() || "",
        mbtiType: profileInfo.profile.mbtiType || "",
        smoking: profileInfo.profile.smoking.toString() || "",
        selfIntroduce: profileInfo.profile.selfIntroduce || "",
        drinking: profileInfo.profile.drinking.toString() || "",
      })
    }
  }, [profileInfo])

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
      isChild: false,
      mExperience: 0,
      reasonForDivorce: "",
      childrenInfo: [],
    },
    validationSchema: Yup.object({
      mExperience: Yup.number().required("Marriage experience is required"),
      reasonForDivorce: Yup.string().required("Reason for divorce is required"),
    }),
    onSubmit: async values => {
      const currentYear = new Date().getFullYear()

      const userInput = {
        mExperience: parseInt(values.mExperience, 10),
        reasonForDivorce: values.reasonForDivorce,
        isChild: values.childrenInfo.length === 0 ? false : true,
        childrenInfo:
          values.childrenInfo.length > 0
            ? values.childrenInfo.map((child, index) => ({
                age: currentYear - values.childrenInfo[index].birthYear,
                birthYear: parseInt(child.birthYear, 10),
                childrenGender: parseInt(child.childrenGender, 10),
                parentingStatus: parseInt(child.parentingStatus, 10),
              }))
            : [
                {
                  age: 0,
                  birthYear: 0,
                  childrenGender: 0,
                  parentingStatus: 0,
                },
              ],
      }
      console.log("결혼 관련 userInput", userInput)

      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const method =
          profileInfo?.marriageInfo !== null &&
          profileInfo?.marriageInfo !== undefined
            ? "put"
            : "post"
        const url = "http://localhost/api/marriage"
        const res = await axios[method](url, userInput, config)
        console.log("결혼 관련 res", res)
        if (res.status === 201) {
          alert("결혼관련 정보 생성 성공")
        } else if (res.status === 200) {
          alert("결혼관련 정보 수정 성공")
        }
      } catch (e) {
        console.log("결혼 관련 e", e)
      }
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
    if (profileInfo?.marriageInfo) {
      marriageformik.setValues({
        mExperience: profileInfo.marriageInfo.mExperience || "",
        reasonForDivorce: profileInfo.marriageInfo.reasonForDivorce || "",
        childrenInfo:
          profileInfo.marriageInfo.childrenInfo?.map(child => ({
            birthYear: child.birthYear || "",
            childrenGender: child.childrenGender || "",
            parentingStatus: child.parentingStatus || "",
          })) || [],
      })
    }
  }, [profileInfo])

  // 종교
  const religionformik = useFormik({
    initialValues: {
      religionName: 0,
      attendanceAtReligious: 0,
    },
    validationSchema: Yup.object({
      religionName: Yup.number().required("Religion name is required"),
      attendanceAtReligious: Yup.number().required(
        "Attendance status is required"
      ),
    }),

    onSubmit: async values => {
      const userInput = {
        religionName: parseInt(values.religionName, 10),
        attendanceAtReligious: parseInt(values.attendanceAtReligious, 10),
      }
      console.log("종교 values", userInput)

      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const url = "http://localhost/api/religion"
        const method =
          profileInfo?.religionInfo !== null &&
          profileInfo?.religionInfo !== undefined
            ? "put"
            : "post"
        const res = await axios[method](url, userInput, config)
        console.log("종교 res", res)
        if (method === "post" && res.status === 201) {
          alert("종교 내용 저장 성공")
        } else if (method === "put" && res.status === 200) {
          alert("종교 내용 수정 성공")
        }
      } catch (e) {
        console.log("종교 error", e)
      }
    },
  })
  useEffect(() => {
    if (profileInfo?.religionInfo) {
      religionformik.setValues({
        religionName: profileInfo.religionInfo.religionName || "",
        attendanceAtReligious:
          profileInfo.religionInfo.attendanceAtReligious || "",
      })
    }
  }, [profileInfo])

  // 학력
  const handleEducationChange = e => {
    const value = e.target.value
    educationformik.handleChange(e)

    let graduatedSchoolsCount = 0

    // if (value === "1") {
    //   graduatedSchoolsCount = 1
    // } else if (["2", "3", "4"].includes(value)) {
    //   graduatedSchoolsCount = 2
    // } else if (value === "5") {
    //   graduatedSchoolsCount = 3
    // }

    switch (value) {
      case "1":
        graduatedSchoolsCount = 1
        break
      case "2":
      case "3":
      case "4":
        graduatedSchoolsCount = 2
        break
      case "5":
        graduatedSchoolsCount = 3
        break
      default:
        graduatedSchoolsCount = 0
    }

    const currentFields = educationformik.values.schoolInfos
    const newFields = Array(graduatedSchoolsCount)
      .fill(null)
      .map((_, index) => {
        return (
          currentFields[index] || {
            name: "",
            location: "",
            educationLevel: 0,
            isEducationLevel: 0,
            majors: [],
          }
        )
      })

    educationformik.setFieldValue("schoolInfos", newFields)
  }

  const addSchools = () => {
    const updatedSchoolInfos = [
      ...educationformik.values.schoolInfos,
      {
        name: "",
        location: "",
        educationLevel: 0,
        isEducationLevel: 0,
        majors: [],
      },
    ]
    educationformik.setFieldValue("schoolInfos", updatedSchoolInfos)
  }
  const removeSchools = index => {
    const updatedSchoolInfos = educationformik.values.schoolInfos.filter(
      (_, i) => i !== index
    )
    educationformik.setFieldValue("schoolInfos", updatedSchoolInfos)
  }

  const handleInputChange = (index, event) => {
    const value = event.target.value
    const updatedSchoolInfos = [...educationformik.values.schoolInfos]
    updatedSchoolInfos[index] = {
      ...updatedSchoolInfos[index],
      majors: value.split(",").map(item => item.trim()),
    }
    educationformik.setFieldValue("schoolInfos", updatedSchoolInfos)
  }

  const educationformik = useFormik({
    initialValues: {
      finalEduLevel: 0,
      schoolInfos: [],
    },
    validationSchema: Yup.object({
      finalEduLevel: Yup.string().required("Final education level is required"),
      schoolInfos: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required("School Name is required"),
            location: Yup.string().required("School Location is required"),
            educationLevel: Yup.number().required("EducationLevel is required"),
            isEducationLevel: Yup.number().required(
              "isEducationLevel is required"
            ),
            majors: Yup.string().required("majors is required"),
          })
        )
        .min(1, "At least one child is required"),
    }),

    onSubmit: async values => {
      const userInput = {
        finalEduLevel: parseInt(values.finalEduLevel, 10),
        schoolInfos: values.schoolInfos,
      }
      console.log("학력 userInput", userInput)

      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const url = "http://localhost/api/education"
        const res = await axios.post(url, userInput, config)
        console.log("학력 res", res)
        if (res.status === 201) {
          alert("학력 내용 저장 완료")
          const url = "http://localhost/api/education"
          const res = await axios.post(url, userInput, config)
          console.log("학력 res", res)
          if (res.status === 201) {
            alert("학력 내용 저장 완료")
          }
        }
      } catch (e) {
        console.log("학력error", e)
      }
    },
  })

  useEffect(() => {
    if (educationformik.values.schoolInfos.length === 0) {
      educationformik.setFieldValue("finalEduLevel", "0")
    }
  }, [educationformik.values.schoolInfos])

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

    onSubmit: async values => {
      const userInput = {
        jobName: values.jobName,
        workplace: values.workplace,
        roleAtWork: values.roleAtWork,
        addressOfCompany: values.addressOfCompany,
        salary: values.salary,
        annualIncome: values.annualIncome,
        additionalIncome: values.additionalIncome,
      }
      console.log("직업 userInput", userInput)

      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const url = "http://localhost/api/job"
        const res = await axios.post(url, userInput, config)
        console.log("직업 res", res)
        if (res.status === 201) {
          alert("직업 내용 저장 성공")
          const res = await axios.post(url, userInput, config)
          console.log("직업 res", res)
          if (res.status === 201) {
            alert("직업 내용 저장 성공")
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
  })

  // 증빙서류
  const handleMarriageFile = e => {
    const marriageFile = e.target.files[0]
    certificateformik.setFieldValue("marriageFile", marriageFile)
  }

  // 최종학력 졸업증명서 칸
  const [additionalGraduationInputs, setAdditionalGraduationInputs] = useState(
    []
  )

  const handleGraduationFile = e => {
    const graduationFile = e.target.files?.[0]
    certificateformik.setFieldValue(e.target.name, graduationFile)
  }
  const addGraduationFileInput = () => {
    const newFieldName = `graduationFile_${
      additionalGraduationInputs.length + 1
    }`
    setAdditionalGraduationInputs(prev => [...prev, newFieldName])
    certificateformik.setFieldValue(newFieldName, "")
  }
  const removeGraduationFileInput = fieldName => {
    setAdditionalGraduationInputs(prev =>
      prev.filter(name => name !== fieldName)
    )
    certificateformik.setFieldValue(fieldName, undefined)
  }

  // 재직증명서
  // 혼인증명서
  const handleEmploymentFile = e => {
    const employmentFile = e.target.files[0]
    certificateformik.setFieldValue("employmentFile", employmentFile)
  }

  const certificateformik = useFormik({
    initialValues: {
      marriageFile: "",
      graduationFile: "",
      employmentFile: "",
    },
    validationSchema: Yup.object({
      marriageFile: Yup.mixed().required("This field is required"),
      graduationFile: Yup.mixed().required("This field is required"),
      employmentFile: Yup.mixed().required("This field is required"),
    }),

    onSubmit: values => {
      // const formData = new FormData()
      // formData.append("workfile", medic)

      try {
        console.log("증명서밸류", values)
      } catch (e) {
        console.log(e)
      }
    },
  })

  // 프로필 이미지 업로드 의 이미지
  const [selectedFiles, setselectedFiles] = useState([])

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    if (files.length < 6) {
      setselectedFiles(files)
    } else {
      alert("파일은 5개까지만 등록할 수 있습니다.")
    }
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  // 프로필 이미지 업로드
  const profileimageformik = useFormik({
    initialValues: {
      profileImageUpload: [],
    },
    validationSchema: Yup.object({
      profileImageUpload: Yup.mixed().required("This field is required"),
    }),

    onSubmit: async values => {
      try {
        const token = localStorage.getItem("token")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const url = "http://localhost/api/job"
        const res = await axios.post(url, selectedFiles, config)
        console.log("직업 res", res)
        // if (res.status === 201) {
        //   alert("직업 내용 저장 성공")
        // }
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
                      <i className="bx bxs-user d-block check-nav-icon mt-4 mb-2" />
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
                      <i className="bx bx-briefcase d-block check-nav-icon mt-4 mb-2" />
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
                      <i className="bx bx-heart d-block check-nav-icon mt-4 mb-2" />
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
                    <CardContainer title={"기본 프로필"}>
                      <Form onSubmit={basicInfoFormik.handleSubmit}>
                        <Row>
                          <Col xl={12}>
                            <div className="form-floating mb-3">
                              <select
                                className="form-select"
                                name="country"
                                value={basicInfoFormik.values.country}
                                onChange={basicInfoFormik.handleChange}
                                onBlur={basicInfoFormik.handleBlur}
                              >
                                <option defaultValue="">
                                  Open this select Country
                                </option>
                                <option value="한국">한국</option>
                                <option value="일본">일본</option>
                                <option value="미국">미국</option>
                              </select>
                              <label htmlFor="floatingSelectGrid">국적</label>
                              <div>
                                {basicInfoFormik.errors.country &&
                                basicInfoFormik.touched.country ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.country}
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
                                <option defaultValue="">
                                  Open this select your Blood Type
                                </option>
                                <option value={1}>A형</option>
                                <option value={2}>B형</option>
                                <option value={3}>AB형</option>
                                <option value={4}>O형</option>
                              </select>
                              <label htmlFor="floatingSelectGrid">혈액형</label>
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
                                  Open this select your MBTI Type
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
                                <option defaultValue="">
                                  Open this select your Drinking Information
                                </option>
                                <option value="0">아예 안마심</option>
                                <option value="1">가끔 한두잔</option>
                                <option value="2">주에 한번</option>
                                <option value="3">주에 두번 이상</option>
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
                                value={
                                  basicInfoFormik.values.smoking === true
                                    ? "true"
                                    : "false"
                                }
                                onChange={e =>
                                  basicInfoFormik.setFieldValue(
                                    "smoking",
                                    e.target.value === "true"
                                  )
                                }
                                onBlur={basicInfoFormik.handleBlur}
                              >
                                <option defaultValue="">
                                  Open this select your Smoking Status
                                </option>
                                <option value="true">흡연자</option>
                                <option value="false">비흡연자</option>
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
                                name="gender"
                                value={basicInfoFormik.values.gender}
                                onChange={basicInfoFormik.handleChange}
                                onBlur={basicInfoFormik.handleBlur}
                              >
                                <option value="">
                                  Open this select your Body Type
                                </option>
                                <option value="0">남자</option>
                                <option value="1">여자</option>
                                <option value="2">중성</option>
                              </select>
                              <label htmlFor="floatingSelectGrid">성별</label>
                              <div>
                                {basicInfoFormik.errors.gender &&
                                basicInfoFormik.touched.gender ? (
                                  <span className="text-danger">
                                    {basicInfoFormik.errors.gender}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          <Col xl={6}>
                            <div className="form-floating mb-3">
                              <select
                                className="form-select"
                                name="bodyType"
                                value={basicInfoFormik.values.bodyType}
                                onChange={basicInfoFormik.handleChange}
                                onBlur={basicInfoFormik.handleBlur}
                              >
                                <option value="">
                                  Open this select your Body Type
                                </option>
                                <option value="0">마름</option>
                                <option value="1">슬림</option>
                                <option value="2">보통</option>
                                <option value="3">볼륨</option>
                                <option value="4">근육</option>
                                <option value="5">통통</option>
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
                              <Label>회원님의 간략한 소개를 적어주세요.</Label>
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
                          >
                            기본 프로필 저장
                          </button>
                        </div>
                      </Form>
                    </CardContainer>

                    <CardContainer title={"결혼관련"}>
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
                                결혼 여부
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
                              <Input
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
                                value={
                                  marriageformik.values.childrenInfo.length > 0
                                    ? 1
                                    : 0
                                }
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
                                <option value={1}>있음</option>
                                <option value={0}>없음</option>
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
                                marriageformik.values.childrenInfo.length === 0
                                  ? true
                                  : false
                              }
                              onClick={addChild}
                              className="btn btn-primary w-100 mb-3"
                            >
                              + <div>추가하기</div>
                            </button>
                          </Col>
                        </Row>

                        {marriageformik.values.childrenInfo.map(
                          (child, index) => (
                            <Row key={index}>
                              <Col xl={3}>
                                <div className="form-floating mb-3">
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
                                  <label htmlFor="childrenInfo">
                                    자녀 성별
                                  </label>
                                </div>
                              </Col>

                              <Col xl={3}>
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name={`childrenInfo[${index}].birthYear`}
                                    value={child.birthYear || ""}
                                    onChange={marriageformik.handleChange}
                                  />
                                  <label htmlFor="childrenInfo">
                                    자녀 출생연도
                                  </label>
                                </div>
                              </Col>

                              <Col xl={3}>
                                <div className="form-floating mb-3">
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
                                  <label htmlFor="childrenInfo">
                                    양육 여부
                                  </label>
                                </div>
                              </Col>

                              <Col xl={3}>
                                <button
                                  type="button"
                                  onClick={() => removeChild(index)}
                                  className="btn btn-danger w-100 mb-3"
                                >
                                  - <div>삭제하기</div>
                                </button>
                              </Col>
                            </Row>
                          )
                        )}

                        <button type="submit" className="btn btn-primary w-md">
                          결혼 관련 저장
                        </button>
                      </Form>
                    </CardContainer>

                    <CardContainer title={"종교관련"}>
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
                                <option defaultValue={0}>
                                  Open this select your religion
                                </option>
                                <option value={1}>개신교</option>
                                <option value={2}>천주교</option>
                                <option value={3}>불교</option>
                                <option value={4}>무교</option>
                                <option value={5}>기타</option>
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
                                <option defaultValue={0}>
                                  Open this select attendance at religious
                                </option>
                                <option value={1}>매주 출석</option>
                                <option value={2}>때때로 출석</option>
                                <option value={3}>출석하지 않음</option>
                                <option value={4}>해당사항 없음</option>
                              </select>
                              <label htmlFor="floatingSelectGrid">
                                출석 상황
                              </label>
                              <div>
                                {religionformik.errors.attendanceAtReligious &&
                                religionformik.touched.attendanceAtReligious ? (
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
                    </CardContainer>
                  </TabPane>

                  <TabPane tabId="2" id="v-pills-confir" role="tabpanel">
                    <CardContainer title={"학력관련"}>
                      <Form onSubmit={educationformik.handleSubmit}>
                        <Row>
                          <Col xl={9}>
                            <div className="form-floating mb-3">
                              <select
                                className="form-select"
                                name="finalEduLevel"
                                value={educationformik.values.finalEduLevel}
                                onChange={handleEducationChange}
                                onBlur={educationformik.handleBlur}
                              >
                                <option value={0}>
                                  Select your education level
                                </option>
                                <option value="1">고등학교</option>
                                <option value="2">대학교(2년제)</option>
                                <option value="3">대학교(3년제)</option>
                                <option value="4">대학교(4년제)</option>
                                <option value="5">대학원</option>
                              </select>

                              <label htmlFor="floatingSelectGrid">
                                최종학력
                              </label>
                              <div>
                                {educationformik.errors.finalEduLevel &&
                                educationformik.touched.finalEduLevel ? (
                                  <span className="text-danger">
                                    {educationformik.errors.finalEduLevel}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          <Col xl={3}>
                            <button
                              type="button"
                              disabled={
                                educationformik.values.schoolInfos.length === 0
                                  ? true
                                  : false
                              }
                              onClick={addSchools}
                              className="btn btn-primary w-100 mb-3"
                            >
                              +<div>추가하기</div>
                            </button>
                          </Col>
                        </Row>

                        {educationformik.values.schoolInfos.map(
                          (edu, index) => (
                            <div key={index}>
                              <Row>
                                <Col xl={4}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="text"
                                      name={`schoolInfos[${index}].name`}
                                      className="form-control"
                                      placeholder="School Name"
                                      value={edu.name}
                                      onChange={educationformik.handleChange}
                                    />
                                    <label>학교 이름</label>
                                  </div>
                                </Col>

                                <Col xl={4}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="text"
                                      name={`schoolInfos[${index}].majors`}
                                      className="form-control"
                                      placeholder="Majors"
                                      value={edu.majors?.join(", ")}
                                      onChange={e =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                    <label>전공</label>
                                  </div>
                                </Col>

                                <Col xl={4}>
                                  <div className="form-floating mb-3">
                                    <input
                                      type="text"
                                      name={`schoolInfos[${index}].location`}
                                      className="form-control"
                                      placeholder="Campus Location"
                                      value={edu.location}
                                      onChange={educationformik.handleChange}
                                    />
                                    <label>캠퍼스 위치</label>
                                  </div>
                                </Col>

                                <Col xl={5}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name={`schoolInfos[${index}].educationLevel`}
                                      value={edu.educationLevel}
                                      onChange={educationformik.handleChange}
                                    >
                                      <option value={0}>
                                        Select Education Type
                                      </option>
                                      <option value={1}>고등학교 졸업</option>
                                      <option value={2}>대학 중퇴</option>
                                      <option value={3}>전문대 졸업</option>

                                      <option value={5}>대학교</option>
                                      <option value={6}>대학원 졸업</option>
                                    </select>
                                    <label>학력 구분</label>
                                  </div>
                                </Col>

                                <Col xl={5}>
                                  <div className="form-floating mb-3">
                                    <select
                                      className="form-select"
                                      name={`schoolInfos[${index}].isEducationLevel`}
                                      value={edu.isEducationLevel}
                                      onChange={educationformik.handleChange}
                                    >
                                      <option value={0}>
                                        Select Graduation Status
                                      </option>
                                      <option value={1}>졸업</option>
                                      <option value={2}>재학</option>
                                      <option value={3}>자퇴</option>
                                    </select>
                                    <label>졸업 구분</label>
                                  </div>
                                </Col>

                                <Col xl={2}>
                                  <button
                                    type="button"
                                    className="btn btn-danger w-100 mb-3"
                                    onClick={() => {
                                      removeSchools(index)
                                    }}
                                  >
                                    -<div>삭제하기</div>
                                  </button>
                                </Col>
                              </Row>
                            </div>
                          )
                        )}

                        <div>
                          <button
                            type="submit"
                            className="btn btn-primary w-md"
                          >
                            학력관련 저장
                          </button>
                        </div>
                      </Form>
                    </CardContainer>

                    <CardContainer title={"직업관련"}>
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
                              <label htmlFor="floatingnameInput">직장명</label>
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
                              <label htmlFor="floatingnameInput">총수입</label>
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
                    </CardContainer>
                  </TabPane>

                  <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
                    <CardContainer title={"자기소개"}>
                      <Form onSubmit={idealloveformik.handleSubmit}>
                        <Row>
                          <Col xl={12}>
                            <div className="mb-4">
                              <Label>
                                나를 한줄로 표현하면 (신체 특징이 아닌 나의
                                성격, 정체성 등){" "}
                              </Label>
                              <Input
                                type="textarea"
                                name="myAppearance"
                                className="form-control"
                                id="myAppearance"
                                rows="3"
                                placeholder="믿음직하고 주변을 즐겁게 하는 사람"
                                value={idealloveformik.values.myAppearance}
                                onChange={idealloveformik.handleChange}
                                onBlur={idealloveformik.handleBlur}
                              />
                              <div>
                                {idealloveformik.errors.myAppearance &&
                                idealloveformik.touched.myAppearance ? (
                                  <span className="text-danger">
                                    {idealloveformik.errors.myAppearance}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={12}>
                            <div className="mb-4">
                              <Label>나의 매력과 장점이 있다면</Label>
                              <Input
                                type="textarea"
                                name="expressOneLine"
                                className="form-control"
                                id="expressOneLine"
                                rows="3"
                                placeholder="주변 사람들과 잘 어울리고 사람들을 편하게 해주는 편입니다"
                                value={idealloveformik.values.expressOneLine}
                                onChange={idealloveformik.handleChange}
                                onBlur={idealloveformik.handleBlur}
                              />
                              {idealloveformik.errors.expressOneLine &&
                              idealloveformik.touched.expressOneLine ? (
                                <span className="text-danger">
                                  {idealloveformik.errors.expressOneLine}
                                </span>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={12}>
                            <div className="mb-4">
                              <Label>나의 외모 특징은 무엇인가요?</Label>
                              <Input
                                type="textarea"
                                name="characteristicsMyAppearance"
                                className="form-control"
                                id="characteristicsMyAppearance"
                                rows="3"
                                placeholder="키가 크진 않지만 비율이 좋아서 생각보다 키가 커 보인다고 합니다"
                                value={
                                  idealloveformik.values
                                    .characteristicsMyAppearance
                                }
                                onBlur={idealloveformik.handleBlur}
                              />
                              {idealloveformik.errors
                                .characteristicsMyAppearance &&
                              idealloveformik.touched
                                .characteristicsMyAppearance ? (
                                <span className="text-danger">
                                  {
                                    idealloveformik.errors
                                      .characteristicsMyAppearance
                                  }
                                </span>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={12}>
                            <div className="mb-4">
                              <Label>지금 하는 일의 장점은 무엇인가요?</Label>
                              <Input
                                type="textarea"
                                name="myWorkStrongPoint"
                                className="form-control"
                                id="myWorkStrongPoint"
                                rows="3"
                                placeholder="내 일만 열심히 하면 편하게 일할 수 있는 환경"
                                value={idealloveformik.values.myWorkStrongPoint}
                                onChange={idealloveformik.handleChange}
                                onBlur={idealloveformik.handleBlur}
                              />
                              {idealloveformik.errors.myWorkStrongPoint &&
                              idealloveformik.touched.myWorkStrongPoint ? (
                                <span className="text-danger">
                                  {idealloveformik.errors.myWorkStrongPoint}
                                </span>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={12}>
                            <div className="mb-4">
                              <Label>
                                앞으로 하고 싶은 일 (직업관, 안정성 vs. 진취성)
                              </Label>
                              <Input
                                type="textarea"
                                name="iWantToDo"
                                className="form-control"
                                id="iWantToDo"
                                rows="3"
                                placeholder="지금 하고 있는 일을 더욱 발전시켜 인정받고 싶습니다"
                                value={idealloveformik.values.iWantToDo}
                                onChange={idealloveformik.handleChange}
                                onBlur={idealloveformik.handleBlur}
                              />
                              {idealloveformik.errors.iWantToDo &&
                              idealloveformik.touched.iWantToDo ? (
                                <span className="text-danger">
                                  {idealloveformik.errors.iWantToDo}
                                </span>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        {Object.keys(favoriteCategories).map(categoryKey => (
                          <>
                            <Label>
                              {favoriteCategories[categoryKey].title} (
                              {favoriteCategories[categoryKey].title} 항목은 5개
                              까지만 선택 가능)
                            </Label>
                            <Row
                              key={categoryKey}
                              className="icon-demo-content gx-1 mb-3"
                            >
                              {favoriteCategories[categoryKey].items.map(
                                item => (
                                  <Col xl={2} key={item.id} className="my-1">
                                    <div
                                      className="py-3 rounded-3 w-100 border-0 "
                                      onClick={() =>
                                        handleToggle(categoryKey, item.value)
                                      }
                                      style={{
                                        backgroundColor: activeStates[
                                          categoryKey
                                        ]?.[item.value]
                                          ? "#556EE6"
                                          : "#F5F5F5",
                                        color: activeStates[categoryKey]?.[
                                          item.value
                                        ]
                                          ? "white"
                                          : "black",
                                      }}
                                    >
                                      <box-icon
                                        className="mb-1"
                                        name={item.label}
                                        type="solid"
                                        color={
                                          activeStates[categoryKey]?.[
                                            item.value
                                          ]
                                            ? "white"
                                            : "gray"
                                        }
                                      ></box-icon>
                                      <div>{item.value}</div>
                                    </div>
                                  </Col>
                                )
                              )}
                            </Row>
                          </>
                        ))}

                        <Row>
                          <Col xl={12}>
                            <button
                              type="submit"
                              className="btn btn-primary w-md"
                            >
                              취미 / 운동 / 관심사 저장
                            </button>
                          </Col>
                        </Row>
                      </Form>
                    </CardContainer>

                    <CardContainer title={"이상형 인터뷰"}>
                      {/*<Form onSubmit={idealloveformik.handleSubmit}>*/}
                      {/*  <Row>*/}
                      {/*    <Col xl={12}>*/}
                      {/*      <div className="mb-4">*/}
                      {/*        <Label>*/}
                      {/*          나를 한줄로 표현하면 (신체 특징이 아닌 나의*/}
                      {/*          성격, 정체성 등){" "}*/}
                      {/*        </Label>*/}
                      {/*        <Input*/}
                      {/*          type="textarea"*/}
                      {/*          name="myAppearance"*/}
                      {/*          className="form-control"*/}
                      {/*          id="myAppearance"*/}
                      {/*          rows="3"*/}
                      {/*          placeholder="믿음직하고 주변을 즐겁게 하는 사람"*/}
                      {/*          value={idealloveformik.values.myAppearance}*/}
                      {/*          onChange={idealloveformik.handleChange}*/}
                      {/*          onBlur={idealloveformik.handleBlur}*/}
                      {/*        />*/}
                      {/*        <div>*/}
                      {/*          {idealloveformik.errors.myAppearance &&*/}
                      {/*          idealloveformik.touched.myAppearance ? (*/}
                      {/*            <span className="text-danger">*/}
                      {/*              {idealloveformik.errors.myAppearance}*/}
                      {/*            </span>*/}
                      {/*          ) : null}*/}
                      {/*        </div>*/}
                      {/*      </div>*/}
                      {/*    </Col>*/}
                      {/*  </Row>*/}
                      {/*  <Row>*/}
                      {/*    <Col xl={12}>*/}
                      {/*      <div className="mb-4">*/}
                      {/*        <Label>나의 매력과 장점이 있다면</Label>*/}
                      {/*        <Input*/}
                      {/*          type="textarea"*/}
                      {/*          name="expressOneLine"*/}
                      {/*          className="form-control"*/}
                      {/*          id="expressOneLine"*/}
                      {/*          rows="3"*/}
                      {/*          placeholder="주변 사람들과 잘 어울리고 사람들을 편하게 해주는 편입니다"*/}
                      {/*          value={idealloveformik.values.expressOneLine}*/}
                      {/*          onChange={idealloveformik.handleChange}*/}
                      {/*          onBlur={idealloveformik.handleBlur}*/}
                      {/*        />*/}
                      {/*        {idealloveformik.errors.expressOneLine &&*/}
                      {/*        idealloveformik.touched.expressOneLine ? (*/}
                      {/*          <span className="text-danger">*/}
                      {/*            {idealloveformik.errors.expressOneLine}*/}
                      {/*          </span>*/}
                      {/*        ) : null}*/}
                      {/*      </div>*/}
                      {/*    </Col>*/}
                      {/*  </Row>*/}
                      {/*  <Row>*/}
                      {/*    <Col xl={12}>*/}
                      {/*      <div className="mb-4">*/}
                      {/*        <Label>나의 외모 특징은 무엇인가요?</Label>*/}
                      {/*        <Input*/}
                      {/*          type="textarea"*/}
                      {/*          name="characteristicsMyAppearance"*/}
                      {/*          className="form-control"*/}
                      {/*          id="characteristicsMyAppearance"*/}
                      {/*          rows="3"*/}
                      {/*          placeholder="키가 크진 않지만 비율이 좋아서 생각보다 키가 커 보인다고 합니다"*/}
                      {/*          value={idealloveformik.values.characteristicsMyAppearance}*/}
                      {/*          onChange={idealloveformik.handleChange}*/}
                      {/*          onBlur={idealloveformik.handleBlur}*/}
                      {/*        />*/}
                      {/*        {idealloveformik.errors.characteristicsMyAppearance &&*/}
                      {/*        idealloveformik.touched.characteristicsMyAppearance ? (*/}
                      {/*          <span className="text-danger">*/}
                      {/*            {idealloveformik.errors.characteristicsMyAppearance}*/}
                      {/*          </span>*/}
                      {/*        ) : null}*/}
                      {/*      </div>*/}
                      {/*    </Col>*/}
                      {/*  </Row>*/}
                      {/*  <Row>*/}
                      {/*    <Col xl={12}>*/}
                      {/*      <div className="mb-4">*/}
                      {/*        <Label>지금 하는 일의 장점은 무엇인가요?</Label>*/}
                      {/*        <Input*/}
                      {/*          type="textarea"*/}
                      {/*          name="myWorkStrongPoint"*/}
                      {/*          className="form-control"*/}
                      {/*          id="myWorkStrongPoint"*/}
                      {/*          rows="3"*/}
                      {/*          placeholder="내 일만 열심히 하면 편하게 일할 수 있는 환경"*/}
                      {/*          value={idealloveformik.values.myWorkStrongPoint}*/}
                      {/*          onChange={idealloveformik.handleChange}*/}
                      {/*          onBlur={idealloveformik.handleBlur}*/}
                      {/*        />*/}
                      {/*        {idealloveformik.errors.myWorkStrongPoint &&*/}
                      {/*        idealloveformik.touched.myWorkStrongPoint ? (*/}
                      {/*          <span className="text-danger">*/}
                      {/*            {idealloveformik.errors.myWorkStrongPoint}*/}
                      {/*          </span>*/}
                      {/*        ) : null}*/}
                      {/*      </div>*/}
                      {/*    </Col>*/}
                      {/*  </Row>*/}
                      {/*  <Row>*/}
                      {/*    <Col xl={12}>*/}
                      {/*      <div className="mb-4">*/}
                      {/*        <Label>*/}
                      {/*          앞으로 하고 싶은 일 (직업관, 안정성 vs.*/}
                      {/*          진취성)*/}
                      {/*        </Label>*/}
                      {/*        <Input*/}
                      {/*          type="textarea"*/}
                      {/*          name="iWantToDo"*/}
                      {/*          className="form-control"*/}
                      {/*          id="iWantToDo"*/}
                      {/*          rows="3"*/}
                      {/*          placeholder="지금 하고 있는 일을 더욱 발전시켜 인정받고 싶습니다"*/}
                      {/*          value={idealloveformik.values.iWantToDo}*/}
                      {/*          onChange={idealloveformik.handleChange}*/}
                      {/*          onBlur={idealloveformik.handleBlur}*/}
                      {/*        />*/}
                      {/*        {idealloveformik.errors.iWantToDo &&*/}
                      {/*        idealloveformik.touched.iWantToDo ? (*/}
                      {/*          <span className="text-danger">*/}
                      {/*            {idealloveformik.errors.iWantToDo}*/}
                      {/*          </span>*/}
                      {/*        ) : null}*/}
                      {/*      </div>*/}
                      {/*    </Col>*/}
                      {/*  </Row>*/}

                      {/*  {Object.keys(favoriteCategories).map(categoryKey => (*/}
                      {/*    <>*/}
                      {/*      <Label>*/}
                      {/*        {favoriteCategories[categoryKey].title} (*/}
                      {/*        {favoriteCategories[categoryKey].title} 항목은*/}
                      {/*        5개 까지만 선택 가능)*/}
                      {/*      </Label>*/}
                      {/*      <Row*/}
                      {/*        key={categoryKey}*/}
                      {/*        className="icon-demo-content gx-1 mb-3"*/}
                      {/*      >*/}
                      {/*        {favoriteCategories[categoryKey].items.map(*/}
                      {/*          item => (*/}
                      {/*            <Col xl={2} key={item.id} className="my-1">*/}
                      {/*              <div*/}
                      {/*                className="py-3 rounded-3 w-100 border-0 "*/}
                      {/*                onClick={() =>*/}
                      {/*                  handleToggle(categoryKey, item.value)*/}
                      {/*                }*/}
                      {/*                style={{*/}
                      {/*                  backgroundColor: activeStates[*/}
                      {/*                    categoryKey*/}
                      {/*                    ]?.[item.value]*/}
                      {/*                    ? "#556EE6"*/}
                      {/*                    : "#F5F5F5",*/}
                      {/*                  color: activeStates[categoryKey]?.[*/}
                      {/*                    item.value*/}
                      {/*                    ]*/}
                      {/*                    ? "white"*/}
                      {/*                    : "black"*/}
                      {/*                }}*/}
                      {/*              >*/}
                      {/*                <box-icon*/}
                      {/*                  className="mb-1"*/}
                      {/*                  name={item.label}*/}
                      {/*                  type="solid"*/}
                      {/*                  color={*/}
                      {/*                    activeStates[categoryKey]?.[*/}
                      {/*                      item.value*/}
                      {/*                      ]*/}
                      {/*                      ? "white"*/}
                      {/*                      : "gray"*/}
                      {/*                  }*/}
                      {/*                ></box-icon>*/}
                      {/*                <div>{item.value}</div>*/}
                      {/*              </div>*/}
                      {/*            </Col>*/}
                      {/*          )*/}
                      {/*        )}*/}
                      {/*      </Row>*/}
                      {/*    </>*/}
                      {/*  ))}*/}

                      {/*  <Row>*/}
                      {/*    <Col xl={12}>*/}
                      {/*      <button*/}
                      {/*        type="submit"*/}
                      {/*        className="btn btn-primary w-md"*/}
                      {/*      >*/}
                      {/*        취미 / 운동 / 관심사 저장*/}
                      {/*      </button>*/}
                      {/*    </Col>*/}
                      {/*  </Row>*/}
                      {/*</Form>*/}
                    </CardContainer>
                  </TabPane>

                  <TabPane tabId="4" id="v-pills-confir" role="tabpanel">
                    <CardContainer title={"직업관련"}>
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
                    </CardContainer>
                  </TabPane>

                  <TabPane tabId="5" id="v-pills-confir" role="tabpanel">
                    <CardContainer title={"증빙서류"}>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          certificateformik.submitForm()
                        }}
                      >
                        <Row>
                          <Col sm={12}>
                            <div className="mt-4">
                              <Label
                                htmlFor="formFileLg"
                                className="form-label"
                              >
                                혼인증명서 (필수)
                              </Label>
                              <div className="input-group">
                                <Input
                                  type="file"
                                  className="form-control"
                                  name="marriageFile"
                                  id="marriageFile"
                                  accept="image/png, image/jpeg, image/jpg"
                                  onChange={handleMarriageFile}
                                />
                                <Label
                                  className="input-group-text"
                                  htmlFor="inputGroupFile02"
                                >
                                  Upload
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col sm={12}>
                            <div className="mt-4">
                              <Label
                                htmlFor="formFileLg"
                                className="form-label"
                              >
                                최종학력 졸업증명서 (필수)
                              </Label>
                              <div className="input-group">
                                <input
                                  type="file"
                                  className="form-control"
                                  name="graduationFile"
                                  id="graduationFile"
                                  accept="image/png, image/jpeg, image/jpg"
                                  onChange={handleGraduationFile}
                                />
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={addGraduationFileInput}
                                >
                                  추가하기
                                </button>
                              </div>
                            </div>

                            {additionalGraduationInputs.map(
                              (fieldName, index) => (
                                <div
                                  className="input-group mt-3"
                                  key={fieldName}
                                >
                                  <input
                                    type="file"
                                    className="form-control"
                                    name={fieldName}
                                    id={fieldName}
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleGraduationFile}
                                  />
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() =>
                                      removeGraduationFileInput(fieldName)
                                    }
                                  >
                                    삭제하기
                                  </button>
                                </div>
                              )
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col sm={12}>
                            <div className="mt-4">
                              <Label
                                htmlFor="formFileLg"
                                className="form-label"
                              >
                                재직증명서 또는 의료보험증 사본 (필수)
                              </Label>
                              <div className="input-group">
                                <Input
                                  type="file"
                                  className="form-control"
                                  name="employmentFile"
                                  id="employmentFile"
                                  accept="image/png, image/jpeg, image/jpg"
                                  onChange={handleEmploymentFile}
                                />
                                <Label
                                  className="input-group-text"
                                  htmlFor="inputGroupFile02"
                                >
                                  Upload
                                </Label>
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
                    </CardContainer>

                    <CardContainer title={"프로필 이미지 업로드"}>
                      <Form onSubmit={profileimageformik.handleSubmit}>
                        <Row>
                          <Col sm={12}>
                            <CardSubtitle className="mb-3">
                              {" "}
                              회원님의 평상시 잘 나온 사진들을 업로드 자유롭게
                              업로드 해 주시면 됩니다. (최대 5장까지 가능)
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
                                <Row>
                                  {selectedFiles.map((f, i) => {
                                    return (
                                      <Col key={i + "-file"}>
                                        <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
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
                                      </Col>
                                    )
                                  })}
                                </Row>
                              </div>
                            </Form>
                          </Col>
                        </Row>

                        <div className={"mt-3"}>
                          <button
                            type="submit"
                            className="btn btn-primary w-md"
                          >
                            프로필 이미지 업로드
                          </button>
                        </div>
                      </Form>
                    </CardContainer>
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
