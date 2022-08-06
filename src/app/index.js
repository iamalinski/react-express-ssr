import React from 'react'

//hooks
import useInputHook from './useInputHook'

const App = () => {
  const { handleChange, value } = useInputHook()

  return (
    <div className="App">
      <input 
        type="text" 
        onChange={handleChange} 
        name="text" 
        value={value}
      />
      <p>
        {value}
      </p>
    </div>
  )
}

export default App