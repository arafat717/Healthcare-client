import { SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TControllerProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth: boolean;
  sx?: SxProps;
  Placeholder?: string;
  required?: boolean;
};

const InputField = ({
  name,
  label,
  type = "text",
  fullWidth,
  sx,
  Placeholder,
  required,
  size = "small",
}: TControllerProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          fullWidth={fullWidth}
          size={size}
          placeholder={label}
          required={required}
          variant="outlined"
          error={!!error?.message}
          helperText={error?.message}
        ></TextField>
      )}
    />
  );
};

export default InputField;
