import React from 'react'
// import { useContext } from 'react';
import {GlobalInf} from "./App";
import { useContext } from 'react';
function child() {
    // const {appCo} = useContext(GlobalInf);
    const appCo = useContext(GlobalInf);
    
    console.warn("appCo",appCo);


    return (
    <div>child</div>
  )
}

export default child