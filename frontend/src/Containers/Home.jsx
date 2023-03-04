import React, { useState } from 'react'
import { v4 as newId } from 'uuid'
import './Css/home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [id, setid] = useState('');
    const [name, setname] = useState('');
    const navigate = useNavigate();
    const uniqueId = () => {
        setid(newId());
    }
    const join = () => {
        if (!id || !name) {                       // here these state "id and name" is variable is can be used anywhare like used here 
            alert("please fill the room id");
            return navigate('/');
        }
        return navigate(`/editor/${id}`, {        // use ${ } to send the elements dynamically
            state: {                                 // state is used to send the data from one route to other like here is name 
                name
            }
        })
    }
    const handleEnter = (e) => {
        if (e.code === 'Enter') {                 // ON KEY UP EVENT IS USED IF THE USER PRESS ENTER THEN THAT GETS TRIGGERED
            join();                             // BY USING onKeyUp this is handled
        }
    }
    return (
        <>
            <div className="main">
                <div className="heading">
                    <h1>Real-Time Code Editor</h1>
                </div>
                <div class="form">
                    <form >
                        <h6>Paste invitation id here</h6>
                        <input type="text" name="RoomId" placeholder="Room ID" onKeyUp={handleEnter} onChange={(e) => setid(e.target.value)} value={id} />
                        <input type="text" name="username" placeholder="User Name" onKeyUp={handleEnter} onChange={(e) => setname(e.target.value)} value={name} />
                        <button onClick={join}>Join</button>
                        <p>Don't have Room ID? <span onClick={uniqueId}>create new</span></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home