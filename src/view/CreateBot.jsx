import React from "react";
import styled from "styled-components";
import { lighten, darken } from "polished";
import countries from "../data/countries";
import { VBox, LVBox, LVForm, HBox } from "../styles/containers";
import { useForm } from "react-hook-form";
import { create_bot } from "../state/bot.slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import shortid from "shortid";

const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const error_messages = {
  first_name: {
    required: "First name is required",
    minLength: "First name is too short",
  },
  last_name: {
    required: "Last name is required",
    minLength: "Last name is too short",
  },
  email: {
    required: "Email address is required",
    minLength: "Email is too short",
    pattern: "Email address is not valid",
  },
  country: {
    required: "Country is required",
  },
  description: {
    required: "a description is required",
    minLength: "Description is too short",
  },
};

const CreateBot = () => {
  const { register, handleSubmit, errors } = useForm();
  const all_robots = useSelector((state) => state.bots.all_robots);
  const dispatch = useDispatch();
  const history = useHistory();

  const get_error_msg = (errors, error_messages, field_name) => {
    const generate = (name) => {
      if (errors[name]) {
        // console.log(errors[name].type)
        switch (errors[name].type) {
          case "required":
            return error_messages[name].required;
          case "minLength":
            return error_messages[name].minLength;
          case "pattern":
            return error_messages[name].pattern;
          default:
            return "";
        }
      }
    };
    if (Array.isArray(field_name)) {
      for (const name of field_name) {
        const msg = generate(name);
        if (msg) return msg;
      }
    } else {
      return generate(field_name);
    }
  };
  const onSubmit = async (data) => {
    // console.log(data);
    data.id = all_robots.length + 1;
    data.avatar = `https://robohash.org/${shortid.generate()}`;
console.log(data)
    //const res = await dispatch(add_robot_to_server(data))

    dispatch(create_bot(data));
    history.push("/browse");
  };
  return (
    <Wrapper>
      <Title>Create your own Bot!</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Full Name</Label>
        <Box>
          <Input
            type="text"
            name="first_name"
            placeholder="First Name"
            ref={register({ required: true, minLength: 2 })}
            error_styled={errors.first_name}
          />
          <Spacer w="1rem" />
          <Input
            type="text"
            name="last_name"
            placeholder="Last Name"
            ref={register({ required: true, minLength: 2 })}
            error_styled={errors.last_name}
          />
        </Box>
        <ErrorMsg show={errors.first_name || errors.last_name}>
          {get_error_msg(errors, error_messages, ["first_name", "last_name"])}
        </ErrorMsg>
        <LVexpand>
          <Label mt="1rem">Email</Label>
          <ExpandedInput
            name="email"
            type="text"
            ref={register({
              required: true,
              minLength: 8,
              pattern: email_regex,
            })}
            placeholder="email address"
            error_styled={errors.email}
          />
        </LVexpand>
        <ErrorMsg show={errors.email}>
          {get_error_msg(errors, error_messages, "email")}
        </ErrorMsg>
        <LVexpand>
          <Label mt="1rem">Country</Label>
          <CountrySelectWrap tabIndex="0" error_styled={errors.country}>
            <Select
              name="country"
              ref={register({ required: true })}
              tabIndex="-1"
            >
              <option value="">Please select</option>
              {Object.keys(countries).map((cc) => {
                const { name, emoji } = countries[cc];
                return (
                  <option key={cc} value={name}>
                    {emoji} &nbsp; {name}
                  </option>
                );
              })}
            </Select>
          </CountrySelectWrap>
        </LVexpand>
        <ErrorMsg show={errors.country}>
          {get_error_msg(errors, error_messages, "country")}
        </ErrorMsg>
        <LVexpand>
          <Label mt="1rem">Description</Label>
          <Description
            name="description"
            ref={register({ required: true, minLength: 10 })}
            rows="6"
            placeholder="a bit about da bot..."
            error_styled={errors.description}
          />
        </LVexpand>
        <ErrorMsg show={errors.description}>
          {get_error_msg(errors, error_messages, "description")}
        </ErrorMsg>
        <Spacer h="1rem" />
        <Submit>Create</Submit>
      </Form>
    </Wrapper>
  );
};

export default CreateBot;

