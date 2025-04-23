import { Input, Label } from "./InputBoxStyles.js";
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
      <Label>{label}</Label>
      <Input onChange={onChange} value={value} {...props} />
    </p>
  );
}
