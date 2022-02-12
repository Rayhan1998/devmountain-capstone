import React, { useState } from "react";
import "./threadbox.styles.css";

import { Heading, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ThreadBox(props) {
  const { title, date, comments, likes, dislikes, id, thread_creator } = props;

  const handleButton = () => {
    navigate(`/threadpage/${id}`);
  };

  const navigate = useNavigate();

  return (
    <Box
      w="70%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleButton}
      className="thread-box"
    >
      <Box>
        <Heading w={"80%"} paddingTop={"10px"} paddingBottom={"10px"}>
          {title}
        </Heading>
        <p className="thread-box-creator">Thread creator: {thread_creator}</p>

        <h2 className="thread-box-date">{date}</h2>
      </Box>
      <Box display="flex" justifyContent="space-evenly">
        <p>{comments} comments</p>
        {/* <p>{likes} likes</p>
        <p>{dislikes} dislikes</p> */}
      </Box>
    </Box>
  );
}
