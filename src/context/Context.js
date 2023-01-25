
import { createContext , useReducer } from "react";
import Reducer from "./Reducer"; 
import { useEffect } from "react";  



const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,//if user is avaiable then set the value to the user section defined by the useEffect
    isFetching : false,
    error :false,
};

export const Context = createContext(INITIAL_STATE);
 
export const ContextProvider = ({children}) =>{//the childern from this function is to be passed to the other components
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);//the first parameter of the function is the module that is imported from the component Reducer
    //the initial state is defined above and used for the initial conditon before everything fires from the Reducer component cases
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));
        //set user property in the localStorage object and store it in localStorage object returned from this function 
        //for information you can create multiple objects in the localstorage
        

    },[state.user]);
      

    return (
        //**
        //  * this functionnamewherethisistobecreated.Provider is the thing which will be passed from this component first to the main app of the components which is App.js and there after to the child component 
        //  */
    <Context.Provider
    value = {{
        user:state.user,/**NULL, ACTION.PAYLOAD, NULL */
        isFetching:state.isFetching,
        error:state.error,
        dispatch,
    }}>
        {children}
    </Context.Provider>

    )
    
}