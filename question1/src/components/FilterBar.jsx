import React from "react";

import {
  Stack,
  Button
} from "@mui/material";

const FilterBar = ({ setFilter }) => {

  return (

    <Stack
      direction="row"
      spacing={2}
      mb={4}
      flexWrap="wrap"
    >

      <Button
        variant="contained"
        onClick={() => setFilter("All")}
      >
        All
      </Button>

      <Button
        variant="contained"
        color="warning"
        onClick={() => setFilter("Event")}
      >
        Event
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setFilter("Result")}
      >
        Result
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={() => setFilter("Placement")}
      >
        Placement
      </Button>

    </Stack>
  );
};

export default FilterBar;