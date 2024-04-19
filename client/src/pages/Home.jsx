import { useState } from "react";
import { FaEnvelope, FaHome, FaUsers, FaCalendar, FaSearch, FaCog, FaRegChartBar, FaSignOutAlt} from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { signInStart } from "../redux/user/userSlice";
import { Outlet, Link } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [idx, setIdx] = useState(0);

  const dispatch = useDispatch()

  const Menus = [
    { title: "Dashboard", src:  <FaHome size={18} /> , link: ''},
    { title: "Inbox", src: <FaEnvelope size={18} /> },
    { title: "Patients", src: <FaUsers size={18} />, gap: true },
    { title: "Calendrier ", src: <FaCalendar size={18}/> , link: 'calendar'},
    { title: "Recherche", src: <FaSearch size={18} /> },
    { title: "Statistique", src: <FaRegChartBar size={18} /> },
    { title: "Paramètre", src: <FaCog size={18} /> },
  ];

  const handleSignOut = async ()  => {
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if(data.success === false){
        return;
      }
    } catch (error) {
      
    }
  }
  return(
    <div
        className={`bg-dark-purple h-screen p-5 pt-8 relative duration-300 ${
          open ? "w-72" : "w-20 "
        } `}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center h-20">
          <img
            src="./src/assets/doctor-logo.avif"
            className={`cursor-pointer duration-500 w-10 rounded-full ${
              open && "rotate-[360deg] rounded-full"
            }`}
          />
          {open && <h1
            className={`text-white origin-left font-medium text-xl duration-200 `}
          >
            Dr. Slimen
          </h1>}
        </div>
        <ul className="mt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              onClick={() => setIdx(index)}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === idx && "bg-light-white"
              } `}
            > <Link className={`flex flex-row gap-x-4  ${!open && "items-center justify-center"}`} to={Menu.link}> 
                {Menu.src}
                {open && <span className={` ${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>}
              </Link>
            </li>
          ))}
          <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center  gap-x-4 
              mt-9`}>
            <FaSignOutAlt size={18} />
            <span onClick={handleSignOut} className={`${!open && "hidden"} origin-left duration-200`}>
              {"Se Déconnecter"}
            </span>
          </li>
        </ul>
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
  <div className="flex">
  <p>test</p>

  </div>
  )
}
