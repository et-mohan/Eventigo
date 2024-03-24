import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FestivalList = () => {
  const [festivals, setFestivals] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchOrganizer, setSearchOrganizer] = useState('');

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await axios.get('https://tamilnadu-college-fest-api.onrender.com/fests');
        setFestivals(response.data.data);
      } catch (error) {
        console.error('Error fetching festival data:', error);
      }
    };

    fetchFestivals();
  }, []);

  const filteredFestivals = festivals.filter((fest) => {
    return fest.festName.toLowerCase().includes(searchName.toLowerCase()) &&
           fest.city.toLowerCase().includes(searchLocation.toLowerCase()) &&
           fest.startDate.includes(searchDate) &&
           fest.FestType.toLowerCase().includes(searchType.toLowerCase()) &&
           fest.CollegeName.toLowerCase().includes(searchOrganizer.toLowerCase());
  });

  return (
    <div className="bg-gray-100 p-4 font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        List of latest college festivals happening in Tamil Nadu in 2024
      </h2>
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by Event name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border rounded-md mb-2 sm:mb-0 w-full"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded-md mb-2 sm:mb-0 w-full"
        >
          <option value="">All</option>
          <option value="Entrepreneurship Summit">Entrepreneurship Summit</option>
          <option value="Conference">Conference</option>
          <option value="workshop">workshop</option>
          <option value="Technical">Technical</option>
          <option value="Symposium">Symposium</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Guest Lectures">Guest Lectures</option>
          <option value="Cultural">Cultural</option>
          <option value="Seminar">Seminar</option>          
          {/* Add more options as needed */}
        </select>
        <input
          type="text"
          placeholder="Search by organizer"
          value={searchOrganizer}
          onChange={(e) => setSearchOrganizer(e.target.value)}
          className="p-2 border rounded-md mb-2 sm:mb-0 w-full"
        />
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border rounded-md mb-2 sm:mb-0 w-full"
        />
        <input
          type="text"
          placeholder="Search by date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="p-2 border rounded-md mb-2 sm:mb-0 w-full"
        />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredFestivals.map((fest, index) => (
          <li key={fest.id} className="border rounded-lg p-4 shadow-lg bg-white">
            <strong className="text-blue-600">{fest.festName}</strong>
            <p className="text-gray-600">
              <span className="font-semibold">Organiser:</span> {fest.CollegeName}
              <br />
              <span className="font-semibold">Type:</span> {fest.FestType}
              <br />
              <span className="font-semibold">Venue:</span> {fest.city}
              <br />
              <span className="font-semibold">Start Date:</span> {fest.startDate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FestivalList;
