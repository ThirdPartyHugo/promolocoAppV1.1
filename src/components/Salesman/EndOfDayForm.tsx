import React from 'react';
import { Calendar, Upload, CreditCard, DollarSign, FileCheck } from 'lucide-react';

interface SalesPhoto {
  id: string;
  type: 'cash' | 'check';
  file: File;
  preview: string;
}

export const EndOfDayForm: React.FC = () => {
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [salesPhotos, setSalesPhotos] = React.useState<SalesPhoto[]>([]);

  const handlePhotoUpload = (type: 'cash' | 'check', files: FileList | null) => {
    if (!files) return;

    const newPhotos = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      type,
      file,
      preview: URL.createObjectURL(file)
    }));

    setSalesPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (id: string) => {
    setSalesPhotos(prev => {
      const photo = prev.find(p => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  React.useEffect(() => {
    // Cleanup previews on unmount
    return () => {
      salesPhotos.forEach(photo => {
        URL.revokeObjectURL(photo.preview);
      });
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">End of Day Report</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <div className="mt-1 relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sales Count</label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Sales Amount</label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Promotional Cards Used</label>
          <div className="mt-2 space-y-4">
            <div className="flex items-center space-x-4">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Card Number (e.g., 1-001)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="button"
                className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>

        {/* Cash Sales Photos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cash Sales Photos</label>
          <div className="space-y-4">
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
              <div className="space-y-1 text-center">
                <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                    <span>Upload cash photos</span>
                    <input
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload('cash', e.target.files)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
            {/* Cash Photos Preview */}
            {salesPhotos.filter(p => p.type === 'cash').length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {salesPhotos
                  .filter(photo => photo.type === 'cash')
                  .map(photo => (
                    <div key={photo.id} className="relative">
                      <img
                        src={photo.preview}
                        alt="Cash sale"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Check Sales Photos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check Sales Photos</label>
          <div className="space-y-4">
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FileCheck className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                    <span>Upload check photos</span>
                    <input
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload('check', e.target.files)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
            {/* Check Photos Preview */}
            {salesPhotos.filter(p => p.type === 'check').length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {salesPhotos
                  .filter(photo => photo.type === 'check')
                  .map(photo => (
                    <div key={photo.id} className="relative">
                      <img
                        src={photo.preview}
                        alt="Check sale"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            rows={3}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            placeholder="Any additional notes or comments about today's sales..."
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};