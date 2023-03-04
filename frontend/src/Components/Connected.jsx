import React from 'react'
import avatar from '../Containers/images/userimg.png'
function Connected({users}) {
    return (
        <>
                {users.map(({socketid,name}) => {
                    return <>
                        <img src={avatar} alt="avatar" />
                        <li>{name}</li>
                    </>
                })}
        </>
    )
}

export default Connected