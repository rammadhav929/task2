import React, { useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const CounterContext = React.createContext();

const mycounter = () => {
    const { state, dispatch } = useContext(CounterContext);

    const fetchCounter = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/mycounter');
            dispatch({ type: 'SET', count1: response.data.count1 });
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
            dispatch({ type: 'INCREMENT' });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    const decrementCounter = useCallback(async () => {
        try {
            await axios.post('http://localhost:5000/api/mycounter/decrement');
            dispatch({ type: 'DECREMENT' });
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);

    return (
        <div>
            <h2>myCounter</h2>
            <p>myCount: {state.count1}</p>
            <button onClick={incrementCounter}>myIncrement</button>
            <button onClick={decrementCounter}>myDecrement</button>
        </div>
    );
};

export default mycounter
