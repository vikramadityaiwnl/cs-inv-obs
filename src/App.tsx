import { Home } from './pages/Home/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Inventory } from './steam/components/Inventory/Inventory'
import { Login } from './pages/Login/Login'
import { ToastContainer } from './component/Toast/ToastContainer'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/:inventoryid" element={<Inventory />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
