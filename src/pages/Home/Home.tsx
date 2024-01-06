import { useEffect, useState } from "react"
import { Button } from "../../component/Button/Button"
import { Card } from "../../component/Card/Card"
import { Modal } from "../../component/Modal/Modal"
import { Navbar } from "../../component/Navbar/Navbar"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { v4 as uuid } from "uuid"
import { Outlet, useNavigate } from "react-router-dom"
import "./Home.css"
import { init } from "../../steam/api/steamuser"
import { toast } from "../../component/Toast/toast"

export interface InventorySchema {
  id: string,
  name: string,
  items: any[],
  invested: number,
  current: number,
}

export const Home = () => {
  const [steamProfile] = useLocalStorage("steam-profile")
  const [vanity] = useLocalStorage("vanity")
  const [inventories, setInventories] = useLocalStorage("inventories")

  const navigate = useNavigate()
  const [invModalOpen, setInvModalOpen] = useState(false)

  useEffect(() => {
    if (vanity === "") return navigate("/login")

    document.title = "Home | CS INV OBSERVER"

    init(vanity)
    toast("Welcome, " + steamProfile.name + "!")
  }, [])

  const addInventory = (inputText: string) => {
    const newInv: InventorySchema = {
      id: uuid(),
      name: inputText,
      items: [],
      invested: 0,
      current: 0,
    }

    const newInventories = [...inventories, newInv]
    setInventories(newInventories)
    setInvModalOpen(false)
  }

  return (
    <div className="home">
      <Navbar />
      <div className="home__content">
        <div className="list__container">
          <Button text="Add New Inventory" secondary leadingIcon="add" onClick={() => setInvModalOpen(true)} />

          <div className="list">
            {Array.isArray(inventories) && inventories.map((inv: InventorySchema) => {
              const active = window.location.pathname.includes(inv.id.toString())
              return <Card acitve={active} itemCount={inv.items.length} key={inv.id} text={inv.name} onClick={() => navigate(inv.id.toString())} />
            })}
          </div>
        </div>
        <div className="inventory">
          <Outlet />
        </div>
      </div>

      <Modal isOpen={invModalOpen} text='Create New Inventory'
        inputPlaceHolder='Enter new inventory name'
        onPositiveButtonClick={(inputText) => addInventory(inputText)}
        onNegativeButtonClick={() => setInvModalOpen(false)}
      />
    </div>
  )
}