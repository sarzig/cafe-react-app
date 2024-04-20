// Navigation.js
import { Link, useLocation } from "react-router-dom";
import store, { WebsiteState } from "../store";
import { Provider, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaBars } from 'react-icons/fa';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MobilePopupMenu from "./MobilePopupMenu";
import axios from "axios";
import children from "../Users/CurrentUser";
import * as db from "../Database"
import { User } from "../Users/client";
import * as client from "../Users/client";

export default function Navigation({ userType }: any,) {
    const pathName = useLocation();

    const links = [
        { label: "Menu", userTypes: ["admin", "customer", "owner", "guest"] },
        { label: "Admin-Tools", userTypes: ["admin"] },

        { label: "My-Profile", userTypes: ["admin", "customer", "owner"] },
        { label: "All-Profiles", userTypes: ["admin", "customer", "owner", "guest"] },
        { label: "Login-~-Signup", userTypes: ["guest"] },
    ];

    const linksXS = [
        { label: "Menu", userTypes: ["admin", "customer", "owner", "guest"] },
        { label: "drop-down", userTypes: ["admin", "customer", "owner", "guest"] },
        { label: "Profile", userTypes: ["admin", "customer", "owner"] },
        { label: "Login", userTypes: ["guest"] },
        { label: "Sign Out", userTypes: ["admin", "customer", "owner"] }
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const { pathname } = useLocation();

    return (
        <Provider store={store}>
            <div className="row fixed-top-row">
                <div className="col text-center cafe-name">
                    <Link to="/" className="cafe-name-text">Sakivi Bakery & Cafe</Link>
                </div>
                <div className="row">
                    <div className="col d-none d-sm-block">
                        <ul className="menu-list">
                            {links.map((link, index) => (
                                link.userTypes.includes(userType) && (
                                    <li key={index} className={pathname.includes(link.label) ? "menu-active" : ""}>
                                        <Link to={`/${link.label}`}>{link.label.replace(/-/g, ' ')}</Link>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    <div className="col d-block d-sm-none">
                        <ul className="menu-list">
                            {linksXS
                                .filter(link => link.userTypes.includes(userType))
                                .map((link, index) => (
                                    <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                                        {link.label === "drop-down" ?
                                            (
                                                <Link to={`/${link.label}`} onClick={toggleDropdown}>
                                                    <FaBars />
                                                </Link>
                                            ) : (
                                                <Link to={`/${link.label}`}>{link.label}</Link>
                                            )
                                        }
                                    </li>
                                ))}
                        </ul>
                        <div>
                            {isDropdownOpen && <MobilePopupMenu />}
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    );
};
