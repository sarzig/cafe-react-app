import React from 'react';
import headerBackgroundImage from '../images/sky.jpg';
import coffeeBackgroundImage from '../images/coffee_beans.jpg';
import cortadoBackgroundImage from '../images/cortado-xs.jpg';
import { User } from '../Users/client';
import { getFirstName } from './getFirstName'; // Import the getFirstName function
import { Link } from 'react-router-dom';

const Home: React.FC<{ user?: User | null }> = ({ user }) => {

    let greeting = "Cafe Sakivi";

    if (user && user.full_name) {
        const firstName = getFirstName(user.full_name); // Get the first name using getFirstName function
        greeting = "Welcome to Cafe Sakivi, " + `${firstName}` + ".";
    }

    return (
        <div>

            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light"
                id="home-header"
                style={{ backgroundImage: `url(${headerBackgroundImage})` }}>
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 font-weight-normal">{greeting}</h1>
                    <p className="lead font-weight-normal">The community cafe that serves drinks and vibes.</p>
                    <Link className="btn btn-outline-secondary" to="/Menu">Menu</Link>
                </div>
                <div className="product-device box-shadow d-none d-md-block"></div>
                <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
            </div>
            {/* <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
            <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden"
                 style={{backgroundImage: `url(${coffeeBackgroundImage})`}}>
                <div className="my-3 py-3">
                <h2 className="display-5">Menu</h2>
                <p className="lead">Drinks, Food, Merch</p>
                </div>
                <div className="bg-light box-shadow mx-auto"></div>
            </div>
            <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
                 style={{backgroundImage: `url(${cortadoBackgroundImage})`}}>
                <div className="my-3 p-3">
                <h2 className="display-5"> Location</h2>
                <p className="lead">1 Western Ave, Allston, MA 02135</p>
                <p className="lead">Parking available</p>
                </div>
                <div className="bg-dark box-shadow mx-auto" ></div>
            </div>
            </div>
            <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
                     style={{backgroundImage: `url(${cortadoBackgroundImage})`}}>
                    <div className="my-3 p-3">
                    <h2 className="display-5"> About Us </h2>
                    <p className="lead">Opened in 2025 by Ty W.</p>
                    </div>
                    <div className="bg-dark box-shadow mx-auto" ></div>
                </div>
                <div className="bg-primary mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden"
                     style={{backgroundImage: `url(${coffeeBackgroundImage})`}}>
                    <div className="my-3 py-3">
                    <h2 className="display-5"> Contact Us </h2>
                    <p className="lead">best-coffe@gmail.com</p>
                    </div>
                    <div className="bg-light box-shadow mx-auto" ></div>
                </div>
            </div> */}

            <div className="bg mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div className="my-3 p-3">
                    <h2 className="display-5"> Location </h2>
                    <a href="https://maps.app.goo.gl/Ndqoes5WaUrUZ8Wk6" target="_blank" rel="noopener noreferrer">
                        <p className="lead">1 Western Ave, Allston, MA 02135</p>
                    </a>
                    <h2 className="display-5"> About Us </h2>
                    <p className="lead">Opened in 2025 by Ty W.</p>
                    <a href="mailto:best-coffee@gmail.com">
                        <p className="lead">Contact: best-coffee@gmail.com</p>
                    </a>
                </div>
                <div className="bg-dark box-shadow mx-auto" ></div>
            </div>

            {/* Footer - About page */}

        </div>

    );
};
export default Home;