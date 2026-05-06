import React, { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  TextField,
  CircularProgress
} from "@mui/material";

import { fetchNotifications } from "../api/notificationApi";

import NotificationCard from "../components/NotificationCard";

import PriorityNotifications from "../components/PriorityNotifications";

import FilterBar from "../components/FilterBar";

import { Log } from "../middleware/logger";

const Home = () => {

  const [notifications, setNotifications] = useState([]);

  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getNotifications = async () => {

      try {

        await Log(
          "frontend",
          "info",
          "api",
          "Fetching notifications"
        );

        const data = await fetchNotifications();

        setNotifications(data);

        setLoading(false);

        await Log(
          "frontend",
          "info",
          "component",
          "Notifications loaded successfully"
        );

      } catch (error) {

        setLoading(false);

        await Log(
          "frontend",
          "error",
          "api",
          "Fetch failed"
        );
      }
    };

    getNotifications();

  }, []);

  // FILTER + SEARCH LOGIC
// REPLACE YOUR CURRENT filteredNotifications CODE IN Home.jsx WITH THIS

const getTypePriority = (type) => {

  switch (type) {

    case "Event":
      return 1;

    case "Result":
      return 2;

    case "Placement":
      return 3;

    default:
      return 4;
  }
};

const filteredNotifications =
  notifications
    .filter((item) => {

      const matchesFilter =
        filter === "All" ||
        item.Type === filter;

      const searchTerm =
        search.toLowerCase();

      const matchesSearch =

        item.Message
          ?.toLowerCase()
          .includes(searchTerm) ||

        item.Type
          ?.toLowerCase()
          .includes(searchTerm);

      return (
        matchesFilter &&
        matchesSearch
      );
    })

    // SORT ORDER:
    // Event → Result → Placement
    // Latest inside each category
    .sort((a, b) => {

      const typeDifference =
        getTypePriority(a.Type) -
        getTypePriority(b.Type);

      if (typeDifference !== 0) {
        return typeDifference;
      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

  if (loading) {

    return (

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >

        <CircularProgress size={70} />

      </Container>
    );
  }

  return (

    <Container maxWidth="lg">

      {/* HEADER */}

      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 4,
          mb: 4,
          borderRadius: 4,
          background:
            "linear-gradient(90deg,#1565c0,#42a5f5)",
          color: "white"
        }}
      >

        <Typography
          variant="h2"
          fontWeight="bold"
        >
          Campus Notifications
        </Typography>

        <Typography variant="h6">
          Smart Priority Inbox Dashboard
        </Typography>

      </Paper>

      {/* SEARCH BAR */}

      <TextField
        fullWidth
        label="Search Notifications"
        placeholder="Search by company, event, result, or placement..."
        variant="outlined"
        value={search}
        sx={{ mb: 4 }}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* FILTER BAR */}

      

<Box
  sx={{
    mb: 5, // THIS CREATES PROPER GAP BELOW BUTTONS
    display: "flex",
    gap: 2,
    flexWrap: "wrap"
  }}
>

  <FilterBar setFilter={setFilter} />

</Box>

      {/* STATS SECTION */}

 

<Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr 1fr",
      md: "1fr 1fr 1fr 1fr"
    },
    gap: 3,
    mb: 5
  }}
