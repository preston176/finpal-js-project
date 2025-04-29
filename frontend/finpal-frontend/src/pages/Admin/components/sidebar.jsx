import { HandCoins, Home, PowerOffIcon, Users } from 'lucide-react'
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UserContext } from '../../../context/UserContext';

function Sidebar() {

    const location = useLocation()
    const navigate = useNavigate();

    const { updateUser } = useContext(UserContext);


    const links = [
        {
            href: "/admin",
            label: "Overview",
            icon: Home
        },
        {
            href: "/admin/users",
            label: "Users",
            icon: Users
        },
        {
            href: "/admin/transactions",
            label: "Transactions",
            icon: HandCoins
        },
    ]

    const handleLogout = () => {

        localStorage.removeItem("token");
        updateUser(null);
        navigate('/login')
    }


    return (
        <div className="w-full flex-none bg-gray-800 text-white md:w-64">
            <div className="p-4 text-lg font-bold">Admin Panel</div>
            <ul className="space-y-2 p-4">

                <div className="flex flex-col justify-between min-h-[90vh]">
                    <div className="flex flex-col gap-y-5 mt-5">
                        {
                            links.map((link, index) => (
                                <Link key={index} to={`${link.href}`}><li className={`"hover:bg-gray-700 p-4 rounded cursor-pointer" ${location.pathname == link.href ? "bg-white/20" : ""}`} ><span className='flex gap-2'>{<link.icon />}{link.label}</span></li></Link>
                            ))
                        }
                    </div>

                    <div onClick={handleLogout} className="flex gap-2 border-t p-2 cursor-pointer hover:bg-white/20">
                        <PowerOffIcon className='text-white/80' /> Log Out
                    </div>
                </div>
            </ul>
        </div>
    )
}

export default Sidebar