import React, { useContext } from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";

import "./FormSection.scss";
import TextInput from "../TextInput";
import { NotiContextType } from "../../@types/noti";
import { NotiContext } from "../../context/NotiContext";
import SendIcon from "@mui/icons-material/Send";

const formsectionvariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2,
      duration: 1,
      type: "spring",
      bounce: 0.7,
    },
  },
};

const FormSection = () => {
  const { userInputContext, addNotification } = useContext(
    NotiContext
  ) as NotiContextType;

  const handleClick = (noti: any) => {
    addNotification(noti);
  };

  return (
    <motion.div
      className="formSectionContainer"
      variants={formsectionvariant}
      initial="hidden"
      animate="visible"
      aria-label="formSectionContainer"
    >
      <TextInput />
      <motion.div whileHover={{ scale: 1.3 }}>
        <Button
          variant="contained"
          onClick={() => handleClick(userInputContext)}
          aria-label="send-button"
        >
          <SendIcon />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default FormSection;
