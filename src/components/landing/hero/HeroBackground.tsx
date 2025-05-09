import * as React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Animated background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.35)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-blue-900/85" />
        <img
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2000&h=1000&q=80"
          alt="Business success"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
          loading="eager"
          width={2000}
          height={1000}
        />
      </div>
    </>
  );
};

export default React.memo(HeroBackground);