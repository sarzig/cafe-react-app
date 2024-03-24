import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon component
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { is } from "@babel/types";

// todo: add on-click handling for drop down menu. 

export default function Navigation() {

    const userType = "Admin"; // other options: Customer, Owner, Guest

    const links = [
        { label: "Menu", userTypes: ["Admin", "Customer", "Owner", "Guest"] },
        { label: "My-Profile", userTypes: ["Admin", "Customer", "Owner"] },
        { label: "Admin-Tools", userTypes: ["Admin"] },
        { label: "Login ~ Signup", userTypes: ["Guest"] },
    ];

    const linksXS = [
        { label: "Menu", userTypes: ["Admin", "Customer", "Owner", "Guest"] },
        { label: "drop-down", userTypes: ["Admin", "Customer", "Owner", "Guest"] },
        { label: "My-Profile", userTypes: ["Admin", "Customer", "Owner"] },
        { label: "Login ~ Signup", userTypes: ["Guest"] },
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
        console.log(isDropdownOpen);
    };

    const { pathname } = useLocation();
    return (
        <div className="row fixed-top-row">
            <div className="col text-center cafe-name">
                Sakivi Bakery & Cafe
            </div>
            <div className="row">
                <div className="col d-none d-sm-block">
                    <ul className="menu-list">
                        {links.map((link, index) => (
                            // Check if the current user type is allowed to see the menu item
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
                            .filter(link => link.userTypes.includes(userType)) // Filter links based on userType
                            .map((link, index) => (
                                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                                    {link.label === "drop-down" ?
                                        ( // Check if label is "drop-down" and render the hamburger icon
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
                </div>
            </div>
        </div>
    );
};
