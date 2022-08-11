import React, { useState, useContext, useEffect } from "react";
import { LayoutGroup, motion } from "framer-motion";

import "./NotificationSection.scss";
import NotificationCard from "../NotificationCard";
import { NotiContext } from "../../context/NotiContext";
import { INoti, NotiContextType } from "../../@types/noti";

const notisectionbackgroundVariant = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      delay: 0.4,
      duration: 1,
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const notisectionsecondlayerVariant = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 50px 50px)`,
    transition: {
      delay: 0.2,
      duration: 1,
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
};

const NotificationSection = () => {
  const { notifications } = useContext(NotiContext) as NotiContextType;
  const [filteredNotifications, setFilteredNotifications] = useState<INoti[]>(
    []
  );

  useEffect(() => {
    if (notifications.length > 3) {
      notifications.shift();
    }
    setFilteredNotifications(notifications.slice(0).reverse());
  }, [notifications]);

  return (
    <React.Fragment>
      <motion.div
        className="notiSectionContainer"
        animate="open"
        variants={notisectionbackgroundVariant}
      >
        <LayoutGroup>
          {filteredNotifications.length > 0 &&
            filteredNotifications.map((noti) => (
              <NotificationCard key={noti.id} noti={noti} />
            ))}
        </LayoutGroup>
      </motion.div>
      <motion.div
        className="notiSectionSecondLayer"
        animate="open"
        variants={notisectionsecondlayerVariant}
      ></motion.div>
    </React.Fragment>
  );
};

export default NotificationSection;
