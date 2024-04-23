// Navigation.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import MobilePopupMenu from "./MobilePopupMenu";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = ({ userType }: { userType: any }) => {
    const links = [
        {
            label: "Menu",
            path: "Menu",
            stringComprehension: "/Menu",
            userTypes: ["admin", "customer", "owner", "guest"]
        },
        {
            label: "Search Recipes",
            path: "Search",
            stringComprehension: "/Search",
            userTypes: ["admin", "customer", "owner", "guest"]
        },
        {
            label: "Admin-Tools",
            path: "Admin-Tools",
            stringComprehension: "/Menu",
            userTypes: ["admin"]
        },
        {
            label: "Profile",
            path: "Profile",
            stringComprehension: "Pro",
            userTypes: ["admin", "customer", "owner"]
        },
        {
            label: "All-Profiles",
            path: "All-Profiles",
            stringComprehension: "All-Profiles",
            userTypes: ["admin", "customer", "owner", "guest"]
        },
        {
            label: "Login ~ Signup",
            path: "Login-~-Signup",
            stringComprehension: "Login",
            userTypes: ["guest"]
        },
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const { pathname } = useLocation();
    console.log(pathname);

    const makeMenuUL = (menuType: string) => (
    <ul>
        {links.map((link, index) => (
            link.userTypes.includes(userType) && (
                <li key={index} className={pathname.includes(`/${link.path}`) ? "menu-active" : ""}>
                    <Link
                        to={`/${link.path}`}
                        onClick={() => {
                            if (menuType === "menu-vertical") {
                                toggleDropdown(); // Call toggleDropdown if menuType is "menu-vertical"
                            }
                        }}>
                        {link.label}
                    </Link>
                </li>
            )
        ))}
    </ul>
);

    return (
        <div className="row fixed-top-row">
            <h2>
                <Link to="/" className="cafe-name-text">Sakivi Bakery & Cafe</Link>
            </h2>
            <div className="row custom-nav-row g-0">
                <div className="col d-none d-sm-block">
                    <div className="menu-horizontal">
                        {makeMenuUL("menu-horizontal")}
                    </div>
                </div>

                <div className="col d-block d-sm-none">
                    <div className="menu-list">
                        <li className="icon-container" onClick={toggleDropdown}>
                            <FaBars className="big-icon icon"/>
                        </li>
                    </div>
                    {isDropdownOpen && (
                        <div className="menu-vertical">
                            {makeMenuUL("menu-vertical")}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