>

  {/* TOTAL CARD */}
  <Card
    sx={{
      textAlign: "center",
      borderRadius: 4,
      boxShadow: 6,
      p: 2,
      background:
        "linear-gradient(135deg,#1565c0,#42a5f5)",
      color: "white",
      transition:
        "transform 0.4s ease, box-shadow 0.4s ease",
      cursor: "pointer",

      "&:hover": {
        transform:
          "translateY(-12px) scale(1.04)",
        boxShadow: 12,
        background:
          "linear-gradient(135deg,#0d47a1,#64b5f6)"
      }
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        fontWeight="bold"
      >
        Total
      </Typography>

      <Typography
        variant="h2"
        fontWeight="bold"
      >
        {notifications.length}
      </Typography>
    </CardContent>
  </Card>

  {/* PLACEMENT CARD */}
  <Card
    sx={{
      textAlign: "center",
      borderRadius: 4,
      boxShadow: 6,
      p: 2,
      background:
        "linear-gradient(135deg,#2e7d32,#66bb6a)",
      color: "white",
      transition:
        "transform 0.4s ease, box-shadow 0.4s ease",
      cursor: "pointer",

      "&:hover": {
        transform:
          "translateY(-12px) scale(1.04)",
        boxShadow: 12,
        background:
          "linear-gradient(135deg,#1b5e20,#81c784)"
      }
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        fontWeight="bold"
      >
        Placements
      </Typography>

      <Typography
        variant="h2"
        fontWeight="bold"
      >
        {
          notifications.filter(
            (n) =>
              n.Type === "Placement"
          ).length
        }
      </Typography>
    </CardContent>
  </Card>

  {/* RESULT CARD */}
  <Card
    sx={{
      textAlign: "center",
      borderRadius: 4,
      boxShadow: 6,
      p: 2,
      background:
        "linear-gradient(135deg,#6a1b9a,#ab47bc)",
      color: "white",
      transition:
        "transform 0.4s ease, box-shadow 0.4s ease",
      cursor: "pointer",

      "&:hover": {
        transform:
          "translateY(-12px) scale(1.04)",
        boxShadow: 12,
        background:
          "linear-gradient(135deg,#4a148c,#ce93d8)"
      }
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        fontWeight="bold"
      >
        Results
      </Typography>

      <Typography
        variant="h2"
        fontWeight="bold"
      >
        {
          notifications.filter(
            (n) =>
              n.Type === "Result"
          ).length
        }
      </Typography>
    </CardContent>
  </Card>

  {/* EVENT CARD */}
  <Card
    sx={{
      textAlign: "center",
      borderRadius: 4,
      boxShadow: 6,
      p: 2,
      background:
        "linear-gradient(135deg,#ef6c00,#ffb74d)",
      color: "white",
      transition:
        "transform 0.4s ease, box-shadow 0.4s ease",
      cursor: "pointer",

      "&:hover": {
        transform:
          "translateY(-12px) scale(1.04)",
        boxShadow: 12,
        background:
          "linear-gradient(135deg,#e65100,#ffcc80)"
      }
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        fontWeight="bold"
      >
        Events
      </Typography>

      <Typography
        variant="h2"
        fontWeight="bold"
      >
        {
          notifications.filter(
            (n) =>
              n.Type === "Event"
          ).length
        }
      </Typography>
    </CardContent>
  </Card>

</Box>

      {/* PRIORITY NOTIFICATIONS */}

      <Paper
        elevation={4}
        sx={{
          padding: 3,
          marginBottom: 5,
          borderRadius: 4
        }}
      >

        <Typography
          variant="h4"
          mb={3}
          fontWeight="bold"
        >
          Priority Notifications
        </Typography>

        <PriorityNotifications
          notifications={notifications}
        />

      </Paper>

      {/* ALL NOTIFICATIONS */}

      <Typography
        variant="h4"
        mb={3}
        fontWeight="bold"
      >
        All Notifications
      </Typography>

      <Grid container spacing={3}>

        {filteredNotifications.length === 0 ? (

          <Typography
            variant="h6"
            sx={{ ml: 2 }}
          >
            No notifications found
          </Typography>

        ) : (

          filteredNotifications.map(
            (notification) => (

              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={notification.ID}
              >

                <NotificationCard
                  notification={notification}
                />

              </Grid>
            )
          )

        )}

      </Grid>

      {/* FOOTER */}

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        mt={6}
        mb={4}
      >
        Powered by Smart Campus Notification System
      </Typography>

    </Container>
  );
};

export default Home;