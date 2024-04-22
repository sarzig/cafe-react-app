import React from "react";
import CollapsibleSection from "../Admin/CollapsibleSection";

const Menu = () => {
  const coffeeMenuPdf = "images/menus/coffee-menu.pdf";
  const allDayMenuPdf = "images/menus/all-day-menu.pdf";
  const specialOrdersMenuPdf = "images/menus/special-orders-menu.pdf";

  const renderMenuWithLink = (pdfUrl: string | undefined, title: string | undefined) => {
    return (
      <div>
        <div className="text-center d-lg-none font-weight-bold">
          ~ Click menu to view in new tab ~
        </div>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          <iframe
            title={title}
            src={pdfUrl}
            style={{ width: "100%", height: "600px", border: "none" }}
          ></iframe>
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
            {renderMenuWithLink(coffeeMenuPdf, "Coffee Menu")}
          </CollapsibleSection>
        </div>

        <div className="admin-section">
          <CollapsibleSection title="All Day Menu">
            {renderMenuWithLink(allDayMenuPdf, "All Day Menu")}
          </CollapsibleSection>
        </div>

        <div className="admin-section">
          <CollapsibleSection title="Special Orders">
            {renderMenuWithLink(specialOrdersMenuPdf, "Special Orders Menu")}
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
};

export default Menu;
