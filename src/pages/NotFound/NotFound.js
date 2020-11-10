/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import { Link } from "react-router-dom";

import { Header, Title, Container, Content } from "../../components/custom-lib";

function NotFound() {
  return (
    <>
      <Header>
        <Title>Not found Page</Title>
      </Header>
      <Container>
        <Content>
          <div
            css={{
              padding: "40px 0",
              textAlign: "center",
            }}
          >
            Sorry this page doesn't exist. <Link to="/">Go to Albums</Link>
          </div>
        </Content>
      </Container>
    </>
  );
}

export default NotFound;
