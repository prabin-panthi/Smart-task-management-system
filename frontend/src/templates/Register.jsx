import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess("Account created! Redirecting to login...")
                setTimeout(() => navigate("/"), 1500)
            } else {
                setError(data.error || "Registration failed")
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
                    Create Account
                </h2>
                <p style={{
                    textAlign: "center",
                    color: "#888",
                    marginBottom: "30px",
                    fontSize: "14px"
                }}>
                    Sign up to get started
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

                {success && (
                    <div style={{
                        background: "#e0ffe0",
                        color: "#2e7d32",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        fontSize: "14px"
                    }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                        <label style={{ fontSize: "13px", color: "#555", marginBottom: "6px", display: "block" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Choose a username"
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
                            placeholder="Choose a password"
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
                        Register
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#888" }}>
                    Already have an account?{" "}
                    <Link to="/" style={{ color: "#e94560", textDecoration: "none", fontWeight: "bold" }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register