import "./Typography.css"

interface TypographyProps {
  text: string,
  heading?: boolean,
  subheading?: boolean,
  paragraph?: boolean,
  pointer?: boolean,
  className?: string,
  onClick?: () => void
}

export const Typography = (props: TypographyProps) => {
  const { text, heading, subheading, paragraph } = props;

  if (heading) return <h1 className={`typography ${props.pointer ? "pointer" : ""} ${props.className}`} onClick={props.onClick}>{text}</h1>

  if (subheading) return <h2 className={`typography ${props.pointer ? "pointer" : ""} ${props.className}`} onClick={props.onClick}>{text}</h2>

  if (paragraph) return <p className={`typography ${props.pointer ? "pointer" : ""} ${props.className}`} onClick={props.onClick}>{text}</p>

  return <span className={`typography ${props.pointer ? "pointer" : ""} ${props.className}`} onClick={props.onClick}>{text}</span>
}