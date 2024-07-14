import Card from "../components/Card.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useEffect} from "react";
import {getTodo} from "./FetchRedux/FetchSlice.ts";

const Home: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const todos = useSelector((state: RootState) => state.todo.todo);
    const loading = useSelector((state: RootState) => state.todo.loading);
    const error = useSelector((state: RootState) => state.todo.error);

    useEffect(() => {
        dispatch(getTodo());
    }, [dispatch]);


    return (
        <div>
            <div className="form-container-add">
                <h2>Enter a task</h2>
                <form className="form" >
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter a message"
                    />
                    <button className="form-button" type="submit">Add</button>
                </form>
            </div>
            <div style={{display:'flex', flexDirection: 'column', placeItems:'center'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1 style={{marginTop: '20px'}}>List what need to do</h1>
                </div>
                <div>
                    {!loading && !error && Object.values(todos).map(todo => (
                        <Card key={todo.id} title={todo.title} completed={todo.completed} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;