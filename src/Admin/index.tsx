import UserTable from "./UserTable";
import LikedRecipeTable from "./likedRecipeTable";
import LikedDrinkTable from "./likedDrinkTable";
import CollapsibleSection from "./CollapsibleSection";
import "./index.css";


const AdminTools = ({ userType }: { userType: string }) => {

    const adminText =
        <div>
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
        </div>

    const ownerText =
        <div>
            <h1>Admin Tools</h1>
            <h1>You are logged in as an Owner, not an Admin. Go to Login link to fix.</h1>
        </div>

    const customerText =
        <div>
            <h1>Admin Tools</h1>
            <h1>You are logged in as a Customer, not an Admin. Go to Login link to fix.</h1>
        </div>

    const guestText =
        <div>
            <h1>Admin Tools</h1>
            <h1>You are not logged in. Go to Login link to fix.</h1>
        </div>

    // Conditionally select which text to render based on the userType passed as argument
    let displayText;
    const roleLowercase = userType.toLowerCase();

    switch (roleLowercase) {
        case "admin":
            displayText = adminText;
            break;
        case "owner":
            displayText = ownerText;
            break;
        case "customer":
            displayText = customerText;
            break;
        default:
            displayText = guestText;
            break;
    }

    return (
        <div className="container">
            {displayText}
        </div>
    );
};

export default AdminTools;
