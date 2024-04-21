import { useState } from "react";
import { FaEnvelope, FaHome, FaUsers, FaCalendar, FaSearch, FaCog, FaRegChartBar, FaSignOutAlt} from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { Outlet, Link, useNavigate } from "react-router-dom";
import SideBar from '../components/Sidebar';
import OAuth from '../components/OAuth'

const Login = () => {
  const [formData, setFormData ] = useState({})
  const { error, loading }  = useSelector((state)=> state.user )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
 
  }

  console.log(formData)
  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="relative flex flex-col m-6 space-y-6 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        <div className="flex flex-col justify-center p-6 md:p-14">
          <span className="mb-3 text-4xl font-bold">Bienvenu</span>
          <span className="font-light text-gray-400 mb-4">
            Veuillez entrer vos coordonnées
          </span>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className="py-4">
            <span className="mb-2 text-md">E-mail</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Mot de passe</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Rappelez-vous</span>
            </div>
            <span className="font-bold text-md">Mot de passe oublié</span>
          </div>
          <button disabled={loading}
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300 disabled:opacity-80"
          >
            {loading? 'loading...':'Se connecter'}
          </button>
          <OAuth />
          </form>

          
          <div className="text-center text-gray-400">
          Vous n'avez pas de compte ?
          <Link to={"/sign-up"}>
            <span className="font-bold text-black"> S'inscrire </span>
          </Link>
          </div>
        </div>

        <div className="relative">
          <img
            src="./src/assets/222.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />

        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const {currentUser} = useSelector(state => state.user)
  console.log(currentUser)
  return (
    currentUser ?
    <div className="flex">
      <SideBar />
      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
  :
    <Login />
  )
}
