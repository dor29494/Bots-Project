import React from "react";
import ImageLoader from "./ImageLoader";
import styled from "styled-components";

const Card = ({ first_name, country, description, avatar }) => {
  // console.log('first_name:',first_name)
  //	console.log('props:',props)
  return (
    <Box>
      <ImageLoader image_source={avatar} loading_text="🤖" />
      <TextsBox>
        <Title>
          {first_name} from {country}
        </Title>
        <Msg>{description}</Msg>
      </TextsBox>
    </Box>
  );
};
export default Card;

const Image = styled.img`
  height: 10rem;
  width: 10rem;
  /*border: #004141 solid 4px;*/
  border-radius: 50%;
  /*padding: 10px;*/
  background-color: darksalmon;
  transition: box-shadow 150ms, margin 150ms, padding 150ms;
`;
const Msg = styled.p`
  font-family: "Raleway";
  font-size: 1.4rem;
  max-width: 35rem;
`;

const Title = styled.h1`
  font-size: 3.8rem;
  color: slategray;
  font-family: "Expletus Sans";
  text-align: left;
  font-size: 2.8rem;
`;

const TextsBox = styled.div`
  padding-left: 2.8rem;
`;
const Box = styled.div`
  padding: 2rem 2.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: paleturquoise;
    ${Image} {
      box-shadow: 0 0.4rem 1.5rem DimGrey;
      margin-bottom: 3rem;
      padding-bottom: 1rem;
    }
  }

  &:active {
    background: skyblue;
    color: white;
  }

  /* .card:active .paragraph {
    color: white;
  }
  .card:active .thumb {
    box-shadow: 0 0.4rem 1.5rem DimGrey;
  } */
`;

// .card:hover .thumb {
//   box-shadow: 0 0.4rem 1.5rem DimGrey;
//   margin-bottom: 3rem;
//   padding-bottom: 1rem;
// }
// .card:active {
//   background: skyblue;
//   color: white;
// }
// .card:active .paragraph {
//   color: white;
// }
// .card:active .thumb {
//   box-shadow: 0 0.4rem 1.5rem DimGrey;
// }
