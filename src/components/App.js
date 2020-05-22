import React, { useContext } from 'react';
import './App.css';
import AuthContext from '../contexts/AuthContext';
import { dbCreate, dbDelete, dbRead, dbUpdate } from '../services/dbService';

const App = () => {
    const { user, loginHandler, logoutHandler } = useContext(AuthContext);
    const dbTestField = `/test/${user.uid}/foo`;

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
        <hr />
            <button onClick={()=>dbCreate(dbTestField, prompt('type value'))}>create</button>
            <button onClick={()=>dbRead(dbTestField).then(d => alert(d.val()))}>read</button>
            <button onClick={()=>dbUpdate({[dbTestField]:prompt('type new value')})}>update</button>
            <button onClick={()=>dbDelete(dbTestField)}>delete</button>
            </div>
}

export default App;
