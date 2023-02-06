
import React, { useState } from 'react';
import axios from 'axios';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [numberOfAdults, setNumberOfAdults] = useState('');
  const [flightOffers, setFlightOffers] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.amadeus.com/v1/shopping/flight-offers`, {
  params: {
    origin: origin,
    destination: destination,
    departureDate: departureDate,
    adults: numberOfAdults
  },
  headers: {
    "Authorization": "Bearer 8jG5A7TA9hkqzlKcrd7IjUIUkMHv"
        }
      });
      setFlightOffers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="departureDate">Departure Date:</label>
          <input
            type="text"
            id="departureDate"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="numberOfAdults">Number of Adults:</label>
          <input
            type="text"
            id="numberOfAdults"
            value={numberOfAdults}
            onChange={(event) => setNumberOfAdults(event.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {flightOffers && (
        <div>
          <h2>Flight Offers</h2>
          <pre>{JSON.stringify(flightOffers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
