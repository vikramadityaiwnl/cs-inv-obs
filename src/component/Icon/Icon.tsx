import "./Icon.css"

interface IconProps {
  iconName: string
}

export const Icon = (props: IconProps) => {
  return (
    <span className="icon material-symbols-outlined">
      {props.iconName}
    </span>
  )
}
