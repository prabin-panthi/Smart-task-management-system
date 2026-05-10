import { useState } from "react"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {

        e.preventDefault()

        console.log("Login started")

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/login/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            )

            console.log("RESPONSE:", response)

            const data = await response.json()

            console.log("DATA:", data)

            if (response.ok) {

                console.log("TOKEN:", data.access)

                localStorage.setItem(
                    "token",
                    data.access
                )

                alert("Login successful!")

            } else {

                alert("Invalid credentials")
            }

        } catch (error) {

            console.log("ERROR:", error)
        }
    }

    return (

        <div>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login