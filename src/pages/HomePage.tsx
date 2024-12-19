import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <Hero />
      <Features />
    </div>
  );
}