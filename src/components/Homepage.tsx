// "use client";

// import React from "react";
// import Link from "next/link";
// import banner from "/banner.jpg";
// import { useEffect, useState } from "react";

// import {
//   Building,
//   Wrench,
//   Smartphone,
//   Signal,
//   Plus,
//   Landmark,
// } from "lucide-react";
// import { link } from "fs";

// export default function HomePage() {
//   const quickServices = [
//     {
//       title: "Device Configuration",
//       description:
//         "Download automated configuration profiles for your devices. Supports Windows, macOS, Linux, Android, and iOS.",
//       icon: "📱",
//       link: "/configurationPage", // <-- Set your actual route
//     },
//     {
//       title: "Institution Directory",
//       description:
//         "Find participating educational institutions across India. Search by state, city, or institution type.",
//       icon: "🏛️",
//       link: "/institutions", // <-- Set your actual route
//     },
//     {
//       title: "Join eduroam",
//       description:
//         "Information for institutions looking to become part of the eduroam India network.",
//       icon: "➕",
//       link: "/request", // <-- Set your actual route
//     },
//     // {
//     //   title: "Technical Support",
//     //   description:
//     //     "Get help with connectivity issues, configuration problems, and technical documentation.",
//     //   icon: "🛠️",
//     // },
//     // {
//     //   title: "Network Status",
//     //   description:
//     //     "Real-time network monitoring and service status across all participating institutions.",
//     //   icon: "📶",
//     // },

//     // {
//     //   title: "Mobile App",
//     //   description:
//     //     "Download the official eduroam CAT app for automatic configuration and network discovery.",
//     //   icon: "📲",
//     // }
//   ];





//   const [currentImage, setCurrentImage] = useState(0);
  
//   // Array of banner images
//   const bannerImages = [
//     // '/banner 2.jpg',
//     '/banner.jpg', 
//     'map_and_locations.png',
//     // '/banner3.jpg'
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % bannerImages.length);
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval);
//   }, [bannerImages.length]);
//   return (
//     <div className="w-full">
//       {/* Hero Section */}
//      <section
//       className="relative w-full text-white py-24 md:py-32 lg:py-50 px-6 md:px-20 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
//       style={{ backgroundImage: `url('${bannerImages[currentImage]}')` }}
//     >
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
//         <div className="flex-1">
//           <h1 className="text-4xl font-bold leading-tight mb-4">
//             Connecting India's Academic Community
//           </h1>
//           <p className="text-lg mb-6">
//             Secure, seamless wireless network access across educational
//             institutions nationwide. Part of India's Digital Education
//             initiative under Government of India.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded" onClick={() => window.location.href = "/configurationPage"}>
//               Configure Your Device
//             </button>
//             <button className="border bg-orange-500    hover:text-blue-900 font-semibold py-2 px-5 rounded transition" onClick={() => window.location.href = "/institutions"}>
//               Find Indian Participating Institutions
//             </button>
//           </div>
//         </div>

//         {/* Stats Box */}
//         <div className="grid grid-cols-2 gap-4">
//           {[
//             ["300+", "Institutions Connected"],
//             ["500K+", "Active Users"],
//             ["28", "States & UTs Covered"],
//             ["99.8%", "Network Uptime"],
//           ].map(([num, label], index) => (
//             <div
//               key={index}
//               className="bg-white/10 p-5 rounded-xl text-center backdrop-blur-sm"
//             >
//               <p className="text-orange-400 text-2xl font-bold">{num}</p>
//               <p className="text-sm">{label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Slideshow indicators */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {bannerImages.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentImage(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentImage 
//                 ? 'bg-orange-400 scale-110' 
//                 : 'bg-white/50 hover:bg-white/70'
//             }`}
//           />
//         ))}
//       </div>
//     </section>

