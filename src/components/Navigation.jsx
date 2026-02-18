import { useRef } from "react"


export function Search(query, setQuery){

    const inputEl = useRef(null);

    return <input 
            type="text"
            placeholder="Search Products..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            ref={inputEl}
            />
}