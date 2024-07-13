const Card = () => {
    return (
        <div className="card">
            <p style={{color: '#333'}}>Task : <strong>{'Not done'}</strong></p>
            <p className="card-text">This is a card with a checkbox.</p>
            <label className="card-checkbox-label">
                <input
                    type="checkbox"
                    className="card-checkbox"
                />
                Completed?
            </label>
        </div>
    );
};

export default Card;