import { Link, useLocation } from "react-router-dom";
import store from "../store";
import { Provider } from "react-redux";

export default function Navigation() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
        const links = [
          { label: "Login", icon: "" },
        ].filter(link => link.label !== "Labs");
    const { pathname } = useLocation();
    return (
        <Provider store={store}>
        <div>
            Navigation
            <ul className="wd-kanbas-navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                <Link to={`/${link.label}`}> {link.icon} <br /> {link.label} </Link>
                </li>
            ))}
            </ul>
        </div>
        </Provider>
    );
};