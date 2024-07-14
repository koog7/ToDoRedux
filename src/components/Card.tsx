interface Props {
    title: string;
    completed: boolean;
}

const Card: React.FC<Props> = ({ title, completed}) => {
    return (
        <div className="card">
            <p style={{color: '#333'}}>Task : <strong>{completed ? 'Done' : 'Not done'}</strong></p>
            <p className="card-text">{title}</p>
            <label className="card-checkbox-label">
                <input
                    type="checkbox"
                    className="card-checkbox"
                />
                Completed?
            </label>
            <button>Delete</button>
        </div>
    );
};

export default Card;