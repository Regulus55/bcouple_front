import axios from "axios"
import { useFormik } from "formik"
import useProfile from "hooks/useProfile"
import React, { useEffect, useState } from "react"

import { Button, Col, Row, Form } from "reactstrap"
import * as Yup from "yup"

const Consent = () => {
  const { data: profileInfo } = useProfile()

  const agreements = [
    { id: 1, label: "14세 이상입니다(필수)", key: "overTwenty" },
    { id: 2, label: "이용약관(필수)", key: "agreeOfTerm" },
    {
      id: 3,
      label: "개인정보수집 및 이용동의(필수)",
      key: "agreeOfPersonalInfo"
    },
    {
      id: 4,
      label: "개인정보 마케팅 활용 동의(선택)",
      key: "agreeOfMarketing"
    },
    { id: 5, label: "이벤트, 특가 알림 및 SMS 등 수신(선택)", key: "etc" }
  ]

  const [initialValues, setInitialValues] = useState({
    consent: {
      overTwenty: false,
      agreeOfTerm: false,
      agreeOfPersonalInfo: false,
      agreeOfMarketing: false,
      etc: false
    }
  })

  const handleSingleCheck = (checked, key) => {
    consentformik.setFieldValue(`consent.${key}`, checked)
  }

  const handleAllCheck = checked => {
    const updatedConsent = agreements.reduce((acc, cur) => {
      acc[cur.key] = checked
      return acc
    }, {})
    consentformik.setFieldValue("consent", updatedConsent)
  }

  const consentformik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true, // 값이 변경될 때마다 form을 새로 초기화하도록 함
    validationSchema: Yup.object({
      consent: Yup.object({
        overTwenty: Yup.boolean().oneOf([true], "필수 약관에 동의해주세요."),
        agreeOfTerm: Yup.boolean().oneOf([true], "필수 약관에 동의해주세요."),
        agreeOfPersonalInfo: Yup.boolean().oneOf(
          [true],
          "필수 약관에 동의해주세요."
        ),
        agreeOfMarketing: Yup.boolean(),
        etc: Yup.boolean()
      })
    }),

    onSubmit: async values => {
      console.log("제출 데이터:", values.consent)

      const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const url = "http://localhost/api/consent"
      const res = await axios.put(url, values.consent, config)
      console.log("콘센트결과", res)
      if (res.status == 200) {
        alert("약관동의 변경 성공")
      }
    }
  })

  useEffect(() => {
    setInitialValues({
      consent: {
        overTwenty: profileInfo?.consent.overTwenty || false,
        agreeOfTerm: profileInfo?.consent.agreeOfTerm || false,
        agreeOfPersonalInfo: profileInfo?.consent.agreeOfPersonalInfo || false,
        agreeOfMarketing: profileInfo?.consent.agreeOfMarketing || false,
        etc: profileInfo?.consent.etc || false
      }
    })
  }, [profileInfo])

  return (
    <Form onSubmit={consentformik.handleSubmit}>
      <Row>
        <Col xl={12}>
          <div className="signup-consent p-3 border border-2 rounded">
            <div className="form-check">
              <input
                type="checkbox"
                id="select-all"
                className="form-check-input"
                onChange={e => handleAllCheck(e.target.checked)}
                checked={Object.values(consentformik.values.consent).every(
                  Boolean
                )}
              />
              <label htmlFor="select-all" className="form-check-label">
                전체 선택
              </label>
            </div>
            <hr className="border-2" />
            {agreements.map(item => (
              <div key={item.id} className="form-check mb-3">
                <input
                  type="checkbox"
                  id={`agreement-${item.id}`}
                  className="form-check-input"
                  checked={consentformik.values.consent[item.key]}
                  onChange={e => handleSingleCheck(e.target.checked, item.key)}
                />
                <label
                  htmlFor={`agreement-${item.id}`}
                  className="form-check-label"
                >
                  {item.label}
                </label>
                {consentformik.errors.consent?.[item.key] &&
                  consentformik.touched.consent?.[item.key] && (
                    <div className="text-danger">
                      {consentformik.errors.consent[item.key]}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button type="submit" color="primary">
          약관동의 업데이트
        </Button>
      </div>
    </Form>
  )
}

export default Consent
