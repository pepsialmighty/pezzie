export interface INoti {
  id: string;
  content: string;
  timestamp: string;
}

export type NotiContextType = {
  userInputContext: string;
  setUserInputContext: (input: string) => void;
  notifications: INoti[];
  addNotification: (noti) => void;
  editNotification: (newNotiContent: string, notiId: string) => void;
  removeNotification: (notiId: string) => void;
};
