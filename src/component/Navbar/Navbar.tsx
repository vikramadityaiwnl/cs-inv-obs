import { Typography } from "../Typography/Typography"
import "./Navbar.css"
import { Button } from "../Button/Button"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { toast } from "../Toast/toast"

export const Navbar = () => {
  const navigate = useNavigate()

  const [profile] = useLocalStorage("steam-profile")

  const logout = () => {
    if(!confirm("Are you sure you want to logout?")) return

    localStorage.clear()
    navigate("/login")
    toast("Logged out successfully!")
  }

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Typography text="CS INV OBSERVER" pointer heading onClick={() => navigate("/")} />
      </div>
      <div className="navbar__profile">
        <img src={profile.avatar} alt="profile_img" />
        <div className="profile__data">
          <Typography text={profile.name} subheading />
          <Button text="Logout" onClick={() => logout()} />
        </div>
      </div>
    </div>
  )
}