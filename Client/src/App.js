import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Counter context
const CounterContext = React.createContext();

// Reducer function for managing counter state
const counterReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return { ...state, [action.name]: { count: action.count } };
        case 'INCREMENT':
            return { ...state, [action.name]: { count: state[action.name].count + 1 } };
        case 'DECREMENT':
            return { ...state, [action.name]: { count: state[action.name].count - 1 } };
        default:
            return state;
    }
};

const Home = () => {
    const { state } = useContext(CounterContext);

    return (
        <div>
            <h1>Counter Value: {state.counter.count}</h1>
            <h1>MyCounter Value: {state.mycounter.count}</h1>
            <Link to="/counter">Counter</Link><br></br><br></br>
            <Link to="/mycounter">MyCounter</Link>
        </div>
    );
};

const Counter = () => {
    const { state, dispatch } = useContext(CounterContext);
    const navigate = useNavigate();

    const fetchCounter = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/counter');
            dispatch({ type: 'SET', name: 'counter', count: response.data.counter });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchCounter();
    }, [fetchCounter]);

    const incrementCounter = useCallback(async () => {
        try {
            await axios.post('http://localhost:5000/api/counter/increment');
            dispatch({ type: 'INCREMENT', name: 'counter' });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const decrementCounter = useCallback(async () => {
        try {
            await axios.post('http://localhost:5000/api/counter/decrement');
            dispatch({ type: 'DECREMENT', name: 'counter' });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    return (
        <div>
            <h2>Counter</h2>
            <p>Count: {state.counter.count}</p>
            <button onClick={incrementCounter}>Increment</button>
            <button onClick={decrementCounter}>Decrement</button>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
    );
};

const MyCounter = () => {
    const { state, dispatch } = useContext(CounterContext);
    const navigate = useNavigate();

    const fetchCounter = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/mycounter');
            dispatch({ type: 'SET', name: 'mycounter', count: response.data.mycounter });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchCounter();
    }, [fetchCounter]);

    const incrementCounter = useCallback(async () => {
        try {
            await axios.post('http://localhost:5000/api/mycounter/increment');
            dispatch({ type: 'INCREMENT', name: 'mycounter' });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const decrementCounter = useCallback(async () => {
        try {
            await axios.post('http://localhost:5000/api/mycounter/decrement');
            dispatch({ type: 'DECREMENT', name: 'mycounter' });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    return (
        <div>
            <h2>MyCounter</h2>
            <p>Count: {state.mycounter.count}</p>
            <button onClick={incrementCounter}>Increment</button>
            <button onClick={decrementCounter}>Decrement</button>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
    );
};

const App = () => {
    const [state, dispatch] = useReducer(counterReducer, { counter: { count: 0 }, mycounter: { count: 0 } });

    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/counter">Counter</Link>
                            </li>
                            <li>
                                <Link to="/mycounter">MyCounter</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/counter" element={<Counter />} />
                        <Route path="/mycounter" element={<MyCounter />} />
                    </Routes>
                </div>
            </Router>
        </CounterContext.Provider>
    );
};

export default App;
