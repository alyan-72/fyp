import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../../assets/MainLogo.svg';
import NavSidebarItems from './NavSidebarItems';
import { ExpandableIcon } from '../../../assets/sidebarIcons/SidebarIcons';
import { logout } from "../../../redux/actions/userAction";
import UserProfileModel from '../userProfileModel/UserProfleModel'; 

function NavSidebar({ isDarkMode }) {
    const navigate = useNavigate();
    const [isSubMenuExpanded, setIsSubMenuExpanded] = useState(false);
    const [isModelOpen, setisModelOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleCustomersSection = () => {
        setIsSubMenuExpanded(prev => !prev);
    };

    const handleLogout = () => {
        dispatch(logout());
        setisModelOpen(false);
    };

    const handleMyProfile = () => {
        setisModelOpen(false);
        navigate('/myprofile');
    };

    return (
        <div className="flex flex-col justify-between bg-myblue h-screen transition-all duration-500 ease-in-out w-16 flex-shrink-0 relative">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center mt-5">
                <img src={MainLogo} alt="YANA Logo" className="h-10 invert" />
                <span className="text-sm mt-2 text-center font-bold text-white">PCP</span>
            </div>

            {/* Navigation Menu */}
            <nav className="px-2 flex-grow overflow-hidden">
                <ul className="flex flex-col gap-2 items-center mt-4 relative">
                    {NavSidebarItems().map(({ to, icon, label, hasSubmenu, subItems, textSize }) => (
                        <li key={to} className="w-full relative">
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `relative flex flex-col items-center font-medium px-2 py-2 rounded-lg w-full hover:text-gray-300 transition-all text-white`
                                }
                                onClick={hasSubmenu ? toggleCustomersSection : undefined}
                            >
                                {/* Active Indicator Line (Placed at the absolute edge of the screen) */}
                                {window.location.pathname === to && (
                                    <span className="absolute top-0 left-[-8px] h-full w-1 bg-white transition-all rounded-r"></span>
                                )}

                                {/* Icon */}
                                <span className="flex items-center justify-center text-lg">
                                    {React.cloneElement(icon, { isActive: to === window.location.pathname })}
                                </span>

                                {/* Label */}
                                <span className={`${textSize} text-center mt-1 font-bold truncate`}>
                                    {label}
                                </span>

                                {/* Submenu Indicator */}
                                {hasSubmenu && <ExpandableIcon isExpanded={isSubMenuExpanded} />}
                            </NavLink>

                            {/* Submenus (Hidden for now, but structured for later) */}
                            {/* {hasSubmenu && isSubMenuExpanded && (
                                <ul className="flex flex-col gap-1.5 list-none p-0 m-0 ml-4">
                                    {subItems?.map(({ to: subTo, label: subLabel }) => (
                                        <li key={subTo}>
                                            <NavLink
                                                to={subTo}
                                                className={({ isActive }) =>
                                                    `hover:bg-[#ffe6e9] flex items-center font-medium p-1.5 text-sm transition-colors rounded ${isActive ? 'text-red-600 bg-[#ffe6e9]' : 'text-gray-800 hover:text-red-600'}`
                                                }
                                            >
                                                {subLabel}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )} */}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer (User Profile) */}
            <div className="flex flex-col items-center mb-5 cursor-pointer">
                <UserProfileModel
                    isModelOpen={isModelOpen}
                    toggleModel={setisModelOpen}
                    onLogout={handleLogout}
                    onProfile={handleMyProfile}
                />
            </div>
        </div>
    );
}

export default NavSidebar;
