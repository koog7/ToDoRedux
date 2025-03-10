import Card from "../components/Card.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {FormEvent, useEffect, useState} from "react";
import {getTodo, postTodo} from "./FetchRedux/FetchSlice.ts";

const Home: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState('');
    const todos = useSelector((state: RootState) => state.todo.todos);
    const loading = useSelector((state: RootState) => state.todo.loading);
    const error = useSelector((state: RootState) => state.todo.error);

    useEffect(() => {
        dispatch(getTodo());
    }, [dispatch]);

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.trim() !== '') {
            const newTodo = {id: todos.id ,title, completed: false };
            dispatch(postTodo(newTodo));
            setTitle('');
        }
    };

    return (
        <div>
            {loading && <div id="loader-container">
                <div className="loader"></div>
            </div>}
            <div className="form-container-add">
                <h2>Enter a task</h2>
                <form className="form" onSubmit={submitForm}>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter a message"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button className="form-button" type="submit">Add</button>
                </form>
                {error && <p>Some error occurred</p>}
            </div>
            <div style={{display:'flex', flexDirection: 'column', placeItems:'center'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1 style={{marginTop: '20px'}}>List what need to do</h1>
                </div>
                {!loading && !error && (!todos || todos.length === 0) && <p>Now task are empty</p>}
                <div>
                    {!loading && !error && todos && todos.length > 0 && Object.entries(todos).map(([id, todo]) => (
                        <Card key={id} id={todo.id} title={todo.title} completed={todo.completed} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;