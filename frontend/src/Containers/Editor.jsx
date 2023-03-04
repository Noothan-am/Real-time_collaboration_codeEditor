import React, { useEffect, useRef, useState } from 'react'
import Users from '../Components/Users'
import { useLocation, useParams } from 'react-router-dom'
import CodeEditor from '../Components/CodeEditor'
import './Css/editor.css'
import instance from '../socket'

const Editor = () => {
  const socketref = useRef(null);
  const codeSyncRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const [users, setusers] = useState('')
  useEffect(() => {
    const socketConnection = async () => {
      socketref.current = await instance();
      socketref.current.on('connect_error', (err) => { console.log(err); })
      socketref.current.on('connect_failed', (err) => { console.log(err); })

      socketref.current.emit("joined", {
        id: params._id,
        username: location.state.name
      })

      socketref.current.on("logedin", ({ users, username, socket_id})=> {
        if (!(username === location.state.name)) {
          alert(`${username} has joined the room`);
        }
        setusers(users);
        socketref.current.emit("codeSync",{id:socket_id, code:codeSyncRef.current});
      })

      socketref.current.on("left",({socketid,username})=>{
        alert(`${username} has left the room`);
        setusers((prev) => {
          return prev.filter((user) => user.id !== socketid);
        });
      })

    }
    
    socketConnection();
  }, [])

  return (
    <>
      <div className="editors_tab">
        <div className="left_part">
          <Users users={users} id = {params._id} socketref = {socketref}/>
        </div>
        <div className="right_part">
          <CodeEditor socketref = {socketref} id = {params._id} syncCode = {code =>{codeSyncRef.current = code}} />
        </div>

      </div>
    </>
  )
}

export default Editor