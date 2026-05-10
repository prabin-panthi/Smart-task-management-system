import { useEffect, useState } from "react"

function Dashboard() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {

        fetchTasks()

    }, [])

    const fetchTasks = async () => {

        const token = localStorage.getItem("token")

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/tasks/",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            setTasks(data)

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div>

            <h1>My Tasks</h1>

            {
                tasks.map(task => (

                    <div key={task.id}>

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <hr />

                    </div>
                ))
            }

        </div>
    )
}

export default Dashboard
