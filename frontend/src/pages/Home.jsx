// src/pages/HomePage.js

import FeaturesSection from "../components/landing/FeatureSection";
import PlanCards from "../components/landing/PlanCards";
import PromoSection from "../components/landing/PromoSection";
import React from 'react';



const Home = () => {
    return (
        <div>
            {/* <Dashboard /> */}
            <PromoSection/> 
            <PlanCards/>
            <FeaturesSection/> 
        </div>
    );
};

export default Home;
