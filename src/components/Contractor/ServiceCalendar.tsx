import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, CreditCard, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

interface Booking {
  id: string;
  cardHolderId: string;
  cardNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  address: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const ServiceCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const bookings: Booking[] = [
    {
      id: '1',
      cardHolderId: 'CH001',
      cardNumber: '1-001',
      customerName: 'John Smith',
      customerPhone: '(555) 123-4567',
      customerEmail: 'john@example.com',
      service: 'Oil Change',
      date: '2024-11-20',
      time: '09:00',
      duration: '45 min',
      address: '123 Main St, City',
      notes: 'Synthetic oil preferred',
      status: 'confirmed'
    },
    {
      id: '2',
      cardHolderId: 'CH002',
      cardNumber: '1-002',
      customerName: 'Alice Johnson',
      customerPhone: '(555) 987-6543',
      customerEmail: 'alice@example.com',
      service: 'Tire Change',
      date: '2024-11-20',
      time: '14:30',
      duration: '60 min',
      address: '456 Oak Ave, City',
      notes: 'All four tires',
      status: 'pending'
    },
    {
      id: '3',
      cardHolderId: 'CH003',
      cardNumber: '1-003',
      customerName: 'Mike Wilson',
      customerPhone: '(555) 555-5555',
      customerEmail: 'mike@example.com',
      service: 'Labor Time',
      date: '2024-11-22',
      time: '10:00',
      duration: '30 min',
      address: '789 Pine St, City',
      status: 'confirmed'
    },
    {
      id: '4',
      cardHolderId: 'CH004',
      cardNumber: '1-004',
      customerName: 'Sarah Davis',
      customerPhone: '(555) 444-4444',
      customerEmail: 'sarah@example.com',
      service: 'Oil Change',
      date: '2024-11-25',
      time: '13:00',
      duration: '45 min',
      address: '321 Elm St, City',
      status: 'pending'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getBookingsForDate = (date: string) => {
    return bookings.filter(booking => booking.date === date);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Service Calendar</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">{formatDate(currentDate)}</span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {Array.from({ length: 42 }, (_, i) => {
            const dayOffset = i - getFirstDayOfMonth(currentDate);
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 + dayOffset);
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const dateString = date.toISOString().split('T')[0];
            const dayBookings = getBookingsForDate(dateString);

            return (
              <div
                key={i}
                className={`min-h-32 bg-white p-2 ${
                  isCurrentMonth ? '' : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div className="font-medium text-sm">{date.getDate()}</div>
                <div className="mt-1 space-y-1">
                  {dayBookings.map(booking => (
                    <button
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className={`w-full text-left text-xs p-1 rounded ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <div className="font-medium truncate">{booking.time} - {booking.customerName}</div>
                      <div className="truncate">{booking.service}</div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <div className="font-medium">{selectedBooking.customerName}</div>
                  <div className="text-sm text-gray-500">{selectedBooking.service}</div>
                </div>
              </div>

              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                <span>Card #{selectedBooking.cardNumber}</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <span>{selectedBooking.date} at {selectedBooking.time} ({selectedBooking.duration})</span>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <span>{selectedBooking.address}</span>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <a href={`tel:${selectedBooking.customerPhone}`} className="text-blue-600 hover:text-blue-800">
                  {selectedBooking.customerPhone}
                </a>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <a href={`mailto:${selectedBooking.customerEmail}`} className="text-blue-600 hover:text-blue-800">
                  {selectedBooking.customerEmail}
                </a>
              </div>

              {selectedBooking.notes && (
                <div className="border-t pt-4 mt-4">
                  <div className="text-sm font-medium text-gray-700">Notes:</div>
                  <p className="text-sm text-gray-600 mt-1">{selectedBooking.notes}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedBooking.status === 'pending' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                    Confirm Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};