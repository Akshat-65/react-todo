import { useHistory } from 'react-router-dom';
import './Todo.css';
const Todo = (props) => {

    const history = useHistory();

    const handleDelete=()=>{
        props.handleDelete(props.id);
        console.log(props.id);
    }

    const handleEdit = () => {
        props.gettingId(props.id);
        history.push("/edit");
    }

    return ( 
        <div className="todo-container">
        <span className="task">{props.task}</span>
        <div className="update-delete">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
     );
}
 
export default Todo;