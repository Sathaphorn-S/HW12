function App() {
    const [counters, setCounters] = React.useState([{ id: 0, count: 0 }]);

    const addCounter = () => {
        const newId = counters.length ? counters[counters.length - 1].id + 1 : 0;
        setCounters([...counters, { id: newId, count: 0 }]);
    };

    const removeCounter = (id) => {
        setCounters(counters.filter(counter => counter.id !== id));
    };

    const updateCounterCount = (id, newCount) => {
        setCounters(counters.map(counter =>
            counter.id === id ? { ...counter, count: newCount } : counter
        ));
    };

    const totalSum = counters.reduce((sum, counter) => sum + counter.count, 0);

    return (
        <div className="app">
            <h2> Sum: {totalSum}</h2>
            <button className="btn btn-add" onClick={addCounter}>Add Counter</button>
            {counters.map(counter => (
                <Counter
                    key={counter.id}
                    id={counter.id}
                    count={counter.count}
                    onRemove={removeCounter}
                    onUpdateCount={updateCounterCount}
                />
            ))}
            
        </div>
    );
}

function Counter({ id, count, onRemove, onUpdateCount }) {
    const updateCounter = (n) => {
        if (count + n < 0) {
            alert('Value cannot go under 0');
            return;
        }
        onUpdateCount(id, count + n);
    };

    return (
        <div className="counter">
            <button className="btn btn-minus" onClick={() => updateCounter(-1)}>-</button>
            <h2 className="number">{count}</h2>
            <button className="btn btn-plus" onClick={() => updateCounter(1)}>+</button>
            <button className="btn btn-clear" onClick={() => updateCounter(-count)}>C</button>
            <button className="btn btn-remove" onClick={() => onRemove(id)}>X</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
