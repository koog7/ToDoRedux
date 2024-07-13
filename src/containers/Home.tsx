import Card from "../components/Card.tsx";

const Home = () => {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 style={{marginTop: '20px'}}>List what need to do</h1>
                <button style={{width: '100px', height: '50px', marginTop: '30px'}}>Add new task</button>
            </div>
            <div>
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Home;