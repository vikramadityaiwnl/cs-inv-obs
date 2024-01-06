import { Button } from "../../../component/Button/Button";
import { Typography } from "../../../component/Typography/Typography";
import { SteamInventoryItem } from "../../api/steaminventory";
import "./Item.css"

interface ItemProps {
  item: SteamInventoryItem,
  onClick: () => void
}

export const Item = (props: ItemProps) => {
  return (
    <div className="item">
      <img src={`https://community.cloudflare.steamstatic.com/economy/image/${props.item.icon_url}`} />
      <div className="item__details">
        <h3>{props.item.market_hash_name}</h3>
        <Typography text={`Old Price: $${(props.item.old_price)?.toFixed(2)}`} />
        <Typography text={`Price: $${(props.item.price)?.toFixed(2) ?? ""}`} paragraph />
        <Typography text={`Quantity: ${(props.item.quantity)?.toFixed(2)}`} paragraph />
        <Button text="Delete Item" secondary leadingIcon="delete" onClick={props.onClick} />
      </div>
    </div>
  )
}