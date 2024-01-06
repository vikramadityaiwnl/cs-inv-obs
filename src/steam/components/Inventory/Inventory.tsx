import { Button } from "../../../component/Button/Button"
import { Typography } from "../../../component/Typography/Typography"
import "./Inventory.css"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { InventorySchema } from "../../../pages/Home/Home"
import { SteamInventory } from "../SteamInventory/SteamInventory"
import { Item } from "./Item"
import { SteamInventoryItem } from "../../api/steaminventory"
import { fetchPricesForItems } from "../../api/steammarket"
import { toast } from "../../../component/Toast/toast"

export const Inventory = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [inventories, setInventories] = useLocalStorage("inventories")

  const [inventory, setInventory] = useState<InventorySchema>()
  const [inventoryIndex, setInventoryIndex] = useState<number>(0)  
  const [steamInventoryModalOpen, setSteamInventoryModalOpen] = useState<boolean>(false)

  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    const path = location.pathname

    inventories.forEach((inv: InventorySchema, idx: number) => {
      if (path.includes(inv.id)) {
        document.title = `${inv.name} - Inventory`
        setInventory(inv)
        setInventoryIndex(idx)
      }
    })
  }, [location.pathname, refresh])

  if (inventory === undefined) return <h1>Oops! No inventory found!!</h1>

  const updateInventories = (inventory: InventorySchema) => {
    setInventory(inventory)

    inventories[inventoryIndex] = inventory
    setInventories(inventories)
  }

  const deleteInventory = () => {
    if(!confirm("Are you sure you want to delete this inventory?")) return

    inventories.splice(inventoryIndex, 1)
    setInventories(inventories)
    navigate("/")
  }

  const deleteItem = (index: number) => {
    if(!confirm("Are you sure you want to delete this item?")) return

    inventory.items.splice(index, 1)
    inventory.invested = inventory.items.reduce((acc, item: SteamInventoryItem) => acc + (item.old_price ?? 0) * (item.quantity ?? 0), 0)
    setInventory(inventory)
    updateInventories(inventory)
    setRefresh(!refresh)
  }

  const refactorPrice = (price: string) => {
    return parseFloat(price.replace("$", ""))
  }
  const refreshPrices = async () => {
    if(inventory.items.length === 0) {
      toast.error("No items to refresh!")
      return
    }

    toast("Refreshing prices...")

    inventory.current = 0

    for (let idx = 0; idx < inventory.items.length; idx++) {
      const item = inventory.items[idx];
      item.price = refactorPrice(await fetchPricesForItems(item.market_hash_name));
      inventory.current += item.price * (item.quantity ?? 0);
      inventory.items[idx] = item;
    }

    updateInventories(inventory)
    setRefresh(!refresh)
    toast.success("All prices refreshed!")
  }

  return (
    <div className="inventory">
      <div className="inventory__heading">
        <Typography text={inventory.name} heading />
        <Typography text={`Invested: $${(inventory.invested)?.toFixed(2)}`} paragraph />
        <Typography text={`Current: $${(inventory.current)?.toFixed(2)}`} paragraph className={inventory.current >= inventory.invested ? "profit" : "loss"} />

        <div className="inventory__actions">
          <Button text="Add Item" secondary leadingIcon="add" onClick={() => setSteamInventoryModalOpen(true)} />
          <Button text="Delete Inventory" secondary leadingIcon="delete" onClick={() => deleteInventory()} />
          <Button text="Refresh Prices" secondary leadingIcon="refresh" onClick={async () => await refreshPrices()} />
        </div>
      </div>

      <div className="inventory__items">
        {
          inventory.items.map((item: SteamInventoryItem, idx) => {
            return <Item key={idx} item={item} onClick={() => deleteItem(idx)} />
          })
        }
      </div>

      <SteamInventory isOpen={steamInventoryModalOpen} onClose={() => setSteamInventoryModalOpen(false)} inventory={inventory} onItemAdded={(inv) => updateInventories(inv)}/>
    </div>
  )
}