import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  TextField
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationCard = ({ notification }) => {

  const getColor = (type) => {
    switch (type) {
      case "Placement":
        return "success";

      case "Result":
        return "primary";

      case "Event":
        return "warning";

      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        marginBottom: 3,
        borderRadius: 4,
        boxShadow: 4,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)"
        }
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >

          <Stack direction="row" spacing={1} alignItems="center">

            <NotificationsIcon color="action" />

            <Typography variant="h6" fontWeight="bold">
              {notification.Message}
            </Typography>

          </Stack>

          <Chip
            label={notification.Type}
            color={getColor(notification.Type)}
          />

        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {notification.Timestamp}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default NotificationCard;