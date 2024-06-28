import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop/Shop";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Login from "./Pages/Login/Login";
import Admin from "./Pages/Admin/Admin";
import PageNotFound from "./Components/PageNotFound";
import UserProfile from "./Pages/User/UserProfile";
import Checkout from "./Pages/Checkout";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import AdminProtected from "./Components/AdminProtected";
import EditProduct from "./Components/EditProduct";

function App() {

    return (
        <>
            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/user" element={<UserProfile/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                </Route>
                <Route element={<AdminProtected/>}>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/edit-product" element={<EditProduct/>}/>
                </Route>

                <Route path="/" element={<Home/>}/>

                <Route path="/shop/:category?" element={<Shop/>}/>

                <Route path="/product/:id" element={<ProductDetails/>}/>
                <Route path="/about" element={<AboutUs/>}/>
                <Route path="/contact" element={<ContactUs/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
