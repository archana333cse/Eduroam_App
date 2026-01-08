import React from 'react';
import { Wifi, Globe, Shield, Users, Building, Smartphone } from 'lucide-react';
import Link from 'next/link';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Wifi className="h-16 w-16 text-blue-200 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">
                eduroam<sup className="text-2xl">®</sup>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Global wireless connectivity for education and research communities
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Seamless Global Connectivity
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            eduroam is a revolutionary global service that enables students, researchers, and staff 
            from participating institutions to obtain Internet connectivity across campus and when 
            visiting other participating institutions by simply opening their laptop or activating 
            their smartphone or other portable device through WiFi.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Global Access</h3>
            <p className="text-gray-600 text-center">
              Access Internet not only via your institution's wireless network, but also when 
              visiting other participating universities, colleges, research centres, and libraries worldwide.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Secure Authentication</h3>
            <p className="text-gray-600 text-center">
              Get authenticated and connected to visiting institutions' networks using your 
              home institution ID and password with robust RADIUS-based security.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 mx-auto">
              <Smartphone className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Multi-Device Support</h3>
            <p className="text-gray-600 text-center">
              Seamlessly connect laptops, smartphones, tablets, and other portable devices 
              with automatic configuration and hassle-free access.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How eduroam Benefits You
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Free Global Access</h3>
                    <p className="text-gray-600">
                      Use your home institution credentials to access free internet at thousands 
                      of participating institutions worldwide.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Simple Setup</h3>
                    <p className="text-gray-600">
                      One-time configuration on your device provides automatic connectivity 
                      at all eduroam-enabled locations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Enhanced Security</h3>
                    <p className="text-gray-600">
                      Enterprise-grade security with encrypted connections and authentication 
                      through your home institution's systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl">
                  <Users className="h-24 w-24 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                  <Wifi className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Requirements Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Join the eduroam Initiative
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-blue-600 mr-3" />
                Infrastructure Requirements
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">User Database Server</h4>
                  <p className="text-gray-600 text-sm">
                    Secure storage for user IDs and passwords with proper access controls
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">RADIUS Server</h4>
                  <p className="text-gray-600 text-sm">
                    Authentication and logging infrastructure for secure user verification
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Wireless LAN Configuration</h4>
                  <p className="text-gray-600 text-sm">
                    Additional SSID "eduroam" configured on existing wireless infrastructure
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Cost-Effective Implementation
              </h3>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">₹</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Almost Negligible Costs
                  </h4>
                  <p className="text-gray-600 mb-6">
                    If you have existing WiFi infrastructure in place or plan to deploy one, 
                    eduroam services can ride on the same infrastructure with minimal additional investment.
                  </p>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">
                      Perfect for institutions looking to enhance their connectivity offerings 
                      while joining a global education network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Join eduroam?</h3>
              <p className="text-blue-100 mb-6 max-w-md">
                Connect your institution to the global education network and provide 
                seamless connectivity for your community.
              </p>
              <Link href="/configurationPage">
  <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
    Get Started Today
  </button>
</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;