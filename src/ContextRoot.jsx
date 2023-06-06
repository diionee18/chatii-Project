import {useState, createContext} from "react"

export const LoginContext = createContext()

const ContextRoot = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    
    return (
        <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextRoot