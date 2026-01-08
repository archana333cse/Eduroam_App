// 'use client';

// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronDown, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Facebook, 
//   Twitter, 
//   Linkedin, 
//   Youtube,
//   ExternalLink,
//   Download,
//   FileText,
//   Shield,
//   Users,
//   Globe
// } from 'lucide-react';

// const Footer = () => {
//   const [openLinks, setOpenLinks] = useState(false);
//   const [openResources, setOpenResources] = useState(false);
//   const [openPolicies, setOpenPolicies] = useState(false);
//   const [email, setEmail] = useState('');
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // Fix hydration by ensuring client-side only rendering for dynamic content
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleSubscribe = () => {
//     if (email.trim()) {
//       setIsSubscribed(true);
//       setEmail('');
//       setTimeout(() => setIsSubscribed(false), 3000);
//     }
//   };

//   // Option 1: Generate a sample PDF content as text file (for demonstration)
//   const handleDownloadSamplePDF = () => {
//     const pdfContent = `
// EDUROAM INSTALLATION MANUAL
// ===========================

// Welcome to eduroam India Setup Guide

// 1. SYSTEM REQUIREMENTS
//    - Windows 10/11 or macOS 10.15+
//    - Active internet connection
//    - Valid institutional credentials

// 2. INSTALLATION STEPS
//    - Download the configuration tool
//    - Run as administrator
//    - Enter your credentials
//    - Select your institution
//    - Complete the setup wizard

// 3. TROUBLESHOOTING
//    - Check credentials
//    - Verify institution support
//    - Contact IT support if needed

// 4. SUPPORT CONTACT
//    Email: support@eduroam.in
//    Phone: +91-11-2649-4640

// © 2024 eduroam India. All rights reserved.
//     `;

//     const blob = new Blob([pdfContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'eduroam-installation-manual.txt';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // Option 2: Check if PDF exists before downloading
//   const handleDownloadPDF = async () => {
//     try {
//       // First check if the PDF exists
//       const response = await fetch('/eduroam-installation-manual.pdf', { method: 'HEAD' });
      
//       if (response.ok) {
//         // PDF exists, proceed with download
//         const link = document.createElement('a');
//         link.href = '/STEPS_TO_CONFIGURE_ILR.pdf';
//         link.download = 'STEPS_TO_CONFIGURE_ILR.pdf';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } else {
//         // PDF doesn't exist, show message or use fallback
//         alert('PDF manual is currently unavailable. Please contact support@eduroam.in for assistance.');
//       }
//     } catch (error) {
//       console.error('Error checking PDF:', error);
//       // Fallback: provide alternative action
//       if (confirm('PDF manual is currently unavailable. Would you like to download a text version instead?')) {
//         handleDownloadSamplePDF();
//       }
//     }
//   };

//   // Option 3: Redirect to external URL where PDF is hosted
//   const handleRedirectToPDF = () => {
//     // Replace with your actual PDF URL (could be Google Drive, Dropbox, etc.)
//     window.open('https://example.com/path-to-your-pdf', '_blank');
//   };

//   const quickLinks = [
//     { name: 'About eduroam', href: '/about', icon: Users },
//     { name: 'Participating Institutions', href: '/institutions', icon: Globe },
//     { name: 'Configuration Guide', href: '/configurationPage', icon: FileText },
//     { name: 'Support Center', href: '/contact_us', icon: Shield }
//   ];

//   const resources = [
//     { 
//       name: 'Download Eduroam Installation Manual', 
//       action: handleDownloadPDF, // Use the check-and-download function
//       icon: Download, 
//       isAction: true 
//     },
//     { 
//       name: 'Sample Manual (Text)', 
//       action: handleDownloadSamplePDF, 
//       icon: FileText, 
//       isAction: true 
//     },
//     { name: 'Configuration Guide', href: '/configurationPage', icon: FileText },

//     { name: 'Technical Documentation',
//       action: handleDownloadPDF,
//       isAction: true ,
//       icon: ExternalLink },
//   ];

//   const policies = [
//     { name: 'Privacy Policy', href: '/privacy' },
//     { name: 'Terms of Service', href: '/privacy' },
//     { name: 'Cookie Policy', href: '/privacy' },
//     // { name: 'Accessibility Statement', href: '#accessibility' }
//   ];

//   // const socialLinks = [
//   //   { icon: Facebook, href: '#facebook', name: 'Facebook' },
//   //   { icon: Twitter, href: '#twitter', name: 'Twitter' },
//   //   { icon: Linkedin, href: '#linkedin', name: 'LinkedIn' },
//   //   { icon: Youtube, href: '#youtube', name: 'YouTube' }
//   // ];

//   // Prevent hydration mismatch by not rendering dynamic content until mounted
//   if (!mounted) {
//     return (
//       <footer className="bg-gradient-to-b from-blue-900 to-blue-800 text-white">
//         <div className="max-w-6xl mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="lg:col-span-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">
//                   IN
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-orange-400">eduroam India</h3>
//                   <p className="text-sm text-blue-200">Digital Education</p>
//                 </div>
//               </div>
//               <p className="text-blue-200 mb-6 text-sm leading-relaxed">
//                 Secure wireless network access across educational institutions nationwide. 
//                 Part of India's Digital Education Initiative.
//               </p>
//             </div>
//             <div></div>
//             <div></div>
//             <div></div>
//           </div>
//         </div>
//       </footer>
//     );
//   }

//   return (
//     <footer className="bg-gradient-to-b from-blue-900 to-blue-800 text-white">
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="lg:col-span-1">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">
//                 IN
//               </div>
//               <div>
//                 <h3 className="font-bold text-orange-400">eduroam India</h3>
//                 <p className="text-sm text-blue-200">Digital Education</p>
//               </div>
//             </div>
//             <p className="text-blue-200 mb-6 text-sm leading-relaxed">
//               Secure wireless network access across educational institutions nationwide. 
//               Part of India's Digital Education Initiative.
//             </p>
            
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center gap-3 text-blue-200">
//                 <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
//                 <a 
//                   href="mailto:eduroam@ernet.in" 
//                   className="hover:text-white transition-colors"
//                 >
//                   eduroam@ernet.in
//                 </a>
//               </div>
//               <div className="flex items-center gap-3 text-blue-200">
//                 <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
//                 <span>011-22170641</span>
//               </div>
//               <div className="flex items-start gap-3 text-blue-200">
//                 <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
//                 <span>
//                   Ministry of Electronics &<br />
//                   Information Technology,<br />
//                   Government of India
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <button 
//               onClick={() => setOpenLinks(!openLinks)}
//               className="flex items-center justify-between w-full md:cursor-default"
//               type="button"
//             >
//               <h4 className="font-semibold mb-4 text-orange-400">Quick Links</h4>
//               <ChevronDown 
//                 className={`w-4 h-4 md:hidden transition-transform duration-200 ${
//                   openLinks ? 'rotate-180' : ''
//                 }`} 
//               />
//             </button>
//             <div className={`space-y-3 ${openLinks ? 'block' : 'hidden'} md:block`}>
//               {quickLinks.map((link, index) => {
//                 const IconComponent = link.icon;
//                 return (
//                   <a
//                     key={index}
//                     href={link.href}
//                     className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors text-sm group"
//                   >
//                     <IconComponent className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
//                     <span>{link.name}</span>
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Resources */}
//           <div>
//             <button 
//               onClick={() => setOpenResources(!openResources)}
//               className="flex items-center justify-between w-full md:cursor-default"
//               type="button"
//             >
//               <h4 className="font-semibold mb-4 text-orange-400">Resources</h4>
//               <ChevronDown 
//                 className={`w-4 h-4 md:hidden transition-transform duration-200 ${
//                   openResources ? 'rotate-180' : ''
//                 }`} 
//               />
//             </button>
//             <div className={`space-y-3 ${openResources ? 'block' : 'hidden'} md:block`}>
//               {resources.map((resource, index) => {
//                 const IconComponent = resource.icon;
                
