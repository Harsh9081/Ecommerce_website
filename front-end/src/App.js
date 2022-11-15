import './App.css';
import Nav from './components/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
//import SignUP from './components/SignUp';
import Signup2 from './components/signup2';
import PrivateComponent from './components/privateComponent';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import Listproduct from './components/ListProduct';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/profile';
import Changepass from './components/Changepass';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav> 
        </Nav>
        <Routes>
          <Route element={<PrivateComponent></PrivateComponent>}>
          <Route path="/" element={<h1>Home page</h1>}></Route>
          <Route path="/list" element={<Listproduct></Listproduct>}></Route>
          <Route path="/add" element={<Addproduct></Addproduct>}></Route>
          <Route path="/update/:id" element={<UpdateProduct></UpdateProduct>}></Route>
          <Route path="/Logout" element={<h1>Log out</h1>}></Route>
          <Route path='/Profile' element={<Profile></Profile>}></Route>
          <Route path='/changepass' element={<Changepass></Changepass>}></Route>
          </Route>
          <Route path='/signup' element={<Signup2/>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
      
    </div>
  );
}

export default App;
