import axios from "axios";

import { getAuthToken } from "./auth";

export const fetchNotifications = async () => {

  try {

    const token = await getAuthToken();

    const response = await axios.get(

      "/api/evaluation-service/notifications",

      {
        headers: {

          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(
      "NOTIFICATIONS:",
      response.data
    );

    return response.data.notifications;

  } catch (error) {

    console.log(
      "Notification fetch failed:",
      error
    );

    return [];
  }
};