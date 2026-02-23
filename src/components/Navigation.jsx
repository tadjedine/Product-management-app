import { useRef } from "react"


export function Search({query, setQuery}){

    const inputEl = useRef(null);

    return( <input 
            className="searchbar"
            type="text"
            placeholder='Search Products...'
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            ref={inputEl}
            />)
}

export function Loader (){
  return <p className="loader">Loading....</p>
}

export function NavBar ({children}){  
  return (
      <nav className="nav-bar">
        {children}
      </nav>)
}

export function Main ({children}){
  return(
    <main className="main">
      {children}
    </main>
  )
 }

export function ErrorMessage({message}){
  return  <p className="error">{message}</p>
}
