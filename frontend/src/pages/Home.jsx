// src/pages/HomePage.js

import FeaturesSection from "../components/landing/FeatureSection";
import PlanCards from "../components/landing/PlanCards";
import PromoSection from "../components/landing/PromoSection";
import React from 'react';
import useAuth from "../hooks/useAuth";

const Home = () => {
    return (
      <div>
        
        <PromoSection />
        <FeaturesSection />
        <PlanCards />
      </div>
    );
};

export default Home;
