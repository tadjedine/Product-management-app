import { useEffect, useState } from "react";
import { getItem, setItem } from "../LocalStorage";



function usePersistedState(key, initialValue){

    const[state, setState] = useState(()=>{return getItem(key) || initialValue})

    useEffect(()=>{
        setItem(key, state);
    },[state])

    return [state, setState]
}

export default usePersistedState;