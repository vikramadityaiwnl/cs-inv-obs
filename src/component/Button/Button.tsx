import { Icon } from "../Icon/Icon"
import "./Button.css"

interface ButtonProps {
  text: string,
  primary?: boolean,
  secondary?: boolean,
  leadingIcon?: string,
  trailingIcon?: string,
  disabled?: boolean,
  onClick: (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button = (props: ButtonProps) => {
  return (
    <button disabled={props.disabled} className={`${props.secondary ? "secondary" : "primary"} ${props.disabled ? "disabled" : ""}`} onClick={props.onClick}>
      {props.leadingIcon && <Icon iconName={props.leadingIcon} />}
      {props.text}
      {props.trailingIcon && <Icon iconName={props.trailingIcon} />}
    </button>
  )
}