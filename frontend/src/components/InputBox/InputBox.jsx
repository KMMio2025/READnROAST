import { Input, Label } from "./InputBoxStyles.js";
import React from "react";
export default function InputBox({
  label,
  invalid,
  onChange,
  value,
  ...props
}) {
  if (invalid) {
    //change styling...
  } else {
    //change styling...
  }
  return (
    <p>
      <Label htmlFor={label}>{label}</Label>
      <Input
        onChange={onChange}
        value={value}
        id={label}
        aria-label={label}
        {...props}
      />
    </p>
  );
}