//                 if (resource.isAction) {
//                   return (
//                     <button
//                       key={index}
//                       onClick={resource.action}
//                       className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors text-sm group w-full text-left"
//                     >
//                       <IconComponent className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
//                       <span>{resource.name}</span>
//                     </button>
//                   );
//                 }
                
//                 return (
//                   <a
//                     key={index}
//                     href={resource.href}
//                     className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors text-sm group"
//                   >
//                     <IconComponent className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
//                     <span>{resource.name}</span>
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Policies & Social */}
//           <div>
//             <button 
//               onClick={() => setOpenPolicies(!openPolicies)}
//               className="flex items-center justify-between w-full md:cursor-default"
//               type="button"
//             >
//               <h4 className="font-semibold mb-4 text-orange-400">Legal & Connect</h4>
//               <ChevronDown 
//                 className={`w-4 h-4 md:hidden transition-transform duration-200 ${
//                   openPolicies ? 'rotate-180' : ''
//                 }`} 
//               />
//             </button>
//             <div className={`${openPolicies ? 'block' : 'hidden'} md:block`}>
//               <div className="space-y-3 mb-6">
//                 {policies.map((policy, index) => (
//                   <a
//                     key={index}
//                     href={policy.href}
//                     className="block text-blue-200 hover:text-white transition-colors text-sm"
//                   >
//                     {policy.name}
//                   </a>
//                 ))}
//               </div>
              
