import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [username, setUsername] = useState("")
    const dropdownRef = useRef(null)

    const isLoggedIn = !!localStorage.getItem("token")

    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem("token")
            try {
                const payload = JSON.parse(atob(token.split(".")[1]))
                setUsername(payload.username || "User")
            } catch {
                setUsername("User")
            }
        }
    }, [isLoggedIn])

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setDropdownOpen(false)
        navigate("/")
    }

    return (
        <nav style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
            height: "60px",
            background: "#1a1a2e",
            color: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            position: "relative",
            zIndex: 100
        }}>
            {/* Logo */}
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#e94560" }}>
                TASK 2 DO
            </div>

            {/* Right side */}
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

                        {/* User dropdown */}
                        <div ref={dropdownRef} style={{ position: "relative" }}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    background: "#2a2a3e",
                                    border: "1px solid #444",
                                    color: "white",
                                    padding: "8px 16px",
                                    borderRadius: "30px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    transition: "background 0.2s"
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "#3a3a4e"}
                                onMouseLeave={e => e.currentTarget.style.background = "#2a2a3e"}
                            >
                                <div style={{
                                    width: "26px",
                                    height: "26px",
                                    borderRadius: "50%",
                                    background: "#e94560",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "white"
                                }}>
                                    {username.charAt(0).toUpperCase()}
                                </div>

                                {username}

                                <span style={{
                                    display: "inline-block",
                                    transition: "transform 0.2s",
                                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    fontSize: "10px"
                                }}>
                                    ▼
                                </span>
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div style={{
                                    position: "absolute",
                                    top: "calc(100% + 10px)",
                                    right: 0,
                                    background: "white",
                                    borderRadius: "12px",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                    minWidth: "180px",
                                    overflow: "hidden"
                                }}>
                                    {/* User info */}
                                    <div style={{
                                        padding: "14px 16px",
                                        borderBottom: "1px solid #f0f0f0",
                                        background: "#fafafa"
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px"
                                        }}>
                                            <div style={{
                                                width: "36px",
                                                height: "36px",
                                                borderRadius: "50%",
                                                background: "#e94560",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                color: "white"
                                            }}>
                                                {username.charAt(0).toUpperCase()}
                                            </div>

                                            <div>
                                                <div style={{
                                                    fontWeight: "bold",
                                                    color: "#1a1a2e",
                                                    fontSize: "14px"
                                                }}>
                                                    {username}
                                                </div>
                                                <div style={{
                                                    color: "#999",
                                                    fontSize: "12px"
                                                }}>
                                                    Logged in
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            width: "100%",
                                            padding: "12px 16px",
                                            background: "white",
                                            border: "none",
                                            fontSize: "14px",
                                            color: "#e94560",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            justifyContent: "flex-start",
                                            transition: "background 0.15s"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
                                        onMouseLeave={e => e.currentTarget.style.background = "white"}
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar