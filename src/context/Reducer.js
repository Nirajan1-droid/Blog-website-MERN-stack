const Reducer = (state,action)=>{
    //depending upon the type of the action detected the type of the state is made 
    //states are : isfetching , user, error
    switch(action.type){
        case "LOGIN_START":
            return{
                user : null,
                isFetching:true,
                error:false,
            }
        
        case "LOGIN_SUCCESS":
            return {
               user: action.payload,
               isFetching : false,
               error : false, 

            }

        
        case "LOGIN_FAILURE":
            return{
                user: null,
                isFetching:false,
                error:true,
            }
            case "Update_START":
                return{
                    ...state,
                    isFetching : true,

                }
            
            case "Update_SUCCESS":
                return {
                   user: action.payload,
                   isFetching : false,
                   error : false, 
    
                }
    
            
            case "Update_FAILURE":
                return{
                    user: state.user,
                    isFetching:false,
                    error:true,
                }

            case "LOGOUT":
                return {
        user: null,//making the localstorage user value null
        isFetching:false,
        error:false,
                }  
        
        default: 
            return state;
    }
};

export default Reducer;