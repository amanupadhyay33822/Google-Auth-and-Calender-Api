/* eslint-disable react/prop-types */

const EventTable = ({ events }) => {
  

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <tr>
            <th className="py-3 px-6 border-b text-left font-semibold">Event Name</th>
            <th className="py-3 px-6 border-b text-left font-semibold">Start Time</th>
            <th className="py-3 px-6 border-b text-left font-semibold">End Time</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="py-3 px-6 border-b">{event.summary}</td>
                <td className="py-3 px-6 border-b">
                  {event.start.dateTime ? (
                    new Date(event.start.dateTime).toLocaleString("en-IN", {
                      timeZone: event.start.timeZone,
                    })
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-3 px-6 border-b">
                  {event.end.dateTime ? (
                    new Date(event.end.dateTime).toLocaleString("en-IN", {
                      timeZone: event.end.timeZone,
                    })
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
