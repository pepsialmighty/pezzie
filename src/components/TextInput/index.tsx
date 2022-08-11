import React, { useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";

import "./TextInput.scss";
import { NotiContext } from "../../context/NotiContext";
import { NotiContextType } from "../../@types/noti";

const styles = {
  inputContainer: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    p: 0,
    m: 0,

    "& .MuiInputBase-root": { backgroundColor: "white", borderRadius: "18px" },
  },
  textField: {
    width: "100%",
    borderRadius: "50%",
    marginRight: "8px",
    backgroundColor: "white",
  },
};

const inputContainerVariant = {};

const TextInput = () => {
  const [userInput, setUserInput] = useState("");

  const typingTimeoutRef = useRef<number | null>(null);

  const { setUserInputContext } = useContext(NotiContext) as NotiContextType;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserInput(value);

    //debouncing
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => {
      setUserInputContext(value);
    }, 500);
  };

  console.log(userInput);

  return (
    <Box
      component={motion.div}
      sx={styles.inputContainer}
      className="inputContainer"
      variants={inputContainerVariant}
    >
      <motion.input
        id="text-input"
        aria-label="text-input"
        placeholder="Type something"
        onChange={handleChange}
        value={userInput}
        initial={{ x: 10 }}
        whileFocus={{
          x: 40,
          width: "100%",
          transition: { stiffness: 100, velocity: 2 },
        }}
      />
    </Box>
  );
};

export default TextInput;
