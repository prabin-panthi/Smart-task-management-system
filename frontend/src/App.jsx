import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Login from "./templates/Login"
import Register from "./templates/Register"
import Dashboard from "./templates/Dashboard"
import Navbar from "./components/Navbar"

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App