import React, { useState } from "react";
import CollapsibleSection from "../Admin/CollapsibleSection";
//import { Document, Page } from "@react-pdf/renderer";

const Menu = () => {

    const coffeeMenu = `/images/menus/coffee-menu.jpg`;
    const allDayMenu = `/images/menus/all-day-menu.jpg`;
    const specialOrdersMenu = `/images/menus/special-orders-menu.jpg`;


    return (
        <div className="container">
            <div className="heading-div">
                <h1>Menus</h1>
            </div>

            <div>
                <div className="admin-section">
                    <CollapsibleSection title="Coffee Menu">
                        <img src={coffeeMenu} alt="coffee Menu" style={{ maxWidth: "100%" }} />
                    </CollapsibleSection>
                </div>

                <div className="admin-section">
                    <CollapsibleSection title="All Day Menu">
                        <img src={allDayMenu} alt="all Day Menu" style={{ maxWidth: "100%" }} />
                    </CollapsibleSection>
                </div>

                <div className="admin-section">
                    <CollapsibleSection title="Special Orders">
                        <img src={specialOrdersMenu} alt="special Orders Menu" style={{ maxWidth: "100%" }} />
                    </CollapsibleSection>
                </div>
            </div>
        </div>
    );
};
export default Menu;