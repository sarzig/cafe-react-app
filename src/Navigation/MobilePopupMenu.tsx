import { Link } from "react-router-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MobilePopupMenu() {

    // todo - get userType from context
    const userType = "guest"; // other options: Customer, Owner, Guest

    const links = [
        { label: "Menu", userTypes: ["admin", "customer", "owner", "guest"] },
        { label: "Admin-Tools", userTypes: ["admin"] },
        { label: "My-Profile", userTypes: ["admin", "customer", "owner"] },
        { label: "Login ~ Signup", userTypes: ["guest"] },
    ];

    return (
        <div className="mobile-popup-container">
            <ul className="mobile-pop-up-menu">
                {links
                    .filter(link => link.userTypes.includes(userType)) // Filter links based on userType
                    .map((link, index) => (
                        <li key={index}>
                            <Link to={`/${link.label.replace(/ /g, '-')}`}>{link.label}</Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