const Wrapper = styled(VBox)`
  /* border: magenta solid 1px; */
  /* width: 100%; */
  /* margin-bottom: 1rem; */
`;

const Title = styled.h1`
  font-family: sans-serif;
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;

const Form = styled(LVForm)`
  /* border: cyan solid 1px; */
  padding: 3rem;

  min-height: 40rem;
  min-width: 40rem;
  background: white;
  border-radius: 6px;
  box-shadow: inset 0px 0px 14px 1px rgba(133, 133, 133, 1);
`;

const Label = styled.label`
  margin-top: 1rem; /*${(p) => p.mt || 0};*/
  color: coral;
  font-size: 2rem;
  font-family: "Arial";
  margin-bottom: 0.5rem;
`;
const Box = styled(HBox)`
  /* border: magenta solid 1px; */
  width: 100%;
`;
const LVexpand = styled(LVBox)`
  /* border: magenta solid 1px; */
  width: 100%;
`;

const Input = styled.input`
  font-size: 2rem;
  font-family: "Arial";
  border-radius: 4px;
  padding: 1rem 2rem;
  outline: none;
  border: 2px ${({ error_styled }) => (error_styled ? "red" : "transparent")}
    solid;
  background-color: ${({ error_styled }) =>
    error_styled ? lighten(0.4, "red") : "lightgray"};
  color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  &::placeholder {
    color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: slategray;
  }
  &:focus {
    border: darkgray 2px solid;
    border: 2px ${({ error_styled }) => (error_styled ? "red" : "transparent")}
      solid;
    background-color: ${({ error_styled }) =>
      error_styled ? lighten(0.4, "red") : "lightgray"};
    color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  }
`;
const ExpandedInput = styled(Input)`
  width: 100%;
`;
const Spacer = styled.div`
  width: ${({ w }) => w || 0};
  height: ${({ h }) => h || 0};
  display: ${({ show }) => (show === false ? "none" : "block")};
`;
const CountrySelectWrap = styled.div`
  border-radius: 4px;
  padding: 1rem 2rem;
  background-color: lightgray;
  width: 100%;
  outline: none;
  border: 2px transparent solid;
  &:focus {
    border: darkgray 2px solid;
  }
  border: 2px ${({ error_styled }) => (error_styled ? "red" : "transparent")}
    solid;
  background-color: ${({ error_styled }) =>
    error_styled ? lighten(0.4, "red") : "lightgray"};
  select {
    color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  }
`;
const Select = styled.select`
  font-size: 2rem;
  font-family: "Arial";
  color: slategray;
  border: none;
  box-shadow: none;
  outline: none;
  background: transparent;
  background-image: none;
  -webkit-appearance: none;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: slategray;
    /* -webkit-text-font-size: 3rem;
    font-size: 2rem; */
  }
`;
const Description = styled.textarea`
  width: 100%;
  font-size: 2rem;
  font-family: "Arial";
  border-radius: 4px;
  padding: 1rem 2rem;
  border: 2px ${(p) => (p.error_styled ? "red" : "transparent")} solid;
  outline: none;
  background-color: ${({ error_styled }) =>
    error_styled ? lighten(0.4, "red") : "lightgray"};
  color: slategray;
  &::placeholder {
    color: ${({ error_styled }) => (error_styled ? "red" : "slategray")};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: slategray;
  }
  &:focus {
    border: darkgray 2px solid;
    background-color: lightgray;
  }
`;
const ErrorMsg = styled.h1`
  color: red;
  border: red dashed 1px;
  border-radius: 6px;
  display: ${({ show }) => (show ? "block" : "none")};

  align-self: center;
  text-align: center;
  padding: 0.6rem;
  width: 100%;
  margin: 1rem 0;
  font-size: 1.6rem;
  font-family: "Arial";
`;
const Submit = styled.button`
  width: 100%;
  outline-style: none;
  border-style: none;
  background: deeppink;
  text-transform: uppercase;
  color: white;
  font-size: 2.2rem;
  /* font-family:'Arial'; */
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Yanone Kaffeesatz", sans-serif;

  &:hover {
    background: ${darken(0.1, "deeppink")};
  }
  &:active {
    background: ${lighten(0.1, "deeppink")};
  }
  border: 2px transparent solid;
  &:focus {
    border: ${darken(0.2, "deeppink")} 2px solid;
  }
`;
