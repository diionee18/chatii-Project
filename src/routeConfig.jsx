import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
// Routes
// import Root from "../routes/Root";





const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/signin',
                element: <LoginForm/>

            },
            {
                path: '/signup',
                
            },

        ]
    }
])

export { router }