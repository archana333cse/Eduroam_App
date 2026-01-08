// "use client";

// import React, { useState } from "react";
// import { Send, Mail, User, Phone, AlertCircle } from "lucide-react";

// export default function RaiseTicketPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     institution: "",
//     issueType: "",
//     description: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e, any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e, any) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate backend request
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSuccess(true);
//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         institution: "",
//         issueType: "",
//         description: "",
//       });

//       setTimeout(() => setSuccess(false), 3000);
//     }, 1200);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b py-12 px-4">
//       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
//         <h1 className="text-3xl font-bold text-center text-blue-900">
//           Raise Support Ticket
//         </h1>
//         <p className="text-center text-blue-800 mt-2 mb-8">
//           Submit technical issues, authentication problems, or connectivity concerns.
//         </p>

//         {success && (
//           <div className="mb-4 py-3 px-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
//             Ticket submitted successfully! Our support team will contact you soon.
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Name */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">
//               Full Name
//             </label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
//               <User className="w-5 h-5 text-blue-800" />
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your full name"
//                 className="w-full py-2 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">
//               Email Address
//             </label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
//               <Mail className="w-5 h-5 text-blue-800" />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email"
//                 className="w-full py-2 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">
//               Phone Number
//             </label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
//               <Phone className="w-5 h-5 text-blue-800" />
//               <input
//                 type="text"
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="Enter mobile number (optional)"
//                 className="w-full py-2 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Institution */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">
//               Institution Name
//             </label>
//             <input
//               type="text"
//               name="institution"
//               value={form.institution}
//               onChange={handleChange}
//               required
//               placeholder="e.g., IIT Delhi, NIT Trichy, DU"
//               className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
//             />
//           </div>

//           {/* Issue Type */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">
//               Issue Type
//             </label>
//             <select
//               name="issueType"
//               value={form.issueType}
//               onChange={handleChange}
//               required
//               className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
//             >
//               <option value="">Select issue type</option>
//               <option value="Authentication Failure">Authentication Failure</option>
//               <option value="Connectivity Issue">Connectivity Issue</option>
//               <option value="Certificate Issue">Certificate Issue</option>
//               <option value="Account/Password Issue">Account/Password Issue</option>
//               <option value="Other">Other Issue</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">
//               Describe the Issue
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               required
//               rows={4}
//               placeholder="Provide a detailed description of the issue"
//               className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
//             ></textarea>
//           </div>

//           {/* Submit button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-bold text-white text-lg transition ${
//               isSubmitting ? "bg-blue-600 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-700"
//             }`}
//           >
//             <Send className="w-5 h-5" />
//             {isSubmitting ? "Submitting..." : "Submit Ticket"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import { Send, Mail, User, Phone } from "lucide-react";

