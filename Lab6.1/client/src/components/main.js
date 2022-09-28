import { Routes, Route } from "react-router-dom";
import Nav from "./nav";
import Users from "./users";
import AddUser from "./addUsers";

function Main() {
    return (
        <div className="app">
            <Nav />
            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path='/add-user' element={<AddUser />} />
                <Route index element={<AddUser />} />
            </Routes>
            
        </div>  
    );
};

export default Main;