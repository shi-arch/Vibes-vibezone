"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material";

const Notification = () => {
  // Sample notification data
  const [notifications, setNotifications] = useState([
    {
      id: "@felonious",
      message: "You got a new request from ",
      receivedDate: new Date("2024-03-20"),
    },
    {
      id: "@stuart",
      message: "New message form",
      receivedDate: new Date("2024-03-19"),
    },
    {
      id: "@tina",
      message: "You got a new request from",
      receivedDate: new Date("2024-03-18"),
    },
    {
      id: "@minion",
      message: "New message",
      receivedDate: new Date("2024-03-18"),
    },
  ]);

  // Function to calculate the number of days since a notification was received
  const calculateDaysSinceReceived = (receivedDate) => {
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - receivedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  // Function to handle confirmation of a notification
  const handleConfirm = (id) => {
    // implement marking the notification as confirmed
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification};
      }
      return notification;
    });
    setNotifications(updatedNotifications);
    // console.log(`Notification with ID ${id} confirmed.`);
  };

  // Function to handle deletion of a notification
  const handleDelete = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItem:'center'}}>
        <Box sx={{ width: 600, margin: "auto", padding: 2 }}>
        <Typography
            variant="h6"
            gutterBottom
            sx={{ fontFamily: "Poppins, Arial", fontWeight: "bold" , fontSize:'25px'}}
        >
            Notifications
        </Typography>
        <List>
            {notifications.map((notification) => (
            <div key={notification.id}>
                <ListItem>
                <ListItemSecondaryAction>
                    <Button
                    onClick={() => handleConfirm(notification.id)}
                    aria-label="confirm"
                    sx={{
                        backgroundColor: "#8f47ff",
                        color: "#ffffff",
                        marginRight: "8px",
                        "&:hover": { backgroundColor: "#8f47ff", color: "#ffffff" },
                    }}
                    >
                    Confirm
                    </Button>
                    <Button
                    variant="outlined"
                    onClick={() => handleDelete(notification.id)}
                    edge="end"
                    aria-label="delete"
                    sx={{
                        borderColor: "#2B2B2B",
                        color: "#2B2B2B",
                        "&:hover": { borderColor: "#2B2B2B", color: "#2B2B2B" },
                    }}
                    >
                    Delete
                    </Button>
                </ListItemSecondaryAction>
                <ListItemText
                    primary={
                    <>
                        {notification.message}
                        <span style={{ fontWeight: "bold" }}>
                        {notification.id}
                        </span>
                    </>
                    }
                    secondary={`${calculateDaysSinceReceived(
                    notification.receivedDate
                    )} d`}
                />
                </ListItem>
                <Divider />
            </div>
            ))}
        </List>
        </Box>
    </Box>
  );
};

export default Notification;
