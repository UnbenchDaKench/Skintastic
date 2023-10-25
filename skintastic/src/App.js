import logo from "./logo.svg";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import home from "./pages/home/Home";
import Makeup from "./pages/makeup/Makeup";
import Nails from "./pages/nails/Nails";
import Skincare from "./pages/skincare/Skincare";
import Brands from "./pages/brands/Brands";
import Product from "./components/products/product/Product";
import Face from "./pages/skincare/face/Face";
import Lip from "./pages/skincare/lip/Lip";
import Body from "./pages/skincare/body/Body";
import Eye from "./pages/skincare/eye/Eye";
import { useEffect, useState, useRef } from "react";
import NavDropdown from "./components/navbar/navDropdown/NavDropdown";
import Cart from "./components/cart/Cart";
import { Auth, Hub } from "aws-amplify"
import Account from "./pages/account/Account";
import UserRegistration from "./pages/auth/registration/UserRegistration";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/login/forgotPassword/ForgotPassword";

export const routes = [
  {
    path: "/",
    element: home,
  },
  {
    path: "/signup",
    element: UserRegistration
  },
  {
    path: "/login",
    element: Login
  },
  {
    path: "/forgot-password",
    element: ForgotPassword
  },
  {
    path: "/account",
    element: Account
  },
  {
    path: "/Makeup",
    element: Makeup,
  },
  {
    path: "/Nails",
    element: Nails,
  },
  {
    path: "/Skincare",
    element: Skincare,
  },
  {
    path: "/Brands",
    element: Brands,
  },
  {
    path: ":category/Products/:productId",
    element: Product,
  },
  {
    path: "/Product",
    element: Product,
  },
  {
    path: "/Skincare/Face",
    element: Face,
  },
  {
    path: "/Skincare/Lip",
    element: Lip,
  },
  {
    path: "/Skincare/Body",
    element: Body,
  },
  {
    path: "/Skincare/Eye",
    element: Eye,
  },
  
];

function App() {
  const [openNavModal, setOpenNavModal] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("");
  const [cartClicked, setcartClicked] = useState(false)
  const [currentCartCount, setCurrentCartCount] = useState(0)
  const [user, setUser] = useState(null);
  const cartRef = useRef(null)

  const handleLinkHover = (text) => {
    console.log("Mouse entered element");

    setHoveredLink(text);
    setOpenNavModal(true);
  };

  
  const handleLinkLeave = () => {
    console.log("Mouse left element");
    setOpenNavModal(false);
  };
  const handleCartClicked = () => {
    setcartClicked(!cartClicked)
  }

  const addCartCount = (count) => {
    setCurrentCartCount(currentCartCount + count);
  }; 
  const removeFromCartCount = (count) => {
    setCurrentCartCount(currentCartCount - count)
  }

  useEffect(() => {
    const handleClickOutsideCart = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setcartClicked(false);
      }
    };
    if(cartClicked){
      document.body.style.overflow = "hidden"
      
    }
    const unsubscribe = Hub.listen("auth",({ payload: { event, data}}) => {
        switch(event){
          case "signIn": 
            setUser(data);
            break
          case "signOut":
            setUser(null)
            break
        }
    })

    Auth.currentAuthenticatedUser()
    .then(currentUser => setUser(currentUser))
    .catch(() => console.log("Not Signed In"))

    document.addEventListener('mousedown', handleClickOutsideCart)
    return() => {
      document.removeEventListener('mousedown', handleClickOutsideCart)
      return unsubscribe
    }
  }, [])
  
  return (
    <div className={"App" + (cartClicked ? " darken" : "")}>
      {cartClicked && <div className="overlay"></div>}
      <Router>
        <Navbar
          handleLinkHover={handleLinkHover}
          handleLinkLeave={handleLinkLeave}
          handleCartClicked={handleCartClicked}
          currentCartCount={currentCartCount}
          user={user}
        />
        {cartClicked && (
          <div ref={cartRef}>
            <Cart
              addCartCount={addCartCount}
              removeFromCartCount={removeFromCartCount}
              handleCartClicked={handleCartClicked}
              cartClicked={cartClicked}
            />
          </div>
        )}
        {openNavModal && (
          <NavDropdown
            openNavDropdown={openNavModal}
            linkName={hoveredLink}
            handleLinkLeave={handleLinkLeave}
          />
        )}
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={
                  <route.element
                    
                    addCartCount={addCartCount}
                    cartClicked={cartClicked}
                  />
                }
                key={index}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
