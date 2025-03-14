// src/pages/HomePage.js

import FeaturesSection from "../components/landing/FeatureSection";
import PromoSection from "../components/landing/PromoSection";
import React from 'react';



const Home = () => {
    return (
        <div>
            {/* <Dashboard /> */}
            <PromoSection/> 
            <FeaturesSection/> 
        </div>
    );
};

export default Home;
