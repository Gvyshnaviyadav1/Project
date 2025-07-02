
import React from 'react';
import { Code, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-950 border-t border-blue-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">CodeJudge</span>
            </div>
            <p className="text-blue-200 mb-6 max-w-md">
              The premier online judge platform for competitive programming. 
              Master algorithms,  and join a global community of coders.
            </p>
            
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-blue-400 transition-colors">Problems</a></li>
              
              <li><a href="#" className="text-blue-200 hover:text-blue-400 transition-colors">Leaderboard</a></li>
              
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
             
              <li><a href="#" className="text-blue-200 hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-blue-200 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-200 hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center">
          <p className="text-blue-200 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-400 mx-1" /> for the coding community
          </p>
          <p className="text-blue-300 mt-2">
            © 2024 CodeJudge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
