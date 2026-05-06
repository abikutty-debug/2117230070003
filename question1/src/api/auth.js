import axios from "axios";

export const getAuthToken = async () => {

  try {

    const response = await axios.post(
      "/api/evaluation-service/auth",
      {
        email: "abinaya.m.2023.aids@ritchennai.edu.in",

        name: "abinaya",

        rollNo: "2117230070003",

        accessCode: "BTCDqT",

        clientID:
          "4ba7896b-46e0-4c8e-b6de-89dbf909a11b",

        clientSecret:
          "hmyYqEShWccYuPRw"
      }
    );

    console.log(
      "TOKEN RESPONSE:",
      response.data
    );

    return response.data.access_token;

  } catch (error) {

    console.log(error);

    throw error;
  }
};