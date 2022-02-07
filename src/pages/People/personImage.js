import * as React from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import { Text, Box } from "@chakra-ui/react";
import { storage } from "../../lib/storage";
import { fileToBase64 } from "../../util/file-to-base64";
import { useCallback } from "react";

const SImageOverlay = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000aa;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ImageOverlay = ({ onClearImage, onNewImage }) => {
  return (
    <SImageOverlay>
      <Text
        onClick={onNewImage}
        p={1}
        cursor="pointer"
        _hover={{ outline: "1px dashed white" }}
      >
        Select an image
      </Text>
      <Text
        onClick={onClearImage}
        p={1}
        cursor="pointer"
        _hover={{ outline: "1px dashed white" }}
      >
        Clear image
      </Text>
    </SImageOverlay>
  );
};

const Image = ({ url, onOpenImage, onClearImage }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  if (url) {
    return (
      <Box
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        maxW={150}
        mb={30}
        position="relative"
      >
        {showOverlay && (
          <ImageOverlay onNewImage={onOpenImage} onClearImage={onClearImage} />
        )}
        <img alt="Person" src={url} />
      </Box>
    );
  }

  return (
    <Box
      onClick={() => onOpenImage()}
      mb={30}
      border="1px dashed white"
      p={2}
      w={150}
      cursor="pointer"
    >
      Select an image
    </Box>
  );
};

export const PersonImage = ({ name }) => {
  const [image, setImage] = useState(() => {
    return storage.getItem(`${name}-image`) || "";
  });

  const inputRef = useRef(null);

  const onClearImage = useCallback(() => {
    if (inputRef.current) inputRef.current.value = "";

    setImage("");
    storage.removeItem(`${name}-image`);
  }, [name]);

  const onOpenImage = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={async (ev) => {
          try {
            const file = ev.target.files[0];

            if (!file) return;

            const fileSizeKb = file.size / 1024;
            if (fileSizeKb > 35) {
              alert("Image size must be lower than 35 Kb");

              if (inputRef.current) inputRef.current.value = "";

              return;
            }

            const base64 = await fileToBase64(file);
            setImage(base64);
            storage.setItem(`${name}-image`, base64);
          } catch (err) {
            alert("Something went wrong");
            if (inputRef.current) inputRef.current.value = "";
            console.error(err);
          }
        }}
      />
      <Image
        url={image}
        onOpenImage={onOpenImage}
        onClearImage={onClearImage}
      />
    </>
  );
};
