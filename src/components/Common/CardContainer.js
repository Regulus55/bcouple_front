import React from "react"
import { Card, CardBody, CardTitle } from "reactstrap"

const CardContainer = ({title, children}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4" className={"mb-4"}>
          {title}
        </CardTitle>
        {children}
      </CardBody>
    </Card>
  )
}

export default CardContainer