import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCounterparty, update } from "../list/list-items";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  LinearProgress,
  Alert,
} from "@mui/material";
import { getRefreshedDescription } from "./gemini";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./style.css";

export const ViewCounterparty = () => {
  const { id } = useParams();
  const [counterparty, setCounterparty] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCounterparty(id).then(setCounterparty);
    }
  }, [id]);

  const refresh = () => {
    setLoading(true);
    getRefreshedDescription(counterparty.name, counterparty.description)
      .then((r) => {
        const newDescription = r?.content?.parts[0]?.text;
        if (newDescription) {
          const newCounterparty = {
            ...counterparty,
            description: newDescription,
          };
          setCounterparty(newCounterparty);
          update(newCounterparty);
        }
      })
      .catch((e) => {
        const serverError = e?.response?.data?.error;

        if (
          serverError?.code === 400 &&
          serverError?.message ===
            "API key not valid. Please pass a valid API key."
        ) {
          alert("Invalid API key!");
          localStorage.removeItem("GEMINI_API_KEY");
          location.reload();
        }

        setError(serverError?.message);
      })
      .finally(() => setLoading(false));
  };

  if (!counterparty) {
    return (
      <Box sx={{ p: 8 }}>
        <Alert
          action={
            <Button color="inherit" size="small" onClick={() => navigate(-1)}>
              GO BACK
            </Button>
          }
          severity="error"
        >
          Counterparty not found 😭
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {loading ? <LinearProgress /> : ""}
      <Box sx={{ p: 8 }}>
        <Typography
          sx={{ py: 1, my: 4, borderBottom: "1px solid #aaa" }}
          variant="h5"
        >
          {counterparty?.name}
        </Typography>
        <Box sx={{ mt: 2, borderLeft: "4px solid #16abbc", pl: 4 }}>
          <Typography variant="caption">Name</Typography>
          <Typography variant="subtitle1">{counterparty?.name}</Typography>
        </Box>
        <Box sx={{ mt: 2, borderLeft: "4px solid #16abbc", pl: 4 }}>
          <Typography variant="caption">Shortname</Typography>
          <Typography variant="subtitle1">{counterparty?.shortname}</Typography>
        </Box>
        <Box sx={{ mt: 2, borderLeft: "4px solid #16abbc", pl: 4 }}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ width: "85%", maxWidth: "800px" }}>
              <Typography variant="caption">Description</Typography>
              <Typography
                sx={{ color: loading ? "#aaa" : "inherit" }}
                variant="subtitle1"
              >
                {counterparty?.description ? counterparty?.description : "None"}
              </Typography>
            </Box>
            <Box sx={{ px: 8 }}>
              <IconButton
                onClick={() => refresh()}
                disabled={loading}
                size="large"
                sx={{
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
              >
                <RefreshIcon
                  className={loading ? "spinner" : ""}
                  fontSize="large"
                />
              </IconButton>
            </Box>
          </Stack>
        </Box>
        {error && (
          <Alert
            sx={{ mt: 8 }}
            severity="error"
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => setError(false)}
              >
                CLOSE
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};
