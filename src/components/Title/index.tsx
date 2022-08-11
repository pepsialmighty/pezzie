import React from "react";
import { motion } from "framer-motion";

import "./Title.scss";

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const first = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const last = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { ...transition },
  },
};

const Title = () => {
  return (
    <motion.div
      className="titleContainer"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container fluid">
        <div className="row center top-row">
          <div className="top">
            <motion.div className="model">
              <motion.span className="first" variants={first}>
                <motion.span variants={letter}>W</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>l</motion.span>
                <motion.span variants={letter}>c</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter}>m</motion.span>
                <motion.span variants={letter}>e</motion.span>
              </motion.span>
              <motion.span className="middle" variants={first}>
                <motion.span variants={letter}>T</motion.span>
                <motion.span variants={letter}>o</motion.span>
              </motion.span>
              <motion.span className="last" variants={last}>
                <motion.span variants={letter}>P</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>z</motion.span>
                <motion.span variants={letter}>z</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>e</motion.span>
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Title;
