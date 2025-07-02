import React from 'react';
import { Play, Trophy, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Coding</span>
            <br />
            Challenge Yourself
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of programmers in our competitive coding platform. 
            Solve problems, participate in contests, and climb the leaderboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold group">
              <Play className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              Start Coding Now
            </button>
            <button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-blue-950 px-8 py-4 text-lg font-semibold">
              Explore Problems
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            
            <FeatureCard
              Icon={Users}
              color="text-green-400"
              title="Global Community"
              description="Connect with programmers from around the world"
            />
            <FeatureCard
              Icon={Play}
              color="text-blue-400"
              title="Real-time Judging"
              description="Instant feedback on your code submissions"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ Icon, color, title, description }) => (
  <div className="bg-blue-800/30 backdrop-blur-sm rounded-lg p-6 border border-blue-700">
    <Icon className={`h-12 w-12 ${color} mx-auto mb-4`} />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-blue-200">{description}</p>
  </div>
);

export default Hero;
