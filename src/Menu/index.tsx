import CollapsibleSection from "../Admin/CollapsibleSection";
import "./index.css";

const Menu = () => {
    const coffeeMenu = `/images/menus/coffee-menu.jpg`;
    const allDayMenu = `/images/menus/all-day-menu.jpg`;
    const specialOrdersMenu = `/images/menus/special-orders-menu.jpg`;

    const renderMenuWithLink = (imageUrl: string, altText: string) => {
        return (
            <div>
                <div className="text-center d-lg-none bold">
                    ~ Click menu to view in new tab ~
                </div>
                <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                    <img src={imageUrl} alt={altText} style={{ maxWidth: "100%" }} />
                </a>
            </div>
        );
    };

    return (
        <div>
            <div className="heading-div">
                <h1>Menus</h1>
            </div>

            {/* Hero image visible only on large screens (lg and up) */}
            <div className="d-none d-lg-block">
                <div className="text-center">
                    {/* Use a wrapper div to control width */}
                    <div style={{ maxWidth: "100%" }}>
                        <img src={`/images/menus/hero2.jpg`} alt="A lucious capuccino with a foam heart sits on a dark blue background with scattered candied fruit." style={{ width: "100%" }} />
                    </div>
                </div>
            </div>

            <div className="container">

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

            {/* Hero image visible only on large screens (lg and up) */}
            <div className="d-none d-lg-block">
                <div className="text-center">
                    {/* Use a wrapper div to control width */}
                    <div style={{ maxWidth: "100%" }}>
                        <img src={`/images/menus/hero.jpg`} alt="A turkish coffee is to the right of this banner image. It is foamy with a heart on the top. Coffee beans and leaves are scattered on a rustic table in the background." style={{ width: "100%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
