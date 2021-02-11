import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const RoboProfile = () => {
  let {
    id,
    first_name,
    last_name,
    email,
    country,
    description,
    avatar = ""
  } = useSelector((state) => state.bots.selected_bot);

  avatar = avatar.replace("100x100", "300x300");

  return (
    <Box>
      <ImageBox>
        <img src={avatar} alt="avatar" />
      </ImageBox>
      <DetailsBox>
        <Title>
          {first_name} {last_name}
        </Title>
        <Line />
        <Detail mt="2rem">id: {id}</Detail>
        <Detail>country: {country}</Detail>
        <Detail>email: {email}</Detail>
        <Description>{description}</Description>
      </DetailsBox>
    </Box>
  );
};

export default RoboProfile;

const Box = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  align-items: center;
  /*flex:1;*/
`;
const ImageBox = styled.div`
  /*flex:1;*/
  background: peachpuff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30rem;
  height: 30rem;
  img {
    border-radius: 50%;
    width: 300px;
  }
`;
const DetailsBox = styled.div`
  padding: 10px;
  font-family: "Expletus Sans";
  text-align: left;
  color: slategray;
  font-weight: 400;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: inherit;
  text-align: center;
`;

const Line = styled.span`
  margin-top: 2rem;
  display: block;
  width: 100%;
  border: none;
  height: 1px;
  background: -webkit-gradient(
    radial,
    50% 50%,
    0,
    50% 50%,
    200,
    from(midnightblue),
    to(Cornsilk)
  );
`;
const Detail = styled.h5`
  margin-top: ${({ mt }) => mt || 0};
  font-size: 2.2rem;
  font-weight: inherit;
  color: darkslateblue;
`;

const Description = styled.p`
  margin-top: 2rem;
  font-family: "Raleway";
  font-size: 1.8rem;
  max-width: 40rem;
`;
