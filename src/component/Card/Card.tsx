import "./Card.css"

interface CardProps {
  text: string,
  itemCount: number,
  acitve?: boolean,
  onClick: () => void
}

export const Card = (props: CardProps) => {
  return (
    <div className="card" onClick={props.onClick}>
      {props.acitve && <div className="card__active"></div>}
      <div className={`text ${props.acitve && "tex-selected"}`}>
        {props.text}
      </div>
      <div className="item-count">
        Total Items: {props.itemCount}
      </div>
    </div>
  )
}