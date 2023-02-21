import { Link } from "react-router-dom";
const Navigation = (props) => {

    const fetchTodos = () => {
        props.getTodos();
    }
    return (
        <nav className="flex flex-wrap justify-between m-5 rounded-md border-2 border-pink-700 h-24 items-center bg-gradient-to-r from-pink-700 to-pink-400 ">
            <Link to="/create"><div className="border-2 rounded-xl border-transparent bg-pink-800 text-white m-2 p-2 font-semibold ">
                <span
                    className="p-2 m-2 text-center">Create TODO list
                </span>
            </div>
            </Link>
            <Link to="/todolist"> <div onClick={fetchTodos} className="border-2 rounded-xl border-transparent bg-pink-800 text-white m-2  font-semibold p-2">
                <span
                    className="p-2 m-2 text-center">View TODO list
                </span>
            </div>
            </Link>
            <Link to="/"> <div className="border-2 rounded-xl border-transparent bg-pink-800 text-white m-2  font-semibold p-2">
                <span
                    className="p-2 m-2 text-center">Log out
                </span></div>
            </Link>
        </nav>
    );
}

export default Navigation;