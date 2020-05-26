import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin={true} />;

interface Props {
  spin: boolean;
  tip: string;
}

export const Checker: React.FC<Props> = ({ spin, tip, children }) => {
  return (
    <>
      {spin ? <div style={{ padding: 24 }}><Spin indicator={antIcon} tip={tip} /></div> : children}
    </>
  )
}

