import React from "react";
import { injectGlobal } from "emotion";
import { Layout, Menu } from "antd";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { Fetch } from "../Patterns/Fetch";
import { FetchRenderProp } from "../Patterns/Fetch-render-prop";
import { FetchWithHOC } from "../Patterns/Fetch-with-HOC";
import { FetchWithHook } from "../Patterns/Fetch-with-Hook";
import { FetchWithGraphQL } from "../Patterns/Fetch-use-graphql";
import { Responsive } from "../Responsive";
import { Futa } from "../FUTA";

const { Content, Header, Footer } = Layout;

injectGlobal`
  ${require("antd/dist/antd.css").toString()}
  ${require("react-responsive-carousel/lib/styles/carousel.min.css").toString()}

  .carousel .slide {
    text-align: unset;
    background: transparent;
  }
`;

export const App: React.FC = () => {
  const url = "https://api.github.com/search/users?q=tmhao2005";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/futa">FUTA</Link>
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
              <Route path="/futa" render={() => (<Futa />)} />
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
              <Redirect to="/futa" />
            </Switch>
          </div>
        </Responsive>
      </Content>

      <Footer style={{ textAlign: "center" }}>tmhao2005@gmail.com</Footer>
    </Layout>
  )
}
