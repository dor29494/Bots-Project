import React, { useState } from "react";
import styled from "styled-components";

const ImageLoader = ({ loading_text, image_source }) => {
  const [loading_img, set_loading_img] = useState(true);
  return (
    <Box>
      <Icon show={loading_img}>{loading_text}</Icon>
      <Image
        src={image_source}
        show={!loading_img}
        onLoad={() => set_loading_img(false)}
        onError={() => set_loading_img(true)}
      />
    </Box>
  );
};

export default ImageLoader;

const Box = styled.div`
  position: relative;
  border-radius: 50%;
  background-color: darksalmon;
  transition: box-shadow 150ms, margin 150ms, padding 150ms;
`;
const Icon = styled.span`
  opacity: ${({ show }) => (show ? 1 : 0)};
  font-size: 5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.img`
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;
