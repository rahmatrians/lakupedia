import React from 'react'

function NewComponent(props) {
    const { name, lastName } = props


    return (
        <div>{name} {lastName}</div>
    )
}

export default NewComponent