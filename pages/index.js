import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ACCESS_TOKEN = '8jG5A7TA9hkqzlKcrd7IjUIUkMHv';

const options = {
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  }
};

const searchFlightOffers = async (origin, destination, departureDate, numberOfAdults) => {
  try {
    const response = await axios.get(`https://nextjs-flightofferstest-git-main-karmakoma.vercel.app/https://api.amadeus.com/v1/shopping/flight-offers`, {
      params: {
        origin,
        destination,
        departureDate,
        adults: numberOfAdults
      },
      ...options
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await searchFlightOffers('LAX', 'NYC', '2023-03-01', 1);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data && data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default MyComponent;