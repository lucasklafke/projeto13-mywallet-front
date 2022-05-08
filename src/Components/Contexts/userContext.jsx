import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null)
    
    return (
        <UserContext.Provider value={{ token, setToken, name, setName}}>
            {children}
        </UserContext.Provider>
    );
}


export function useToken() {
    const context = useContext(UserContext);
    const { token, setToken } = context;
    return { token, setToken }
}
export function useName(){
    const context = useContext(UserContext);
    const { name, setName } = context;
    return { name, setName }
}
