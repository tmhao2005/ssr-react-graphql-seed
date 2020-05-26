import React from "react";
import { Row, Col } from "antd";

export const Responsive: React.SFC = (props) => {
  return (
    <Row>
      <Col xs={0} md={2} lg={4} />
      <Col xs={24} md={22} lg={16}>{props.children}</Col>
      <Col xs={0} md={2} lg={4} />
    </Row>
  )
}
