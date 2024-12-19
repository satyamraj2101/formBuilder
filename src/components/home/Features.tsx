import React from 'react';
import { FileText, Layout, BarChart2, Lock } from 'lucide-react';

const features = [
  {
    name: 'Easy Form Creation',
    description: 'Drag and drop interface to create forms in minutes. No coding required.',
    icon: FileText,
  },
  {
    name: 'Beautiful Templates',
    description: 'Professional templates to make your forms stand out.',
    icon: Layout,
  },
  {
    name: 'Advanced Analytics',
    description: 'Detailed insights and analytics for your form responses.',
    icon: BarChart2,
  },
  {
    name: 'Secure & Private',
    description: 'Your data is encrypted and stored securely.',
    icon: Lock,
  },
];

export default function Features() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to create amazing forms
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Powerful features to help you collect and analyze data effectively
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}