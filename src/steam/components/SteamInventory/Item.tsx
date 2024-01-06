import { Typography } from "../../../component/Typography/Typography";
import "./Item.css";

interface ItemProps {
  name?: string;
  image_url?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Item = (props: ItemProps) => {
  const img_base = "https://community.cloudflare.steamstatic.com/economy/image/"

  return (
    <div className={`si-item ${props.selected ? "selected" : ""}`} onClick={props.onClick}>
      <img src={img_base.concat(props.image_url || "")} />
      <div className="item__details">
        <Typography text={props.name || ""} paragraph />
      </div>
    </div>
  )
}
