import React from "react";



const TodoList = () => {

    // if there is data on storage retrieve it, or initiate new
    const [count, setCount] = React.useState(JSON.parse(localStorage.getItem('count')) || 0)
    const [list, setList] = React.useState(JSON.parse(localStorage.getItem('data')) || [])

    const [taskState, setTaskState] = React.useState({
        id: count,
        taskText: '',
        completed: false
    })
    const handleChange = (e) => {
        setTaskState({ ...taskState, [e.target.name]: e.target.value })
    }

    const handleCheck = (e, id, index) => {
        setList(list.map(task => task.id == id ? { ...task, completed: e.target.checked } : task))

        // empty the input field
        setTaskState({ ...taskState, taskText: '', completed: false })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //if empty don't submit
        if (!taskState.taskText == '') {
            setCount(count + 1)
            setList([...list, taskState])
            setTaskState({ ...taskState, taskText: '', id: count + 1 })
        }

    }

    const isComplete = (task) => {

        return <>
            {(task.completed) ?
                <label className="form-check-label m-3" name="taskText" style={{ textDecoration: "line-through" }}>{task.taskText}</label> :
                <label className="form-check-label m-3" name="taskText">{task.taskText}</label>}
        </>

    }

    const deleteTask = (e, id) => {
        setList(list.filter(task => task.id != id))
    }

    // save data even after refreshing page
    React.useEffect(() => {
        localStorage.setItem('data', JSON.stringify(list))
        localStorage.setItem('count', JSON.stringify(count))
    })

    return (
        <div className="mt-5 container ">

            <form onSubmit={handleSubmit} >
                <div className="d-flex flex-sm-wrap justify-content-center">
                    <input type="text" className="form-control w-50" name="taskText" value={taskState.taskText} onChange={handleChange} />
                    <input type="submit" className="btn btn-light" value="Add" />
                </div>
            </form>

            <ul className="d-flex justify-content-center">
                <div className="">
                    {list.map((task, index) =>
                        <li key={index} className="d-flex justify-content-between mt-1 align-items-center">
                            <input className="form-check-input m-3 mt-4 " type="checkbox" name="completed" checked={task.completed} onChange={(e) => handleCheck(e, task.id, index)} />
                            <div className="">{isComplete(task)}</div>
                            <input className="btn btn-dark m-3" type="submit" value="delete" onClick={(e) => deleteTask(e, task.id)} />
                        </li>)}
                </div>
            </ul>

        </div>
    )
}

export default TodoList