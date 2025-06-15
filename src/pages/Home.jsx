import React from 'react';
import Banner from '../components/Banner';
import TopFood from '../components/TopFood';
import Customer from '../components/Customer';
import Service from '../components/Service';

const Home = () => {
    return (
        <>
           <Banner/> 
           <TopFood/>
           <Customer/>
           <Service/>
        </>
    );
};

export default Home;