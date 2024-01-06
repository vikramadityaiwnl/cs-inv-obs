import "./Login.css"
import background from "../../assets/doodle_background.png"
import { Typography } from "../../component/Typography/Typography"
import { Input } from "../../component/Input/Input"
import { Button } from "../../component/Button/Button"
import { useEffect, useState } from "react"
import { validateProfile } from "../../steam/api/steamuser"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { toast } from "../../component/Toast/toast"

export const Login = () => {
  const navigate = useNavigate()
  const [_, setVanity] = useLocalStorage("vanity")
  const [__, setApiKey] = useLocalStorage("api-key")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [steamProfile, setSteamProfile] = useState("")

  useEffect(() => {
    document.title = "Login | CS INV OBSERVER"
  }, [])

  const handleLogin = async () => {
    if(username === "" || password === "" || steamProfile === "") return

    toast("Logging in...")

    const vanity = steamProfile.split("/")[4]
    if(await validateProfile(vanity)) {
      setVanity(vanity)
      navigate("/")
      toast.success("Logged in successfully!")
    }
  }

  return (
    <div className="login__page" style={{background: `no-repeat center / cover url(${background})`}}>
      <div className="glass-panel">
        <Typography text="Login" heading />
        <Typography text="Enter credentials and login to continue" />
        <div className="login">
          <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="Steam Profile URL" onChange={(e) => setSteamProfile(e.target.value)} />
          <Input placeholder="Steam API Key" onChange={(e) => setApiKey(e.target.value)} />
          <Button text="Login" onClick={() => handleLogin()} leadingIcon="login" />
        </div>
      </div>
    </div>
  )
}