//               <div>
//                 {/* <h5 className="font-semibold mb-3 text-orange-400 text-sm">Follow Us</h5> */}
//                 {/* <div className="flex gap-2">
//                   {socialLinks.map((social, index) => {
//                     const IconComponent = social.icon;
//                     return (
//                       <a
//                         key={index}
//                         href={social.href}
//                         className="w-8 h-8 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors duration-200"
//                         aria-label={social.name}
//                       >
//                         <IconComponent className="w-4 h-4" />
//                       </a>
//                     );
//                   })}
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Newsletter Section */}
//         <div className="mt-12 pt-8 border-t border-blue-700">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="text-center md:text-left">
//               <h4 className="font-semibold text-orange-400 mb-2">Stay Updated</h4>
//               <p className="text-blue-200 text-sm">
//                 Get the latest updates about eduroam services and announcements.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="px-4 py-2 rounded-lg bg-white/10 border border-blue-600 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//               />
//               <button
//                 onClick={handleSubscribe}
//                 type="button"
//                 className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//                   isSubscribed 
//                     ? 'bg-green-500 text-white' 
//                     : 'bg-orange-500 hover:bg-orange-600 text-white'
//                 }`}
//               >
//                 {isSubscribed ? 'Subscribed!' : 'Subscribe'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-blue-700 bg-blue-900/50">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
//             <div className="text-center sm:text-left">
//               <p className="text-blue-200">
//                 © 2025 eduroam India. All rights reserved.
//               </p>
//             </div>
//             <div className="flex items-center gap-4 text-blue-200">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 <span>Network Online</span>
//               </div>
//               <span>•</span>
//               <span>99.9% Uptime</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   ChevronDown,
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Youtube,
//   ExternalLink,
//   Download,
//   FileText,
//   Shield,
//   Users,
//   Globe,
//   Send 
// } from 'lucide-react';

// const Footer = () => {
//   const [openLinks, setOpenLinks] = useState(false);
//   const [openResources, setOpenResources] = useState(false);
//   const [openPolicies, setOpenPolicies] = useState(false);
//   const [email, setEmail] = useState('');
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

