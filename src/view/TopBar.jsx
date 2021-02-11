import React from "react";
import styled, { keyframes } from "styled-components";
// import { darken } from "polished";

const TopBar = ({ children }) => (
  <Box>
    <Text>{children}</Text>
    <Logo src={logo_url} alt="logo" />
  </Box>
);

export default TopBar;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Box = styled.div`
  background: slategray;
  width: 100%;
  height: 70px;
  padding: 20px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Text = styled.h1`
  font-size: 3rem;
  font-weight: normal;
  font-family: "Griffy", cursive;
  color: papayawhip;
  cursor: pointer;
  user-select: none;
`;
const logo_url =
  "https://uploads.codesandbox.io/uploads/user/b530393c-d101-446c-989c-a409634813dd/7MID-logo.svg";

const Logo = styled.img`
  height: 5rem;
  animation: ${spin} 2s linear infinite;
`;
