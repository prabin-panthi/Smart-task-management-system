import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.access)
                navigate("/dashboard")
            } else {
                setError("Invalid username or password")
            }
        } catch (error) {
            setError("Something went wrong. Try again.")
        }
    }

    return (
        <div style={{
            minHeight: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f2f5"
        }}>
            <div style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                width: "100%",
                maxWidth: "400px"
            }}>
                <h2 style={{
                    textAlign: "center",
                    marginBottom: "8px",
                    color: "#1a1a2e",
                    fontSize: "28px"
                }}>
                    Welcome Back
                </h2>
                <p style={{
                    textAlign: "center",
                    color: "#888",
                    marginBottom: "30px",
                    fontSize: "14px"
                }}>
                    Log in to manage your tasks
                </p>

                {error && (
                    <div style={{
                        background: "#ffe0e0",
                        color: "#e94560",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        fontSize: "14px"
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                        <label style={{ fontSize: "13px", color: "#555", marginBottom: "6px", display: "block" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px 15px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none"
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ fontSize: "13px", color: "#555", marginBottom: "6px", display: "block" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px 15px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px",
                                outline: "none"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            background: "#1a1a2e",
                            color: "white",
                            padding: "13px",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "15px",
                            fontWeight: "bold",
                            marginTop: "8px"
                        }}
                    >
                        Login
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#888" }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#e94560", textDecoration: "none", fontWeight: "bold" }}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login