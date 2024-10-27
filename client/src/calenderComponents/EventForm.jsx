/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";




const EventForm = ({ addEvent }) => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/create-event",
        {
          eventName,
          date,
          time,
        },
        { withCredentials: true }
      );

      const eventData = response.data;
      addEvent({
        summary: eventData.summary,
        start: new Date(eventData.start.dateTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
        end: new Date(eventData.end.dateTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
      });
      setEventName("");
      setDate("");
      setTime("");
     
      alert("Event added successfully");
      window.location.reload();
    } catch (error) {
      alert(
        "Error creating event: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
    >
      <h2 className="text-3xl font-semibold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
        Create New Event
      </h2>

      <div className="mb-6">
        <label
          htmlFor="eventName"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Event Name
        </label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          placeholder="Enter event name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="date"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="time"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Time
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-4 text-white font-bold bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
      >
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
