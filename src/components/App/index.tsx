import React from "react";
import { injectGlobal } from "emotion";

import { Layout, Menu } from "antd";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { css, Global } from "@emotion/core";
import { Fetch } from "../Patterns/Fetch";
import { FetchRenderProp } from "../Patterns/Fetch-render-prop";
import { FetchWithHOC } from "../Patterns/Fetch-with-HOC";
import { FetchWithHook } from "../Patterns/Fetch-with-Hook";
import { ListUser } from "../../pages/ListUser";
import { Responsive } from "../Responsive";
import { Futa } from "../FUTA";
import { Review } from "../../pages/Review";

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
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          @font-face {
            font-family: "Patrick Hand SC";
            font-style: normal;
            font-weight: 400;
            src: local("Patrick Hand SC"), local("PatrickHandSC-Regular"),
              url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
                format("woff2");
            unicode-range: U+0100-024f, U+1-1eff, U+20a0-20ab, U+20ad-20cf,
              U+2c60-2c7f, U+A720-A7FF;
          }
        `}
      />
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

      <Content
        style={{
          padding: "24px",
        }}
      >
        <Responsive>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
            }}
          >
            <Switch>
              <Route path="/futa" render={() => <Futa />} />
              <Route
                path="/main"
                render={() => (
                  <>
                    <ListUser />
                  </>
                )}
              />
              <Route path="/review/:id" component={Review} />
              <Route
                path="/patterns"
                render={() => (
                  <>
                    <hr />
                    <h2>normal</h2>
                    <Fetch url={url} />

                    <hr />
                    <h2>with `render prop` pattern</h2>
                    <FetchRenderProp url={url} />

                    <hr />
                    <h2>with `HOC` pattern</h2>
                    <FetchWithHOC url={url} />

                    <hr />
                    <h2>with `Hook` pattern</h2>
                    <FetchWithHook url={url} />
                  </>
                )}
              />
              <Redirect to="/futa" />
            </Switch>
          </div>
        </Responsive>
      </Content>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        tmhao2005@gmail.com
      </Footer>
    </Layout>
  );
};
