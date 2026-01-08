// 'use client';

// import React from 'react';
// import Head from 'next/head';
// import { Phone, Mail, MapPin, User, Clock, Globe } from 'lucide-react';

// interface ContactPerson {
//   name: string;
//   title: string;
//   phone: string;
//   email: string;
// }

// interface ContactInfo {
//   helpDesk: {
//     phone: string;
//     email: string;
//   };
//   contacts: ContactPerson[];
//   address: string;
// }

// const ContactUs: React.FC = () => {
//   const contactInfo: ContactInfo = {
//     helpDesk: {
//       phone: '011-22170641',
//       email: 'eduroam@ernet.in'
//     },
//     contacts: [
//       {
//         name: 'Mr. Mohd Owais',
//         title: 'Additional Director (Technical)',
//         phone: '+91-11-22170640',
//         email: 'owais@ernet.in'
//       },
//       {
//         name: 'Mr. Srikanth Mallepakula',
//         title: 'Scientific Officer \'SB\'',
//         phone: '+91-11-22170642',
//         email: 'srikanth@ernet.in'
//       }
//     ],
//     address: 'ERNET India, Block-I, A Wing, 5th Floor DMRC IT Park, Shastri Park Delhi-110053'
//   };

//   const handlePhoneClick = (phone: string) => {
//     window.open(`tel:${phone}`, '_self');
//   };

//   const handleEmailClick = (email: string) => {
//     window.open(`mailto:${email}`, '_self');
//   };

//   return (
//     <>
//       <Head>
//         <title>Contact Us - Eduroam India</title>
//         <meta name="description" content="Get in touch with Eduroam India support team for technical assistance and queries." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
//               <Globe className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Get in touch with our Eduroam support team for technical assistance and queries
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Help Desk Card */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-xl p-8 h-full border border-gray-100">
//                 <div className="flex items-center mb-6">
//                   <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
//                     <Phone className="w-6 h-6 text-red-600" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-900">Eduroam Help Desk</h2>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="flex items-center group cursor-pointer" onClick={() => handlePhoneClick(contactInfo.helpDesk.phone)}>
//                     <Phone className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
//                     <div>
//                       <p className="text-sm text-gray-500">Phone</p>
//                       <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                         {contactInfo.helpDesk.phone}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center group cursor-pointer" onClick={() => handleEmailClick(contactInfo.helpDesk.email)}>
//                     <Mail className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
//                     <div>
//                       <p className="text-sm text-gray-500">Email</p>
//                       <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-all">
//                         {contactInfo.helpDesk.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Clock className="w-4 h-4 text-blue-600 mr-2" />
//                     <span className="text-sm font-medium text-blue-900">Business Hours</span>
//                   </div>
//                   <p className="text-sm text-blue-700">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Persons */}
//             <div className="lg:col-span-2">
//               <div className="grid md:grid-cols-2 gap-6">
//                 {contactInfo.contacts.map((contact, index) => (
//                   <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
//                     <div className="flex items-center mb-6">
//                       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
//                         <User className="w-6 h-6 text-green-600" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
//                         <p className="text-sm text-gray-500">{contact.title}</p>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="flex items-center group cursor-pointer" onClick={() => handlePhoneClick(contact.phone)}>
//                         <Phone className="w-4 h-4 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
//                         <div>
//                           <p className="text-xs text-gray-500">Phone</p>
//                           <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                             {contact.phone}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center group cursor-pointer" onClick={() => handleEmailClick(contact.email)}>
//                         <Mail className="w-4 h-4 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
//                         <div>
//                           <p className="text-xs text-gray-500">Email</p>
//                           <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-all">
//                             {contact.email}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Address Card */}
//               <div className="mt-6 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//                 <div className="flex items-start">
//                   <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                     <MapPin className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Our Address</h3>
//                     <p className="text-gray-700 leading-relaxed">{contactInfo.address}</p>
//                     <button
//                       className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                       onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}`, '_blank')}
//                     >
//                       <MapPin className="w-4 h-4 mr-2" />
//                       View on Map
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help?</h3>
//             <div className="grid md:grid-cols-3 gap-6 text-center">
//               <div className="p-6 bg-blue-50 rounded-xl">
//                 <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
//                 <p className="text-sm text-gray-600">Get immediate assistance from our support team during business hours</p>
//               </div>
//               <div className="p-6 bg-green-50 rounded-xl">
//                 <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
//                 <p className="text-sm text-gray-600">Send us detailed queries and we'll respond within 24 hours</p>
//               </div>
//               <div className="p-6 bg-purple-50 rounded-xl">
//                 <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Online Resources</h4>
//                 <p className="text-sm text-gray-600">Check our documentation and FAQ section for quick solutions</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactUs;

