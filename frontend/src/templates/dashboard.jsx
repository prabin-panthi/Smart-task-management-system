import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [priority, setPriority] = useState("MEDIUM")
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState("ALL")
    const [titleError, setTitleError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/")
            return
        }
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        const token = localStorage.getItem("token")
        try {
            const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 401) {
                localStorage.removeItem("token")
                navigate("/")
                return
            }

            const data = await response.json()
            setTasks(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async () => {
        if (!title.trim()) {
            setTitleError("Task title is required")
            return
        }

        setTitleError("")

        const token = localStorage.getItem("token")

        try {
            const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    priority,
                    deadline: deadline ? deadline : null
                })
            })

            if (response.ok) {
                setTitle("")
                setDescription("")
                setPriority("MEDIUM")
                setDeadline("")
                fetchTasks()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.ok) fetchTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const toggleComplete = async (task) => {
        const token = localStorage.getItem("token")
        const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED"
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    deadline: task.deadline,
                    status: newStatus
                })
            })
            if (response.ok) fetchTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const priorityColor = {
        HIGH: "#e94560",
        MEDIUM: "#f0a500",
        LOW: "#4caf50"
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === "ALL") return true
        return task.status === filter
    })

    return (
        <div style={{ minHeight: "calc(100vh - 60px)", background: "#f0f2f5", padding: "30px 20px" }}>
            <div style={{ maxWidth: "750px", margin: "0 auto" }}>

                {/* Header */}
                <div style={{ marginBottom: "30px" }}>
                    <h1 style={{ color: "#1a1a2e", fontSize: "26px" }}>My Tasks</h1>
                    <p style={{ color: "#888", fontSize: "14px" }}>
                        {tasks.length} total · {tasks.filter(t => t.status === "COMPLETED").length} completed
                    </p>
                </div>

                {/* Create Task Card */}
                <div style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "25px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    marginBottom: "30px"
                }}>
                    <h3 style={{ marginBottom: "18px", color: "#1a1a2e" }}>Create New Task</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                if (e.target.value.trim()) setTitleError("")
                            }}
                            placeholder="Enter task title"
                            style={{
                                border: titleError ? "2px solid red" : "1px solid #ccc",
                                outline: "none",
                                padding: "8px",
                                borderRadius: "5px"
                            }}
                        />

                        {titleError && (
                            <div style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "5px"
                            }}>
                                ⚠ {titleError}
                            </div>
                        )}

                        <textarea
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                padding: "11px 14px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px",
                                height: "80px",
                                resize: "vertical",
                                outline: "none"
                            }}
                        />

                        <div style={{ display: "flex", gap: "12px" }}>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: "11px 14px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    outline: "none"
                                }}
                            >
                                <option value="HIGH">🔴 High Priority</option>
                                <option value="MEDIUM">🟡 Medium Priority</option>
                                <option value="LOW">🟢 Low Priority</option>
                            </select>

                            <input
                                type="datetime-local"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: "11px 14px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    outline: "none"
                                }}
                            />
                        </div>

                        <button
                            onClick={createTask}
                            style={{
                                background: "#1a1a2e",
                                color: "white",
                                padding: "12px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "15px",
                                fontWeight: "bold"
                            }}
                        >
                            + Add Task
                        </button>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                    {["ALL", "PENDING", "COMPLETED"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: "8px 18px",
                                border: "none",
                                borderRadius: "20px",
                                fontSize: "13px",
                                fontWeight: "bold",
                                background: filter === f ? "#1a1a2e" : "#e0e0e0",
                                color: filter === f ? "white" : "#555"
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Task List */}
                {filteredTasks.length === 0 && (
                    <div style={{
                        textAlign: "center",
                        padding: "50px",
                        color: "#aaa",
                        background: "white",
                        borderRadius: "16px"
                    }}>
                        No tasks here yet!
                    </div>
                )}

                {filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        style={{
                            background: "white",
                            borderRadius: "12px",
                            padding: "20px",
                            marginBottom: "12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                            borderLeft: `4px solid ${priorityColor[task.priority]}`,
                            opacity: task.status === "COMPLETED" ? 0.7 : 1
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    margin: "0 0 6px 0",
                                    fontSize: "16px",
                                    color: "#1a1a2e",
                                    textDecoration: task.status === "COMPLETED" ? "line-through" : "none"
                                }}>
                                    {task.title}
                                </h3>

                                {task.description && (
                                    <p style={{ margin: "0 0 10px 0", color: "#666", fontSize: "14px" }}>
                                        {task.description}
                                    </p>
                                )}

                                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                    <span style={{
                                        background: priorityColor[task.priority] + "20",
                                        color: priorityColor[task.priority],
                                        padding: "3px 10px",
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        fontWeight: "bold"
                                    }}>
                                        {task.priority}
                                    </span>

                                    <span style={{
                                        background: task.status === "COMPLETED" ? "#e0ffe0" : "#fff3e0",
                                        color: task.status === "COMPLETED" ? "#2e7d32" : "#f57c00",
                                        padding: "3px 10px",
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        fontWeight: "bold"
                                    }}>
                                        {task.status}
                                    </span>

                                    {task.deadline && (
                                        <span style={{ fontSize: "12px", color: "#999" }}>
                                            📅 {new Date(task.deadline).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "8px", marginLeft: "15px" }}>
                                <button
                                    onClick={() => toggleComplete(task)}
                                    style={{
                                        background: task.status === "COMPLETED" ? "#e0e0e0" : "#1a1a2e",
                                        color: task.status === "COMPLETED" ? "#555" : "white",
                                        border: "none",
                                        padding: "8px 14px",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {task.status === "COMPLETED" ? "Undo" : "Done"}
                                </button>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    style={{
                                        background: "#ffe0e0",
                                        color: "#e94560",
                                        border: "none",
                                        padding: "8px 14px",
                                        borderRadius: "8px",
                                        fontSize: "12px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard