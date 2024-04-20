import React, { useState } from "react";

const CollapsibleSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-section">
      <button className="collapsible-title" onClick={toggleSection}>
        {title} <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