//   // Fix hydration by ensuring client-side only rendering for dynamic content
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleSubscribe = () => {
//     if (email.trim()) {
//       setIsSubscribed(true);
//       setEmail('');
//       setTimeout(() => setIsSubscribed(false), 3000);
//     }
//   };

//   const handleRaiseTicket = () => {
//     setIsSubmittingTicket(true);

//     setTimeout(() => {
//       setIsSubmittingTicket(false);
//       window.location.href = '/raise-ticket';
//     }, 500);
//   };

//   // Option 1: Generate a sample PDF content as text file (for demonstration)
//   const handleDownloadSamplePDF = () => {
//     const pdfContent = `
// EDUROAM INSTALLATION MANUAL
// ===========================

// Welcome to eduroam India Setup Guide

// 1. SYSTEM REQUIREMENTS
//    - Windows 10/11 or macOS 10.15+
//    - Active internet connection
//    - Valid institutional credentials

// 2. INSTALLATION STEPS
//    - Download the configuration tool
//    - Run as administrator
//    - Enter your credentials
//    - Select your institution
//    - Complete the setup wizard

// 3. TROUBLESHOOTING
//    - Check credentials
//    - Verify institution support
//    - Contact IT support if needed

// 4. SUPPORT CONTACT
//    Email: support@eduroam.in
//    Phone: +91-11-2649-4640

// © 2024 eduroam India. All rights reserved.
//     `;

//     const blob = new Blob([pdfContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'eduroam-installation-manual.txt';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // Option 2: Check if PDF exists before downloading
//   const handleDownloadPDF = async () => {
//     try {
//       // First check if the PDF exists
//       const response = await fetch('/eduroam-installation-manual.pdf', { method: 'HEAD' });

//       if (response.ok) {
//         // PDF exists, proceed with download
//         const link = document.createElement('a');
//         link.href = '/STEPS_TO_CONFIGURE_ILR.pdf';
//         link.download = 'STEPS_TO_CONFIGURE_ILR.pdf';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } else {
//         // PDF doesn't exist, show message or use fallback
//         alert('PDF manual is currently unavailable. Please contact support@eduroam.in for assistance.');
//       }
//     } catch (error) {
//       console.error('Error checking PDF:', error);
//       // Fallback: provide alternative action
//       if (confirm('PDF manual is currently unavailable. Would you like to download a text version instead?')) {
//         handleDownloadSamplePDF();
//       }
//     }
//   };

//   // Option 3: Redirect to external URL where PDF is hosted
//   const handleRedirectToPDF = () => {
//     // Replace with your actual PDF URL (could be Google Drive, Dropbox, etc.)
//     window.open('https://example.com/path-to-your-pdf', '_blank');
//   };

//   const quickLinks = [
//     { name: 'About eduroam', href: '/about', icon: Users },
//     { name: 'Participating Institutions', href: '/institutions', icon: Globe },
//     { name: 'Configuration Guide', href: '/configurationPage', icon: FileText },
//     { name: 'Support Center', href: '/contact_us', icon: Shield }
//   ];

//   const resources = [
//     {
//       name: 'Download Eduroam Installation Manual',
//       action: handleDownloadPDF, // Use the check-and-download function
//       icon: Download,
//       isAction: true
//     },
//     {
//       name: 'Sample Manual (Text)',
//       action: handleDownloadSamplePDF,
//       icon: FileText,
//       isAction: true
//     },
//     { name: 'Configuration Guide', href: '/configurationPage', icon: FileText },

//     {
//       name: 'Technical Documentation',
//       action: handleDownloadPDF,
//       isAction: true,
//       icon: ExternalLink
//     },
//   ];

//   const policies = [
//     { name: 'Privacy Policy', href: '/privacy' },
//     { name: 'Terms of Service', href: '/privacy' },
//     { name: 'Cookie Policy', href: '/privacy' },
//     // { name: 'Accessibility Statement', href: '#accessibility' }
//   ];

//   // const socialLinks = [
//   //   { icon: Facebook, href: '#facebook', name: 'Facebook' },
//   //   { icon: Twitter, href: '#twitter', name: 'Twitter' },
//   //   { icon: Linkedin, href: '#linkedin', name: 'LinkedIn' },
//   //   { icon: Youtube, href: '#youtube', name: 'YouTube' }
//   // ];

//   // Prevent hydration mismatch by not rendering dynamic content until mounted
//   if (!mounted) {
//     return (
//       <footer className="bg-gradient-to-b from-blue-900 to-blue-800 text-white">
//         <div className="max-w-6xl mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="lg:col-span-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">
//                   IN
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-orange-400">eduroam India</h3>
//                   <p className="text-sm text-blue-200">Digital Education</p>
//                 </div>
//               </div>
//               <p className="text-blue-200 mb-6 text-sm leading-relaxed">
//                 Secure wireless network access across educational institutions nationwide.
//                 Part of India's Digital Education Initiative.
//               </p>
//             </div>
//             <div></div>
//             <div></div>
//             <div></div>
//           </div>
//         </div>
//       </footer>
//     );
//   }

//   return (
//     <footer className="bg-gradient-to-b from-blue-900 to-blue-800 text-white">
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="lg:col-span-1">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">
//                 IN
//               </div>
//               <div>
//                 <h3 className="font-bold text-orange-400">eduroam India</h3>
//                 <p className="text-sm text-blue-200">Digital Education</p>
//               </div>
//             </div>
//             <p className="text-blue-200 mb-6 text-sm leading-relaxed">
//               Secure wireless network access across educational institutions nationwide.
//               Part of India's Digital Education Initiative.
//             </p>

//             <div className="space-y-3 text-sm">
//               <div className="flex items-center gap-3 text-blue-200">
//                 <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
//                 <a
//                   href="mailto:eduroam@ernet.in"
//                   className="hover:text-white transition-colors"
//                 >
//                   eduroam@ernet.in
//                 </a>
//               </div>
//               <div className="flex items-center gap-3 text-blue-200">
//                 <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
//                 <span>011-22170641</span>
//               </div>
//               <div className="flex items-start gap-3 text-blue-200">
//                 <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
//                 <span>
//                   Ministry of Electronics &<br />
//                   Information Technology,<br />
//                   Government of India
//                 </span>
//               </div>
//             </div>
//           </div>


         


//           {/* Quick Links */}
//           <div>
//             <button
//               onClick={() => setOpenLinks(!openLinks)}
//               className="flex items-center justify-between w-full md:cursor-default"
//               type="button"
//             >
//               <h4 className="font-semibold mb-4 text-orange-400">Quick Links</h4>
//               <ChevronDown
//                 className={`w-4 h-4 md:hidden transition-transform duration-200 ${openLinks ? 'rotate-180' : ''
//                   }`}
//               />
//             </button>
//             <div className={`space-y-3 ${openLinks ? 'block' : 'hidden'} md:block`}>
//               {quickLinks.map((link, index) => {
//                 const IconComponent = link.icon;
//                 return (
//                   <a
//                     key={index}
//                     href={link.href}
//                     className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors text-sm group"
//                   >
//                     <IconComponent className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
//                     <span>{link.name}</span>
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
          

//           {/* Resources */}
//           <div>
//             <button
//               onClick={() => setOpenResources(!openResources)}
//               className="flex items-center justify-between w-full md:cursor-default"
//               type="button"
//             >
//               <h4 className="font-semibold mb-4 text-orange-400">Resources</h4>
//               <ChevronDown
//                 className={`w-4 h-4 md:hidden transition-transform duration-200 ${openResources ? 'rotate-180' : ''
//                   }`}
//               />
//             </button>
//             <div className={`space-y-3 ${openResources ? 'block' : 'hidden'} md:block`}>
//               {resources.map((resource, index) => {
//                 const IconComponent = resource.icon;

//                 if (resource.isAction) {
//                   return (
//                     <button
//                       key={index}
//                       onClick={resource.action}
//                       className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors text-sm group w-full text-left"
//                     >
//                       <IconComponent className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
//                       <span>{resource.name}</span>
//                     </button>
//                   );
//                 }

//                 return (
//                   <a
//                     key={index}
//                     href={resource.href}
//                     className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors text-sm group"
//                   >
//                     <IconComponent className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
//                     <span>{resource.name}</span>
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Policies & Social */}
//           <div>
//             <button
//               onClick={() => setOpenPolicies(!openPolicies)}
//               className="flex items-center justify-between w-full md:cursor-default"
//               type="button"
//             >
//               <h4 className="font-semibold mb-4 text-orange-400">Legal & Connect</h4>
//               <ChevronDown
//                 className={`w-4 h-4 md:hidden transition-transform duration-200 ${openPolicies ? 'rotate-180' : ''
//                   }`}
//               />
//             </button>
//             <div className={`${openPolicies ? 'block' : 'hidden'} md:block`}>
//               <div className="space-y-3 mb-6">
//                 {policies.map((policy, index) => (
//                   <a
//                     key={index}
//                     href={policy.href}
//                     className="block text-blue-200 hover:text-white transition-colors text-sm"
//                   >
//                     {policy.name}
//                   </a>
//                 ))}
//               </div>

