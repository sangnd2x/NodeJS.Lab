import Nav from "./nav";
import AddUser from "./addUser";
import User from "./users";
import { Routes, Route} from 'react-router-dom';

function Main() {
    return (
    <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/" element={<AddUser />} />
          <Route path="/users" element={<User />} />
        </Routes>
    </div>
    );
};

export default Main;