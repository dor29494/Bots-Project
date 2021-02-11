import React from "react"; //
import Card from "./Card";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { update_profile } from "../state/bot.slice";

const RoboList = () => {
  const filtered_robots = useSelector((state) => state.bots.filtered_robots);
  const dispatch = useDispatch();
  return (
    <Box>
      <ul>
        {filtered_robots.map((bot) => (
          <CardItem key={bot.id} onClick={() => dispatch(update_profile(bot))}>
            <Card {...bot} />
          </CardItem>
        ))}
      </ul>
    </Box>
  );
};
export default RoboList;

const Box = styled.div`
  background: oldlace;
  height: 77vh;
  min-width: 56rem;
  /*border: #0000b9 solid 3px;*/
  border-radius: 0.4rem;
  overflow-x: hidden;
  overflow-y: scroll;
  box-shadow: 0 0.2rem 0.8rem DimGrey;
`;

const CardItem = styled.li`
  &:nth-child(even) {
    background: honeydew;
  }
  &:nth-child(odd) {
    background: white;
  }
`;
