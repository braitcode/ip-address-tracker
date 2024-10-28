import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import img from "../assets/images/pattern-bg-desktop.png";
import arrow from "../assets/images/icon-arrow.svg";

// You can replace this with any IP tracking API.
const API_URL = `https://ipapi.co/`;

// This component updates the map view when the IP data changes
const MapComponent = ({ center }) => {
    const map = useMap(); // Get map instance
    map.setView(center, 13); // Update the map view to the new center
    return null; // No additional UI is needed, just update the view
  };

const Hero = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ipData, setIpData] = useState({
    ip: '192.212.714.101',
    city: 'Brooklyn',
    region: 'NY',
    country_name: 'United States',
    timezone: 'UTC-05:00',
    org: 'SpaceX Starlink',
    latitude: 40.730610,
    longitude: -73.935242,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}${ipAddress}/json/`);
      if (!response.ok) throw new Error('Invalid IP address');
      const data = await response.json();
      setIpData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setIpData(null);
    }
  };

  return (
    <>
      {/* Background and Form */}
      <div className="flex justify-center" style={{ backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '300px' }}>
        <div className="w-full">
          <div className="w-full flex justify-center flex-col items-center gap-8 mt-8">
            <p className='text-white flex justify-center text-[24px]'>IP Address Tracker</p>
            <div className="xl:w-[40%]">
              <form className='md:w-full w-[90%] xl:w-full relative' onSubmit={handleSubmit}>
                <div className='md:w-full w-[100%] relative flex justify-center'>
                  <input
                    type="text"
                    placeholder="Search for any IP address or domain"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="p-2 rounded-2xl cursor-pointer text-[18px] bg-white text-black font-spaceGrotesk xl:h-[60px] xl:w-full md:w-full w-[100%] xl:pr-16 pr-14"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full xl:px-7 px-4 bg-VeryDarkGray rounded-r-2xl"
                  >
                    <img src={arrow} alt="Submit" />
                  </button>
                </div>
              </form>

              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Information Display */}
      {ipData && (
        <div className="w-full flex justify-center absolute z-10">
          <div className="bg-white xl:w-[80%] w-[90%] md:w-[95%] h-[200px] rounded-xl shadow-md mt-[-6rem] xl:flex justify-evenly items-center md:flex">
            <div className="flex flex-col items-center mt-2 md:flex-col md:items-start">
              <h1 className='font-semibold text-DarkGray xl:text-[16px] text-[10px]'>IP ADDRESS</h1>
              <p className='xl:text-[24px] font-bold'>{ipData.ip}</p>
            </div>
            <div className="flex items-center gap-12">
              <div className="">
                <p className='border border-DarkGray h-[80px] w-[1px] hidden xl:block md:block'></p>
              </div>
              <div className="flex flex-col items-center w-[70%] xl:w-[90%] mt-2 md:flex-col md:items-start">
                <h1 className='font-semibold text-DarkGray xl:text-[16px] text-[10px]'>LOCATION</h1>
                <p className='xl:text-[24px] font-bold'>{`${ipData.city}, ${ipData.region} ${ipData.country_name}`}</p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="">
                <p className='border border-DarkGray h-[80px] w-[1px] hidden xl:block md:block'></p>
              </div>
              <div className="flex flex-col items-center w-[70%] xl:w-[90%] mt-2 md:flex-col md:items-start">
                <h1 className='font-semibold text-DarkGray xl:text-[16px] text-[10px]'>TIMEZONE</h1>
                <p className='xl:text-[24px] font-bold'>{ipData.timezone}</p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="">
                <p className='border border-DarkGray h-[80px] w-[1px] hidden xl:block md:block'></p>
              </div>
              <div className="flex flex-col items-center w-[70%] xl:w-[90%] mt-2 md:flex-col md:items-start">
                <h1 className='font-semibold text-DarkGray xl:text-[16px] text-[10px]'>ISP</h1>
                <p className='xl:text-[24px] font-bold'>{ipData.org}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Width Map - Now Below the Info */}
      <div className="h-[650px] w-full relative -z-0">
        <MapContainer
          center={[ipData.latitude, ipData.longitude]} // Default to IP location
          zoom={13}
          style={{ height: "650px", width: "100%" }}
          zoomControl={false}
        >
            <MapComponent center={[ipData.latitude, ipData.longitude]} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {ipData && (
            <Marker position={[ipData.latitude, ipData.longitude]}>
              <Popup>
                {`${ipData.city}, ${ipData.region}, ${ipData.country_name}`}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default Hero;
