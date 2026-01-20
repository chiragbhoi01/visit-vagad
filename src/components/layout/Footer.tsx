import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#004D40] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VisitVagad</h3>
            <p className="text-gray-300">An initiative to promote tourism in the Tribal Circuit of Rajasthan.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-gray-300">Home</a></li>
              <li><a href="/bhil-bazaar" className="hover:underline text-gray-300">Bhil Bazaar</a></li>
              <li><a href="/vagad-stays" className="hover:underline text-gray-300">Vagad Stays</a></li>
              <li><a href="/destinations" className="hover:underline text-gray-300">Destinations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Important Policies</h3>
            <ul className="space-y-2">
              <li><a href="https://tourism.rajasthan.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-300">Rajasthan Tourism</a></li>
              <li><a href="#" className="hover:underline text-gray-300">RIPS 2024 Policy Document</a></li>
              <li><a href="#" className="hover:underline text-gray-300">Terms of Service</a></li>
              <li><a href="#" className="hover:underline text-gray-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} VisitVagad Project. All Rights Reserved.</p>
          <p className="mt-1">Designed, Developed and Hosted by National Informatics Centre (NIC), Ministry of Electronics & Information Technology, Government of India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
