import React from 'react';
import { Calendar, Plus, Video, Users } from 'lucide-react';

export const GoogleCalendar: React.FC = () => {
  const appointments = [
    {
      id: 1,
      title: 'Client Meeting - John Smith',
      time: '9:00 AM',
      type: 'Installation Review',
      location: '123 Main St',
    },
    {
      id: 2,
      title: 'Follow-up - Sarah Johnson',
      time: '11:30 AM',
      type: 'Quote Discussion',
      location: 'Video Call',
    },
    {
      id: 3,
      title: 'Site Visit - Michael Brown',
      time: '2:00 PM',
      type: 'Initial Assessment',
      location: '456 Oak Ave',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Calendar</h3>
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-lg flex flex-col items-center justify-center">
              <Calendar className="w-6 h-6 text-red-600" />
              <span className="text-sm font-medium mt-1">Today</span>
            </div>
            <div className="ml-4 flex-grow">
              <h4 className="font-medium">{appointment.title}</h4>
              <p className="text-sm text-gray-500">{appointment.time}</p>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                {appointment.location === 'Video Call' ? (
                  <Video className="w-4 h-4 mr-1" />
                ) : (
                  <Users className="w-4 h-4 mr-1" />
                )}
                <span>{appointment.location}</span>
              </div>
            </div>
            <div className="ml-4">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {appointment.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};