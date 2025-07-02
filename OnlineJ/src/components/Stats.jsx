
import React from 'react';

const Stats = () => {
  const stats = [
    
    { number: "100+", label: "Problems" },
   
   
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join the Coding Revolution
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Many of developers trust CodeJudge for their competitive programming journey
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-blue-200 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
