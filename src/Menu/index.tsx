import React, { useState } from "react";
//import { Document, Page } from "@react-pdf/renderer";

const Menu = ({ userType }: { userType: string }) => {
    const [selectedTab, setSelectedTab] = useState("coffee");

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };
    const renderContent = () => {
        switch (selectedTab) {
            case "coffee":
                return (
                    <img
                        src="path_to_coffee_image.jpg"
                        alt="Coffee"
                        style={{ width: "100%", height: "auto" }}
                    />
                );
            case "tea":
                return (
                    <img
                        src="path_to_tea_image.jpg"
                        alt="Tea"
                        style={{ width: "100%", height: "auto" }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Menu</h2>
                    <ul>
                        <li>
                            <button onClick={() => handleTabClick("coffee")}>Coffee</button>
                        </li>
                        <li>
                            <button onClick={() => handleTabClick("tea")}>Tea</button>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
export default Menu;