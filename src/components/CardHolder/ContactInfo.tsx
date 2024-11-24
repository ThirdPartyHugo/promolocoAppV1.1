import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">PromoLoco Support</h4>
          <div className="space-y-2">
            <a href="tel:+1234567890" className="flex items-center text-gray-600 hover:text-red-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>(123) 456-7890</span>
            </a>
            <a href="mailto:support@promoloco.com" className="flex items-center text-gray-600 hover:text-red-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>support@promoloco.com</span>
            </a>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your Contractor</h4>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>123 Service St, City, State</span>
            </div>
            <a href="tel:+1987654321" className="flex items-center text-gray-600 hover:text-red-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>(987) 654-3210</span>
            </a>
            <a href="mailto:contractor@example.com" className="flex items-center text-gray-600 hover:text-red-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>contractor@example.com</span>
            </a>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Business Hours</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};