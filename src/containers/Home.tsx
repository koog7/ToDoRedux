import Card from "../components/Card.tsx";

const Home = () => {
    return (
        <div>
            <div className="form-container-add">
                <h2>Enter a task</h2>
                <form className="form">
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
                    <Card/>
                </div>
            </div>
        </div>
    );
};

export default Home;