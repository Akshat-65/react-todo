const TodoList = (props) => {
    return (
        <div className="flex flex-wrap items-center justify-center">
            {props.todos}
        </div>
    );
}

export default TodoList;