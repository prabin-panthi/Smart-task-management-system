import { useEffect, useState } from "react"


function Dashboard() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [tasks, setTasks] = useState([])

    const createTask = async () => {

    const token = localStorage.getItem("token")

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/tasks/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    title,
                    description
                })
            }
        )

        if (response.ok) {

            fetchTasks()

            setTitle("")
            setDescription("")
        }

    } catch (error) {

        console.log(error)
    }
}

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
    const deleteTask = async (id) => {

        const token = localStorage.getItem("token")

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/tasks/${id}/`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.ok) {

                fetchTasks()
            }

        } catch (error) {

            console.log(error)
        }
    }

    const toggleComplete = async (task) => {

        const token = localStorage.getItem("token")

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/tasks/${task.id}/`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        title: task.title,
                        description: task.description,
                        completed: !task.completed
                    })
                }
            )

            if (response.ok) {

                fetchTasks()
            }

        } catch (error) {

            console.log(error)
        }
    }

    return (

        <div>

            <div
                key={task.id}
                style={{
                    border: "1px solid gray",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "10px"
                }}
            >

                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <p>
                    Status:
                    {
                        task.completed
                            ? " Completed"
                            : " Pending"
                    }
                </p>

                <button onClick={() => toggleComplete(task)}>
                    {task.completed ? "Undo" : "Complete"}
                </button>

                <button onClick={() => deleteTask(task.id)}>
                    Delete
                </button>

            </div>



                
                

            <h2>Create Task</h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <button onClick={createTask}>
                Add Task
            </button>

            <hr />

        </div>
    )

}

export default Dashboard
