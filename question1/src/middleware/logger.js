import axios from "axios";

import { getAuthToken } from "../api/auth";

export const Log = async (
  stack,
  level,
  packageName,
  message
) => {

  try {

    const token = await getAuthToken();

    const response = await axios.post(

      "/api/evaluation-service/logs",

      {
        stack,
        level,
        package: packageName,
        message
      },

      {
        headers: {

          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(
      "LOG CREATED:",
      response.data
    );

  } catch (error) {

    console.log(
      "LOG ERROR:",
      error
    );
  }
};