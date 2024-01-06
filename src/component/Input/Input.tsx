import "./Input.css"

interface InputProps {
  placeholder: string,
  value?: string,
  type?: string,
  pattern?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props: InputProps) => {
  return (
    <input
      onChange={props.onChange}
      onFocus={props.onFocus}
      onKeyDown={props.onKeyDown}
      placeholder={props.placeholder}
      value={props.value}
      type={props.type || "text"}
      pattern={props.pattern}
      spellCheck="false"
    />
  )
}
