import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import RoboList from "./RoboList";
import RoboFilter from "./RoboFilter";
import RoboProfile from "./RoboProfile";

const RobotsBrowser = () => {
  const loading_robots = useSelector((state) => state.bots.loading_robots);

  return (
    <Box>
      {!loading_robots ? (
        <div>
          <RoboFilter />
          <ContentBox>
            <RoboProfile />
            <RoboList />
          </ContentBox>
        </div>
      ) : (
        <h1>I am Loding...</h1>
      )}
    </Box>
  );
};

export default RobotsBrowser;

const Box = styled.div`
  background: Cornsilk;
  padding: 8.5rem 1.5rem 1.5rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.4rem 1.5rem DimGrey;
  position: relative;
  margin-top: 7rem;
`;
const ContentBox = styled.div`
  /*border:red solid 2px;*/
  border-radius: 5px;
  display: flex;
`;
