import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import Calendar from "./pages/Calendar"
import { useSelector, useDispatch } from 'react-redux'

export default function App() {
  const {currentUser} = useSelector(state => state.user)
  console.log("user ", currentUser)
  return (
    <BrowserRouter>
      {/*<Header />*/}

        <Routes>
          <Route path="/" element={<Home />} > 
            <Route path="/calendar" element={<Calendar />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />} >
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      
    </BrowserRouter>
  )
}
