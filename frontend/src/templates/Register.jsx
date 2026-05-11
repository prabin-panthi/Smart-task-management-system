import { useState } from "react"

function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {

        e.preventDefault()

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/register/",
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

            const data = await response.json()

            console.log(data)

            if (response.ok) {

                alert("User registered!")

            } else {

                alert("Registration failed")
            }

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div>

            <h2>Register</h2>

            <form onSubmit={handleRegister}>

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
                    Register
                </button>

            </form>

        </div>
    )
}

export default Register