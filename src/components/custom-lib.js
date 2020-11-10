import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/core";
import { FaSpinner } from "react-icons/fa";

import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";

const Header = styled.div({
  background: colors.white,
  margin: "0 auto",
  padding: "24px 0",
  width: "80%",
  [mq.small]: {
    width: "95%",
  },
});

const Title = styled.h1({
  fontSize: "1.5rem",
  color: colors.text,
  letterSpacing: "-0.88px",
});

const Container = styled.div({
  background: colors.gray100,
  height: "100%",
  width: "100%",
});

const Content = styled.div({
  background: colors.gray100,
  margin: "0 auto",
  height: "100%",
  width: "80%",
  padding: "40px 0",
  [mq.small]: {
    width: "90%",
  },
});

const Button = styled.button({
  padding: "8px 16px",
  border: "0",
  borderRadius: "3px",
  background: colors.aqua100,
  color: colors.white,
  textTransform: "uppercase",
  fontSize: "0.75rem",
  fontWeight: "600",
  cursor: "pointer",
  ":hover": {
    background: colors.aqua200,
  },
});

const ActionLabel = styled.span({
  color: colors.aqua100,
  textDecoration: "underline",
  fontSize: "0.75rem",
  cursor: "pointer",
  ":hover": {
    color: colors.aqua200,
  },
});

const Input = styled.input({
  border: "0",
  padding: "8px 16px",
  borderRadius: "4px",
  boxShadow: "inset 0 1px 3px 0 rgba(0, 0, 0, 0.5)",
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

const Image = styled.img(
  ({ width = "auto", height = "auto", radius = "0" }) => {
    return {
      width,
      height,
      borderRadius: radius,
    };
  }
);

export {
  Header,
  Title,
  Container,
  Content,
  Button,
  ActionLabel,
  Image,
  Input,
  Spinner,
};
