import {useState} from "react";
import axiosAPI from "../axios/AxiosAPI.ts";
import {useDispatch} from "react-redux";
import {deleteTodo, updateTodo} from "../containers/FetchRedux/FetchSlice.ts";

interface Props {
    id: string;
    title: string;
    completed: boolean;
}

const Card: React.FC<Props> = ({ id,title, completed}) => {

    const [isComplete, setIsComplete] = useState(completed);
    const dispatch = useDispatch();
    const inputToggle = async () => {
        try {
            const updatedTodo = { id, title, completed: !isComplete };
            if(id){
                await axiosAPI.put(`/todos/${id}.json`, updatedTodo);
                setIsComplete(prev => !prev);
                dispatch(updateTodo(updatedTodo));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const todoDelete = async () => {
        try {
            dispatch(deleteTodo(id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="card">
            <p style={{color: '#333'}}>Task : <strong>{isComplete ? 'Done' : 'Not done'}</strong></p>
            <p className="card-text">{title}</p>
            <label className="card-checkbox-label">
                <input
                    type="checkbox"
                    className="card-checkbox"
                    checked={isComplete}
                    onChange={inputToggle}
                />
                Completed?
            </label>
            <button onClick={todoDelete}>Delete</button>
        </div>
    );
};

export default Card;