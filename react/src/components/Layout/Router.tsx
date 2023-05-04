import { lazy, Suspense  } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Dynamic (Lazy Loaded) Imports
const Dashboard = lazy(() => import('../Dashboard'));
const Users = lazy(() => import('../Users'));
const Tasks = lazy(() => import('../Tasks'));
const Register = lazy(() => import('../Register'));
const Login = lazy(() => import('../Login'));
  
   const Router = ()=> { return (
    <Routes>
        <Route 
            index 
                element={ <Suspense fallback={<>...</>} ><Dashboard /> </Suspense> }/>
        <Route 
           path="tasks"
                element={ <Suspense fallback={<>...</>} ><Tasks /> </Suspense> }/>
        <Route 
            path="users"
                element={ <Suspense fallback={<>...</>} ><Users /> </Suspense> }/>
        <Route 
            path="register"
                element={ <Suspense fallback={<>...</>} ><Register /> </Suspense> }/>
        <Route 
            path="login"
                element={ <Suspense fallback={<>...</>} ><Login /> </Suspense> }/>


        <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>

   ) }

  export default Router;