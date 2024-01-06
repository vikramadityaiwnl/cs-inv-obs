import axios from "axios";
import { toast } from "../../component/Toast/toast";

const STEAM_API_KEY = JSON.parse(localStorage.getItem("api-key") || "")

const axiosInstance = axios.create()
axiosInstance.interceptors.response.use(undefined, (error) => {
  toast.error("Steam API Error! Please make sure you have a valid API Key.")

  return Promise.reject(error)
})

const getProfileID = async (url: string) => {
  const { data } = await axiosInstance.get(`/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_API_KEY}&vanityurl=${url}`)
  return data.response.steamid.toString()
}

const setProfile = async (steamid: string) => {
  const { data } = await axiosInstance.get(`/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamid}`)
  const player = data.response.players[0]

  const profile = {
    steamid: player.steamid,
    name: player.personaname,
    avatar: player.avatarfull,
  }
  localStorage.setItem("steam-profile", JSON.stringify(profile))
}

export const init = async (vanity: string) => {
  if(!STEAM_API_KEY) return toast.error("API Key not found!")

  setProfile(await getProfileID(vanity))
}

export const validateProfile = async (vanity: string) => {
  const { data } = await axiosInstance.get(`/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_API_KEY}&vanityurl=${vanity}`)
  
  if(!data.response.steamid) return false

  await setProfile(data.response.steamid.toString())
  return true
}