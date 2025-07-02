import React from 'react';
import { Code2, Timer, Award, BookOpen, Users2, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Code2,
      title: "Multiple Languages",
      description: "Support for C++, Java, Python"
    },
    {
      icon: Timer,
      title: "Real-time Execution",
      description: "Fast and accurate code execution with detailed performance metrics"
    },
    {
      icon: Award,
      title: "Skill Ratings",
      description: "Track your progress with our comprehensive rating system"
    },
    
    
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized infrastructure for quick response times and reliability"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Why Choose CodeJudge?
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Experience the most comprehensive online judge platform designed for competitive programming enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100 group hover:border-blue-300"
              >
                <div className="bg-blue-100 rounded-lg p-3 w-fit mb-6 group-hover:bg-blue-200 transition-colors">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-950 mb-3">{feature.title}</h3>
                <p className="text-blue-700 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
