import React from 'react'

const Notification = ({notification}) => {
    if (notification === null) return <></>

    const color = notification.color !== undefined ? notification.color : 'red'
    const notificationStyle = {
        color: color,
        borderWidth: 'thick',
        borderColor: color
    }

    return <div style={notificationStyle}>
        <h2>{notification.message}</h2>
    </div>
}

export default Notification