import "./InputBoxStyle.css";
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
      <label className="inputLabel">{label}</label>
      <input className="input" onChange={onChange} value={value} {...props} />
    </p>
  );
}
