import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AddNewChannel from "./routes/AddChannel";

// Routes
// import Root from "../routes/Root";





const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/',
                
            },
            {
                path: '/signin',
                element: <LoginForm/>
                
            },
            {
                path: '/signup',
                element: <SignupForm/>
                
            },
            {
                path: '/new-channel',
                element: <AddNewChannel/>
                
            },

        ]
    }
])

export { router }