import React from 'react';
import { Users, Video, MapPin, Calendar } from 'lucide-react';

export const MeetingSchedule: React.FC = () => {
  const meetings = [
    {
      id: 1,
      title: 'Weekly Team Sync',
      date: '2024-03-20',
      time: '9:00 AM',
      type: 'virtual',
      attendees: 12,
      agenda: [
        'Sales performance review',
        'New product updates',
        'Training session',
      ],
    },
    {
      id: 2,
      title: 'Monthly Planning',
      date: '2024-03-25',
      time: '2:00 PM',
      type: 'in-person',
      location: 'Main Office',
      attendees: 8,
      agenda: [
        'Goal setting for next month',
        'Territory assignments',
        'Success stories sharing',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Team Meetings</h2>
        <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          <Calendar className="w-5 h-5 mr-2" />
          Schedule Meeting
        </button>
      </div>

      <div className="grid gap-6">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium">{meeting.title}</h3>
                <div className="flex items-center mt-2 text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{meeting.date} at {meeting.time}</span>
                </div>
                <div className="flex items-center mt-1 text-gray-500">
                  {meeting.type === 'virtual' ? (
                    <Video className="w-4 h-4 mr-2" />
                  ) : (
                    <MapPin className="w-4 h-4 mr-2" />
                  )}
                  <span>{meeting.type === 'virtual' ? 'Virtual Meeting' : meeting.location}</span>
                </div>
                <div className="flex items-center mt-1 text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{meeting.attendees} attendees</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                Join Meeting
              </button>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Agenda</h4>
              <ul className="space-y-2">
                {meeting.agenda.map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-1.5 bg-red-600 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                View Details
              </button>
              <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};