//               <div>
//                 {/* <h5 className="font-semibold mb-3 text-orange-400 text-sm">Follow Us</h5> */}
//                 {/* <div className="flex gap-2">
//                   {socialLinks.map((social, index) => {
//                     const IconComponent = social.icon;
//                     return (
//                       <a
//                         key={index}
//                         href={social.href}
//                         className="w-8 h-8 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors duration-200"
//                         aria-label={social.name}
//                       >
//                         <IconComponent className="w-4 h-4" />
//                       </a>
//                     );
//                   })}
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </div>


//          <div className="flex justify-end mt-6">
//             <button
//               onClick={handleRaiseTicket}
//               disabled={isSubmittingTicket}
//               className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-lg transition-colors ${isSubmittingTicket
//                 ? 'bg-orange-400 opacity-75 cursor-wait'
//                 : 'bg-orange-500 hover:bg-orange-600 shadow-lg'
//                 }`}
//             >
//               <Send className="w-5 h-5" />
//               {isSubmittingTicket ? 'Redirecting...' : 'Raise Ticket'}
//             </button>
//           </div>


//         {/* Newsletter Section */}
//         <div className="mt-12 pt-8 border-t border-blue-700">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="text-center md:text-left">
//               <h4 className="font-semibold text-orange-400 mb-2">Stay Updated</h4>
//               <p className="text-blue-200 text-sm">
//                 Get the latest updates about eduroam services and announcements.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="px-4 py-2 rounded-lg bg-white/10 border border-blue-600 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//               />
//               <button
//                 onClick={handleSubscribe}
//                 type="button"
//                 className={`px-6 py-2 rounded-lg font-medium transition-colors ${isSubscribed
//                   ? 'bg-green-500 text-white'
//                   : 'bg-orange-500 hover:bg-orange-600 text-white'
//                   }`}
//               >
//                 {isSubscribed ? 'Subscribed!' : 'Subscribe'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-blue-700 bg-blue-900/50">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
//             <div className="text-center sm:text-left">
//               <p className="text-blue-200">
//                 © 2025 eduroam India. All rights reserved.
//               </p>
//             </div>
//             <div className="flex items-center gap-4 text-blue-200">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 <span>Network Online</span>
//               </div>
//               <span>•</span>
//               <span>99.9% Uptime</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  FileText,
  Shield,
  Users,
  Globe,
  Send
} from 'lucide-react';
import { useSession } from "next-auth/react"; // ✨ Added for login detection

