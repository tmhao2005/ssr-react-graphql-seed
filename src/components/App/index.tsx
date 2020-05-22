import React from "react";
import { injectGlobal } from "emotion";
import { Layout, Menu, Row, Col } from "antd";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Route, Switch, Link } from "react-router-dom";
import { Fetch } from "../Patterns/Fetch";
import { FetchRenderProp } from "../Patterns/Fetch-render-prop";
import { FetchWithHOC } from "../Patterns/Fetch-with-HOC";
import { FetchWithHook } from "../Patterns/Fetch-with-Hook";
import { FetchWithGraphQL } from "../Patterns/Fetch-use-graphql";

const { Content, Header, Footer } = Layout;

injectGlobal`
  ${require("antd/dist/antd.css").toString()}
`;

const SET_KEY_WORD  = gql`
  mutation SetKeyword($keyword: String) {
    setKeyword(keyword: $keyword) @client
  }
`

const Responsive: React.SFC = (props) => {
  return (
    <Row>
      <Col xs={0} lg={4} />
      <Col xs={24} lg={16}>{props.children}</Col>
      <Col xs={0} lg={4} />
    </Row>
  )
}

export const App: React.FC = () => {
  const [keyword, setKeyword] = React.useState<string>("tmhao");

  const url = "https://api.github.com/search/users?q=" + keyword;

  const [setCache] = useMutation(SET_KEY_WORD, {
    variables: {
      keyword,
    }
  });

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/main">Main</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/patterns">React patterns</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "24px" }}>
        <Responsive>
          <div style={{ backgroundColor: "#fff", padding: "24px" }}>
            <Switch>
              <Route path="/main" render={() => (
                  <>
                    <FetchWithGraphQL query={"cityCode=Hồ+Chí+Minh&districtCode=Quận+10&mode=directory&offset=0&orderBy=byRateCount"} />
                  </>
                )}
              />
              <Route path="/patterns" render={() => (
                  <>
                  <hr />
                  <h2>normal</h2>
                  <Fetch url={url} />

                  <hr />
                  <h2>with &quot;render prop" pattern</h2>
                  <FetchRenderProp url={url} />

                  <hr />
                  <h2>with "HOC" pattern</h2>
                  <FetchWithHOC url={url} />

                  <hr />
                  <h2>with "Hook" pattern</h2>
                  <FetchWithHook url={url} />
                  </>
                )}
              />
            </Switch>
          </div>
        </Responsive>
      </Content>

      <Footer style={{ textAlign: "center" }}>tmhao2005@gmail.com</Footer>
    </Layout>
  )
}
