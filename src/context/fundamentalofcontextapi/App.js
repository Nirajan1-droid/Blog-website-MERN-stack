import React, { createContext } from 'react'
import Child from "./child";

export const GlobalInf = createContext();

const App = () => {
    const [color, setcolor] = useState("green");
    const day  = "sunday";
  return (
    <GlobalInf.Provider
    value = {{Contextvitrakovalue : color}}
    >





    <Child/>
    </GlobalInf.Provider>
  )
}

export default App