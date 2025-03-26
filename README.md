import React, { useState } from 'react';
import { 
  Home, 
  Phone, 
  Info, 
  MapPin, 
  BookOpen, 
  Mic, 
  Video, 
  Upload, 
  RotateCcw 
} from 'lucide-react';

const EducationPortal = () => {
  // State Management
  const [activePage, setActivePage] = useState('home');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationHistory, setTranslationHistory] = useState([]);
  const [mediaType, setMediaType] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Simple Translation Function
  const translateText = () => {
    const translations = {
      'नमस्ते': 'Hello',
      'शिक्षा': 'Education',
      'कक्षा': 'Classroom',
      'विद्यार्थी': 'Student',
      'पाठ्यक्रम': 'Course'
    };

    const translated = translations[sourceText] || sourceText;
    setTranslatedText(translated);

    // Save to translation history
    setTranslationHistory(prev => [
      ...prev, 
      { 
        original: sourceText, 
        translated: translated, 
        timestamp: new Date().toLocaleString() 
      }
    ]);
  };

  // Page Content Renderer
  const renderPageContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Education Portal</h1>
            <p className="text-gray-700 text-xl">Your Gateway to Knowledge and Learning</p>
          </div>
        );
      case 'contact':
        return (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p>Email: support@education.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        );
      case 'about':
        return (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p>Committed to providing quality education and empowering learners.</p>
          </div>
        );
      case 'address':
        return (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Our Locations</h2>
            <p>Education Hub, New Delhi, India</p>
          </div>
        );
      case 'course':
        return (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Our Courses</h2>
            <p>Explore a wide range of educational programs</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Media Upload Handler
  const handleMediaUpload = (type) => {
    setMediaType(type);
  };

  // File Upload Handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex">
      {/* Sidebar Navigation */}
      <div className="w-24 bg-white shadow-lg flex flex-col items-center py-8 space-y-4">
        {[
          { page: 'home', Icon: Home },
          { page: 'contact', Icon: Phone },
          { page: 'about', Icon: Info },
          { page: 'address', Icon: MapPin },
          { page: 'course', Icon: BookOpen }
        ].map(({ page, Icon }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`p-3 rounded-full hover:bg-blue-100 transition ${activePage === page ? 'bg-blue-200' : ''}`}
            title={page.charAt(0).toUpperCase() + page.slice(1)}
          >
            <Icon />
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Page Navigation Tabs */}
        <div className="mb-6 flex justify-center space-x-4">
          {['home', 'contact', 'about', 'address', 'course'].map(page => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-4 py-2 rounded-full ${activePage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-xl shadow-xl p-8 min-h-[600px]">
          {/* Page Specific Content */}
          <div className="mb-8">
            {renderPageContent()}
          </div>

          {/* Translation Section */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={translateText}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              >
                <RotateCcw className="mr-2" /> Translate
              </button>
            </div>

            {translatedText && (
              <div className="mt-4 p-3 bg-white rounded">
                <strong>Translated:</strong> {translatedText}
              </div>
            )}
          </div>

          {/* Media Upload Section */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => handleMediaUpload('audio')}
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Mic />
              </button>
              <button
                onClick={() => handleMediaUpload('video')}
                className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600"
              >
                <Video />
              </button>
            </div>

            {mediaType && (
              <div className="flex items-center justify-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept={mediaType === 'audio' ? 'audio/*' : 'video/*'}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-100">
                    <Upload size={32} />
                  </div>
                </label>
              </div>
            )}

            {uploadedFile && (
              <div className="mt-4 text-center">
                <p>Uploaded {mediaType}: {uploadedFile.name}</p>
              </div>
            )}
          </div>

          {/* Translation History */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Translation History</h3>
            {translationHistory.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded mb-2">
                <div><strong>Original:</strong> {item.original}</div>
                <div><strong>Translated:</strong> {item.translated}</div>
                <div className="text-sm text-gray-500">{item.timestamp}</div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default EducationPortal;