const Footer = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [openPolicies, setOpenPolicies] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  const { data: session, status } = useSession();   // ⭐ Detect login state
  const isLoggedIn = status === "authenticated";

  // Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = () => {
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // ⭐ FINAL Raise Ticket Logic
  const handleRaiseTicket = () => {
    setIsSubmittingTicket(true);

    setTimeout(() => {
      setIsSubmittingTicket(false);

      if (!isLoggedIn) {
        window.location.href = "/login";    // 👈 Unauthenticated user → Login page
        return;
      }

      window.location.href = "/raise-ticket"; // 👈 Logged-in user → Ticket page
    }, 400);
  };

  const handleDownloadSamplePDF = () => {
    const pdfContent = `
EDUROAM INSTALLATION MANUAL
===========================
...
© 2024 eduroam India. All rights reserved.
    `;
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'eduroam-installation-manual.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/eduroam-installation-manual.pdf', { method: 'HEAD' });
      if (response.ok) {
        const link = document.createElement('a');
        link.href = '/STEPS_TO_CONFIGURE_ILR.pdf';
        link.download = 'STEPS_TO_CONFIGURE_ILR.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('PDF not available currently.');
      }
    } catch {
      alert('PDF not available right now.');
    }
  };

  const quickLinks = [
    { name: 'About eduroam', href: '/about', icon: Users },
    { name: 'Participating Institutions', href: '/institutions', icon: Globe },
    { name: 'Configuration Guide', href: '/configurationPage', icon: FileText },
    { name: 'Support Center', href: '/contact_us', icon: Shield }
  ];

  const resources = [
    { name: 'Download Eduroam Installation Manual', action: handleDownloadPDF, icon: Download, isAction: true },
    { name: 'Sample Manual (Text)', action: handleDownloadSamplePDF, icon: FileText, isAction: true },
    { name: 'Configuration Guide', href: '/configurationPage', icon: FileText },
    { name: 'Technical Documentation', action: handleDownloadPDF, isAction: true, icon: ExternalLink },
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/privacy' },
    { name: 'Cookie Policy', href: '/privacy' },
  ];

  if (!mounted) {
    return (
      <footer className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-12"></footer>
    );
  }

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">
                IN
              </div>
              <div>
                <h3 className="font-bold text-orange-400">eduroam India</h3>
                <p className="text-sm text-blue-200">Digital Education</p>
              </div>
            </div>
            <p className="text-blue-200 mb-6 text-sm leading-relaxed">
              Secure wireless network access across educational institutions nationwide.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-blue-200">
                <Mail className="w-4 h-4 text-orange-400" />
                <a href="mailto:eduroam@ernet.in" className="hover:text-white">eduroam@ernet.in</a>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>011-22170641</span>
              </div>
              <div className="flex items-start gap-3 text-blue-200">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Ministry of Electronics & Information Technology<br />Government of India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <button onClick={() => setOpenLinks(!openLinks)} className="flex justify-between w-full md:cursor-default">
              <h4 className="font-semibold mb-4 text-orange-400">Quick Links</h4>
              <ChevronDown className={`w-4 h-4 md:hidden ${openLinks ? 'rotate-180' : ''}`} />
            </button>
            <div className={`${openLinks ? 'block' : 'hidden'} md:block space-y-3`}>
              {quickLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a key={i} href={link.href} className="flex items-center gap-3 text-blue-200 hover:text-white text-sm">
                    <Icon className="w-4 h-4 text-orange-400" />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div>
            <button onClick={() => setOpenResources(!openResources)} className="flex justify-between w-full md:cursor-default">
              <h4 className="font-semibold mb-4 text-orange-400">Resources</h4>
              <ChevronDown className={`w-4 h-4 md:hidden ${openResources ? 'rotate-180' : ''}`} />
            </button>
            <div className={`${openResources ? 'block' : 'hidden'} md:block space-y-3`}>
              {resources.map((item, i) => {
                const Icon = item.icon;
                return item.isAction ? (
                  <button key={i} onClick={item.action} className="flex items-center gap-3 text-blue-200 hover:text-white text-sm w-full text-left">
                    <Icon className="w-4 h-4 text-orange-400" /> {item.name}
                  </button>
                ) : (
                  <a key={i} href={item.href} className="flex items-center gap-3 text-blue-200 hover:text-white text-sm">
                    <Icon className="w-4 h-4 text-orange-400" /> {item.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Policies */}
          <div>
            <button onClick={() => setOpenPolicies(!openPolicies)} className="flex justify-between w-full md:cursor-default">
              <h4 className="font-semibold mb-4 text-orange-400">Legal & Connect</h4>
              <ChevronDown className={`w-4 h-4 md:hidden ${openPolicies ? 'rotate-180' : ''}`} />
            </button>
            <div className={`${openPolicies ? 'block' : 'hidden'} md:block space-y-3`}>
              {policies.map((policy, i) => (
                <a key={i} href={policy.href} className="block text-blue-200 hover:text-white text-sm">
                  {policy.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ⭐ Raise Ticket button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleRaiseTicket}
            disabled={isSubmittingTicket}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-lg 
              ${isSubmittingTicket ? 'bg-orange-400 opacity-75 cursor-wait' : 'bg-orange-500 hover:bg-orange-600 shadow-lg'}`}
          >
            <Send className="w-5 h-5" />
            {isSubmittingTicket ? 'Redirecting...' : 'Raise Ticket'}
          </button>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-blue-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-orange-400 mb-2">Stay Updated</h4>
              <p className="text-blue-200 text-sm">Get latest eduroam updates and announcements.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-white/10 border border-blue-600 text-white"
              />
              <button
                onClick={handleSubscribe}
                className={`px-6 py-2 rounded-lg font-medium ${isSubscribed ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}`}
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700 bg-blue-900/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-200">
            <p>© 2025 eduroam India. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Network Online</span>
              </div>
              <span>•</span>
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
