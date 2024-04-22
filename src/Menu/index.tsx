import React from "react";
import CollapsibleSection from "../Admin/CollapsibleSection";
import { Link } from "react-router-dom";

const Menu = () => {
    const coffeeMenu = `/images/menus/coffee-menu.jpg`;
    const allDayMenu = `/images/menus/all-day-menu.jpg`;
    const specialOrdersMenu = `/images/menus/special-orders-menu.jpg`;

    const renderMenuWithLink = (imageUrl: string, altText: string) => {
        return (
            <div>
                <div className="text-center d-md-none bold">
                    ~ Click menu to view in new tab ~
                </div>
                <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                    <img src={imageUrl} alt={altText} style={{ maxWidth: "100%" }} />
                </a>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="heading-div">
                <h1>Menus</h1>
            </div>

            <div>
                <div className="admin-section">
                    <CollapsibleSection title="Coffee Menu">
                        {renderMenuWithLink(coffeeMenu, "Coffee Menu")}
                    </CollapsibleSection>
                </div>

                <div className="admin-section">
                    <CollapsibleSection title="All Day Menu">
                        {renderMenuWithLink(allDayMenu, "All Day Menu")}
                    </CollapsibleSection>
                </div>

                <div className="admin-section">
                    <CollapsibleSection title="Special Orders">
                        {renderMenuWithLink(specialOrdersMenu, "Special Orders Menu")}
                    </CollapsibleSection>
                </div>
            </div>
        </div>
    );
};

export default Menu;