// export default function RaiseTicketPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     institution: "",
//     issueType: "",
//     description: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // Handle input changes (JSX compatible)
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Submit ticket to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const res = await fetch("/api/tickets/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         subject: form.issueType,
//         submitter_email: form.email,
//         user_id: null,
//         description: form.description,
//         ilr_config_details: form.institution,
//         device_os: "Ubuntu / Windows / Mac",
//       }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setSuccess(true);
//       alert("Ticket Created! Your ticket ID: " + data.ticket_id);

//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         institution: "",
//         issueType: "",
//         description: "",
//       });

//       setTimeout(() => setSuccess(false), 3000);
//     } else {
//       alert("Ticket creation failed. Please try again.");
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b  py-12 px-4">
//       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        
//         <h1 className="text-3xl font-bold text-center text-blue-900">
//           Raise Support Ticket
//         </h1>
//         <p className="text-center text-blue-700 mt-2 mb-8">
//           Submit authentication issues, connectivity problems, or certificate errors.
//         </p>

//         {success && (
//           <div className="mb-4 py-3 px-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
//             Ticket submitted successfully! Check your email for updates.
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Full Name */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">Full Name</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
//               <User className="w-5 h-5 text-blue-700" />
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your full name"
//                 className="w-full py-2 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">Email Address</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
//               <Mail className="w-5 h-5 text-blue-700" />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email"
//                 className="w-full py-2 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">Phone Number</label>
//             <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
//               <Phone className="w-5 h-5 text-blue-700" />
//               <input
//                 type="text"
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="Enter mobile number (optional)"
//                 className="w-full py-2 bg-transparent outline-none"
//               />
//             </div>
//           </div>

//           {/* Institution */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">Institution Name</label>
//             <input
//               type="text"
//               name="institution"
//               value={form.institution}
//               onChange={handleChange}
//               required
//               placeholder="e.g., IIT Delhi, NIT Trichy, DU"
//               className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
//             />
//           </div>

//           {/* Issue Type */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">Issue Type</label>
//             <select
//               name="issueType"
//               value={form.issueType}
//               onChange={handleChange}
//               required
//               className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
//             >
//               <option value="">Select issue type</option>
//               <option value="Authentication Failure">Authentication Failure</option>
//               <option value="Connectivity Issue">Connectivity Issue</option>
//               <option value="Certificate Issue">Certificate Issue</option>
//               <option value="Account/Password Issue">Account/Password Issue</option>
//               <option value="Other Issue">Other Issue</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block font-medium text-blue-800 mb-1">Describe the Issue</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               required
//               rows={4}
//               placeholder="Provide a detailed description of your issue"
//               className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-bold text-white text-lg transition ${
//               isSubmitting ? "bg-blue-600 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-700"
//             }`}
//           >
//             <Send className="w-5 h-5" />
//             {isSubmitting ? "Submitting..." : "Submit Ticket"}
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import { Send, Mail, User, Phone } from "lucide-react";

export default function RaiseTicketPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    issueType: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch("/api/tickets/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: form.issueType,
        submitter_email: form.email,
        user_id: null,
        description: form.description,
        ilr_config_details: form.institution,
        device_os: navigator.userAgent || "Unknown OS",
        status_id: 1, // 🔥 Required by DB (open)
        name: form.name,
        phone: form.phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      alert("Ticket Created! Your ticket ID: " + data.ticket_id);

      setForm({
        name: "",
        email: "",
        phone: "",
        institution: "",
        issueType: "",
        description: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert("Ticket creation failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-900">
          Raise Support Ticket
        </h1>
        <p className="text-center text-blue-700 mt-2 mb-8">
          Submit authentication issues, connectivity problems, or certificate errors.
        </p>

        {success && (
          <div className="mb-4 py-3 px-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
            Ticket submitted successfully! Check your email for updates.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block font-medium text-blue-800 mb-1">Full Name</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
              <User className="w-5 h-5 text-blue-700" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full py-2 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-blue-800 mb-1">Email Address</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
              <Mail className="w-5 h-5 text-blue-700" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full py-2 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium text-blue-800 mb-1">Phone Number</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 bg-blue-50">
              <Phone className="w-5 h-5 text-blue-700" />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter mobile number (optional)"
                className="w-full py-2 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Institution */}
          <div>
            <label className="block font-medium text-blue-800 mb-1">Institution Name</label>
            <input
              type="text"
              name="institution"
              value={form.institution}
              onChange={handleChange}
              required
              placeholder="e.g., IIT Delhi, NIT Trichy, DU"
              className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
            />
          </div>

          {/* Issue Type */}
          <div>
            <label className="block font-medium text-blue-800 mb-1">Issue Type</label>
            <select
              name="issueType"
              value={form.issueType}
              onChange={handleChange}
              required
              className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
            >
              <option value="">Select issue type</option>
              <option value="Authentication Failure">Authentication Failure</option>
              <option value="Connectivity Issue">Connectivity Issue</option>
              <option value="Certificate Issue">Certificate Issue</option>
              <option value="Account/Password Issue">Account/Password Issue</option>
              <option value="Other Issue">Other Issue</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-blue-800 mb-1">Describe the Issue</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Provide a detailed description of your issue"
              className="w-full border bg-blue-50 px-3 py-2 rounded-lg outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-bold text-white text-lg transition ${
              isSubmitting ? "bg-blue-600 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-700"
            }`}
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}
