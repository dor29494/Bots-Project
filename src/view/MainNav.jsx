import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainNav = () => (
  <LinkBar>
    <li>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/browse" className="nav-link">
        Browse
      </NavLink>
    </li>
    <li>
      <NavLink to="/create" className="nav-link">
        Create
      </NavLink>
    </li>
  </LinkBar>
);
export default MainNav;

const LinkBar = styled.ul`
  display: flex;
  list-style-type: none;
  font-family: "Yanone Kaffeesatz";
  font-weight: 400;
  font-size: 2.8rem;
  width: 30rem;
  justify-content: space-between;
`;
const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
