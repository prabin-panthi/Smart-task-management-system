import { Link, useNavigate } from "react-router-dom"

function Navbar() {

    const navigate = useNavigate()

    const handleLogout = () => {

        localStorage.removeItem("token")

        navigate("/")
    }

    return (

        <div style={{
            display: "flex",
            gap: "20px",
            padding: "20px",
            background: "#ddd"
        }}>

            <Link to="/">Login</Link>

            <Link to="/register">Register</Link>

            <Link to="/dashboard">Dashboard</Link>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    )
}

export default Navbar