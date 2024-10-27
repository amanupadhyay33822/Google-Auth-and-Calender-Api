/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import EventForm from "../calenderComponents/EventForm";
import EventTable from "../calenderComponents/EventTable";
import axios from "axios";

const Calender = () => {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-event", {
        withCredentials: true,
      });
      console.log(response.data.data.items)
      setEvents(response.data.data.items);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/auth/logout", {
        withCredentials: true,
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    fetchEvents();
   
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-6 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 w-auto py-2 px-4 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Logout
      </button>

      <h1 className="text-4xl font-extrabold text-center text-gray-700 mb-10">
        Event Management
      </h1>
      
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-10">
      
        <EventForm addEvent={addEvent} />
      </div>

      {/* Event List Section with Color Change */}
      <div className="w-full max-w-4xl bg-blue-50 p-8 rounded-lg shadow-lg border border-blue-300">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Event List
        </h2>
        <EventTable events={events} />
      </div>
    </div>
  );
};

export default Calender;
