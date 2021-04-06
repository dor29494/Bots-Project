import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { create_bot, update_register_email } from "../state/bot.slice";
import { countries } from "../data/countries";
import { useHistory } from "react-router-dom";
import shortid from "shortid";

const CreateBot = () => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const all_robots = useSelector((state) => state.bots.all_robots);
  const email_list = useSelector((state) => state.bots.email_list);
  const initObjHolder = {
    id: all_robots.length + 1,
    avatar: "",
    first_name: "",
    last_name: "",
    country: "",
    email: "",
    description: "",
  };
  const [objHolder, set_objHolder] = useState(initObjHolder);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(objHolder)
  //      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
  const handleChange = (event) => {
    set_objHolder((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    // console.log(event.target.value);
    // console.log(event);
  };
  const validateCountry = (country) => countries.include;
  const validateEmail = (email) => {
    if (!email_list.includes(email)) {
      // email_list[String(email)] = String(email)
      if(  objHolder.first_name.length >= 2 &&
        objHolder.last_name.length >= 2) {
          dispatch(update_register_email(email));
          console.log(email_list);
          return re.test(String(email).toLowerCase());
        }
    } else {
      return false;
    }
  };
  // console.log(F_name.current)
  const handleSubmit = async (event) => {
    if (
      validateEmail(objHolder.email) &&
      objHolder.first_name.length >= 2 &&
      objHolder.last_name.length >= 3
    ) {
      objHolder.avatar = `https://robohash.org/${shortid.generate()}`;
      dispatch(create_bot(objHolder));
      set_objHolder(initObjHolder);
      history.push("/browse");
    } else {
      if (validateEmail(objHolder.email) === false) {
        alert("This email are already registerd!");
      } else if (
        objHolder.first_name.length < 2 
        ) {
        alert('First name most have at least 2 charaters');}
       else if (objHolder.last_name.length < 3) {
          alert('Last name most have at least 3 charaters');
        }
        
      }
      // alert("Something worng plesae try again!");
    }
  

  return (
    <Wrapper>
      <Header>Create a new Bot!</Header>
      <InputHolder>
        <InputTitle>First Name:</InputTitle>
        <Input
          onChange={handleChange}
          name={"first_name"}
          value={objHolder.fisrt_name}
        ></Input>
      </InputHolder>
      <InputHolder>
        <InputTitle>Last Name:</InputTitle>
        <Input
          onChange={handleChange}
          name={"last_name"}
          value={objHolder.last_name}
        ></Input>
      </InputHolder>
      <InputHolder>
        <InputTitle>Country:</InputTitle>
        <Input
          onChange={handleChange}
          name={"country"}
          value={objHolder.country}
        ></Input>
      </InputHolder>
      <InputHolder>
        <InputTitle>Email:</InputTitle>
        <Input
          onChange={handleChange}
          name={"email"}
          value={objHolder.email}
        ></Input>
      </InputHolder>
      <InputHolder>
        <InputTitle>Description:</InputTitle>
        <DesInput
          onChange={handleChange}
          name={"description"}
          value={objHolder.description}
        ></DesInput>
      </InputHolder>
      <CreateButton onClick={handleSubmit}>Create!</CreateButton>
    </Wrapper>
  );
};
// {
//   id:,
//   first_name:,
//   last_name:,
//   email:,
//   country:,
//   description,
//   avatar
// }

const CreateButton = styled.button`
  font-family: "Griffy", cursive;
  max-width: 15rem;
  align-self: center;
  flex-basis: 100%;
`;
const InputHolder = styled.div`
  padding: 2rem;
  margin: 2rem;
  display: flex;
  flex-basis: 100%;
  max-height: 10rem;
`;
const InputTitle = styled.div`
  font-size: 3rem;
  max-width: 22rem;
  min-hegiht: 4rem;
`;
const Header = styled.div`
  color: coral;
  font-size: 7rem;
  padding-left: 1rem;
  background: -webkit-linear-gradient(gold, coral);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  flex-basis: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  font-family: "Griffy", cursive;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 2px solid orange;
  margin-top: 3rem;
`;
const Input = styled.input`
  min-height: 3.5rem;
  max-width: 20rem;
  font-size: 3rem;
  font-family: "Griffy", cursive;
  outline: none;
  border-radius: 0.5rem;
  transition: border 0.5s;
  margin-left: 2rem;
  border: 10px white solid;
  &:focus {
    border: tomato 2px solid;
  }
`;
const DesInput = styled.input`
  min-height: 3.5rem;
  min-width: 15rem;
  font-size: 3rem;
  font-family: "Griffy", cursive;
  outline: none;
  border-radius: 0.5rem;
  transition: border 0.5s;
  margin-left: 2rem;
  border: 10px white solid;
  &:focus {
    border: tomato 2px solid;
  }
`;

export default CreateBot;
