import React from "react";
//import { Document, Page } from "@react-pdf/renderer";

export default function Menu() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Menu</h2>
                    <ul>
                        <li>
                            <a href="/details">Coffee</a>
                        </li>
                        <li>
                            <a href="/details">Tea</a>
                        </li>
                    </ul>
                </div>
                <div className="col">

                </div>
            </div>
        </div>
    );
}
