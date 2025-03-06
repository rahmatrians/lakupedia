import React from 'react'

function Input(props) {
    const { value, onChange, placeholder } = props;

    return <input value={value} type="text" placeholder={placeholder} onChange={onChange} />
}

export default Input