// 'use client';

// import React from 'react';
// import Head from 'next/head';
// import { Phone, Mail, MapPin, User, Clock, Globe } from 'lucide-react';

// interface ContactPerson {
//   name: string;
//   title: string;
//   phone: string;
//   email: string;
// }

// interface ContactInfo {
//   helpDesk: {
//     phone: string;
//     email: string;
//   };
//   contacts: ContactPerson[];
//   address: string;
// }

// const ContactUs: React.FC = () => {
//   const contactInfo: ContactInfo = {
//     helpDesk: {
//       phone: '011-22170641',
//       email: 'eduroam@ernet.in'
//     },
//     contacts: [
//       {
//         name: 'Ms.Dimple Bammi',
//         title: 'Additional Director ',
//         phone: '+91-11-22170589',
//         email: 'eduroam@ernet.in'
//       }
//     ],
//     address: 'ERNET India, Block-I, A Wing, 5th Floor DMRC IT Park, Shastri Park Delhi-110053'
//   };

//   const handlePhoneClick = (phone: string) => {
//     window.open(`tel:${phone}`, '_self');
//   };

//   const handleEmailClick = (email: string) => {
//     window.open(`mailto:${email}`, '_self');
//   };

//   return (
//     <>
//       <Head>
//         <title>Contact Us - Eduroam India</title>
//         <meta name="description" content="Get in touch with Eduroam India support team for technical assistance and queries." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-6">
//               <Globe className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Get in touch with our Eduroam support team for technical assistance and queries
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Help Desk Card */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl shadow-xl p-8 h-full border border-gray-100">
//                 <div className="flex items-center mb-6">
//                   <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
//                     <Phone className="w-6 h-6 text-red-600" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-900">Eduroam Help Desk</h2>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="flex items-center group cursor-pointer" onClick={() => handlePhoneClick(contactInfo.helpDesk.phone)}>
//                     <Phone className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
//                     <div>
//                       <p className="text-sm text-gray-500">Phone</p>
//                       <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                         {contactInfo.helpDesk.phone}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center group cursor-pointer" onClick={() => handleEmailClick(contactInfo.helpDesk.email)}>
//                     <Mail className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
//                     <div>
//                       <p className="text-sm text-gray-500">Email</p>
//                       <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-all">
//                         {contactInfo.helpDesk.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//                   <div className="flex items-center mb-2">
//                     <Clock className="w-4 h-4 text-blue-600 mr-2" />
//                     <span className="text-sm font-medium text-blue-900">Business Hours</span>
//                   </div>
//                   <p className="text-sm text-blue-700">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Persons */}
//             <div className="lg:col-span-2">
//               <div className="grid md:grid-cols-2 gap-6">
//                 {contactInfo.contacts.map((contact, index) => (
//                   <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
//                     <div className="flex items-center mb-6">
//                       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
//                         <User className="w-6 h-6 text-green-600" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
//                         <p className="text-sm text-gray-500">{contact.title}</p>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="flex items-center group cursor-pointer" onClick={() => handlePhoneClick(contact.phone)}>
//                         <Phone className="w-4 h-4 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
//                         <div>
//                           <p className="text-xs text-gray-500">Phone</p>
//                           <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                             {contact.phone}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center group cursor-pointer" onClick={() => handleEmailClick(contact.email)}>
//                         <Mail className="w-4 h-4 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
//                         <div>
//                           <p className="text-xs text-gray-500">Email</p>
//                           <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-all">
//                             {contact.email}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Address Card */}
//               <div className="mt-6 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//                 <div className="flex items-start">
//                   <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                     <MapPin className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Our Address</h3>
//                     <p className="text-gray-700 leading-relaxed">{contactInfo.address}</p>
//                     <button
//                       className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                       onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}`, '_blank')}
//                     >
//                       <MapPin className="w-4 h-4 mr-2" />
//                       View on Map
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help?</h3>
//             <div className="grid md:grid-cols-3 gap-6 text-center">
//               <div className="p-6 bg-blue-50 rounded-xl">
//                 <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
//                 <p className="text-sm text-gray-600">Get immediate assistance from our support team during business hours</p>
//               </div>
//               <div className="p-6 bg-green-50 rounded-xl">
//                 <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
//                 <p className="text-sm text-gray-600">Send us detailed queries and we'll respond within 24 hours</p>
//               </div>
//               <div className="p-6 bg-purple-50 rounded-xl">
//                 <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
//                 <h4 className="font-semibold text-gray-900 mb-2">Online Resources</h4>
//                 <p className="text-sm text-gray-600">Check our documentation and FAQ section for quick solutions</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactUs;

