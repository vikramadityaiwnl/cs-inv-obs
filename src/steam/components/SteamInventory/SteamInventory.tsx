import { Typography } from "../../../component/Typography/Typography"
import { Button } from "../../../component/Button/Button"
import { Input } from "../../../component/Input/Input"
import { Item } from "./Item"
import "./SteamInventory.css"
import { SteamInventoryItem, getInventory, getInventoryFromLocalStorage } from "../../api/steaminventory"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import { useEffect, useRef, useState } from "react"
import { toast } from "../../../component/Toast/toast"
import { fetchPrice } from "../../api/steammarket"
import { InventorySchema } from "../../../pages/Home/Home"

interface SteamInventoryProps {
  isOpen: boolean,
  inventory: InventorySchema,
  onClose: () => void,
  onItemAdded: (inventory: InventorySchema) => void
}

export const SteamInventory = (props: SteamInventoryProps) => {
  if (!props.isOpen) return null

  const imgRef = useRef<HTMLImageElement>(null)

  const [steamProfile] = useLocalStorage("steam-profile")

  const [steamInventory, setSteamInventory] = useState([])
  const [selectedItem, setSelectedItem] = useState<SteamInventoryItem | null>(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [refreshDisabled, setRefreshDisabled] = useState(false)

  const [itemQuantity, setItemQuantity] = useState("")
  const [itemPrice, setItemPrice] = useState("")

  useEffect(() => {
    setSteamInventory(getInventoryFromLocalStorage())

    imgRef.current?.style.setProperty("opacity", "0")
  }, [])

  const loadInventory = async () => {
    setRefreshDisabled(true)
    setSteamInventory(await getInventory(steamProfile.steamid))

    setTimeout(() => {
      setRefreshDisabled(false)
    }, 120000) // wait for 2 minutes before refreshing again
  }

  const searchItemFromInventory = (itemName: string) => {
    if(itemName === "") return setSteamInventory(getInventoryFromLocalStorage())
    
    const filteredInventory = getInventoryFromLocalStorage().filter((item: SteamInventoryItem) => {
      return item.market_hash_name && item.market_hash_name.toLowerCase().includes(itemName.toLowerCase())
    })
    
    setSteamInventory(filteredInventory)
  }

  const onItemSelected = (item: SteamInventoryItem, index: number) => {
    setSelectedItem(item)
    setSelectedItemIndex(index)
    imgRef.current?.style.setProperty("opacity", "1")
  }
  const fetchItemPrice = async () => {
    if(!selectedItem || selectedItem === null) return toast.error("Please select an item first!")

    const price = await fetchPrice(selectedItem?.market_hash_name)
    setItemPrice(price)
  }

  const refactorPrice = (price: string) => {
    return parseFloat(price.replace("$", ""))
  }
  const addSelectedItem = () => {
    if(!selectedItem || selectedItem === null) return toast.error("Please select an item first!")

    if(itemPrice === "" || itemQuantity === "") return toast.error("Please enter a valid price and quantity!")

    props.inventory.items.forEach((item: SteamInventoryItem, index) => {
      if(item.market_hash_name === selectedItem?.market_hash_name) {
        props.inventory.items.splice(index, 1)
        props.inventory.invested -= (item.old_price ?? 0) * (item.quantity ?? 0)
      }
    })

    const item: SteamInventoryItem = {
      ...selectedItem,
      quantity: parseInt(itemQuantity),
      old_price: refactorPrice(itemPrice)
    }
    props.inventory.items.push(item)
    props.inventory.invested += (item.old_price ?? 0) * (item.quantity ?? 0)

    toast.success("Item added successfully!")

    props.onItemAdded(props.inventory)
  }

  return (
    <div className="steaminventory">
      <div className="steaminventory__body">
        <div className="profile-inventory">
          <Typography text="Profile Inventory" subheading />
          <div className="actions">
            <Button disabled={refreshDisabled} text="Refresh" leadingIcon="refresh" secondary onClick={() => loadInventory()} />
            <Input placeholder="Search for items" onChange={(e) => searchItemFromInventory(e.target.value)} />
          </div>
          <div className="profile-inventory-items">
            {steamInventory.map((item: SteamInventoryItem, index) => (
              <Item key={index} name={item.market_hash_name} image_url={item.icon_url} selected={index === selectedItemIndex} onClick={() => onItemSelected(item, index)} />
            ))}
          </div>
        </div>
        <div className="add-to">
          <Typography text="Add Item" subheading />

          <div className="selected-item">
            <img ref={imgRef} src={selectedItem ? `https://community.cloudflare.steamstatic.com/economy/image/${selectedItem?.icon_url}` : ""} />
            <Typography text={selectedItem?.market_hash_name || ""} paragraph />
          </div>

          <Input placeholder="Enter Custom Quantity" type="number" onChange={(e) => setItemQuantity(e.target.value)} value={itemQuantity} />
          <Input placeholder="Enter Custom Price" onChange={(e) => setItemPrice(e.target.value)} value={itemPrice} onFocus={() => setItemPrice("$ ")} />
          <Button text="Fetch Price" secondary onClick={async () => await fetchItemPrice()} />

          <div className="add-to-actions">
            <Button text="Add Item" secondary onClick={() => addSelectedItem()} leadingIcon="add" />
            <Button text="Close" primary onClick={props.onClose} trailingIcon="close" />
          </div>
        </div>
      </div>
    </div>
  )
}