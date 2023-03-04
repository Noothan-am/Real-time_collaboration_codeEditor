import React from 'react'
import Connected from './Connected';
import './Css/users.css'
import { useNavigate } from 'react-router-dom';
function Users({users,id,socketref}) {
    const navigate = useNavigate();
    const data = Array.from(users);
    const copyId = async () => {
        try {
            await navigator.clipboard.writeText(id);
            alert("Room Id copied succesfully")
        } catch (error) {
            console.log(error);
        }
    }
    const leave =() =>{
        navigate('/');
    }
    return (
        <>
            <div className='left_head-content'>
                <h3>Editor</h3>
                <hr />
                <p>connected...</p> 
                <hr />
            </div>
            <div className="left_connected-users">
            <Connected users ={data}/>
            </div>
            <button onClick={copyId}>Room ID</button>
            <button onClick={leave}>Leave</button>
        </>
    )
}

export default Users