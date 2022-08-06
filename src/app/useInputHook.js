import { useState } from 'react'

const useInputHook = () => {
    const [state, setState] = useState({
        text: ''
    })

    const handleChange = e => {
    const { name, value } = e.target
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return {
        handleChange,
        value: state.text
    }
}

export default useInputHook