import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { filter_list } from "../state/bot.slice";

const Filter = () => {
  const all_robots = useSelector((state) => state.bots.all_robots);
  let [num_elements, set_num_elements] = useState(all_robots.length);
  const dispatch = useDispatch();

  const update_list = (event) => {
    const txt = event.target.value;
    //console.log('update_list')

    const filtered_list = all_robots.filter((bot) =>
      bot.first_name.toLowerCase().includes(txt.toLowerCase())
    );
    set_num_elements(filtered_list.length);

    dispatch(filter_list(filtered_list));
  };

  // const items_count = num_elements || all_robots.length;
  return (
    <Header>
      <Title>{num_elements} items filtered</Title>
      <Input onChange={update_list} />
    </Header>
  );
};

export default Filter;

const Header = styled.div`
  background: lightsalmon;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 0.4rem 0.4rem 0 0;
  height: 9rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.h4`
  font-family: "Expletus Sans";
  text-align: left;
  font-size: 2rem;
  font-weight: 400;
  color: darkred;
`;
const Input = styled.input`
  height: 3.5rem;
  width: 24rem;
  outline: none;
  border-radius: 0.5rem;
  border: white 2px solid;
  transition: border 0.5s;
  padding: 1rem;

  &:focus {
    border: tomato 2px solid;
  }
`;
