import React, { useState } from 'react';

export function LoginView(props) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //send a request to the server for authentication
        // call props.onLoggedIn(username)
        props.onLoggedIn(username);
        
    }

    return (
        <form>
            <label>
                Username: 
                <input type="text" value={username} onChange={e => setUsername
                (e.target.value)} />
            </label>
            <label>
                Password: 
                <input type="password" value={password} onChange={e => setPassword
                (e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );

}

// the component stores the username and password in its local state
// uses them to fill in two inputs, listens for changes, and updates state
// inputs were chosen based on the login endpoint in the API, expects a POST with username + pass
// the useState hook provides a way to simplify redundancy, rewrite class component above
// to be more readable