import {
  DialogTitle,
  Box,
  Typography,
  Button,
  Dialog,
  FormControl,
  TextField,
  Link,
} from "@mui/material";
import { useState } from "react";

export const APIModal = ({ handleSubmit }: { handleSubmit: any }) => {
  const [key, setKey] = useState<string>();

  const onSubmit = () => {
    if (!key) {
      return;
    }

    localStorage.setItem("GEMINI_API_KEY", key);
    handleSubmit();
  };
  return (
    <Dialog
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle sx={{ borderBottom: "1px solid gray" }}>
        Enter Gemini API Key
      </DialogTitle>
      <Box component="form" onSubmit={onSubmit} sx={{ padding: 4 }}>
        <Typography>
          This is a client only app and requires a{" "}
          <Link href="https://ai.google.dev/pricing#1_5flash" target="_blank">
            Gemini API key
          </Link>
          . Please provide one below 😄
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            required
            label="Enter you Gemini key here"
            value={key}
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            onChange={(e) => {
              setKey(e?.target?.value);
            }}
          />
        </FormControl>
        <Button
          size="medium"
          variant="contained"
          sx={{ mt: 2, float: "right" }}
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};
