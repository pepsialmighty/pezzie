import * as React from "react";
import { INoti, NotiContextType } from "../@types/noti";

export type NotiProviderProps = {
  children: React.ReactNode;
};

export const NotiContext = React.createContext<NotiContextType | null>(null);

const NotiProvider: React.FC<NotiProviderProps> = ({ children }) => {
  const [userInputContext, setUserInputContext] = React.useState("");
  const [notifications, setNotifications] = React.useState<INoti[]>([]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const addNotification = (notiContent: any) => {
    var autoGenId = Math.random().toString(16).slice(2) + new Date().getTime();
    const now = new Date();

    const newNoti: INoti = {
      id: autoGenId,
      content: notiContent,
      timestamp:
        monthNames[now.getMonth()] +
        " " +
        now.getDate() +
        ", " +
        now.getHours() +
        ":" +
        `${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`,
    };

    setNotifications((prevState) => [...prevState, newNoti]);
  };

  const editNotification = (newNotiContent: string, notiId: string) => {
    setNotifications((current) =>
      current.map((noti) => {
        if (noti.id === notiId) {
          return { ...noti, content: newNotiContent };
        }

        return noti;
      })
    );
  };

  const removeNotification = (notiId: string) => {
    var filterArr = notifications;
    for (let i = 0; i < notifications.length; i++) {
      var currentNoti = notifications[i];

      if (currentNoti.id === notiId) {
        filterArr.splice(i, 1);
      }
    }

    setNotifications([...filterArr]);
  };

  return (
    <NotiContext.Provider
      value={{
        userInputContext,
        setUserInputContext,
        notifications,
        addNotification,
        editNotification,
        removeNotification,
      }}
    >
      {children}
    </NotiContext.Provider>
  );
};

export default NotiProvider;