"use client";

import React from "react";
import Head from "next/head";
import { Phone, Mail, MapPin, User, Clock, Globe } from "lucide-react";

interface ContactPerson {
  name: string;
  title: string;
  phone: string;
  email: string;
}

interface ContactInfo {
  helpDesk: {
    phone: string;
    email: string;
  };
  contacts: ContactPerson[];
  address: string;
}

const ContactUs: React.FC = () => {
  const contactInfo: ContactInfo = {
    helpDesk: {
      phone: "011-22170641",
      email: "eduroam@ernet.in",
    },
    contacts: [
      {
        name: "Ms.Dimple Bammi",
        title: "Additional Director ",
        phone: "+91-11-22170589",
        email: "eduroam@ernet.in",
      },
    ],
    address:
      "ERNET India, Block-I, A Wing, 5th Floor DMRC IT Park, Shastri Park Delhi-110053",
  };

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleEmailClick = (email: string) => {
    window.open(`mailto:${email}`, "_self");
  };

  return (
    <>
      <Head>
        <title>Contact Us - Eduroam India</title>
        <meta
          name="description"
          content="Get in touch with Eduroam India support team for technical assistance and queries."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with our Eduroam support team for technical
              assistance and queries
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Help Desk Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Eduroam Help Desk
                  </h2>
                </div>

                <div className="space-y-6">
                  <div
                    className="flex items-center group cursor-pointer"
                    onClick={() => handlePhoneClick(contactInfo.helpDesk.phone)}
                  >
                    <Phone className="w-5 h-5 text-blue-900 mr-3 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                        {contactInfo.helpDesk.phone}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center group cursor-pointer"
                    onClick={() => handleEmailClick(contactInfo.helpDesk.email)}
                  >
                    <Mail className="w-5 h-5 text-blue-900 mr-3 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors break-all">
                        {contactInfo.helpDesk.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-blue-900 mr-2" />
                    <span className="text-sm font-medium text-blue-900">
                      Business Hours
                    </span>
                  </div>
                  <p className="text-sm text-blue-900">
                    Monday - Friday: 9:00 AM - 5:30 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Persons */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {contactInfo.contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-500">{contact.title}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div
                        className="flex items-center group cursor-pointer"
                        onClick={() => handlePhoneClick(contact.phone)}
                      >
                        <Phone className="w-4 h-4 text-blue-900 mr-3 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                            {contact.phone}
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex items-center group cursor-pointer"
                        onClick={() => handleEmailClick(contact.email)}
                      >
                        <Mail className="w-4 h-4 text-blue-900 mr-3 group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors break-all">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address Card */}
              <div className="mt-6 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Our Address
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {contactInfo.address}
                    </p>
                    <button
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                      onClick={() =>
                        window.open(
                          `https://maps.google.com/maps?q=${encodeURIComponent(
                            contactInfo.address
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Map
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Need Help?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {/* <div className="p-6 bg-blue-50 rounded-xl">
                <Phone className="w-8 h-8 text-blue-900 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
                <p className="text-sm text-gray-600">Get immediate assistance from our support team during business hours</p>
              </div> */}
              <div
                className="p-6 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition"
                onClick={() => alert("📞 Call us at: 011-22170641")}
              >
                <Phone className="w-8 h-8 text-blue-900 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
                <p className="text-sm text-gray-600">
                  Get immediate assistance from our support team during business
                  hours
                </p>
              </div>

              {/* <div className="p-6 bg-blue-50 rounded-xl">
                <Mail className="w-8 h-8 text-blue-900 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  Email Support
                </h4>
                <p className="text-sm text-gray-600">
                  Send us detailed queries and we'll respond within 24 hours
                </p>
              </div> */}
              <div
                className="p-6 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition"
                onClick={() => alert("📧 Email us at: eduroam@ernet.in")}
              >
                <Mail className="w-8 h-8 text-blue-900 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  Email Support
                </h4>
                <p className="text-sm text-gray-600">
                  Send us detailed queries and we'll respond within 24 hours
                </p>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl">
                <Globe className="w-8 h-8 text-blue-900 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">
                  Online Resources
                </h4>
                <p className="text-sm text-gray-600">
                  Check our documentation and FAQ section for quick solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
