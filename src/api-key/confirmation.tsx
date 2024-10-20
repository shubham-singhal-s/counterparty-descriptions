import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APIModal } from "./modal";
import { useState } from "react";
import { ListCounterparties } from "../list";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { ViewCounterparty } from "../view";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <ListCounterparties />,
        index: true,
      },
      {
        path: ":id",
        element: <ViewCounterparty />,
      },
    ],
  },
]);

export const APIKeyConfirmation = () => {
  const [showModal, setShowModal] = useState(
    !!localStorage.getItem("GEMINI_API_KEY")
  );
  const [temp, setTemp] = useState(
    parseFloat(localStorage.getItem("TEMP") || "0.2")
  );

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleSelect = (event: any) => {
    const value = event?.target?.value;
    if (!value) {
      return;
    }

    setTemp(value);
    localStorage.setItem("TEMP", value.toString());
  };

  const Base = () => {
    if (showModal) {
      return (
        <Box sx={{ backgroundColor: "whitesmoke" }}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              p: 4,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Stack
              sx={{ flexDirection: { xs: "column", sm: "row" } }}
              justifyContent="space-between"
            >
              <Typography sx={{ typography: { sm: "h3", xs: "h4" } }}>
                Counterparties
              </Typography>
              <Box alignContent="center">
                <span style={{ paddingRight: 10 }}>Generation style is</span>
                <Select
                  sx={{ height: "auto" }}
                  variant="standard"
                  value={temp}
                  onChange={handleSelect}
                >
                  <MenuItem value={0.2}>Precise</MenuItem>
                  <MenuItem value={0.8}>Basic</MenuItem>
                  <MenuItem value={1.4}>Creative</MenuItem>
                </Select>
              </Box>
            </Stack>
          </Box>
          <RouterProvider router={router} />
        </Box>
      );
    }

    return <APIModal handleSubmit={handleSubmit} />;
  };

  return <Box sx={{ width: "100%" }}>{Base()}</Box>;
};
