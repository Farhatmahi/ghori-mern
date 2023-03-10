import React from 'react';
import AdvertisedProducts from '../AdvertisedProducts/AdvertisedProducts';
import Banner from '../Banner/Banner';
import FeaturedBrands from '../FeaturedBrands/FeaturedBrands';
import TopNews from '../TopNews/TopNews';

const Home = () => {
    return (
        <div className="container mx-auto lg:space-y-36 space-y-16">
            <Banner />
            <FeaturedBrands />
            <AdvertisedProducts />
            {/* <TopNews /> */}
        </div>
    );
};

export default Home;