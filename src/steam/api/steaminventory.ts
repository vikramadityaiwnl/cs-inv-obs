import axios from "axios"
import { toast } from "../../component/Toast/toast";

export interface SteamInventoryItem {
  // Steam Inventory Item
  appid?: number;
  classid?: string;
  instanceid?: string;
  currency?: number;
  background_color?: string;
  icon_url_large?: string;
  descriptions?: {
    type?: string;
    value?: string;
    color?: string;
  }[];
  tradable?: number;
  actions?: {
    link?: string;
    name?: string;
  }[];
  name?: string;
  name_color?: string;
  type?: string;
  market_name?: string;
  market_actions?: {
    link?: string;
    name?: string;
  }[];
  commodity?: number;
  market_tradable_restriction?: number;
  marketable?: number;
  tags?: {
    category?: string;
    internal_name?: string;
    localized_category_name?: string;
    localized_tag_name?: string;
    color?: string;
  }[];

  // Custom Inventory Item
  icon_url?: string;
  market_hash_name?: string;
  quantity?: number;
  old_price?: number;
  price?: number;
}

const axiosInstance = axios.create()
axiosInstance.interceptors.response.use(undefined, (error) => {
  if (error.response.status !== 429) {
    toast.error("Something went wrong, please try again later!")
    return Promise.reject(error)
  }

  toast.error("Too many requests, please try again after 2 minutes!")

  return Promise.reject(error)
})

export const getInventoryFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("steam-inventory") || "[]")
}

export const getInventory = async (steamid: string) => {
  const url = `/inventory/${steamid}/730/2?l=english&count=5000`
  const response = await axiosInstance.get(url)

  const inventory: Array<SteamInventoryItem> = response.data.descriptions
  sortinventory(inventory)

  toast.success("Inventory loaded successfully!")

  return JSON.parse(localStorage.getItem("steam-inventory") || "[]")
}

const sortinventory = (inventory: Array<SteamInventoryItem>) => {
  let sortedInventory: Array<SteamInventoryItem> = []
  inventory.forEach((item) => {
    if (item.marketable === 0) {
      return
    }

    deleteObjectElements(item)
    sortedInventory.push(item)
  })

  localStorage.setItem("steam-inventory", JSON.stringify(sortedInventory))
}

function deleteObjectElements(item: SteamInventoryItem) {
  delete item.actions
  delete item.appid
  delete item.background_color
  delete item.classid
  delete item.commodity
  delete item.currency
  delete item.descriptions
  delete item.icon_url_large
  delete item.instanceid
  delete item.market_actions
  delete item.market_name
  delete item.market_tradable_restriction
  delete item.marketable
  delete item.name
  delete item.name_color
  delete item.tags
  delete item.tradable
  delete item.type
}