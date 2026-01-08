
import React from 'react';
import Head from 'next/head';
import { Shield, Lock, Eye, Database, UserCheck, Globe, Calendar, Info } from 'lucide-react';

interface PolicySection {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
}

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "December 2024";
  
  const policySections: PolicySection[] = [
    {
      id: "information-collection",
      title: "Information Collection",
      icon: <Database className="w-6 h-6" />,
      content: "Eduroam Website does not automatically capture any specific personal information from you, (like name, phone number or e-mail address), that allows us to identify you individually. If the Eduroam Website requests you to provide personal information, you will be informed for the particular purposes for which the information is gathered and adequate security measures will be taken to protect your personal information."
    },
    {
      id: "data-sharing",
      title: "Data Sharing Policy",
      icon: <UserCheck className="w-6 h-6" />,
      content: "We do not sell or share any personally identifiable information volunteered on the Eduroam Website to any third party (public/private). Any information provided to this website will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction."
    },
    {
      id: "usage-tracking",
      title: "Usage Information",
      icon: <Eye className="w-6 h-6" />,
      content: "We gather certain information about the User, such as Internet protocol (IP) addresses, domain name, browser type, operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage the site has been detected."
    }
  ];

  const tableOfContents = [
    { id: "information-collection", title: "Information Collection" },
    { id: "data-sharing", title: "Data Sharing Policy" },
    { id: "usage-tracking", title: "Usage Information" },
    { id: "security", title: "Security Measures" },
    { id: "updates", title: "Policy Updates" },
    { id: "contact", title: "Contact Information" }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy - Eduroam India</title>
        <meta name="description" content="Privacy Policy for Eduroam India website. Learn how we collect, use, and protect your personal information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how Eduroam India collects, uses, and protects your information.
              </p>
              <div className="mt-6 inline-flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                Last updated: {lastUpdated}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Policy Sections */}
              {policySections.map((section) => (
                <div key={section.id} id={section.id} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <p>{section.content}</p>
                  </div>
                </div>
              ))}

              {/* Security Measures */}
              <div id="security" className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-green-600">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Security Measures</h2>
                </div>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Data Encryption</h4>
                      <p className="text-sm text-green-700">All data transmission is secured using industry-standard encryption protocols.</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Access Control</h4>
                      <p className="text-sm text-blue-700">Strict access controls ensure only authorized personnel can access user data.</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Regular Monitoring</h4>
                      <p className="text-sm text-purple-700">We continuously monitor our systems for potential security threats.</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">Data Backup</h4>
                      <p className="text-sm text-orange-700">Regular secure backups ensure data integrity and availability.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div id="updates" className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4 text-yellow-600">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Policy Updates</h2>
                </div>
                <div className="prose prose-lg text-gray-700 leading-relaxed">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify users of any material changes by posting the updated policy on our website with a new "Last Updated" date.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                    <div className="flex">
                      <Info className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-700">
                          <strong>Important:</strong> We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div id="contact" className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-800 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Questions About Privacy?</h2>
                </div>
                <div className="prose prose-lg text-white leading-relaxed">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-blue-800 bg-opacity-10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Email</h4>
                      <p className="text-sm">eduroam@ernet.in</p>
                    </div>
                    <div className="bg-blue-800 bg-opacity-10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Phone</h4>
                      <p className="text-sm">011-22170641</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy