import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import debounce from "../utils/debounce";

export default function Text(props) {
  const { label, helperText, multiline, rows, onChange } = props;
  const [value, setValue] = React.useState("");

   const handleChange = (event) => {
     setValue(event.target.value);
     if (onChange) {
       onChange(event.target.value);
     }
   };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          // error
          id="standard-error-helper-text"
          label= {label}
          defaultValue="Hello World"
          helperText= {helperText}
          variant="standard"
          value={value}
          rows={rows}
           multiline={multiline}
          onChange={handleChange}
        />
      </div>
    </Box>
    
  );
}
