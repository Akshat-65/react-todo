import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = (props) => {

    const[task,setTask] = useState('');

    const history = useHistory();

    const handleTask = (event)=>{
        setTask(event.target.value);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        if (task.trim().length === 0) {
            alert("Enter task");
        }
        const taskData = {
            task:task
        }
        props.addTodo(taskData);
        history.push("/navigation");
    }
    return (
        <div className="flex justify-around w-screen h-screen">
            <form
            onSubmit={handleSubmit}
                className="flex flex-wrap items-center justify-center p-2 top-1/4 absolute flex-col "
            >
                <div className="flex flex-col flex-wrap p-8 rounded items-center justify-center ring-2 ring-pink-700 ring-offset-4 ring-offset-pink-300 ">
                    <label className="m-2 text-2xl font-serif font-semibold text-pink-700"> Task: </label>
                    <input
                        type="text"
                        value={task}
                        onChange={handleTask}
                        placeholder="Enter your task"
                        className="p-1 m-1 border-2  border-pink-700 rounded leading-5 italic text-pink-800 focus:border-pink-700"
                    />
                    <button className="bg-transparent text-base border-2 border-pink-800 text-pink-700 hover:bg-pink-700 hover:text-white font-bold m-2 p-1 rounded uppercase">
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Create;