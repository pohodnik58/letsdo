import React, { useContext } from 'react';
import './App.css';
import AuthContext from '../contexts/AuthContext';

const App = () => {
    const { user, loginHandler, logoutHandler } = useContext(AuthContext);

    return <div className="App">
                {
                    !user.uid
                    ? <button onClick={loginHandler}>Войти</button>
                    : <button onClick={logoutHandler}>Выйти</button>
                }
                {user.uid && <div>
                    <img src={user.photoURL} alt="userpic" />
                    <h3>{user.displayName}</h3>
                    <h5>{user.email}</h5>
                </div>}
                <pre>{JSON.stringify(user, null, '\t')}</pre>
            </div>
}

export default App;
