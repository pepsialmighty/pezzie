import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { INoti, NotiContextType } from "../../@types/noti";
import { TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { NotiContext } from "../../context/NotiContext";

import "./NotificationCard.scss";

type NotificationCardType = {
  noti: INoti;
};

const cardVariant = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      type: "spring",
      bounce: 0.7,
    },
  },
  exit: {
    x: -50,
    transition: {
      duration: 1.5,
      type: "spring",
      bounce: 0.7,
    },
  },
};

const styles = {
  cardContainer: {
    width: "50%",
    my: "15px",
  },
};

const NotificationCard: React.FC<NotificationCardType> = ({ noti }) => {
  let now = React.useMemo(() => new Date(), []);

  const [pastMinute, setPastMinute] = React.useState<number>(0);
  const [pastHour, setPastHour] = React.useState<number>(0);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [notiEditInput, setNotiEditInput] = React.useState(noti.content);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { setUserInputContext, editNotification, removeNotification } =
    React.useContext(NotiContext) as NotiContextType;

  setTimeout(() => {
    now = new Date();
  }, 1000 * 60);

  React.useEffect(() => {
    const postMinute = parseInt(noti.timestamp.slice(-2));
    const postHour = parseInt(noti.timestamp.slice(-5, -2));

    setPastMinute(postMinute);
    setPastHour(postHour);
  }, [now, noti]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNotiEditInput(value);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleRemove = () => {
    removeNotification(noti.id);
    handleClose();
  };

  const handleClickSaveEdit = () => {
    setIsEdit(false);
    setUserInputContext(notiEditInput);
    editNotification(notiEditInput, noti.id);
  };

  return (
    <AnimatePresence>
      <motion.div
        layout
        key={noti.id}
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="cardContainer"
        aria-label="card-container"
      >
        <Card sx={styles.cardContainer}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                P
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            }
            title="Pepsi"
            subheader={
              now.getHours() - pastHour >= 1 ||
              now.getMinutes() - pastMinute < 0
                ? noti.timestamp
                : `${now.getMinutes() - pastMinute}m ago`
            }
          />
          <CardContent>
            {isEdit ? (
              <div
                style={{
                  display: "flex",
                  padding: "0 10px",
                }}
              >
                <TextField
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  value={notiEditInput}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickSaveEdit}
                  onMouseDown={handleClickSaveEdit}
                  edge="end"
                >
                  <CheckIcon />
                </IconButton>
              </div>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ wordWrap: "break-word" }}
              >
                {noti.content}
              </Typography>
            )}
          </CardContent>
        </Card>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleRemove}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>Close</MenuItem>
        </Menu>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationCard;
