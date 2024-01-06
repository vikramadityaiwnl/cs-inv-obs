import axios from "axios"
import { toast } from "../../component/Toast/toast"

const axiosInstance = axios.create()
axiosInstance.interceptors.response.use(undefined, (error) => {
  if (error.response.status !== 429) {
    toast.error("Something went wrong, please try again later!")
    return Promise.reject(error)
  }

  toast.error("Too many requests, please try again after some time!")

  return Promise.reject(error)
})

export const fetchPrice = async (market_hash_name?: string) => {
  const url = `/market/priceoverview/?appid=730&currency=1&market_hash_name=${market_hash_name}`
  const res = await axiosInstance.get(url)
  return res.data.lowest_price
}

export const fetchPricesForItems = async (market_hash_name?: string): Promise<string> => {
  const url = `/market/priceoverview/?appid=730&currency=1&market_hash_name=${market_hash_name}`

  try {
    const res = await axiosInstance.get(url)
    return res.data.lowest_price
  } catch (error: any) {
    if(error.response && error.response.status === 429) {
      toast.warning("Too many requests, please wait while we fetch! It may take a while")
      await new Promise(resolve => setTimeout(resolve, 60000)) // wait for 60 seconds
      return fetchPricesForItems(market_hash_name)
    } else {
      throw error
    }
  }
}
