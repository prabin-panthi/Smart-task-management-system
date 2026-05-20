import { Link, useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    const isLoggedIn = !!localStorage.getItem("token")

    return (
        <nav style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
            height: "60px",
            background: "#1a1a2e",
            color: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
        }}>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#e94560" }}>
                TaskFlow
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                {!isLoggedIn && (
                    <>
                        <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
                            Login
                        </Link>
                        <Link to="/register" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
                            Register
                        </Link>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <Link to="/dashboard" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: "#e94560",
                                color: "white",
                                border: "none",
                                padding: "8px 16px",
                                borderRadius: "20px",
                                fontSize: "14px"
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar