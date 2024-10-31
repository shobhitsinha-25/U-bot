import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import Homepage from './routes/homepage/Homepage';
import Dashboard from './routes/dashboardpage/Dashboard';
import Chatpage from './routes/chatpage/Chatpage';
import Rootlayout from './layouts/rootlayout/Rootlayout';
import DashboardLayout from './layouts/dashboardLayouts/DashboardLayout';
import SignInpage from './routes/signInpage/SignInpage';
import SignUppage from './routes/signUppage/SignUppage';



const router = createBrowserRouter([
  {
     element:<Rootlayout />,
     children:[
      {
        path:"/",element:<Homepage />,
      },
      {
        path:"/sign-in/*",element:<SignInpage />,
      },
      {
        path:"/sign-up",element:<SignUppage />,
      },
      {
        element:<DashboardLayout />,
        children:[
          {
            path:"/dashboard", element:<Dashboard />
          },
          {
            path:"/dashboard/chats/:id", element:<Chatpage />
          },
        ],
      },
     ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
);
