import React from 'react';

import { client } from '../lib/client';
import { Service, FooterBanner, HeroBanner } from '../components';

const Home = ({ Services, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Our Best Selling Services </h2>
      <p>Services That Saves your Day</p>
    </div>

    <div className="products-container">
      {Services?.map((service) => <Service key={service._id} service={service} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "service"]';
  const Services = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { Services, bannerData }
  }
}

export default Home;