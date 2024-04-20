import React from "react";
import UserTable from "./kiersten_a6";
import LikedRecipeTable from "./likedRecipeTable";
import LikedDrinkTable from "./likedDrinkTable";
import CollapsibleSection from "./CollapsibleSection";
import "./index.css";

const Admin = () => {
    return (
        <div className="container">
            <h1>Admin Tools</h1>

            <div className="admin-section">
                <CollapsibleSection title="User Table">
                    <UserTable />
                </CollapsibleSection>
            </div>

            <div className="admin-section">
                <CollapsibleSection title="Liked Recipe Table">
                    <LikedRecipeTable />
                </CollapsibleSection>
            </div>

            <div className="admin-section">
                <CollapsibleSection title="Liked Drink Table">
                    <LikedDrinkTable />
                </CollapsibleSection>
            </div>

            {/* Additional sections can be added here */}
        </div>
    );
};

export default Admin;