//       {/* Quick Services Section */}
//       <section className="w-full bg-white text-blue-900 py-20 px-6 md:px-20">
//         <h2 className="text-3xl font-bold text-center mb-4">Quick Services</h2>
//         <p className="text-center text-gray-600 mb-10">
//           Access essential eduroam services and resources
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {quickServices.map((service, index) => {
//             const cardContent = (
//               <div className="border border-blue-900 rounded-xl p-6 hover:shadow-md transition h-full">
//                 <div className="flex justify-center mb-4">
//                   <div className="bg-blue-900 text-white p-4 rounded-full text-2xl">
//                     {service.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-center text-lg font-semibold mb-2">
//                   {service.title}
//                 </h3>
//                 <p className="text-center text-sm text-gray-600">
//                   {service.description}
//                 </p>
//               </div>
//             );

//             return service.link ? (
//               <Link href={service.link} key={index} className="h-full block">
//                 {cardContent}
//               </Link>
//             ) : (
//               <div key={index} className="h-full">
//                 {cardContent}
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// }



"use client";

import React from "react";
import Link from "next/link";
import banner from "/banner.jpg";
import { useEffect, useState } from "react";

import {
  Building,
  Wrench,
  Smartphone,
  Signal,
  Plus,
  Landmark,
} from "lucide-react";
import { link } from "fs";

export default function HomePage() {
  const quickServices = [
    {
      title: "Device Configuration",
      description:
        "Download automated configuration profiles for your devices. Supports Windows, macOS, Linux, Android, and iOS.",
      icon: "📱",
      link: "/configurationPage", // <-- Set your actual route
    },
    {
      title: "Institution Directory",
      description:
        "Find participating educational institutions across India. Search by state, city, or institution type.",
      icon: "🏛️",
      link: "/institutions", // <-- Set your actual route
    },
    {
      title: "Join eduroam",
      description:
        "Information for institutions looking to become part of the eduroam India network.",
      icon: "➕",
      link: "/request", // <-- Set your actual route
    },
    // {
    //   title: "Technical Support",
    //   description:
    //     "Get help with connectivity issues, configuration problems, and technical documentation.",
    //   icon: "🛠️",
    // },
    // {
    //   title: "Network Status",
    //   description:
    //     "Real-time network monitoring and service status across all participating institutions.",
    //   icon: "📶",
    // },

    // {
    //   title: "Mobile App",
    //   description:
    //     "Download the official eduroam CAT app for automatic configuration and network discovery.",
    //   icon: "📲",
    // }
  ];





  const [currentImage, setCurrentImage] = useState(0);

  // Array of banner images
  const bannerImages = [
    // '/banner 2.jpg',
    '/banner.jpg',
    'map_and_locations.png',
    // '/banner3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative w-full text-white py-24 md:py-32 lg:py-50 px-6 md:px-20 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url('${bannerImages[currentImage]}')` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Connecting India's Academic Community
            </h1>
            <p className="text-lg mb-6">
              Secure, seamless wireless network access across educational
              institutions nationwide. Part of India's Digital Education
              initiative under Government of India.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded" onClick={() => window.location.href = "/configurationPage"}>
                Configure Your Device
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded" onClick={() => window.location.href = "/institutions"}>
                Find Indian Participating Institutions
              </button>
              {/* <button className="border bg-orange-500    hover:text-blue-900 font-semibold py-2 px-5 rounded transition" onClick={() => window.location.href = "/institutions"}>
                Find Indian Participating Institutions
              </button> */}

            </div>
            <div className="mt-6 bg-white/10 p-4 rounded-xl backdrop-blur-sm w-[530px] border">
              <h4 className="text-orange-400 font-semibold mb-2 text-[20px]">
                Eduroam National Level Servers (India)
              </h4>
              <div className="text-sm space-y-1  text-[15px]">
                <p>
                  <strong className="">FLR1:</strong> 144.16.140.190 or flr1.eduroam.ernet.in
                </p>
                <p>
                  {/* I corrected the second one to FLR2 based on the hostname */}
                  <strong>FLR2:</strong> 202.41.99.3 or flr2.eduroam.ernet.in
                </p>
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-2 gap-4">
            {[
              ["300+", "Institutions Connected"],
              ["500K+", "Active Users"],
              ["28", "States & UTs Covered"],
              ["99.8%", "Network Uptime"],
            ].map(([num, label], index) => (
              <div
                key={index}
                className="bg-white/10 p-5 rounded-xl text-center backdrop-blur-sm"
              >
                <p className="text-orange-400 text-2xl font-bold">{num}</p>
                <p className="text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Slideshow indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImage
                  ? 'bg-orange-400 scale-110'
                  : 'bg-white/50 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="w-full bg-white text-blue-900 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-4">Quick Services</h2>
        <p className="text-center text-gray-600 mb-10">
          Access essential eduroam services and resources
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickServices.map((service, index) => {
            const cardContent = (
              <div className="border border-blue-900 rounded-xl p-6 hover:shadow-md transition h-full">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-900 text-white p-4 rounded-full text-2xl">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-center text-lg font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-center text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            );

            return service.link ? (
              <Link href={service.link} key={index} className="h-full block">
                {cardContent}
              </Link>
            ) : (
              <div key={index} className="h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
