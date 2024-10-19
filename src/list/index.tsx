import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import { list } from "./list-items";
import { useNavigate } from "react-router-dom";

export const ListCounterparties: FC = () => {
  const navigate = useNavigate();
  const counterparties = list();
  return (
    <Box>
      <List
        sx={{
          m: 8,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        {counterparties.map((c) => (
          <ListItem
            key={c.shortname}
            sx={{
              backgroundColor: "white",
              ":hover": {
                borderLeft: "4px solid #16abbc",
              },
            }}
            disablePadding
          >
            <ListItemButton onClick={() => navigate(c.shortname)}>
              <ListItemText primary={c.name} secondary={c.shortname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
