// "use client";

// import React, { useState, useMemo } from "react";
// import { MapPin, Info, X, Divide } from "lucide-react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// import map from "../../public/map_img.png"

// interface Institute {
//   name: string;
//   city: string;
//   state: string;
//   coordinates: number[]; // Changed from [number, number] to number[]
// }
// interface StateInfo {
//   name: string;
//   coordinates: [number, number];
//   instituteCount: number;
// }

// const IndianInstitutesMap: React.FC = () => {
//   const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(
//     null
//   );
//   const [hoveredState, setHoveredState] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedState, setSelectedState] = useState<string | null>(null);
//   // 👇 NEW STATE ADDED: Controls the visibility of the full list
//   const [showAllInstitutes, setShowAllInstitutes] = useState(false);

//   // Institute data extracted from the PDF with approximate coordinates
//   const institutes = [
//     // Gujarat
//     {
//       name: "Indian Institute of Technology",
//       city: "Gandhinagar",
//       state: "Gujarat",
//       coordinates: [72.6369, 23.2156],
//     },
//     {
//       name: "Indian Institute of Management",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       coordinates: [72.5797, 23.0225],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Vadodara",
//       state: "Gujarat",
//       coordinates: [73.1812, 22.3072],
//     },
//     {
//       name: "Institute of Infrastructure Technology Research and Management",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       coordinates: [72.5797, 23.0225],
//     },
//     {
//       name: "Charotar University Of Science & Technology",
//       city: "Anand",
//       state: "Gujarat",
//       coordinates: [72.9289, 22.5645],
//     },
//     {
//       name: "Anant National University",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       coordinates: [72.5797, 23.0225],
//     },
//     {
//       name: "Veer Narmad South Gujarat University",
//       city: "Surat",
//       state: "Gujarat",
//       coordinates: [72.8311, 21.1702],
//     },

//     // Telangana
//     {
//       name: "Indian Institute Of Technology",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "University Of Hyderabad",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "Indian School Of Business",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "International Institute of Information Technology",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "Tata Institute of Fundamental Research",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "Computer Centre-Tata Institute of Fundamental Research",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "CSIR-Centre for Cellular and Molecular Biology",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "Osmania University",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },

//     // Karnataka
//     {
//       name: "Indian Institute of Technology",
//       city: "Dharwad",
//       state: "Karnataka",
//       coordinates: [75.0178, 15.4589],
//     },
//     {
//       name: "Indian Institute of Management",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Indian Statistical Institute",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Tata Institute of Fundamental Research Centre for Applicable Mathematics",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "National Centre for Biological Sciences",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "ERNET Regional Center",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "ERNET Office",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Raman Research Institute",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "International Centre for Theoretical Sciences-Tata Institute of Fundamental Research Centre for Applicable Mathematics",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Computer Centre-International Centre for Theoretical Sciences-Tata Institute of Fundamental Research Centre for Applicable Mathematics",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Indian Institute Of Sciences",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Jawaharlal Nehru Centre for Advanced Scientific Research",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Computer Centre Jawaharlal Nehru Centre for Advanced Scientific Research",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Institute for Stem Cell Science and Regenerative Medicine",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Azim Premji University",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Indian Institute of Astrophysics",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Manipal Academy of Higher Education",
//       city: "Manipal",
//       state: "Karnataka",
//       coordinates: [74.7787, 13.3467],
//     },
//     {
//       name: "International Institute Of Information Technology",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "National Institute of Advanced Studies",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },

//     // Tamil Nadu
//     {
//       name: "Indian Institute of Technology",
//       city: "Madras",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Conference hall, IIT",
//       city: "Madras",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Indian Institute of Information Technology, Design & Manufacturing",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "ERNET India",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "SRM University",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Computer Centre, SRM University",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Karunya Institute of Technology and Sciences",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "B.S. Abdur Rahman Crescent Institute of Science & Technology",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Agricultural College & Research Institute (AC&RI), Tamil Nadu Agricultural University",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "School of Post Graduate Studies (SPGS), Tamil Nadu Agricultural University",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "Agricultural Engineering College & Research Institute (AEC&RI)-Tamil Nadu Agricultural University",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "Horticultural College & Research Institute (HC&RI)-Tamil Nadu Agricultural University",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "The Institute Of Mathematical Sciences",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Thanjavur",
//       state: "Tamil Nadu",
//       coordinates: [79.1378, 10.787],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Pudukkottai",
//       state: "Tamil Nadu",
//       coordinates: [78.8209, 10.3833],
//     },
//     {
//       name: "Horticultural College and Research Institute for Women",
//       city: "Trichy",
//       state: "Tamil Nadu",
//       coordinates: [78.7047, 10.7905],
//     },
//     {
//       name: "Horticultural College and Research Institute",
//       city: "Theni",
//       state: "Tamil Nadu",
//       coordinates: [77.4977, 10.0104],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Madurai",
//       state: "Tamil Nadu",
//       coordinates: [78.1198, 9.9252],
//     },
//     {
//       name: "Home Science College and Research Institute",
//       city: "Madurai",
//       state: "Tamil Nadu",
//       coordinates: [78.1198, 9.9252],
//     },
//     {
//       name: "Agricultural Engineering College and Research Institute",
//       city: "Trichy",
//       state: "Tamil Nadu",
//       coordinates: [78.7047, 10.7905],
//     },
//     {
//       name: "Anbil Dharmalingam Agricultural College and Research Institute",
//       city: "Trichy",
//       state: "Tamil Nadu",
//       coordinates: [78.7047, 10.7905],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Tirunelveli",
//       state: "Tamil Nadu",
//       coordinates: [77.6933, 8.7139],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Thiruvannamalai",
//       state: "Tamil Nadu",
//       coordinates: [79.0747, 12.2253],
//     },
//     {
//       name: "Forest College and Research Institute",
//       city: "Mettupalayam",
//       state: "Tamil Nadu",
//       coordinates: [76.937, 11.3019],
//     },
//     {
//       name: "Madras Veterinary College",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Veterinary College and Research Institute",
//       city: "Namakkal",
//       state: "Tamil Nadu",
//       coordinates: [78.1674, 11.2189],
//     },
//     {
//       name: "Veterinary College and Research Institute",
//       city: "Orathanadu",
//       state: "Tamil Nadu",
//       coordinates: [79.2833, 10.65],
//     },
//     {
//       name: "Veterinary College and Research Institute",
//       city: "Tirunelveli",
//       state: "Tamil Nadu",
//       coordinates: [77.6933, 8.7139],
//     },
//     {
//       name: "College of Food and Dairy Technology",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Veterinary College and Research Institute",
//       city: "Salem",
//       state: "Tamil Nadu",
//       coordinates: [78.146, 11.6643],
//     },
//     {
//       name: "Chennai Mathematical Institute",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Loyola-ICAM College of Engineering and Technology",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Tamil Nadu Veterinary and Animal Sciences University",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Crescent Institute of Science & Technology",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "College of Poultry Production and Management",
//       city: "Hosur",
//       state: "Tamil Nadu",
//       coordinates: [77.825, 12.1265],
//     },

//     // Uttar Pradesh
//     {
//       name: "Shiv Nadar University",
//       city: "Greater Noida",
//       state: "Uttar Pradesh",
//       coordinates: [77.534, 28.4744],
//     },
//     {
//       name: "Indian Institute Of Technology",
//       city: "Kanpur",
//       state: "Uttar Pradesh",
//       coordinates: [80.3319, 26.4499],
//     },
//     {
//       name: "Indian Institute Of Management",
//       city: "Lucknow",
//       state: "Uttar Pradesh",
//       coordinates: [80.9462, 26.8467],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Noida",
//       state: "Uttar Pradesh",
//       coordinates: [77.391, 28.5355],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Allahabad",
//       state: "Uttar Pradesh",
//       coordinates: [81.8463, 25.4358],
//     },
//     {
//       name: "Main Campus, Banaras Hindu University",
//       city: "Varanasi",
//       state: "Uttar Pradesh",
//       coordinates: [83.0193, 25.2677],
//     },
//     {
//       name: "Institute of Agricultural Science, Banaras Hindu University",
//       city: "Varanasi",
//       state: "Uttar Pradesh",
//       coordinates: [83.0193, 25.2677],
//     },
//     {
//       name: "Institute of Medical Sciences, Banaras Hindu University",
//       city: "Varanasi",
//       state: "Uttar Pradesh",
//       coordinates: [83.0193, 25.2677],
//     },
//     {
//       name: "Allahabad University",
//       city: "Allahabad",
//       state: "Uttar Pradesh",
//       coordinates: [81.8463, 25.4358],
//     },
//     {
//       name: "Galgotias University",
//       city: "Greater Noida",
//       state: "Uttar Pradesh",
//       coordinates: [77.534, 28.4744],
//     },
//     {
//       name: "Harish Chandra Research Institute",
//       city: "Allahabad",
//       state: "Uttar Pradesh",
//       coordinates: [81.8463, 25.4358],
//     },
//     {
//       name: "Babasaheb Bhimrao Ambedkar University",
//       city: "Lucknow",
//       state: "Uttar Pradesh",
//       coordinates: [80.9462, 26.8467],
//     },
//     {
//       name: "Centre of Bio-Medical Research (CBMR)",
//       city: "Lucknow",
//       state: "Uttar Pradesh",
//       coordinates: [80.9462, 26.8467],
//     },
//     {
//       name: "Jagatpur PG College",
//       city: "Banaras",
//       state: "Uttar Pradesh",
//       coordinates: [83.0193, 25.2677],
//     },
//     {
//       name: "Motilal Nehru National Institute of Technology",
//       city: "Allahabad",
//       state: "Uttar Pradesh",
//       coordinates: [81.8463, 25.4358],
//     },
//     {
//       name: "IEC College",
//       city: "Greater Noida",
//       state: "Uttar Pradesh",
//       coordinates: [77.534, 28.4744],
//     },

//     // Punjab
//     {
//       name: "Indian Institute of Technology",
//       city: "Ropar",
//       state: "Punjab",
//       coordinates: [76.5127, 30.9697],
//     },
//     {
//       name: "Central University of Punjab",
//       city: "Bathinda",
//       state: "Punjab",
//       coordinates: [74.9455, 30.2118],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Mohali",
//       state: "Punjab",
//       coordinates: [76.7294, 30.6638],
//     },
//     {
//       name: "Government Medical College",
//       city: "Amritsar",
//       state: "Punjab",
//       coordinates: [74.8723, 31.634],
//     },
//     {
//       name: "Guru Govind Singh Medical College and Hospital",
//       city: "Faridkot",
//       state: "Punjab",
//       coordinates: [74.7553, 30.6712],
//     },
//     {
//       name: "Guru Nanak Dev Engineering College",
//       city: "Ludhiana",
//       state: "Punjab",
//       coordinates: [75.8573, 30.901],
//     },
//     {
//       name: "Chitkara University",
//       city: "Rajpura",
//       state: "Punjab",
//       coordinates: [76.5994, 30.481],
//     },
//     {
//       name: "Plaksha University",
//       city: "Mohali",
//       state: "Punjab",
//       coordinates: [76.7294, 30.6638],
//     },

//     // Chandigarh
//     {
//       name: "Postgraduate Institute of Medical Education and Research",
//       city: "Chandigarh",
//       state: "Chandigarh",
//       coordinates: [76.7794, 30.7333],
//     },

//     // Kerala
//     {
//       name: "Indian Institute of Technology",
//       city: "Palakkad",
//       state: "Kerala",
//       coordinates: [76.6413, 10.7867],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Thiruvananthapuram",
//       state: "Kerala",
//       coordinates: [76.9366, 8.5241],
//     },
//     {
//       name: "Amal Jyothi College of Engineering",
//       city: "Kanjirappally",
//       state: "Kerala",
//       coordinates: [76.7783, 9.5648],
//     },
//     {
//       name: "KMEA Engineering College",
//       city: "Aluva",
//       state: "Kerala",
//       coordinates: [76.3463, 10.1085],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Calicut",
//       state: "Kerala",
//       coordinates: [75.7804, 11.2588],
//     },

//     // Assam
//     {
//       name: "Indian Institute Of Technology",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },
//     {
//       name: "Assam Don Bosco University",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },
//     {
//       name: "Guwahati Medical College",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },

//     // Chhattisgarh
//     {
//       name: "Indian Institute Of Management",
//       city: "Raipur",
//       state: "Chhattisgarh",
//       coordinates: [81.6296, 21.2514],
//     },
//     {
//       name: "All India Institute of Medical Sciences",
//       city: "Raipur",
//       state: "Chhattisgarh",
//       coordinates: [81.6296, 21.2514],
//     },
//     {
//       name: "Guru Ghasidas Vishwavidyalaya",
//       city: "Bilaspur",
//       state: " Chhattisgarh",
//       coordinates: [82.1409, 22.0797],
//     },
//     {
//       name: "Shri Shankaracharya Institute of Professional Management and Technology",
//       city: "Raipur",
//       state: "Chhattisgarh",
//       coordinates: [81.6296, 21.2514],
//     },

//     // Haryana
//     {
//       name: "Indian Institute Of Management",
//       city: "Rohtak",
//       state: "Haryana",
//       coordinates: [76.6066, 28.8955],
//     },
//     {
//       name: "Central University of Haryana",
//       city: "Mahendragarh",
//       state: "Haryana",
//       coordinates: [76.1441, 28.242],
//     },
//     {
//       name: "K.R. Mangalam University",
//       city: "Gurgaon",
//       state: "Haryana",
//       coordinates: [77.0266, 28.4595],
//     },
//     {
//       name: "THE NORTHCAP UNIVERSITY",
//       city: "Gurgaon",
//       state: "Haryana",
//       coordinates: [77.0266, 28.4595],
//     },
//     {
//       name: "Maharshi Dayanand University",
//       city: "Rohtak",
//       state: "Haryana",
//       coordinates: [76.6066, 28.8955],
//     },
//     {
//       name: "Ashoka University",
//       city: "Sonipat",
//       state: "Haryana",
//       coordinates: [77.0178, 28.9931],
//     },
//     {
//       name: "Chaudhary Ranbir Singh University",
//       city: "Jind",
//       state: "Haryana",
//       coordinates: [76.3148, 29.3158],
//     },
//     {
//       name: "BPS Mahila Vishwavidyalaya Khanpur Kalan",
//       city: "Sonepat",
//       state: "Haryana",
//       coordinates: [77.0178, 28.9931],
//     },
//     {
//       name: "Translational Health Science and Technology Institute",
//       city: "Faridabad",
//       state: "Haryana",
//       coordinates: [77.3178, 28.4089],
//     },
//     {
//       name: "Regional Centre for Biotechnology",
//       city: "Faridabad",
//       state: "Haryana",
//       coordinates: [77.3178, 28.4089],
//     },
//     {
//       name: "Deenbandhu Chhotu Ram University of Science and Technology",
//       city: "Murthal",
//       state: "Haryana",
//       coordinates: [76.9, 29.0333],
//     },
//     {
//       name: "South Point Group of Institutions",
//       city: "Sonepat",
//       state: "Haryana",
//       coordinates: [77.0178, 28.9931],
//     },
//     {
//       name: "School of Engineering and Technology, K.R. Mangalam University",
//       city: "Gurgaon",
//       state: "Haryana",
//       coordinates: [77.0266, 28.4595],
//     },
//     {
//       name: "Management Development Institute",
//       city: "Gurgaon",
//       state: "Haryana",
//       coordinates: [77.0266, 28.4595],
//     },
//     {
//       name: "National Brain Research Center",
//       city: "Manesar",
//       state: "Haryana",
//       coordinates: [76.9313, 28.367],
//     },

//     // Odisha
//     {
//       name: "Indian Institute Of Technology",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },
//     {
//       name: "National Institute Of Technology",
//       city: "Rourkela",
//       state: "Odisha",
//       coordinates: [84.8536, 22.2574],
//     },
//     {
//       name: "Centurion University of Technology and Management",
//       city: "Paralakhemundi",
//       state: "Odisha",
//       coordinates: [84.0877, 18.7831],
//     },
//     {
//       name: "National Institute of Science Education and Research (NISER)",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },
//     {
//       name: "Centurion University",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },
//     {
//       name: "Institute of Physics",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },
//     {
//       name: "Utkal University",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },

//     // Rajasthan
//     {
//       name: "Indian Institute of Technology",
//       city: "Jodhpur",
//       state: "Rajasthan",
//       coordinates: [73.0243, 26.2389],
//     },
//     {
//       name: "All India Institute of Medical Sciences",
//       city: "Jodhpur",
//       state: "Rajasthan",
//       coordinates: [73.0243, 26.2389],
//     },
//     {
//       name: "Birla Institute of Technology and Science",
//       city: "Pilani",
//       state: "Rajasthan",
//       coordinates: [75.6033, 28.367],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Jaipur",
//       state: "Rajasthan",
//       coordinates: [75.7873, 26.9124],
//     },
//     {
//       name: "Malaviya National Institute of Technology",
//       city: "Jaipur",
//       state: "Rajasthan",
//       coordinates: [75.7873, 26.9124],
//     },
//     {
//       name: "Government Women Engineering College",
//       city: "Ajmer",
//       state: "Rajasthan",
//       coordinates: [74.6399, 26.4499],
//     },
//     {
//       name: "Rajasthan Technical University",
//       city: "Kota",
//       state: "Rajasthan",
//       coordinates: [75.8648, 25.2138],
//     },
//     {
//       name: "Sir Padampat Singhania University",
//       city: "Udaipur",
//       state: "Rajasthan",
//       coordinates: [73.7125, 24.5854],
//     },

//     // Meghalaya
//     {
//       name: "North Eastern Hill University",
//       city: "Shillong",
//       state: "Meghalaya",
//       coordinates: [91.8933, 25.5788],
//     },

//     // Tripura
//     {
//       name: "National Institute of Technology",
//       city: "Agartala",
//       state: "Tripura",
//       coordinates: [91.2868, 23.8315],
//     },

//     // Jammu and Kashmir
//     {
//       name: "Indian Institute of Technology",
//       city: "Jammu",
//       state: "Jammu and Kashmir",
//       coordinates: [74.857, 32.7266],
//     },
//     {
//       name: "University of Jammu",
//       city: "Jammu",
//       state: "Jammu and Kashmir",
//       coordinates: [74.857, 32.7266],
//     },

//     // Manipur
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Manipur",
//       state: "Manipur",
//       coordinates: [93.9063, 24.6637],
//     },
//     {
//       name: "Manipur University",
//       city: "Imphal",
//       state: "Manipur",
//       coordinates: [93.9063, 24.817],
//     },
//     {
//       name: "D.M. College of Commerce",
//       city: "Imphal",
//       state: "Manipur",
//       coordinates: [93.9063, 24.817],
//     },
//     {
//       name: "G.P. Women's College",
//       city: "Imphal",
//       state: "Manipur",
//       coordinates: [93.9063, 24.817],
//     },

//     // Sikkim
//     {
//       name: "Sikkim Manipal University",
//       city: "Gangtok",
//       state: "Sikkim",
//       coordinates: [88.6138, 27.3389],
//     },

//     // Jharkhand
//     {
//       name: "All India Institute of Medical Sciences (AIIMS)",
//       city: "Deoghar",
//       state: "Jharkhand",
//       coordinates: [86.6956, 24.4921],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Lalpur",
//       state: "Jharkhand",
//       coordinates: [85.324, 23.3441],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Deoghar",
//       state: "Jharkhand",
//       coordinates: [86.6956, 24.4921],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Ranchi",
//       state: "Jharkhand",
//       coordinates: [85.324, 23.3441],
//     },
//     {
//       name: "Indian School of Mines",
//       city: "Dhanbad",
//       state: "Jharkhand",
//       coordinates: [86.4304, 23.7957],
//     },
//     {
//       name: "Rajendra Institute of Medical Sciences",
//       city: "Ranchi",
//       state: "Jharkhand",
//       coordinates: [85.324, 23.3441],
//     },

//     // West Bengal
//     {
//       name: "Indian Institute of Technology",
//       city: "Kharagpur",
//       state: "West Bengal",
//       coordinates: [87.3119, 22.346],
//     },
//     {
//       name: "Indian Institute of Management",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Indian Statistical Institute",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Durgapur",
//       state: "West Bengal",
//       coordinates: [87.3119, 23.5204],
//     },
//     {
//       name: "Variable Energy Cyclotron Center",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "National Institute of Electronics & Information Technology (NIELIT)",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Jalpaiguri Govt. Engineering College",
//       city: "Jalpaiguri",
//       state: "West Bengal",
//       coordinates: [88.7267, 26.5465],
//     },
//     {
//       name: "Institute Of Genetic Engineering",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Neotia Institute of Technology",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Indian Association for the Cultivation of Science",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },

//     // Maharashtra
//     {
//       name: "Indian Institute Of Technology",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Pune",
//       state: "Maharashtra",
//       coordinates: [73.8567, 18.5204],
//     },
//     {
//       name: "National Institute Of Immunology",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "The Inter-University Centre for Astronomy and Astrophysics",
//       city: "Pune",
//       state: "Maharashtra",
//       coordinates: [73.8567, 18.5204],
//     },
//     {
//       name: "Tata Institute of Fundamental Research (TIFR)",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Savitribai Phule Pune University",
//       city: "Pune",
//       state: "Maharashtra",
//       coordinates: [73.8567, 18.5204],
//     },
//     {
//       name: "Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya",
//       city: "Wardha",
//       state: "Maharashtra",
//       coordinates: [78.5977, 20.7391],
//     },
//     {
//       name: "King Edwards Memorial Hospital",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Homi Bhabha Centre for Science Education-Tata Institute of Fundamental Research (TIFR)",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "National Centre for Radio Astrophysics- Tata Institute of Fundamental Research (TIFR)",
//       city: "Pune",
//       state: "Maharashtra",
//       coordinates: [73.8567, 18.5204],
//     },
//     {
//       name: "Lokmanya Tilak Municipal Medical College",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Dept. of Biological Sciences at Tata Institute of Fundamental Research",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Veermata Jijabai Technological Institute",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },

//     // Himachal Pradesh
//     {
//       name: "Indian Institute of Technology",
//       city: "Mandi",
//       state: "Himachal Pradesh",
//       coordinates: [76.9366, 31.7076],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Hamirpur",
//       state: "Himachal Pradesh",
//       coordinates: [76.5222, 31.684],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Una",
//       state: "Himachal Pradesh",
//       coordinates: [76.2673, 31.4649],
//     },
//     {
//       name: "Himachal Pradesh University",
//       city: "Shimla",
//       state: "Himachal Pradesh",
//       coordinates: [77.1025, 31.0588],
//     },
//     {
//       name: "Chitkara University",
//       city: "Solan",
//       state: "Himachal Pradesh",
//       coordinates: [77.0999, 30.9045],
//     },

//     // Bihar
//     {
//       name: "Indian Institute of Technology",
//       city: "Patna",
//       state: "Bihar",
//       coordinates: [85.1376, 25.5941],
//     },
//     {
//       name: "Computer Centre - Indian Institute of Technology Patna",
//       city: "Patna",
//       state: "Bihar",
//       coordinates: [85.1376, 25.5941],
//     },
//     {
//       name: "All India Institute Of Medical Sciences Patna",
//       city: "Patna",
//       state: "Bihar",
//       coordinates: [85.1376, 25.5941],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Patna",
//       state: "Bihar",
//       coordinates: [85.1376, 25.5941],
//     },
//     {
//       name: "Darbhanga Medical College",
//       city: "Darbhanga",
//       state: "Bihar",
//       coordinates: [85.8918, 26.1542],
//     },

//     // Uttarakhand
//     {
//       name: "Indian Institute of Technology",
//       city: "Roorkee",
//       state: "Uttarakhand",
//       coordinates: [77.8875, 29.8543],
//     },
//     {
//       name: "Indian Institute Of Management",
//       city: "Kashipur",
//       state: "Uttarakhand",
//       coordinates: [78.9629, 29.2084],
//     },
//     {
//       name: "Computer Centre - University of Petroleum & Energy Studies",
//       city: "Dehradun",
//       state: "Uttarakhand",
//       coordinates: [78.0322, 30.3165],
//     },
//     {
//       name: "All India Institute of Medical Sciences",
//       city: "Rishikesh",
//       state: "Uttarakhand",
//       coordinates: [78.2676, 30.0869],
//     },
//     {
//       name: "University of Petroleum & Energy Studies",
//       city: "Dehradun",
//       state: "Uttarakhand",
//       coordinates: [78.0322, 30.3165],
//     },

//     // Madhya Pradesh
//     {
//       name: "Indian Institute of Technology",
//       city: "Indore",
//       state: "Madhya Pradesh",
//       coordinates: [75.8577, 22.5726],
//     },
//     {
//       name: "Indian Institute of Information Technology, Design and Manufacturing",
//       city: "Jabalpur",
//       state: "Madhya Pradesh",
//       coordinates: [79.9864, 23.1815],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Bhopal",
//       state: "Madhya Pradesh",
//       coordinates: [77.4126, 23.2599],
//     },
//     {
//       name: "Maulana Azad National Institute of Technology",
//       city: "Bhopal",
//       state: "Madhya Pradesh",
//       coordinates: [77.4126, 23.2599],
//     },
//     {
//       name: "Indira Gandhi National Tribal University",
//       city: "Amarkantak",
//       state: "Madhya Pradesh",
//       coordinates: [81.7473, 22.6708],
//     },
//     {
//       name: "National Institute of Technical Teacher's Training and Research",
//       city: "Bhopal",
//       state: "Madhya Pradesh",
//       coordinates: [77.4126, 23.2599],
//     },
//     {
//       name: "Jagran Lakecity University",
//       city: "Bhopal",
//       state: "Madhya Pradesh",
//       coordinates: [77.4126, 23.2599],
//     },
//     {
//       name: "Shri G.S. Institute of Technology and Science",
//       city: "Indore",
//       state: "Madhya Pradesh",
//       coordinates: [75.8577, 22.5726],
//     },

//     // Andhra Pradesh
//     {
//       name: "Indian Institute of Technology",
//       city: "Tirupati",
//       state: "Andhra Pradesh",
//       coordinates: [79.4192, 13.6288],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Sri City",
//       state: "Andhra Pradesh",
//       coordinates: [79.7036, 13.5933],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Tirupati",
//       state: "Andhra Pradesh",
//       coordinates: [79.4192, 13.6288],
//     },
//     {
//       name: "Computer Centre - Indian Institute of Science Education and Research",
//       city: "Tirupati",
//       state: "Andhra Pradesh",
//       coordinates: [79.4192, 13.6288],
//     },
//     {
//       name: "SVEC – Sree Vidyanikethan Engineering College",
//       city: "Tirupati",
//       state: "Andhra Pradesh",
//       coordinates: [79.4192, 13.6288],
//     },

//     // Goa
//     {
//       name: "Indian Institute of Technology",
//       city: "Goa",
//       state: "Goa",
//       coordinates: [74.124, 15.2993],
//     },

//     // Delhi
//     {
//       name: "Indian Institute of Technology",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "National Institute Of Pathology",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "International Centre For Genetic Engineering And Biotechnology",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indian National Science Academy",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "IEC College",
//       city: "Greater Kailash",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Delhi Technological University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "National Institute of Electronics & Information Technology (NIELIT)",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Institute of Home Economics",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ambedkar University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indraprastha Institute of Information Technology",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "ERNET India",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Jawaharlal Nehru University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Guru Gobind Singh Indraprastha University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "South Asian University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Delhi University",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Jamia Hamdard University",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Vivekananda College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shaheed Sukhdev College of Business Studies",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ahilya Bai College Of Nursing",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indraprastha College For Women",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Acharya Narendra Dev College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Aditi Mahavidyalaya",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Lady Shri Ram College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Aryabhatta College (Ram Lal College evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Lakshmibai College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Atma Ram Sanatan Dharma College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Maharaja Agrasen College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bhagini Nivedita College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Maharshe Valmiki College of Education",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Maitreyi College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bhaskaracharya College of Applied Sciences",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Mata Sundri College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bhim Rao Ambedkar College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Miranda House",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "College of Vocational Studies",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Moti Lal Nehru College (Morning)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Daulat Ram College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Motilal Nehru College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Deen Dayal Upadhayaya College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Pannalal Girdharlal Dayanand Anglo-Vedic College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Delhi College of Arts & Commerce",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Pannalal Girdharlal Dayanand Anglo-Vedic College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Deshbandhu College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Rajdhani College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Dyal Singh College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ram Lal Anand College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Dyal Singh College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ramanujan College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Gargi College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bharati College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ramjas College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Hans Raj College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Satyawati College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Hindu College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Satyawati College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indira Gandhi Institute of Physical Education & Sports Sciences",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shaheed Bhagat Singh College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indraprastha College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shaheed Bhagat Singh College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shaheed Rajguru College of Applied Sciences",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Janki Devi Memorial College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Jesus and Mary College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shivaji College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Kalindi College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shri Ram College of Commerce",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Kamla Nehru College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shyam Lal College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Keshav Mahavidyalaya",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shyam Lal College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Kirori Mal College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shyama Prasad Mukherjee College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Lady Irwin College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Sri Aurobindo College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Sri Aurobindo College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Swami Shradhanand College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Sri Guru Gobind Singh College of Commerce",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "St. Stephen's College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "43rd APAN INDIA",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "National Knowledge Network",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Computer Centre North Campus, Delhi University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indian Statistical Institute",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bhai Parmanand Institute Of Business Studies",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shri Lal Bahadur Shastri Sanskrit University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//   ];

//   // State-wise grouping
//   const stateData = useMemo(() => {
//     const states: { [key: string]: StateInfo } = {
//       Gujarat: {
//         name: "Gujarat",
//         coordinates: [72.0, 23.0],
//         instituteCount: 0,
//       },
//       Karnataka: {
//         name: "Karnataka",
//         coordinates: [76.0, 13.0],
//         instituteCount: 0,
//       },
//       "Tamil Nadu": {
//         name: "Tamil Nadu",
//         coordinates: [78.0, 11.0],
//         instituteCount: 0,
//       },
//       Telangana: {
//         name: "Telangana",
//         coordinates: [79.0, 18.0],
//         instituteCount: 0,
//       },
//       Delhi: { name: "Delhi", coordinates: [77.2, 28.6], instituteCount: 0 },
//       Maharashtra: {
//         name: "Maharashtra",
//         coordinates: [75.0, 19.0],
//         instituteCount: 0,
//       },
//       "West Bengal": {
//         name: "West Bengal",
//         coordinates: [88.0, 22.5],
//         instituteCount: 0,
//       },
//       "Uttar Pradesh": {
//         name: "Uttar Pradesh",
//         coordinates: [81.0, 26.8],
//         instituteCount: 0,
//       },
//       Punjab: { name: "Punjab", coordinates: [76.0, 31.0], instituteCount: 0 },
//       Assam: { name: "Assam", coordinates: [92.0, 26.2], instituteCount: 0 },
//       Odisha: { name: "Odisha", coordinates: [85.0, 20.5], instituteCount: 0 },
//       Rajasthan: {
//         name: "Rajasthan",
//         coordinates: [74.0, 27.0],
//         instituteCount: 0,
//       },
//       "Himachal Pradesh": {
//         name: "Himachal Pradesh",
//         coordinates: [77.0, 31.1],
//         instituteCount: 0,
//       },
//       Bihar: { name: "Bihar", coordinates: [85.0, 25.0], instituteCount: 0 },
//       Uttarakhand: {
//         name: "Uttarakhand",
//         coordinates: [79.0, 30.0],
//         instituteCount: 0,
//       },
//       "Madhya Pradesh": {
//         name: "Madhya Pradesh",
//         coordinates: [78.0, 23.0],
//         instituteCount: 0,
//       },
//       Kerala: { name: "Kerala", coordinates: [76.0, 10.0], instituteCount: 0 },
//       "Andhra Pradesh": {
//         name: "Andhra Pradesh",
//         coordinates: [79.0, 15.0],
//         instituteCount: 0,
//       },
//       Goa: { name: "Goa", coordinates: [74.0, 15.4], instituteCount: 0 },
//       Haryana: {
//         name: "Haryana",
//         coordinates: [76.0, 29.0],
//         instituteCount: 0,
//       },
//       Chhattisgarh: {
//         name: "Chhattisgarh",
//         coordinates: [82.0, 21.0],
//         instituteCount: 0,
//       },
//       Jharkhand: {
//         name: "Jharkhand",
//         coordinates: [85.0, 23.6],
//         instituteCount: 0,
//       },
//       Tripura: {
//         name: "Tripura",
//         coordinates: [91.9, 23.9],
//         instituteCount: 0,
//       },
//       "Jammu and Kashmir": {
//         name: "Jammu and Kashmir",
//         coordinates: [76.0, 34.0],
//         instituteCount: 0,
//       },
//       Manipur: {
//         name: "Manipur",
//         coordinates: [93.9, 24.6],
//         instituteCount: 0,
//       },
//       Meghalaya: {
//         name: "Meghalaya",
//         coordinates: [91.3, 25.5],
//         instituteCount: 0,
//       },
//       Sikkim: { name: "Sikkim", coordinates: [88.5, 27.5], instituteCount: 0 },
//     };

//     institutes.forEach((institute) => {
//       if (states[institute.state]) {
//         states[institute.state].instituteCount++;
//       }
//     });

//     return states;
//   }, [institutes]);

//   // Filter institutes based on search
//   const filteredInstitutes = useMemo(() => {
//     if (!searchTerm) return institutes;
//     return institutes.filter(
//       (institute) =>
//         institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         institute.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         institute.state.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [institutes, searchTerm]);

//   const getStateColor = (stateName: string) => {
//     const count = stateData[stateName]?.instituteCount || 0;
//     if (count === 0) return "#f3f4f6";
//     if (count <= 5) return "#dbeafe";
//     if (count <= 15) return "#93c5fd";
//     if (count <= 30) return "#3b82f6";
//     return "#1d4ed8";
//   };

//   const svgWidth = 800;
//   const svgHeight = 600;

//   // Simple India outline (simplified for demo)
//   const indiaPath = "/indiaMap.json";

//   const handleTotalInstitutesClick = () => {
//     setShowAllInstitutes(true);
//     setSelectedState(null);
//   };

//   const handleStatesCoveredClick = () => {
//     setShowAllInstitutes(false);
//     setSelectedState(null);
//     setSearchTerm("");
//   };

//   // Excel download function
//   const downloadExcel = () => {
//     const data = institutes.map((inst) => ({
//       Name: inst.name,
//       City: inst.city,
//       State: inst.state,
//       Latitude: inst.coordinates[1],
//       Longitude: inst.coordinates[0],
//     }));

//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Universities");
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, "Indian_Universities.xlsx");
//   };

//   return (
//     <>
//       <Navbar />
//       {/* Main container with full width */}
//       <div className="w-full p-6 bg-white">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             Indian Educational Institutes Map
//           </h1>
//           <p className="text-gray-600 mb-4">
//             {/* Interactive map showing {institutes.length} educational institutes */}
//             Interactive map showing {310} educational institutes
//             across India
//           </p>

//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="Search institutes, cities, or states..."
//               className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             {/* MODIFIED: Made Total Institutes clickable */}
//             <div
//               className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
//               onClick={handleTotalInstitutesClick}
//             >
//               <div className="text-2xl font-bold text-blue-600">
//                 {/* {institutes.length} */}
//                 310
//               </div>
//               <div className="text-sm text-gray-600">Total Institutes</div>
//             </div>
//             {/* <div className="bg-green-50 p-3 rounded-lg">
//                 <div className="text-2xl font-bold text-green-600">
//                   {
//                     Object.keys(stateData).filter(
//                       (state) => stateData[state].instituteCount > 0
//                     ).length
//                   }
//                 </div>
//                 <div className="text-sm text-gray-600">States Covered</div>
//               </div> */}
//             <div
//               className="bg-green-50 p-3 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
//               onClick={handleStatesCoveredClick}
//             >
//               <div className="text-2xl font-bold text-green-600">
//                 {
//                   Object.keys(stateData).filter(
//                     (state) => stateData[state].instituteCount > 0
//                   ).length
//                 }
//               </div>
//               <div className="text-sm text-gray-600">States Covered</div>
//             </div>
//             <div className="bg-purple-50 p-3 rounded-lg">
//               <div className="text-2xl font-bold text-purple-600">
//                 {Math.max(
//                   ...Object.values(stateData).map((s) => s.instituteCount)
//                 )}
//               </div>
//               <div className="text-sm text-gray-600">Max per State</div>
//             </div>
//             <div className="bg-orange-50 p-3 rounded-lg">
//               <div className="text-2xl font-bold text-orange-600">
//                 {/* {filteredInstitutes.length} */}
//                 310
//               </div>
//               <div className="text-sm text-gray-600">Filtered Results</div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Map */}
//           <div className="container flex-1">
//             <div className="relative w-full h-[580px] overflow-hidden rounded-xl shadow-lg border-2 border-gray-400 ">
//               <iframe
//                 src="https://www.google.com/maps/d/u/0/embed?mid=1TxT6YENQMerQjWXqldlz2ywTz6MaquI&ehbc=2E312F&ll=30.5937,78.9629&z=5"
//                 className="w-full h-[660px] -mt-20 border-0"
//               ></iframe>
//               {/* <img src={map} alt="Map" /> */}
//             </div>

//             <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
//               {/* Left side: Legend items */}
//               <div className="flex flex-wrap gap-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white"></div>
//                   <span>Institute Location</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin className="w-4 h-4 text-blue-600" />
//                   <span>Click marker for details</span>
//                 </div>
//               </div>

//               {/* Right side: Download Button */}
//               <button
//                 onClick={downloadExcel}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
//               >
//                 Download Universities Excel
//               </button>
//             </div>

//           </div>
//           {/* Side Panel */}
//           <div className="lg:w-80 flex-shrink-0">

//             {/* 👇 NEW ALL INSTITUTES LIST POPUP/PANEL (Highest Priority) */}
//             {showAllInstitutes && !searchTerm && (
//               <div className="bg-white border border-gray-400 rounded-lg p-4 mb-4 h-[568px]">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-semibold text-blue-800 flex items-center gap-2">
//                     <Info className="w-4 h-4" />
//                     {/* All Institutes List ({institutes.length}) */}
//                     All Institutes List ({310})
//                   </h3>
//                   <button
//                     onClick={() => setShowAllInstitutes(false)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="space-y-2 max-h-[500px] overflow-y-auto">
//                   {/* Render ALL Institutes here */}
//                   {institutes.map((inst, index) => (
//                     <div
//                       key={index}
//                       className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                       onClick={() => {
//                         setSelectedInstitute(inst);
//                         setShowAllInstitutes(false); // Close the list upon selection
//                       }}
//                     >
//                       <div className="font-medium text-sm text-gray-800">{inst.name}</div>
//                       <div className="text-xs text-gray-600">
//                         {inst.city}, {inst.state}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Existing State Statistics: Only show if NO full list is active AND NO state is selected AND NO search term */}
//             {!showAllInstitutes && !selectedState && !searchTerm && (
//               <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 h-[500px]">
//                 <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   <Info className="w-4 h-8" />
//                   State-wise Distribution
//                 </h3>
//                 <div className="space-y-2 max-h-100 overflow-y-auto">
//                   {Object.values(stateData)
//                     .filter((state) => state.instituteCount > 0)
//                     .sort((a, b) => b.instituteCount - a.instituteCount)
//                     .map((state, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                         onClick={() => setSelectedState(state.name)}
//                       >
//                         <span className="text-sm font-medium">{state.name}</span>
//                         <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
//                           {state.instituteCount}
//                         </span>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Universities for Selected State: Only shows if selectedState is active */}
//             {selectedState && (
//               <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-semibold text-gray-800">
//                     Universities in {selectedState}
//                   </h3>
//                   <button
//                     onClick={() => setSelectedState(null)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="space-y-2 max-h-60 overflow-y-auto">
//                   {institutes
//                     .filter((inst) => inst.state === selectedState)
//                     .map((inst, index) => (
//                       <div
//                         key={index}
//                         className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                         onClick={() => setSelectedInstitute(inst)}
//                       >
//                         <div className="font-medium text-sm text-gray-800">{inst.name}</div>
//                         <div className="text-xs text-gray-600">
//                           {inst.city}, {inst.state}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Selected Institute Details (shows over anything else) */}
//             {selectedInstitute && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="font-semibold text-blue-900">
//                     Institute Details
//                   </h3>
//                   <button
//                     onClick={() => setSelectedInstitute(null)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div>
//                     <span className="font-medium text-blue-800">Name:</span>
//                     <p className="text-blue-700">{selectedInstitute.name}</p>
//                   </div>
//                   <div>
//                     <span className="font-medium text-blue-800">Location:</span>
//                     <p className="text-blue-700">
//                       {selectedInstitute.city}, {selectedInstitute.state}
//                     </p>
//                   </div>
//                   <div>
//                     <span className="font-medium text-blue-800">
//                       Coordinates:
//                     </span>
//                     <p className="text-blue-700 font-mono text-xs">
//                       {selectedInstitute.coordinates[1].toFixed(4)}°N,{" "}
//                       {selectedInstitute.coordinates[0].toFixed(4)}°E
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Search Results (shows if searchTerm is present, usually highest priority) */}
//             {searchTerm && (
//               <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
//                 <h3 className="font-semibold text-gray-800 mb-3">
//                   Search Results ({filteredInstitutes.length})
//                   {/* Search Results (310) */}
//                 </h3>
//                 <div className="space-y-2 max-h-60 overflow-y-auto">
//                   {filteredInstitutes.map((institute, index) => (
//                     <div
//                       key={index}
//                       className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                       onClick={() => setSelectedInstitute(institute)}
//                     >
//                       <div className="font-medium text-sm text-gray-800">
//                         {institute.name}
//                       </div>
//                       <div className="text-xs text-gray-600">
//                         {institute.city}, {institute.state}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default IndianInstitutesMap;

// "use client";

// import React, { useState, useMemo } from "react";
// import { MapPin, Info, X, Divide } from "lucide-react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// import map from "../../public/map_img.png"

// interface Institute {
//   name: string;
//   city: string;
//   state: string;
//   coordinates: number[]; // Changed from [number, number] to number[]
// }
// interface StateInfo {
//   name: string;
//   coordinates: [number, number];
//   instituteCount: number;
// }

// const IndianInstitutesMap: React.FC = () => {
//   const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(
//     null
//   );
//   const [hoveredState, setHoveredState] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedState, setSelectedState] = useState<string | null>(null);
//   // 👇 NEW STATE ADDED: Controls the visibility of the full list
//   const [showAllInstitutes, setShowAllInstitutes] = useState(false);

//   // Institute data extracted from the PDF with approximate coordinates
//   const institutes = [
//     // Gujarat
//     {
//       name: "Indian Institute of Technology",
//       city: "Gandhinagar",
//       state: "Gujarat",
//       coordinates: [72.6369, 23.2156],
//     },
//     {
//       name: "Indian Institute of Management",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       coordinates: [72.5797, 23.0225],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Vadodara",
//       state: "Gujarat",
//       coordinates: [73.1812, 22.3072],
//     },
//     {
//       name: "Institute of Infrastructure Technology Research and Management",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       coordinates: [72.5797, 23.0225],
//     },
//     {
//       name: "Charotar University Of Science & Technology",
//       city: "Anand",
//       state: "Gujarat",
//       coordinates: [72.9289, 22.5645],
//     },
//     {
//       name: "Anant National University",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       coordinates: [72.5797, 23.0225],
//     },
//     {
//       name: "Veer Narmad South Gujarat University",
//       city: "Surat",
//       state: "Gujarat",
//       coordinates: [72.8311, 21.1702],
//     },

//     // Telangana
//     {
//       name: "Indian Institute Of Technology",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "University Of Hyderabad",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "Indian School Of Business",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "International Institute of Information Technology",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "Tata Institute of Fundamental Research",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "Computer Centre-Tata Institute of Fundamental Research",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "CSIR-Centre for Cellular and Molecular Biology",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },
//     {
//       name: "Osmania University",
//       city: "Hyderabad",
//       state: "Telangana",
//       coordinates: [78.4867, 17.385],
//     },

//     // Karnataka
//     {
//       name: "Indian Institute of Technology",
//       city: "Dharwad",
//       state: "Karnataka",
//       coordinates: [75.0178, 15.4589],
//     },
//     {
//       name: "Indian Institute of Management",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Indian Statistical Institute",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Tata Institute of Fundamental Research Centre for Applicable Mathematics",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "National Centre for Biological Sciences",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "ERNET Regional Center",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "ERNET Office",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Raman Research Institute",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "International Centre for Theoretical Sciences-Tata Institute of Fundamental Research Centre for Applicable Mathematics",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Computer Centre-International Centre for Theoretical Sciences-Tata Institute of Fundamental Research Centre for Applicable Mathematics",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Indian Institute Of Sciences",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Jawaharlal Nehru Centre for Advanced Scientific Research",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Computer Centre Jawaharlal Nehru Centre for Advanced Scientific Research",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Institute for Stem Cell Science and Regenerative Medicine",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Azim Premji University",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Indian Institute of Astrophysics",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "Manipal Academy of Higher Education",
//       city: "Manipal",
//       state: "Karnataka",
//       coordinates: [74.7787, 13.3467],
//     },
//     {
//       name: "International Institute Of Information Technology",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },
//     {
//       name: "National Institute of Advanced Studies",
//       city: "Bangalore",
//       state: "Karnataka",
//       coordinates: [77.5946, 12.9716],
//     },

//     // Tamil Nadu
//     {
//       name: "Indian Institute of Technology",
//       city: "Madras",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Conference hall, IIT",
//       city: "Madras",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Indian Institute of Information Technology, Design & Manufacturing",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "ERNET India",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "SRM University",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Computer Centre, SRM University",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Karunya Institute of Technology and Sciences",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "B.S. Abdur Rahman Crescent Institute of Science & Technology",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Agricultural College & Research Institute (AC&RI), Tamil Nadu Agricultural University",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "School of Post Graduate Studies (SPGS), Tamil Nadu Agricultural University",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "Agricultural Engineering College & Research Institute (AEC&RI)-Tamil Nadu Agricultural University",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "Horticultural College & Research Institute (HC&RI)-Tamil Nadu Agricultural University",
//       city: "Coimbatore",
//       state: "Tamil Nadu",
//       coordinates: [76.9558, 11.0168],
//     },
//     {
//       name: "The Institute Of Mathematical Sciences",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Thanjavur",
//       state: "Tamil Nadu",
//       coordinates: [79.1378, 10.787],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Pudukkottai",
//       state: "Tamil Nadu",
//       coordinates: [78.8209, 10.3833],
//     },
//     {
//       name: "Horticultural College and Research Institute for Women",
//       city: "Trichy",
//       state: "Tamil Nadu",
//       coordinates: [78.7047, 10.7905],
//     },
//     {
//       name: "Horticultural College and Research Institute",
//       city: "Theni",
//       state: "Tamil Nadu",
//       coordinates: [77.4977, 10.0104],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Madurai",
//       state: "Tamil Nadu",
//       coordinates: [78.1198, 9.9252],
//     },
//     {
//       name: "Home Science College and Research Institute",
//       city: "Madurai",
//       state: "Tamil Nadu",
//       coordinates: [78.1198, 9.9252],
//     },
//     {
//       name: "Agricultural Engineering College and Research Institute",
//       city: "Trichy",
//       state: "Tamil Nadu",
//       coordinates: [78.7047, 10.7905],
//     },
//     {
//       name: "Anbil Dharmalingam Agricultural College and Research Institute",
//       city: "Trichy",
//       state: "Tamil Nadu",
//       coordinates: [78.7047, 10.7905],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Tirunelveli",
//       state: "Tamil Nadu",
//       coordinates: [77.6933, 8.7139],
//     },
//     {
//       name: "Agricultural College and Research Institute",
//       city: "Thiruvannamalai",
//       state: "Tamil Nadu",
//       coordinates: [79.0747, 12.2253],
//     },
//     {
//       name: "Forest College and Research Institute",
//       city: "Mettupalayam",
//       state: "Tamil Nadu",
//       coordinates: [76.937, 11.3019],
//     },
//     {
//       name: "Madras Veterinary College",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Veterinary College and Research Institute",
//       city: "Namakkal",
//       state: "Tamil Nadu",
//       coordinates: [78.1674, 11.2189],
//     },
//     {
//       name: "Veterinary College and Research Institute",
//       city: "Orathanadu",
//       state: "Tamil Nadu",
//       coordinates: [79.2833, 10.65],
//     },
//     {
//       name: "Veterinary College and Research Institute",
//       city: "Tirunelveli",
//       state: "Tamil Nadu",
//       coordinates: [77.6933, 8.7139],
//     },
//     {
//       name: "College of Food and Dairy Technology",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Veterinary College and Research Institute",
//       city: "Salem",
//       state: "Tamil Nadu",
//       coordinates: [78.146, 11.6643],
//     },
//     {
//       name: "Chennai Mathematical Institute",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Loyola-ICAM College of Engineering and Technology",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Tamil Nadu Veterinary and Animal Sciences University",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "Crescent Institute of Science & Technology",
//       city: "Chennai",
//       state: "Tamil Nadu",
//       coordinates: [80.2707, 13.0827],
//     },
//     {
//       name: "College of Poultry Production and Management",
//       city: "Hosur",
//       state: "Tamil Nadu",
//       coordinates: [77.825, 12.1265],
//     },

//     // Uttar Pradesh
//     {
//       name: "Shiv Nadar University",
//       city: "Greater Noida",
//       state: "Uttar Pradesh",
//       coordinates: [77.534, 28.4744],
//     },
//     {
//       name: "Indian Institute Of Technology",
//       city: "Kanpur",
//       state: "Uttar Pradesh",
//       coordinates: [80.3319, 26.4499],
//     },
//     {
//       name: "Indian Institute Of Management",
//       city: "Lucknow",
//       state: "Uttar Pradesh",
//       coordinates: [80.9462, 26.8467],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Noida",
//       state: "Uttar Pradesh",
//       coordinates: [77.391, 28.5355],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Allahabad",
//       state: "Uttar Pradesh",
//       coordinates: [81.8463, 25.4358],
//     },
//     {
//       name: "Main Campus, Banaras Hindu University",
//       city: "Varanasi",
//       state: "Uttar Pradesh",
//       coordinates: [83.0193, 25.2677],
//     },
//     {
//       name: "Institute of Agricultural Science, Banaras Hindu University",
//       city: "Varanasi",
//       state: "Uttar Pradesh",
//       coordinates: [83.0193, 25.2677],
//     },
//     {
//       name: "Institute of Medical Sciences, Banaras Hindu University",
//       city: "Varanasi",
//       state: "Uttar Pradesh",
//       coordinates: [83.0193, 25.2677],
//     },
//     {
//       name: "Allahabad University",
//       city: "Allahabad",
//       state: "Uttar Pradesh",
//       coordinates: [81.8463, 25.4358],
//     },
//     {
//       name: "Galgotias University",
//       city: "Greater Noida",
//       state: "Uttar Pradesh",
//       coordinates: [77.534, 28.4744],
//     },
//     {
//       name: "Harish Chandra Research Institute",
//       city: "Allahabad",
//       state: "Uttar Pradesh",
//       coordinates: [81.8463, 25.4358],
//     },
//     {
//       name: "Babasaheb Bhimrao Ambedkar University",
//       city: "Lucknow",
//       state: "Uttar Pradesh",
//       coordinates: [80.9462, 26.8467],
//     },
//     {
//       name: "Centre of Bio-Medical Research (CBMR)",
//       city: "Lucknow",
//       state: "Uttar Pradesh",
//       coordinates: [80.9462, 26.8467],
//     },
//     {
//       name: "Jagatpur PG College",
//       city: "Banaras",
//       state: "Uttar Pradesh",
//       coordinates: [83.0193, 25.2677],
//     },
//     {
//       name: "Motilal Nehru National Institute of Technology",
//       city: "Allahabad",
//       state: "Uttar Pradesh",
//       coordinates: [81.8463, 25.4358],
//     },
//     {
//       name: "IEC College",
//       city: "Greater Noida",
//       state: "Uttar Pradesh",
//       coordinates: [77.534, 28.4744],
//     },

//     // Punjab
//     {
//       name: "Indian Institute of Technology",
//       city: "Ropar",
//       state: "Punjab",
//       coordinates: [76.5127, 30.9697],
//     },
//     {
//       name: "Central University of Punjab",
//       city: "Bathinda",
//       state: "Punjab",
//       coordinates: [74.9455, 30.2118],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Mohali",
//       state: "Punjab",
//       coordinates: [76.7294, 30.6638],
//     },
//     {
//       name: "Government Medical College",
//       city: "Amritsar",
//       state: "Punjab",
//       coordinates: [74.8723, 31.634],
//     },
//     {
//       name: "Guru Govind Singh Medical College and Hospital",
//       city: "Faridkot",
//       state: "Punjab",
//       coordinates: [74.7553, 30.6712],
//     },
//     {
//       name: "Guru Nanak Dev Engineering College",
//       city: "Ludhiana",
//       state: "Punjab",
//       coordinates: [75.8573, 30.901],
//     },
//     {
//       name: "Chitkara University",
//       city: "Rajpura",
//       state: "Punjab",
//       coordinates: [76.5994, 30.481],
//     },
//     {
//       name: "Plaksha University",
//       city: "Mohali",
//       state: "Punjab",
//       coordinates: [76.7294, 30.6638],
//     },

//     // Chandigarh
//     {
//       name: "Postgraduate Institute of Medical Education and Research",
//       city: "Chandigarh",
//       state: "Chandigarh",
//       coordinates: [76.7794, 30.7333],
//     },

//     // Kerala
//     {
//       name: "Indian Institute of Technology",
//       city: "Palakkad",
//       state: "Kerala",
//       coordinates: [76.6413, 10.7867],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Thiruvananthapuram",
//       state: "Kerala",
//       coordinates: [76.9366, 8.5241],
//     },
//     {
//       name: "Amal Jyothi College of Engineering",
//       city: "Kanjirappally",
//       state: "Kerala",
//       coordinates: [76.7783, 9.5648],
//     },
//     {
//       name: "KMEA Engineering College",
//       city: "Aluva",
//       state: "Kerala",
//       coordinates: [76.3463, 10.1085],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Calicut",
//       state: "Kerala",
//       coordinates: [75.7804, 11.2588],
//     },

//     // Assam
//     {
//       name: "Indian Institute Of Technology",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },
//     {
//       name: "Assam Don Bosco University",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },
//     {
//       name: "Guwahati Medical College",
//       city: "Guwahati",
//       state: "Assam",
//       coordinates: [91.7362, 26.1445],
//     },

//     // Chhattisgarh
//     {
//       name: "Indian Institute Of Management",
//       city: "Raipur",
//       state: "Chhattisgarh",
//       coordinates: [81.6296, 21.2514],
//     },
//     {
//       name: "All India Institute of Medical Sciences",
//       city: "Raipur",
//       state: "Chhattisgarh",
//       coordinates: [81.6296, 21.2514],
//     },
//     {
//       name: "Guru Ghasidas Vishwavidyalaya",
//       city: "Bilaspur",
//       state: " Chhattisgarh",
//       coordinates: [82.1409, 22.0797],
//     },
//     {
//       name: "Shri Shankaracharya Institute of Professional Management and Technology",
//       city: "Raipur",
//       state: "Chhattisgarh",
//       coordinates: [81.6296, 21.2514],
//     },

//     // Haryana
//     {
//       name: "Indian Institute Of Management",
//       city: "Rohtak",
//       state: "Haryana",
//       coordinates: [76.6066, 28.8955],
//     },
//     {
//       name: "Central University of Haryana",
//       city: "Mahendragarh",
//       state: "Haryana",
//       coordinates: [76.1441, 28.242],
//     },
//     {
//       name: "K.R. Mangalam University",
//       city: "Gurgaon",
//       state: "Haryana",
//       coordinates: [77.0266, 28.4595],
//     },
//     {
//       name: "THE NORTHCAP UNIVERSITY",
//       city: "Gurgaon",
//       state: "Haryana",
//       coordinates: [77.0266, 28.4595],
//     },
//     {
//       name: "Maharshi Dayanand University",
//       city: "Rohtak",
//       state: "Haryana",
//       coordinates: [76.6066, 28.8955],
//     },
//     {
//       name: "Ashoka University",
//       city: "Sonipat",
//       state: "Haryana",
//       coordinates: [77.0178, 28.9931],
//     },
//     {
//       name: "Chaudhary Ranbir Singh University",
//       city: "Jind",
//       state: "Haryana",
//       coordinates: [76.3148, 29.3158],
//     },
//     {
//       name: "BPS Mahila Vishwavidyalaya Khanpur Kalan",
//       city: "Sonepat",
//       state: "Haryana",
//       coordinates: [77.0178, 28.9931],
//     },
//     {
//       name: "Translational Health Science and Technology Institute",
//       city: "Faridabad",
//       state: "Haryana",
//       coordinates: [77.3178, 28.4089],
//     },
//     {
//       name: "Regional Centre for Biotechnology",
//       city: "Faridabad",
//       state: "Haryana",
//       coordinates: [77.3178, 28.4089],
//     },
//     {
//       name: "Deenbandhu Chhotu Ram University of Science and Technology",
//       city: "Murthal",
//       state: "Haryana",
//       coordinates: [76.9, 29.0333],
//     },
//     {
//       name: "South Point Group of Institutions",
//       city: "Sonepat",
//       state: "Haryana",
//       coordinates: [77.0178, 28.9931],
//     },
//     {
//       name: "School of Engineering and Technology, K.R. Mangalam University",
//       city: "Gurgaon",
//       state: "Haryana",
//       coordinates: [77.0266, 28.4595],
//     },
//     {
//       name: "Management Development Institute",
//       city: "Gurgaon",
//       state: "Haryana",
//       coordinates: [77.0266, 28.4595],
//     },
//     {
//       name: "National Brain Research Center",
//       city: "Manesar",
//       state: "Haryana",
//       coordinates: [76.9313, 28.367],
//     },

//     // Odisha
//     {
//       name: "Indian Institute Of Technology",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },
//     {
//       name: "National Institute Of Technology",
//       city: "Rourkela",
//       state: "Odisha",
//       coordinates: [84.8536, 22.2574],
//     },
//     {
//       name: "Centurion University of Technology and Management",
//       city: "Paralakhemundi",
//       state: "Odisha",
//       coordinates: [84.0877, 18.7831],
//     },
//     {
//       name: "National Institute of Science Education and Research (NISER)",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },
//     {
//       name: "Centurion University",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },
//     {
//       name: "Institute of Physics",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },
//     {
//       name: "Utkal University",
//       city: "Bhubaneswar",
//       state: "Odisha",
//       coordinates: [85.8245, 20.2961],
//     },

//     // Rajasthan
//     {
//       name: "Indian Institute of Technology",
//       city: "Jodhpur",
//       state: "Rajasthan",
//       coordinates: [73.0243, 26.2389],
//     },
//     {
//       name: "All India Institute of Medical Sciences",
//       city: "Jodhpur",
//       state: "Rajasthan",
//       coordinates: [73.0243, 26.2389],
//     },
//     {
//       name: "Birla Institute of Technology and Science",
//       city: "Pilani",
//       state: "Rajasthan",
//       coordinates: [75.6033, 28.367],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Jaipur",
//       state: "Rajasthan",
//       coordinates: [75.7873, 26.9124],
//     },
//     {
//       name: "Malaviya National Institute of Technology",
//       city: "Jaipur",
//       state: "Rajasthan",
//       coordinates: [75.7873, 26.9124],
//     },
//     {
//       name: "Government Women Engineering College",
//       city: "Ajmer",
//       state: "Rajasthan",
//       coordinates: [74.6399, 26.4499],
//     },
//     {
//       name: "Rajasthan Technical University",
//       city: "Kota",
//       state: "Rajasthan",
//       coordinates: [75.8648, 25.2138],
//     },
//     {
//       name: "Sir Padampat Singhania University",
//       city: "Udaipur",
//       state: "Rajasthan",
//       coordinates: [73.7125, 24.5854],
//     },

//     // Meghalaya
//     {
//       name: "North Eastern Hill University",
//       city: "Shillong",
//       state: "Meghalaya",
//       coordinates: [91.8933, 25.5788],
//     },

//     // Tripura
//     {
//       name: "National Institute of Technology",
//       city: "Agartala",
//       state: "Tripura",
//       coordinates: [91.2868, 23.8315],
//     },

//     // Jammu and Kashmir
//     {
//       name: "Indian Institute of Technology",
//       city: "Jammu",
//       state: "Jammu and Kashmir",
//       coordinates: [74.857, 32.7266],
//     },
//     {
//       name: "University of Jammu",
//       city: "Jammu",
//       state: "Jammu and Kashmir",
//       coordinates: [74.857, 32.7266],
//     },

//     // Manipur
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Manipur",
//       state: "Manipur",
//       coordinates: [93.9063, 24.6637],
//     },
//     {
//       name: "Manipur University",
//       city: "Imphal",
//       state: "Manipur",
//       coordinates: [93.9063, 24.817],
//     },
//     {
//       name: "D.M. College of Commerce",
//       city: "Imphal",
//       state: "Manipur",
//       coordinates: [93.9063, 24.817],
//     },
//     {
//       name: "G.P. Women's College",
//       city: "Imphal",
//       state: "Manipur",
//       coordinates: [93.9063, 24.817],
//     },

//     // Sikkim
//     {
//       name: "Sikkim Manipal University",
//       city: "Gangtok",
//       state: "Sikkim",
//       coordinates: [88.6138, 27.3389],
//     },

//     // Jharkhand
//     {
//       name: "All India Institute of Medical Sciences (AIIMS)",
//       city: "Deoghar",
//       state: "Jharkhand",
//       coordinates: [86.6956, 24.4921],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Lalpur",
//       state: "Jharkhand",
//       coordinates: [85.324, 23.3441],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Deoghar",
//       state: "Jharkhand",
//       coordinates: [86.6956, 24.4921],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Ranchi",
//       state: "Jharkhand",
//       coordinates: [85.324, 23.3441],
//     },
//     {
//       name: "Indian School of Mines",
//       city: "Dhanbad",
//       state: "Jharkhand",
//       coordinates: [86.4304, 23.7957],
//     },
//     {
//       name: "Rajendra Institute of Medical Sciences",
//       city: "Ranchi",
//       state: "Jharkhand",
//       coordinates: [85.324, 23.3441],
//     },

//     // West Bengal
//     {
//       name: "Indian Institute of Technology",
//       city: "Kharagpur",
//       state: "West Bengal",
//       coordinates: [87.3119, 22.346],
//     },
//     {
//       name: "Indian Institute of Management",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Indian Statistical Institute",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Durgapur",
//       state: "West Bengal",
//       coordinates: [87.3119, 23.5204],
//     },
//     {
//       name: "Variable Energy Cyclotron Center",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "National Institute of Electronics & Information Technology (NIELIT)",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Jalpaiguri Govt. Engineering College",
//       city: "Jalpaiguri",
//       state: "West Bengal",
//       coordinates: [88.7267, 26.5465],
//     },
//     {
//       name: "Institute Of Genetic Engineering",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Neotia Institute of Technology",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },
//     {
//       name: "Indian Association for the Cultivation of Science",
//       city: "Kolkata",
//       state: "West Bengal",
//       coordinates: [88.3639, 22.5726],
//     },

//     // Maharashtra
//     {
//       name: "Indian Institute Of Technology",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Pune",
//       state: "Maharashtra",
//       coordinates: [73.8567, 18.5204],
//     },
//     {
//       name: "National Institute Of Immunology",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "The Inter-University Centre for Astronomy and Astrophysics",
//       city: "Pune",
//       state: "Maharashtra",
//       coordinates: [73.8567, 18.5204],
//     },
//     {
//       name: "Tata Institute of Fundamental Research (TIFR)",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Savitribai Phule Pune University",
//       city: "Pune",
//       state: "Maharashtra",
//       coordinates: [73.8567, 18.5204],
//     },
//     {
//       name: "Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya",
//       city: "Wardha",
//       state: "Maharashtra",
//       coordinates: [78.5977, 20.7391],
//     },
//     // {
//     //   name: "King Edwards Memorial Hospital",
//     //   city: "Mumbai",
//     //   state: "Maharashtra",
//     //   coordinates: [72.8777, 19.076],
//     // },
//     {
//       name: "Homi Bhabha Centre for Science Education-Tata Institute of Fundamental Research (TIFR)",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "National Centre for Radio Astrophysics- Tata Institute of Fundamental Research (TIFR)",
//       city: "Pune",
//       state: "Maharashtra",
//       coordinates: [73.8567, 18.5204],
//     },
//     {
//       name: "Lokmanya Tilak Municipal Medical College",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Dept. of Biological Sciences at Tata Institute of Fundamental Research",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },
//     {
//       name: "Veermata Jijabai Technological Institute",
//       city: "Mumbai",
//       state: "Maharashtra",
//       coordinates: [72.8777, 19.076],
//     },

//     // Himachal Pradesh
//     {
//       name: "Indian Institute of Technology",
//       city: "Mandi",
//       state: "Himachal Pradesh",
//       coordinates: [76.9366, 31.7076],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Hamirpur",
//       state: "Himachal Pradesh",
//       coordinates: [76.5222, 31.684],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Una",
//       state: "Himachal Pradesh",
//       coordinates: [76.2673, 31.4649],
//     },
//     {
//       name: "Himachal Pradesh University",
//       city: "Shimla",
//       state: "Himachal Pradesh",
//       coordinates: [77.1025, 31.0588],
//     },
//     {
//       name: "Chitkara University",
//       city: "Solan",
//       state: "Himachal Pradesh",
//       coordinates: [77.0999, 30.9045],
//     },

//     // Bihar
//     {
//       name: "Indian Institute of Technology",
//       city: "Patna",
//       state: "Bihar",
//       coordinates: [85.1376, 25.5941],
//     },
//     {
//       name: "Computer Centre - Indian Institute of Technology Patna",
//       city: "Patna",
//       state: "Bihar",
//       coordinates: [85.1376, 25.5941],
//     },
//     {
//       name: "All India Institute Of Medical Sciences Patna",
//       city: "Patna",
//       state: "Bihar",
//       coordinates: [85.1376, 25.5941],
//     },
//     {
//       name: "Birla Institute Of Technology Mesra",
//       city: "Patna",
//       state: "Bihar",
//       coordinates: [85.1376, 25.5941],
//     },
//     {
//       name: "Darbhanga Medical College",
//       city: "Darbhanga",
//       state: "Bihar",
//       coordinates: [85.8918, 26.1542],
//     },

//     // Uttarakhand
//     {
//       name: "Indian Institute of Technology",
//       city: "Roorkee",
//       state: "Uttarakhand",
//       coordinates: [77.8875, 29.8543],
//     },
//     {
//       name: "Indian Institute Of Management",
//       city: "Kashipur",
//       state: "Uttarakhand",
//       coordinates: [78.9629, 29.2084],
//     },
//     {
//       name: "Computer Centre - University of Petroleum & Energy Studies",
//       city: "Dehradun",
//       state: "Uttarakhand",
//       coordinates: [78.0322, 30.3165],
//     },
//     {
//       name: "All India Institute of Medical Sciences",
//       city: "Rishikesh",
//       state: "Uttarakhand",
//       coordinates: [78.2676, 30.0869],
//     },
//     {
//       name: "University of Petroleum & Energy Studies",
//       city: "Dehradun",
//       state: "Uttarakhand",
//       coordinates: [78.0322, 30.3165],
//     },

//     // Madhya Pradesh
//     {
//       name: "Indian Institute of Technology",
//       city: "Indore",
//       state: "Madhya Pradesh",
//       coordinates: [75.8577, 22.5726],
//     },
//     {
//       name: "Indian Institute of Information Technology, Design and Manufacturing",
//       city: "Jabalpur",
//       state: "Madhya Pradesh",
//       coordinates: [79.9864, 23.1815],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Bhopal",
//       state: "Madhya Pradesh",
//       coordinates: [77.4126, 23.2599],
//     },
//     {
//       name: "Maulana Azad National Institute of Technology",
//       city: "Bhopal",
//       state: "Madhya Pradesh",
//       coordinates: [77.4126, 23.2599],
//     },
//     {
//       name: "Indira Gandhi National Tribal University",
//       city: "Amarkantak",
//       state: "Madhya Pradesh",
//       coordinates: [81.7473, 22.6708],
//     },
//     {
//       name: "National Institute of Technical Teacher's Training and Research",
//       city: "Bhopal",
//       state: "Madhya Pradesh",
//       coordinates: [77.4126, 23.2599],
//     },
//     {
//       name: "Jagran Lakecity University",
//       city: "Bhopal",
//       state: "Madhya Pradesh",
//       coordinates: [77.4126, 23.2599],
//     },
//     {
//       name: "Shri G.S. Institute of Technology and Science",
//       city: "Indore",
//       state: "Madhya Pradesh",
//       coordinates: [75.8577, 22.5726],
//     },

//     // Andhra Pradesh
//     {
//       name: "Indian Institute of Technology",
//       city: "Tirupati",
//       state: "Andhra Pradesh",
//       coordinates: [79.4192, 13.6288],
//     },
//     {
//       name: "Indian Institute of Information Technology",
//       city: "Sri City",
//       state: "Andhra Pradesh",
//       coordinates: [79.7036, 13.5933],
//     },
//     {
//       name: "Indian Institute of Science Education and Research",
//       city: "Tirupati",
//       state: "Andhra Pradesh",
//       coordinates: [79.4192, 13.6288],
//     },
//     {
//       name: "Computer Centre - Indian Institute of Science Education and Research",
//       city: "Tirupati",
//       state: "Andhra Pradesh",
//       coordinates: [79.4192, 13.6288],
//     },
//     {
//       name: "SVEC – Sree Vidyanikethan Engineering College",
//       city: "Tirupati",
//       state: "Andhra Pradesh",
//       coordinates: [79.4192, 13.6288],
//     },

//     // Goa
//     {
//       name: "Indian Institute of Technology",
//       city: "Goa",
//       state: "Goa",
//       coordinates: [74.124, 15.2993],
//     },

//     // Delhi
//     {
//       name: "Indian Institute of Technology",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "National Institute of Technology",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "National Institute Of Pathology",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "International Centre For Genetic Engineering And Biotechnology",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indian National Science Academy",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "IEC College",
//       city: "Greater Kailash",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Delhi Technological University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "National Institute of Electronics & Information Technology (NIELIT)",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Institute of Home Economics",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ambedkar University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indraprastha Institute of Information Technology",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "ERNET India",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Jawaharlal Nehru University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Guru Gobind Singh Indraprastha University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "South Asian University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Delhi University",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Jamia Hamdard University",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Vivekananda College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shaheed Sukhdev College of Business Studies",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ahilya Bai College Of Nursing",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indraprastha College For Women",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Acharya Narendra Dev College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Aditi Mahavidyalaya",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Lady Shri Ram College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Aryabhatta College (Ram Lal College evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Lakshmibai College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Atma Ram Sanatan Dharma College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Maharaja Agrasen College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bhagini Nivedita College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Maharshe Valmiki College of Education",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Maitreyi College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bhaskaracharya College of Applied Sciences",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Mata Sundri College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bhim Rao Ambedkar College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Miranda House",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "College of Vocational Studies",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Moti Lal Nehru College (Morning)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Daulat Ram College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Motilal Nehru College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Deen Dayal Upadhayaya College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Pannalal Girdharlal Dayanand Anglo-Vedic College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Delhi College of Arts & Commerce",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Pannalal Girdharlal Dayanand Anglo-Vedic College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Deshbandhu College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Rajdhani College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Dyal Singh College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ram Lal Anand College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Dyal Singh College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ramanujan College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Gargi College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bharati College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Ramjas College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Hans Raj College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Satyawati College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Hindu College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Satyawati College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indira Gandhi Institute of Physical Education & Sports Sciences",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shaheed Bhagat Singh College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indraprastha College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shaheed Bhagat Singh College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shaheed Rajguru College of Applied Sciences",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Janki Devi Memorial College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Jesus and Mary College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shivaji College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Kalindi College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shri Ram College of Commerce",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Kamla Nehru College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shyam Lal College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Keshav Mahavidyalaya",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shyam Lal College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Kirori Mal College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shyama Prasad Mukherjee College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Lady Irwin College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Sri Aurobindo College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Sri Aurobindo College (Evening)",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Swami Shradhanand College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Sri Guru Gobind Singh College of Commerce",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "St. Stephen's College",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     // {
//     //   name: "43rd APAN INDIA",
//     //   city: "New Delhi",
//     //   state: "Delhi",
//     //   coordinates: [77.1025, 28.7041],
//     // },
//     {
//       name: "National Knowledge Network",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Computer Centre North Campus, Delhi University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Indian Statistical Institute",
//       city: "New Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Bhai Parmanand Institute Of Business Studies",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//     {
//       name: "Shri Lal Bahadur Shastri Sanskrit University",
//       city: "Delhi",
//       state: "Delhi",
//       coordinates: [77.1025, 28.7041],
//     },
//   ];

//   // State-wise grouping
//   const stateData = useMemo(() => {
//     const states: { [key: string]: StateInfo } = {
//       Gujarat: {
//         name: "Gujarat",
//         coordinates: [72.0, 23.0],
//         instituteCount: 0,
//       },
//       Karnataka: {
//         name: "Karnataka",
//         coordinates: [76.0, 13.0],
//         instituteCount: 0,
//       },
//       "Tamil Nadu": {
//         name: "Tamil Nadu",
//         coordinates: [78.0, 11.0],
//         instituteCount: 0,
//       },
//       Telangana: {
//         name: "Telangana",
//         coordinates: [79.0, 18.0],
//         instituteCount: 0,
//       },
//       Delhi: { name: "Delhi", coordinates: [77.2, 28.6], instituteCount: 0 },
//       Maharashtra: {
//         name: "Maharashtra",
//         coordinates: [75.0, 19.0],
//         instituteCount: 0,
//       },
//       "West Bengal": {
//         name: "West Bengal",
//         coordinates: [88.0, 22.5],
//         instituteCount: 0,
//       },
//       "Uttar Pradesh": {
//         name: "Uttar Pradesh",
//         coordinates: [81.0, 26.8],
//         instituteCount: 0,
//       },
//       Punjab: { name: "Punjab", coordinates: [76.0, 31.0], instituteCount: 0 },
//       Assam: { name: "Assam", coordinates: [92.0, 26.2], instituteCount: 0 },
//       Odisha: { name: "Odisha", coordinates: [85.0, 20.5], instituteCount: 0 },
//       Rajasthan: {
//         name: "Rajasthan",
//         coordinates: [74.0, 27.0],
//         instituteCount: 0,
//       },
//       "Himachal Pradesh": {
//         name: "Himachal Pradesh",
//         coordinates: [77.0, 31.1],
//         instituteCount: 0,
//       },
//       Bihar: { name: "Bihar", coordinates: [85.0, 25.0], instituteCount: 0 },
//       Uttarakhand: {
//         name: "Uttarakhand",
//         coordinates: [79.0, 30.0],
//         instituteCount: 0,
//       },
//       "Madhya Pradesh": {
//         name: "Madhya Pradesh",
//         coordinates: [78.0, 23.0],
//         instituteCount: 0,
//       },
//       Kerala: { name: "Kerala", coordinates: [76.0, 10.0], instituteCount: 0 },
//       "Andhra Pradesh": {
//         name: "Andhra Pradesh",
//         coordinates: [79.0, 15.0],
//         instituteCount: 0,
//       },
//       Goa: { name: "Goa", coordinates: [74.0, 15.4], instituteCount: 0 },
//       Haryana: {
//         name: "Haryana",
//         coordinates: [76.0, 29.0],
//         instituteCount: 0,
//       },
//       Chhattisgarh: {
//         name: "Chhattisgarh",
//         coordinates: [82.0, 21.0],
//         instituteCount: 0,
//       },
//       Jharkhand: {
//         name: "Jharkhand",
//         coordinates: [85.0, 23.6],
//         instituteCount: 0,
//       },
//       Tripura: {
//         name: "Tripura",
//         coordinates: [91.9, 23.9],
//         instituteCount: 0,
//       },
//       "Jammu and Kashmir": {
//         name: "Jammu and Kashmir",
//         coordinates: [76.0, 34.0],
//         instituteCount: 0,
//       },
//       Manipur: {
//         name: "Manipur",
//         coordinates: [93.9, 24.6],
//         instituteCount: 0,
//       },
//       Meghalaya: {
//         name: "Meghalaya",
//         coordinates: [91.3, 25.5],
//         instituteCount: 0,
//       },
//       Sikkim: { name: "Sikkim", coordinates: [88.5, 27.5], instituteCount: 0 },
//     };

//     institutes.forEach((institute) => {
//       if (states[institute.state]) {
//         states[institute.state].instituteCount++;
//       }
//     });

//     return states;
//   }, [institutes]);

//   // Filter institutes based on search
//   const filteredInstitutes = useMemo(() => {
//     if (!searchTerm) return institutes;
//     return institutes.filter(
//       (institute) =>
//         institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         institute.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         institute.state.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [institutes, searchTerm]);

//   const getStateColor = (stateName: string) => {
//     const count = stateData[stateName]?.instituteCount || 0;
//     if (count === 0) return "#f3f4f6";
//     if (count <= 5) return "#dbeafe";
//     if (count <= 15) return "#93c5fd";
//     if (count <= 30) return "#3b82f6";
//     return "#1d4ed8";
//   };

//   const svgWidth = 800;
//   const svgHeight = 600;

//   // Simple India outline (simplified for demo)
//   const indiaPath = "/indiaMap.json";

//   const handleTotalInstitutesClick = () => {
//     setShowAllInstitutes(true);
//     setSelectedState(null);
//   };

//   const handleStatesCoveredClick = () => {
//     setShowAllInstitutes(false);
//     setSelectedState(null);
//     setSearchTerm("");
//   };

//   // Excel download function
//   // const downloadExcel = () => {
//   //   const data = institutes.map((inst) => ({
//   //     Name: inst.name,
//   //     City: inst.city,
//   //     State: inst.state,
//   //     Latitude: inst.coordinates[1],
//   //     Longitude: inst.coordinates[0],
//   //   }));

//   //   const ws = XLSX.utils.json_to_sheet(data);
//   //   const wb = XLSX.utils.book_new();
//   //   XLSX.utils.book_append_sheet(wb, ws, "Universities");
//   //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   //   const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//   //   saveAs(blob, "Indian_Universities.xlsx");
//   // };

// const downloadExcel = () => {
//   const link = document.createElement("a");
//   link.style.display = "none";
//   link.href = "/Eduroam_indian_universities_.csv"; // directly from public folder
//   link.setAttribute("download", "Indian_Universities.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

//   return (
//     <>
//       <Navbar />
//       {/* Main container with full width */}
//       <div className="w-full p-6 bg-white">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             Indian Educational Institutes Map
//           </h1>
//           <p className="text-gray-600 mb-4">
//             {/* Interactive map showing {institutes.length} educational institutes */}
//             Interactive map showing {310} educational institutes
//             across India
//           </p>

//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <input
//               type="text"
//               placeholder="Search institutes, cities, or states..."
//               className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             {/* MODIFIED: Made Total Institutes clickable */}
//             <div
//               className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
//               onClick={handleTotalInstitutesClick}
//             >
//               <div className="text-2xl font-bold text-blue-600">
//                 {/* {institutes.length} */}
//                 310
//               </div>
//               <div className="text-sm text-gray-600">Total Institutes</div>
//             </div>
//             {/* <div className="bg-green-50 p-3 rounded-lg">
//                 <div className="text-2xl font-bold text-green-600">
//                   {
//                     Object.keys(stateData).filter(
//                       (state) => stateData[state].instituteCount > 0
//                     ).length
//                   }
//                 </div>
//                 <div className="text-sm text-gray-600">States Covered</div>
//               </div> */}
//             <div
//               className="bg-green-50 p-3 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
//               onClick={handleStatesCoveredClick}
//             >
//               <div className="text-2xl font-bold text-green-600">
//                 {
//                   Object.keys(stateData).filter(
//                     (state) => stateData[state].instituteCount > 0
//                   ).length
//                 }
//               </div>
//               <div className="text-sm text-gray-600">States Covered</div>
//             </div>
//             <div className="bg-purple-50 p-3 rounded-lg">
//               <div className="text-2xl font-bold text-purple-600">
//                 {Math.max(
//                   ...Object.values(stateData).map((s) => s.instituteCount)
//                 )}
//               </div>
//               <div className="text-sm text-gray-600">Max per State</div>
//             </div>
//             <div className="bg-orange-50 p-3 rounded-lg">
//               <div className="text-2xl font-bold text-orange-600">
//                 {/* {filteredInstitutes.length} */}
//                 310
//               </div>
//               <div className="text-sm text-gray-600">Filtered Results</div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Map */}
//           <div className="container flex-1">
//             <div className="relative w-full h-[580px] overflow-hidden rounded-xl shadow-lg border-2 border-gray-400 ">
//               <iframe
//                 src="https://www.google.com/maps/d/u/0/embed?mid=1TxT6YENQMerQjWXqldlz2ywTz6MaquI&ehbc=2E312F&ll=30.5937,78.9629&z=5"
//                 className="w-full h-[660px] -mt-20 border-0"
//               ></iframe>
//               {/* <img src={map} alt="Map" /> */}
//             </div>

//             <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
//               {/* Left side: Legend items */}
//               <div className="flex flex-wrap gap-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white"></div>
//                   <span>Institute Location</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin className="w-4 h-4 text-blue-600" />
//                   <span>Click marker for details</span>
//                 </div>
//               </div>

//               {/* Right side: Download Button */}
//               <button
//                 onClick={downloadExcel}
//                 className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
//               >
//                 Download Universities List
//               </button>
//             </div>

//           </div>
//           {/* Side Panel */}
//           <div className="lg:w-80 flex-shrink-0">

//             {/* 👇 NEW ALL INSTITUTES LIST POPUP/PANEL (Highest Priority) */}
//             {showAllInstitutes && !searchTerm && (
//               <div className="bg-white border border-gray-400 rounded-lg p-4 mb-4 h-[568px]">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-semibold text-black-800 flex items-center gap-2">
//                     {/* <Info className="w-4 h-4" /> */}
//                     {/* All Institutes List ({institutes.length}) */}
//                     All Institutes List ({310})
//                   </h3>
//                   <button
//                     onClick={() => setShowAllInstitutes(false)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="space-y-2 max-h-[500px] overflow-y-auto">
//                   {/* Render ALL Institutes here */}
//                   {/* {institutes.map((inst, index) => (
//                     <div
//                       key={index}
//                       className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                       onClick={() => {
//                         setSelectedInstitute(inst);
//                         setShowAllInstitutes(false); // Close the list upon selection
//                       }}
//                     >
//                       <div className="font-medium text-sm text-gray-800">{inst.name}</div>
//                       <div className="text-xs text-gray-600">
//                         {inst.city}, {inst.state}
//                       </div>
//                     </div>
//                   ))} */}
//                   {institutes
//                     .slice() // 1. Create a shallow copy of the array
//                     .sort((a, b) => a.name.localeCompare(b.name)) // 2. Sort the copy alphabetically by name
//                     .map((inst, index) => (
//                       <div
//                         key={index}
//                         className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                         onClick={() => {
//                           setSelectedInstitute(inst);
//                           setShowAllInstitutes(false); // Close the list upon selection
//                         }}
//                       >
//                         <div className="font-medium text-sm text-gray-800">{inst.name}</div>
//                         <div className="text-xs text-gray-600">
//                           {inst.city}, {inst.state}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Existing State Statistics: Only show if NO full list is active AND NO state is selected AND NO search term */}
//             {!showAllInstitutes && !selectedState && !searchTerm && (
//               <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 h-[580px]">
//                 <h3 className="font-semibold text-black-800 mb-3 flex items-center gap-2">
//                   {/* <Info className="w-4 h-8" /> */}
//                   State-wise Distribution
//                 </h3>
//                 <div className="space-y-2 max-h-130 overflow-y-auto">
//                   {/* {Object.values(stateData)
//                     .filter((state) => state.instituteCount > 0)
//                     .sort((a, b) => b.instituteCount - a.instituteCount)
//                     .map((state, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                         onClick={() => setSelectedState(state.name)}
//                       >
//                         <span className="text-sm font-medium">{state.name}</span>
//                         <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
//                           {state.instituteCount}
//                         </span>
//                       </div>
//                     ))} */}
//                   {Object.values(stateData)
//                     .filter((state) => state.instituteCount > 0)
//                     // MODIFICATION: Sort alphabetically by state name
//                     .sort((a, b) => a.name.localeCompare(b.name))
//                     .map((state, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                         onClick={() => setSelectedState(state.name)}
//                       >
//                         <span className="text-sm font-medium">{state.name}</span>
//                         <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
//                           {state.instituteCount}
//                         </span>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Universities for Selected State: Only shows if selectedState is active */}
//             {selectedState && (
//               <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4 h-[550px]">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-semibold text-black-800">
//                     Universities in {selectedState}
//                   </h3>
//                   <button
//                     onClick={() => setSelectedState(null)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="space-y-2 max-h-120 overflow-y-auto">
//                   {/* {institutes
//                     .filter((inst) => inst.state === selectedState)
//                     .map((inst, index) => (
//                       <div
//                         key={index}
//                         className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                         onClick={() => setSelectedInstitute(inst)}
//                       >
//                         <div className="font-medium text-sm text-gray-800">{inst.name}</div>
//                         <div className="text-xs text-gray-600">
//                           {inst.city}, {inst.state}
//                         </div>
//                       </div>
//                     ))} */}
//                   {institutes
//                     .filter((inst) => inst.state === selectedState)
//                     // MODIFICATION: Add .slice() and .sort() for alphabetical order
//                     .slice()
//                     .sort((a, b) => a.name.localeCompare(b.name))
//                     .map((inst, index) => (
//                       <div
//                         key={index}
//                         className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                         onClick={() => setSelectedInstitute(inst)}
//                       >
//                         <div className="font-medium text-sm text-gray-800">{inst.name}</div>
//                         <div className="text-xs text-gray-600">
//                           {inst.city}, {inst.state}
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Selected Institute Details (shows over anything else) */}
//             {selectedInstitute && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="font-semibold text-blue-900">
//                     Institute Details
//                   </h3>
//                   <button
//                     onClick={() => setSelectedInstitute(null)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <div>
//                     <span className="font-medium text-blue-800">Name:</span>
//                     <p className="text-blue-700">{selectedInstitute.name}</p>
//                   </div>
//                   <div>
//                     <span className="font-medium text-blue-800">Location:</span>
//                     <p className="text-blue-700">
//                       {selectedInstitute.city}, {selectedInstitute.state}
//                     </p>
//                   </div>
//                   <div>
//                     <span className="font-medium text-blue-800">
//                       Coordinates:
//                     </span>
//                     <p className="text-blue-700 font-mono text-xs">
//                       {selectedInstitute.coordinates[1].toFixed(4)}°N,{" "}
//                       {selectedInstitute.coordinates[0].toFixed(4)}°E
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Search Results (shows if searchTerm is present, usually highest priority) */}
//             {searchTerm && (
//               <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
//                 <h3 className="font-semibold text-gray-800 mb-3">
//                   Search Results ({filteredInstitutes.length})
//                   {/* Search Results (310) */}
//                 </h3>
//                 <div className="space-y-2 max-h-60 overflow-y-auto">
//                   {filteredInstitutes.map((institute, index) => (
//                     <div
//                       key={index}
//                       className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
//                       onClick={() => setSelectedInstitute(institute)}
//                     >
//                       <div className="font-medium text-sm text-gray-800">
//                         {institute.name}
//                       </div>
//                       <div className="text-xs text-gray-600">
//                         {institute.city}, {institute.state}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default IndianInstitutesMap;

"use client";

import React, { useState, useMemo } from "react";
import { MapPin, Info, X, Divide } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import map from "../../public/map_img.png";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Institute {
  name: string;
  city: string;
  state: string;
  coordinates: number[]; // Changed from [number, number] to number[]
}
interface StateInfo {
  name: string;
  coordinates: [number, number];
  instituteCount: number;
}

// ... your existing useState hooks

const IndianInstitutesMap: React.FC = () => {
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(
    null
  );
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  // 👇 NEW STATE ADDED: Controls the visibility of the full list
  const [showAllInstitutes, setShowAllInstitutes] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Institute data extracted from the PDF with approximate coordinates
  const institutes = [
    // Gujarat
    {
      name: "Indian Institute of Technology",
      city: "Gandhinagar",
      state: "Gujarat",
      coordinates: [72.6369, 23.2156],
    },
    {
      name: "Indian Institute of Management",
      city: "Ahmedabad",
      state: "Gujarat",
      coordinates: [72.5797, 23.0225],
    },
    {
      name: "Indian Institute of Information Technology",
      city: "Vadodara",
      state: "Gujarat",
      coordinates: [73.1812, 22.3072],
    },
    {
      name: "Institute of Infrastructure Technology Research and Management",
      city: "Ahmedabad",
      state: "Gujarat",
      coordinates: [72.5797, 23.0225],
    },
    {
      name: "Charotar University Of Science & Technology",
      city: "Anand",
      state: "Gujarat",
      coordinates: [72.9289, 22.5645],
    },
    {
      name: "Anant National University",
      city: "Ahmedabad",
      state: "Gujarat",
      coordinates: [72.5797, 23.0225],
    },
    {
      name: "Veer Narmad South Gujarat University",
      city: "Surat",
      state: "Gujarat",
      coordinates: [72.8311, 21.1702],
    },

    // Telangana
    {
      name: "Indian Institute Of Technology",
      city: "Hyderabad",
      state: "Telangana",
      coordinates: [78.4867, 17.385],
    },
    {
      name: "University Of Hyderabad",
      city: "Hyderabad",
      state: "Telangana",
      coordinates: [78.4867, 17.385],
    },
    {
      name: "Indian School Of Business",
      city: "Hyderabad",
      state: "Telangana",
      coordinates: [78.4867, 17.385],
    },
    {
      name: "International Institute of Information Technology",
      city: "Hyderabad",
      state: "Telangana",
      coordinates: [78.4867, 17.385],
    },
    {
      name: "Tata Institute of Fundamental Research",
      city: "Hyderabad",
      state: "Telangana",
      coordinates: [78.4867, 17.385],
    },
    {
      name: "Computer Centre-Tata Institute of Fundamental Research",
      city: "Hyderabad",
      state: "Telangana",
      coordinates: [78.4867, 17.385],
    },
    {
      name: "CSIR-Centre for Cellular and Molecular Biology",
      city: "Hyderabad",
      state: "Telangana",
      coordinates: [78.4867, 17.385],
    },
    {
      name: "Osmania University",
      city: "Hyderabad",
      state: "Telangana",
      coordinates: [78.4867, 17.385],
    },

    // Karnataka
    {
      name: "Indian Institute of Technology",
      city: "Dharwad",
      state: "Karnataka",
      coordinates: [75.0178, 15.4589],
    },
    {
      name: "Indian Institute of Management",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Indian Statistical Institute",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Tata Institute of Fundamental Research Centre for Applicable Mathematics",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "National Centre for Biological Sciences",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "ERNET Regional Center",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "ERNET Office",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Raman Research Institute",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "International Centre for Theoretical Sciences-Tata Institute of Fundamental Research Centre for Applicable Mathematics",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Computer Centre-International Centre for Theoretical Sciences-Tata Institute of Fundamental Research Centre for Applicable Mathematics",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Indian Institute Of Sciences",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Jawaharlal Nehru Centre for Advanced Scientific Research",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Computer Centre Jawaharlal Nehru Centre for Advanced Scientific Research",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Institute for Stem Cell Science and Regenerative Medicine",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Azim Premji University",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Indian Institute of Astrophysics",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "Manipal Academy of Higher Education",
      city: "Manipal",
      state: "Karnataka",
      coordinates: [74.7787, 13.3467],
    },
    {
      name: "International Institute Of Information Technology",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },
    {
      name: "National Institute of Advanced Studies",
      city: "Bangalore",
      state: "Karnataka",
      coordinates: [77.5946, 12.9716],
    },

    // Tamil Nadu
    {
      name: "Indian Institute of Technology",
      city: "Madras",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Conference hall, IIT",
      city: "Madras",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Indian Institute of Information Technology, Design & Manufacturing",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "ERNET India",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "SRM University",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Computer Centre, SRM University",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Karunya Institute of Technology and Sciences",
      city: "Coimbatore",
      state: "Tamil Nadu",
      coordinates: [76.9558, 11.0168],
    },
    {
      name: "B.S. Abdur Rahman Crescent Institute of Science & Technology",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Agricultural College & Research Institute (AC&RI), Tamil Nadu Agricultural University",
      city: "Coimbatore",
      state: "Tamil Nadu",
      coordinates: [76.9558, 11.0168],
    },
    {
      name: "School of Post Graduate Studies (SPGS), Tamil Nadu Agricultural University",
      city: "Coimbatore",
      state: "Tamil Nadu",
      coordinates: [76.9558, 11.0168],
    },
    {
      name: "Agricultural Engineering College & Research Institute (AEC&RI)-Tamil Nadu Agricultural University",
      city: "Coimbatore",
      state: "Tamil Nadu",
      coordinates: [76.9558, 11.0168],
    },
    {
      name: "Horticultural College & Research Institute (HC&RI)-Tamil Nadu Agricultural University",
      city: "Coimbatore",
      state: "Tamil Nadu",
      coordinates: [76.9558, 11.0168],
    },
    {
      name: "The Institute Of Mathematical Sciences",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Agricultural College and Research Institute",
      city: "Thanjavur",
      state: "Tamil Nadu",
      coordinates: [79.1378, 10.787],
    },
    {
      name: "Agricultural College and Research Institute",
      city: "Pudukkottai",
      state: "Tamil Nadu",
      coordinates: [78.8209, 10.3833],
    },
    {
      name: "Horticultural College and Research Institute for Women",
      city: "Trichy",
      state: "Tamil Nadu",
      coordinates: [78.7047, 10.7905],
    },
    {
      name: "Horticultural College and Research Institute",
      city: "Theni",
      state: "Tamil Nadu",
      coordinates: [77.4977, 10.0104],
    },
    {
      name: "Agricultural College and Research Institute",
      city: "Madurai",
      state: "Tamil Nadu",
      coordinates: [78.1198, 9.9252],
    },
    {
      name: "Home Science College and Research Institute",
      city: "Madurai",
      state: "Tamil Nadu",
      coordinates: [78.1198, 9.9252],
    },
    {
      name: "Agricultural Engineering College and Research Institute",
      city: "Trichy",
      state: "Tamil Nadu",
      coordinates: [78.7047, 10.7905],
    },
    {
      name: "Anbil Dharmalingam Agricultural College and Research Institute",
      city: "Trichy",
      state: "Tamil Nadu",
      coordinates: [78.7047, 10.7905],
    },
    {
      name: "Agricultural College and Research Institute",
      city: "Tirunelveli",
      state: "Tamil Nadu",
      coordinates: [77.6933, 8.7139],
    },
    {
      name: "Agricultural College and Research Institute",
      city: "Thiruvannamalai",
      state: "Tamil Nadu",
      coordinates: [79.0747, 12.2253],
    },
    {
      name: "Forest College and Research Institute",
      city: "Mettupalayam",
      state: "Tamil Nadu",
      coordinates: [76.937, 11.3019],
    },
    {
      name: "Madras Veterinary College",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Veterinary College and Research Institute",
      city: "Namakkal",
      state: "Tamil Nadu",
      coordinates: [78.1674, 11.2189],
    },
    {
      name: "Veterinary College and Research Institute",
      city: "Orathanadu",
      state: "Tamil Nadu",
      coordinates: [79.2833, 10.65],
    },
    {
      name: "Veterinary College and Research Institute",
      city: "Tirunelveli",
      state: "Tamil Nadu",
      coordinates: [77.6933, 8.7139],
    },
    {
      name: "College of Food and Dairy Technology",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Veterinary College and Research Institute",
      city: "Salem",
      state: "Tamil Nadu",
      coordinates: [78.146, 11.6643],
    },
    {
      name: "Chennai Mathematical Institute",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Loyola-ICAM College of Engineering and Technology",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Tamil Nadu Veterinary and Animal Sciences University",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "Crescent Institute of Science & Technology",
      city: "Chennai",
      state: "Tamil Nadu",
      coordinates: [80.2707, 13.0827],
    },
    {
      name: "College of Poultry Production and Management",
      city: "Hosur",
      state: "Tamil Nadu",
      coordinates: [77.825, 12.1265],
    },

    // Uttar Pradesh
    {
      name: "Shiv Nadar University",
      city: "Greater Noida",
      state: "Uttar Pradesh",
      coordinates: [77.534, 28.4744],
    },
    {
      name: "Indian Institute Of Technology",
      city: "Kanpur",
      state: "Uttar Pradesh",
      coordinates: [80.3319, 26.4499],
    },
    {
      name: "Indian Institute Of Management",
      city: "Lucknow",
      state: "Uttar Pradesh",
      coordinates: [80.9462, 26.8467],
    },
    {
      name: "Birla Institute Of Technology Mesra",
      city: "Noida",
      state: "Uttar Pradesh",
      coordinates: [77.391, 28.5355],
    },
    {
      name: "Birla Institute Of Technology Mesra",
      city: "Allahabad",
      state: "Uttar Pradesh",
      coordinates: [81.8463, 25.4358],
    },
    {
      name: "Main Campus, Banaras Hindu University",
      city: "Varanasi",
      state: "Uttar Pradesh",
      coordinates: [83.0193, 25.2677],
    },
    {
      name: "Institute of Agricultural Science, Banaras Hindu University",
      city: "Varanasi",
      state: "Uttar Pradesh",
      coordinates: [83.0193, 25.2677],
    },{
      name: "Sri Krishna College of Engineering and Technology - SKCET",
      city : "Kuniyamuthur",
      state : "Tamil Nadu",
      coordinates: [10.9390, 76.9522],
    },
    {
      name: "Institute of Medical Sciences, Banaras Hindu University",
      city: "Varanasi",
      state: "Uttar Pradesh",
      coordinates: [83.0193, 25.2677],
    },
    {
      name: "Allahabad University",
      city: "Allahabad",
      state: "Uttar Pradesh",
      coordinates: [81.8463, 25.4358],
    },
    {
      name: "Galgotias University",
      city: "Greater Noida",
      state: "Uttar Pradesh",
      coordinates: [77.534, 28.4744],
    },
    {
      name: "Harish Chandra Research Institute",
      city: "Allahabad",
      state: "Uttar Pradesh",
      coordinates: [81.8463, 25.4358],
    },
    {
      name: "Babasaheb Bhimrao Ambedkar University",
      city: "Lucknow",
      state: "Uttar Pradesh",
      coordinates: [80.9462, 26.8467],
    },
    {
      name: "Centre of Bio-Medical Research (CBMR)",
      city: "Lucknow",
      state: "Uttar Pradesh",
      coordinates: [80.9462, 26.8467],
    },
    {
      name: "Jagatpur PG College",
      city: "Banaras",
      state: "Uttar Pradesh",
      coordinates: [83.0193, 25.2677],
    },
    {
      name: "Motilal Nehru National Institute of Technology",
      city: "Allahabad",
      state: "Uttar Pradesh",
      coordinates: [81.8463, 25.4358],
    },
    {
      name: "IEC College",
      city: "Greater Noida",
      state: "Uttar Pradesh",
      coordinates: [77.534, 28.4744],
    },

    // Punjab
    {
      name: "Indian Institute of Technology",
      city: "Ropar",
      state: "Punjab",
      coordinates: [76.5127, 30.9697],
    },
    {
      name: "Central University of Punjab",
      city: "Bathinda",
      state: "Punjab",
      coordinates: [74.9455, 30.2118],
    },
    {
      name: "Indian Institute of Science Education and Research",
      city: "Mohali",
      state: "Punjab",
      coordinates: [76.7294, 30.6638],
    },
    {
      name: "Government Medical College",
      city: "Amritsar",
      state: "Punjab",
      coordinates: [74.8723, 31.634],
    },
    {
      name: "Guru Govind Singh Medical College and Hospital",
      city: "Faridkot",
      state: "Punjab",
      coordinates: [74.7553, 30.6712],
    },
    {
      name: "Guru Nanak Dev Engineering College",
      city: "Ludhiana",
      state: "Punjab",
      coordinates: [75.8573, 30.901],
    },
    {
      name: "Chitkara University",
      city: "Rajpura",
      state: "Punjab",
      coordinates: [76.5994, 30.481],
    },
    {
      name: "Plaksha University",
      city: "Mohali",
      state: "Punjab",
      coordinates: [76.7294, 30.6638],
    },

    // Chandigarh
    {
      name: "Postgraduate Institute of Medical Education and Research",
      city: "Chandigarh",
      state: "Chandigarh",
      coordinates: [76.7794, 30.7333],
    },

    // Kerala
    {
      name: "Indian Institute of Technology",
      city: "Palakkad",
      state: "Kerala",
      coordinates: [76.6413, 10.7867],
    },
    {
      name: "Indian Institute of Science Education and Research",
      city: "Thiruvananthapuram",
      state: "Kerala",
      coordinates: [76.9366, 8.5241],
    },
    {
      name: "Amal Jyothi College of Engineering",
      city: "Kanjirappally",
      state: "Kerala",
      coordinates: [76.7783, 9.5648],
    },
    {
      name: "KMEA Engineering College",
      city: "Aluva",
      state: "Kerala",
      coordinates: [76.3463, 10.1085],
    },
    {
      name: "National Institute of Technology",
      city: "Calicut",
      state: "Kerala",
      coordinates: [75.7804, 11.2588],
    },

    // Assam
    {
      name: "Indian Institute Of Technology",
      city: "Guwahati",
      state: "Assam",
      coordinates: [91.7362, 26.1445],
    },
    {
      name: "National Institute of Technology",
      city: "Guwahati",
      state: "Assam",
      coordinates: [91.7362, 26.1445],
    },
    {
      name: "Indian Institute of Information Technology",
      city: "Guwahati",
      state: "Assam",
      coordinates: [91.7362, 26.1445],
    },
    {
      name: "Assam Don Bosco University",
      city: "Guwahati",
      state: "Assam",
      coordinates: [91.7362, 26.1445],
    },
    {
      name: "Guwahati Medical College",
      city: "Guwahati",
      state: "Assam",
      coordinates: [91.7362, 26.1445],
    },

    // Chhattisgarh
    {
      name: "Indian Institute Of Management",
      city: "Raipur",
      state: "Chhattisgarh",
      coordinates: [81.6296, 21.2514],
    },
    {
      name: "All India Institute of Medical Sciences",
      city: "Raipur",
      state: "Chhattisgarh",
      coordinates: [81.6296, 21.2514],
    },
    {
      name: "Guru Ghasidas Vishwavidyalaya",
      city: "Bilaspur",
      state: " Chhattisgarh",
      coordinates: [82.1409, 22.0797],
    },
    {
      name: "Shri Shankaracharya Institute of Professional Management and Technology",
      city: "Raipur",
      state: "Chhattisgarh",
      coordinates: [81.6296, 21.2514],
    },

    // Haryana
    {
      name: "Indian Institute Of Management",
      city: "Rohtak",
      state: "Haryana",
      coordinates: [76.6066, 28.8955],
    },
    {
      name: "Central University of Haryana",
      city: "Mahendragarh",
      state: "Haryana",
      coordinates: [76.1441, 28.242],
    },
    {
      name: "K.R. Mangalam University",
      city: "Gurgaon",
      state: "Haryana",
      coordinates: [77.0266, 28.4595],
    },
    {
      name: "THE NORTHCAP UNIVERSITY",
      city: "Gurgaon",
      state: "Haryana",
      coordinates: [77.0266, 28.4595],
    },
    {
      name: "Maharshi Dayanand University",
      city: "Rohtak",
      state: "Haryana",
      coordinates: [76.6066, 28.8955],
    },
    {
      name: "Ashoka University",
      city: "Sonipat",
      state: "Haryana",
      coordinates: [77.0178, 28.9931],
    },
    {
      name: "Chaudhary Ranbir Singh University",
      city: "Jind",
      state: "Haryana",
      coordinates: [76.3148, 29.3158],
    },
    {
      name: "BPS Mahila Vishwavidyalaya Khanpur Kalan",
      city: "Sonepat",
      state: "Haryana",
      coordinates: [77.0178, 28.9931],
    },
    {
      name: "Translational Health Science and Technology Institute",
      city: "Faridabad",
      state: "Haryana",
      coordinates: [77.3178, 28.4089],
    },
    // {
    //   name: "Regional Centre for Biotechnology",
    //   city: "Faridabad",
    //   state: "Haryana",
    //   coordinates: [77.3178, 28.4089],
    // },
    {
      name: "Deenbandhu Chhotu Ram University of Science and Technology",
      city: "Murthal",
      state: "Haryana",
      coordinates: [76.9, 29.0333],
    },
    {
      name: "South Point Group of Institutions",
      city: "Sonepat",
      state: "Haryana",
      coordinates: [77.0178, 28.9931],
    },
    {
      name: "School of Engineering and Technology, K.R. Mangalam University",
      city: "Gurgaon",
      state: "Haryana",
      coordinates: [77.0266, 28.4595],
    },
    {
      name: "Management Development Institute",
      city: "Gurgaon",
      state: "Haryana",
      coordinates: [77.0266, 28.4595],
    },
    {
      name: "National Brain Research Center",
      city: "Manesar",
      state: "Haryana",
      coordinates: [76.9313, 28.367],
    },

    // Odisha
    {
      name: "Indian Institute Of Technology",
      city: "Bhubaneswar",
      state: "Odisha",
      coordinates: [85.8245, 20.2961],
    },
    {
      name: "National Institute Of Technology",
      city: "Rourkela",
      state: "Odisha",
      coordinates: [84.8536, 22.2574],
    },
    {
      name: "Centurion University of Technology and Management",
      city: "Paralakhemundi",
      state: "Odisha",
      coordinates: [84.0877, 18.7831],
    },
    {
      name: "National Institute of Science Education and Research (NISER)",
      city: "Bhubaneswar",
      state: "Odisha",
      coordinates: [85.8245, 20.2961],
    },
    {
      name: "Centurion University",
      city: "Bhubaneswar",
      state: "Odisha",
      coordinates: [85.8245, 20.2961],
    },
    {
      name: "Institute of Physics",
      city: "Bhubaneswar",
      state: "Odisha",
      coordinates: [85.8245, 20.2961],
    },
    {
      name: "Utkal University",
      city: "Bhubaneswar",
      state: "Odisha",
      coordinates: [85.8245, 20.2961],
    },

    // Rajasthan
    {
      name: "Indian Institute of Technology",
      city: "Jodhpur",
      state: "Rajasthan",
      coordinates: [73.0243, 26.2389],
    },
    {
      name: "All India Institute of Medical Sciences",
      city: "Jodhpur",
      state: "Rajasthan",
      coordinates: [73.0243, 26.2389],
    },
    {
      name: "Birla Institute of Technology and Science",
      city: "Pilani",
      state: "Rajasthan",
      coordinates: [75.6033, 28.367],
    },
    {
      name: "Birla Institute Of Technology Mesra",
      city: "Jaipur",
      state: "Rajasthan",
      coordinates: [75.7873, 26.9124],
    },
    {
      name: "Malaviya National Institute of Technology",
      city: "Jaipur",
      state: "Rajasthan",
      coordinates: [75.7873, 26.9124],
    },
    {
      name: "Government Women Engineering College",
      city: "Ajmer",
      state: "Rajasthan",
      coordinates: [74.6399, 26.4499],
    },
    {
      name: "Rajasthan Technical University",
      city: "Kota",
      state: "Rajasthan",
      coordinates: [75.8648, 25.2138],
    },
    {
      name: "Sir Padampat Singhania University",
      city: "Udaipur",
      state: "Rajasthan",
      coordinates: [73.7125, 24.5854],
    },

    // Meghalaya
    {
      name: "North Eastern Hill University",
      city: "Shillong",
      state: "Meghalaya",
      coordinates: [91.8933, 25.5788],
    },

    // Tripura
    {
      name: "National Institute of Technology",
      city: "Agartala",
      state: "Tripura",
      coordinates: [91.2868, 23.8315],
    },

    // Jammu and Kashmir
    {
      name: "Indian Institute of Technology",
      city: "Jammu",
      state: "Jammu and Kashmir",
      coordinates: [74.857, 32.7266],
    },
    {
      name: "University of Jammu",
      city: "Jammu",
      state: "Jammu and Kashmir",
      coordinates: [74.857, 32.7266],
    },

    // Manipur
    {
      name: "Indian Institute of Information Technology",
      city: "Manipur",
      state: "Manipur",
      coordinates: [93.9063, 24.6637],
    },
    {
      name: "Manipur University",
      city: "Imphal",
      state: "Manipur",
      coordinates: [93.9063, 24.817],
    },
    {
      name: "D.M. College of Commerce",
      city: "Imphal",
      state: "Manipur",
      coordinates: [93.9063, 24.817],
    },
    {
      name: "G.P. Women's College",
      city: "Imphal",
      state: "Manipur",
      coordinates: [93.9063, 24.817],
    },

    // Sikkim
    {
      name: "Sikkim Manipal University",
      city: "Gangtok",
      state: "Sikkim",
      coordinates: [88.6138, 27.3389],
    },

    // Jharkhand
    {
      name: "All India Institute of Medical Sciences (AIIMS)",
      city: "Deoghar",
      state: "Jharkhand",
      coordinates: [86.6956, 24.4921],
    },
    {
      name: "Birla Institute Of Technology Mesra",
      city: "Lalpur",
      state: "Jharkhand",
      coordinates: [85.324, 23.3441],
    },
    {
      name: "Birla Institute Of Technology Mesra",
      city: "Deoghar",
      state: "Jharkhand",
      coordinates: [86.6956, 24.4921],
    },
    {
      name: "Birla Institute Of Technology Mesra",
      city: "Ranchi",
      state: "Jharkhand",
      coordinates: [85.324, 23.3441],
    },
    {
      name: "Indian School of Mines",
      city: "Dhanbad",
      state: "Jharkhand",
      coordinates: [86.4304, 23.7957],
    },
    {
      name: "Rajendra Institute of Medical Sciences",
      city: "Ranchi",
      state: "Jharkhand",
      coordinates: [85.324, 23.3441],
    },

    // West Bengal
    {
      name: "Indian Institute of Technology",
      city: "Kharagpur",
      state: "West Bengal",
      coordinates: [87.3119, 22.346],
    },
    {
      name: "Indian Institute of Management",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },
    {
      name: "Indian Institute of Science Education and Research",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },
    {
      name: "Indian Statistical Institute",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },
    {
      name: "National Institute of Technology",
      city: "Durgapur",
      state: "West Bengal",
      coordinates: [87.3119, 23.5204],
    },
    {
      name: "Variable Energy Cyclotron Center",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },
    {
      name: "National Institute of Electronics & Information Technology (NIELIT)",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },
    {
      name: "Birla Institute Of Technology Mesra",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },
    {
      name: "Jalpaiguri Govt. Engineering College",
      city: "Jalpaiguri",
      state: "West Bengal",
      coordinates: [88.7267, 26.5465],
    },
    {
      name: "Institute Of Genetic Engineering",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },
    {
      name: "Neotia Institute of Technology",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },
    {
      name: "Indian Association for the Cultivation of Science",
      city: "Kolkata",
      state: "West Bengal",
      coordinates: [88.3639, 22.5726],
    },

    // Maharashtra
    {
      name: "Indian Institute Of Technology",
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: [72.8777, 19.076],
    },
    {
      name: "Indian Institute of Science Education and Research",
      city: "Pune",
      state: "Maharashtra",
      coordinates: [73.8567, 18.5204],
    },
    {
      name: "National Institute Of Immunology",
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: [72.8777, 19.076],
    },
    {
      name: "The Inter-University Centre for Astronomy and Astrophysics",
      city: "Pune",
      state: "Maharashtra",
      coordinates: [73.8567, 18.5204],
    },
    {
      name: "Tata Institute of Fundamental Research (TIFR)",
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: [72.8777, 19.076],
    },
    {
      name: "Savitribai Phule Pune University",
      city: "Pune",
      state: "Maharashtra",
      coordinates: [73.8567, 18.5204],
    },
    {
      name: "Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya",
      city: "Wardha",
      state: "Maharashtra",
      coordinates: [78.5977, 20.7391],
    },
    // {
    //   name: "King Edwards Memorial Hospital",
    //   city: "Mumbai",
    //   state: "Maharashtra",
    //   coordinates: [72.8777, 19.076],
    // },
    {
      name: "Homi Bhabha Centre for Science Education-Tata Institute of Fundamental Research (TIFR)",
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: [72.8777, 19.076],
    },
    {
      name: "National Centre for Radio Astrophysics- Tata Institute of Fundamental Research (TIFR)",
      city: "Pune",
      state: "Maharashtra",
      coordinates: [73.8567, 18.5204],
    },
    {
      name: "Lokmanya Tilak Municipal Medical College",
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: [72.8777, 19.076],
    },
    {
      name: "Dept. of Biological Sciences at Tata Institute of Fundamental Research",
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: [72.8777, 19.076],
    },
    {
      name: "Veermata Jijabai Technological Institute",
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: [72.8777, 19.076],
    },

    // Himachal Pradesh
    {
      name: "Indian Institute of Technology",
      city: "Mandi",
      state: "Himachal Pradesh",
      coordinates: [76.9366, 31.7076],
    },
    {
      name: "National Institute of Technology",
      city: "Hamirpur",
      state: "Himachal Pradesh",
      coordinates: [76.5222, 31.684],
    },
    {
      name: "Indian Institute of Information Technology",
      city: "Una",
      state: "Himachal Pradesh",
      coordinates: [76.2673, 31.4649],
    },
    {
      name: "Himachal Pradesh University",
      city: "Shimla",
      state: "Himachal Pradesh",
      coordinates: [77.1025, 31.0588],
    },
    {
      name: "Chitkara University",
      city: "Solan",
      state: "Himachal Pradesh",
      coordinates: [77.0999, 30.9045],
    },

    // Bihar
    {
      name: "Indian Institute of Technology",
      city: "Patna",
      state: "Bihar",
      coordinates: [85.1376, 25.5941],
    },
    {
      name: "Computer Centre - Indian Institute of Technology Patna",
      city: "Patna",
      state: "Bihar",
      coordinates: [85.1376, 25.5941],
    },
    {
      name: "All India Institute Of Medical Sciences Patna",
      city: "Patna",
      state: "Bihar",
      coordinates: [85.1376, 25.5941],
    },
    {
      name: "Birla Institute Of Technology Mesra",
      city: "Patna",
      state: "Bihar",
      coordinates: [85.1376, 25.5941],
    },
    {
      name: "Darbhanga Medical College",
      city: "Darbhanga",
      state: "Bihar",
      coordinates: [85.8918, 26.1542],
    },

    // Uttarakhand
    {
      name: "Indian Institute of Technology",
      city: "Roorkee",
      state: "Uttarakhand",
      coordinates: [77.8875, 29.8543],
    },
    {
      name: "Indian Institute Of Management",
      city: "Kashipur",
      state: "Uttarakhand",
      coordinates: [78.9629, 29.2084],
    },
    {
      name: "Computer Centre - University of Petroleum & Energy Studies",
      city: "Dehradun",
      state: "Uttarakhand",
      coordinates: [78.0322, 30.3165],
    },
    {
      name: "All India Institute of Medical Sciences",
      city: "Rishikesh",
      state: "Uttarakhand",
      coordinates: [78.2676, 30.0869],
    },
    {
      name: "University of Petroleum & Energy Studies",
      city: "Dehradun",
      state: "Uttarakhand",
      coordinates: [78.0322, 30.3165],
    },

    // Madhya Pradesh
    {
      name: "Indian Institute of Technology",
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: [75.8577, 22.5726],
    },
    {
      name: "Indian Institute of Information Technology, Design and Manufacturing",
      city: "Jabalpur",
      state: "Madhya Pradesh",
      coordinates: [79.9864, 23.1815],
    },
    {
      name: "Indian Institute of Science Education and Research",
      city: "Bhopal",
      state: "Madhya Pradesh",
      coordinates: [77.4126, 23.2599],
    },
    {
      name: "Maulana Azad National Institute of Technology",
      city: "Bhopal",
      state: "Madhya Pradesh",
      coordinates: [77.4126, 23.2599],
    },
    {
      name: "Indira Gandhi National Tribal University",
      city: "Amarkantak",
      state: "Madhya Pradesh",
      coordinates: [81.7473, 22.6708],
    },
    {
      name: "National Institute of Technical Teacher's Training and Research",
      city: "Bhopal",
      state: "Madhya Pradesh",
      coordinates: [77.4126, 23.2599],
    },
    {
      name: "Jagran Lakecity University",
      city: "Bhopal",
      state: "Madhya Pradesh",
      coordinates: [77.4126, 23.2599],
    },
    {
      name: "Shri G.S. Institute of Technology and Science",
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: [75.8577, 22.5726],
    },

    // Andhra Pradesh
    {
      name: "Indian Institute of Technology",
      city: "Tirupati",
      state: "Andhra Pradesh",
      coordinates: [79.4192, 13.6288],
    },
    {
      name: "Indian Institute of Information Technology",
      city: "Sri City",
      state: "Andhra Pradesh",
      coordinates: [79.7036, 13.5933],
    },
    {
      name: "Indian Institute of Science Education and Research",
      city: "Tirupati",
      state: "Andhra Pradesh",
      coordinates: [79.4192, 13.6288],
    },
    {
      name: "Computer Centre - Indian Institute of Science Education and Research",
      city: "Tirupati",
      state: "Andhra Pradesh",
      coordinates: [79.4192, 13.6288],
    },
    {
      name: "SVEC – Sree Vidyanikethan Engineering College",
      city: "Tirupati",
      state: "Andhra Pradesh",
      coordinates: [79.4192, 13.6288],
    },

    // Goa
    {
      name: "Indian Institute of Technology",
      city: "Goa",
      state: "Goa",
      coordinates: [74.124, 15.2993],
    },

    // Delhi
    {
      name: "Indian Institute of Technology",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "National Institute of Technology",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "National Institute Of Pathology",
      city: "New Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "International Centre For Genetic Engineering And Biotechnology",
      city: "New Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Indian National Science Academy",
      city: "New Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "IEC College",
      city: "Greater Kailash",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Delhi Technological University",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "National Institute of Electronics & Information Technology (NIELIT)",
      city: "New Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Institute of Home Economics",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Ambedkar University",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Indraprastha Institute of Information Technology",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "ERNET India",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Jawaharlal Nehru University",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Guru Gobind Singh Indraprastha University",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "South Asian University",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Delhi University",
      city: "New Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Jamia Hamdard University",
      city: "New Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Vivekananda College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shaheed Sukhdev College of Business Studies",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Ahilya Bai College Of Nursing",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Indraprastha College For Women",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Acharya Narendra Dev College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Aditi Mahavidyalaya",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Lady Shri Ram College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Aryabhatta College (Ram Lal College evening)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Lakshmibai College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Atma Ram Sanatan Dharma College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Maharaja Agrasen College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Bhagini Nivedita College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Maharshe Valmiki College of Education",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Maitreyi College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Bhaskaracharya College of Applied Sciences",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Mata Sundri College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Bhim Rao Ambedkar College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Miranda House",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "College of Vocational Studies",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Moti Lal Nehru College (Morning)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Daulat Ram College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Motilal Nehru College (Evening)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Deen Dayal Upadhayaya College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Pannalal Girdharlal Dayanand Anglo-Vedic College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Delhi College of Arts & Commerce",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Pannalal Girdharlal Dayanand Anglo-Vedic College (Evening)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Deshbandhu College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Rajdhani College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Dyal Singh College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Ram Lal Anand College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Dyal Singh College (Evening)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Ramanujan College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Gargi College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Bharati College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Ramjas College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Hans Raj College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Satyawati College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Hindu College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Satyawati College (Evening)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Indira Gandhi Institute of Physical Education & Sports Sciences",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shaheed Bhagat Singh College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Indraprastha College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shaheed Bhagat Singh College (Evening)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shaheed Rajguru College of Applied Sciences",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Janki Devi Memorial College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Jesus and Mary College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shivaji College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Kalindi College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shri Ram College of Commerce",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Kamla Nehru College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shyam Lal College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Keshav Mahavidyalaya",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shyam Lal College (Evening)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Kirori Mal College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shyama Prasad Mukherjee College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Lady Irwin College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Sri Aurobindo College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Sri Aurobindo College (Evening)",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Swami Shradhanand College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Sri Guru Gobind Singh College of Commerce",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "St. Stephen's College",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    // {
    //   name: "43rd APAN INDIA",
    //   city: "New Delhi",
    //   state: "Delhi",
    //   coordinates: [77.1025, 28.7041],
    // },
    {
      name: "National Knowledge Network",
      city: "New Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Computer Centre North Campus, Delhi University",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Indian Statistical Institute",
      city: "New Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Bhai Parmanand Institute Of Business Studies",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
    {
      name: "Shri Lal Bahadur Shastri Sanskrit University",
      city: "Delhi",
      state: "Delhi",
      coordinates: [77.1025, 28.7041],
    },
  ];

  // State-wise grouping
  const stateData = useMemo(() => {
    const states: { [key: string]: StateInfo } = {
      Gujarat: {
        name: "Gujarat",
        coordinates: [72.0, 23.0],
        instituteCount: 0,
      },
      Karnataka: {
        name: "Karnataka",
        coordinates: [76.0, 13.0],
        instituteCount: 0,
      },
      "Tamil Nadu": {
        name: "Tamil Nadu",
        coordinates: [78.0, 11.0],
        instituteCount: 0,
      },
      Telangana: {
        name: "Telangana",
        coordinates: [79.0, 18.0],
        instituteCount: 0,
      },
      Delhi: { name: "Delhi", coordinates: [77.2, 28.6], instituteCount: 0 },
      Maharashtra: {
        name: "Maharashtra",
        coordinates: [75.0, 19.0],
        instituteCount: 0,
      },
      "West Bengal": {
        name: "West Bengal",
        coordinates: [88.0, 22.5],
        instituteCount: 0,
      },
      "Uttar Pradesh": {
        name: "Uttar Pradesh",
        coordinates: [81.0, 26.8],
        instituteCount: 0,
      },
      Punjab: { name: "Punjab", coordinates: [76.0, 31.0], instituteCount: 0 },
      Assam: { name: "Assam", coordinates: [92.0, 26.2], instituteCount: 0 },
      Odisha: { name: "Odisha", coordinates: [85.0, 20.5], instituteCount: 0 },
      Rajasthan: {
        name: "Rajasthan",
        coordinates: [74.0, 27.0],
        instituteCount: 0,
      },
      "Himachal Pradesh": {
        name: "Himachal Pradesh",
        coordinates: [77.0, 31.1],
        instituteCount: 0,
      },
      Bihar: { name: "Bihar", coordinates: [85.0, 25.0], instituteCount: 0 },
      Uttarakhand: {
        name: "Uttarakhand",
        coordinates: [79.0, 30.0],
        instituteCount: 0,
      },
      "Madhya Pradesh": {
        name: "Madhya Pradesh",
        coordinates: [78.0, 23.0],
        instituteCount: 0,
      },
      Kerala: { name: "Kerala", coordinates: [76.0, 10.0], instituteCount: 0 },
      "Andhra Pradesh": {
        name: "Andhra Pradesh",
        coordinates: [79.0, 15.0],
        instituteCount: 0,
      },
      Goa: { name: "Goa", coordinates: [74.0, 15.4], instituteCount: 0 },
      Haryana: {
        name: "Haryana",
        coordinates: [76.0, 29.0],
        instituteCount: 0,
      },
      Chhattisgarh: {
        name: "Chhattisgarh",
        coordinates: [82.0, 21.0],
        instituteCount: 0,
      },
      Jharkhand: {
        name: "Jharkhand",
        coordinates: [85.0, 23.6],
        instituteCount: 0,
      },
      Tripura: {
        name: "Tripura",
        coordinates: [91.9, 23.9],
        instituteCount: 0,
      },
      "Jammu and Kashmir": {
        name: "Jammu and Kashmir",
        coordinates: [76.0, 34.0],
        instituteCount: 0,
      },
      Manipur: {
        name: "Manipur",
        coordinates: [93.9, 24.6],
        instituteCount: 0,
      },
      Meghalaya: {
        name: "Meghalaya",
        coordinates: [91.3, 25.5],
        instituteCount: 0,
      },
      Sikkim: { name: "Sikkim", coordinates: [88.5, 27.5], instituteCount: 0 },
    };

    institutes.forEach((institute) => {
      if (states[institute.state]) {
        states[institute.state].instituteCount++;
      }
    });

    return states;
  }, [institutes]);

  // Filter institutes based on search
  const filteredInstitutes = useMemo(() => {
    if (!searchTerm) return institutes;
    return institutes.filter(
      (institute) =>
        institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [institutes, searchTerm]);

  const getStateColor = (stateName: string) => {
    const count = stateData[stateName]?.instituteCount || 0;
    if (count === 0) return "#f3f4f6";
    if (count <= 5) return "#dbeafe";
    if (count <= 15) return "#93c5fd";
    if (count <= 30) return "#3b82f6";
    return "#1d4ed8";
  };

  const svgWidth = 800;
  const svgHeight = 600;

  // Simple India outline (simplified for demo)
  const indiaPath = "/indiaMap.json";

  const handleTotalInstitutesClick = () => {
    setShowAllInstitutes(true);
    setSelectedState(null);
  };

  const handleStatesCoveredClick = () => {
    setShowAllInstitutes(false);
    setSelectedState(null);
    setSearchTerm("");
  };

  // Excel download function
  // const downloadExcel = () => {
  //   const data = institutes.map((inst) => ({
  //     Name: inst.name,
  //     City: inst.city,
  //     State: inst.state,
  //     Latitude: inst.coordinates[1],
  //     Longitude: inst.coordinates[0],
  //   }));

  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Universities");
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  //   saveAs(blob, "Indian_Universities.xlsx");
  // };

  const downloadExcel = () => {
    const fileUrl = "/Eduroam_indian_universities_.csv"; // file placed in public folder
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Indian_Universities.xlsx"; // optional rename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadClick = () => {
    if (status === "authenticated") {
      // If logged in, proceed with the download
      downloadExcel();
    } else {
      // If not logged in, show an alert and redirect
      router.push("/login"); // Change '/login' to your actual login route
    }
  };

  return (
    <>
      <Navbar />
      {/* Main container with full width */}
      <div className="w-full p-6 bg-white">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Indian Educational Institutes Map
          </h1>
          <p className="text-gray-600 mb-4">
            {/* Interactive map showing {institutes.length} educational institutes */}
            Interactive map showing {310} educational institutes across India
          </p>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search institutes, cities, or states..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* MODIFIED: Made Total Institutes clickable */}
            <div
              className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={handleTotalInstitutesClick}
            >
              <div className="text-2xl font-bold text-blue-600">
                {/* {institutes.length} */}
                310
              </div>
              <div className="text-sm text-gray-600">Total Institutes</div>
            </div>
            {/* <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {
                    Object.keys(stateData).filter(
                      (state) => stateData[state].instituteCount > 0
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">States Covered</div>
              </div> */}
            <div
              className="bg-green-50 p-3 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              onClick={handleStatesCoveredClick}
            >
              <div className="text-2xl font-bold text-green-600">
                {
                  Object.keys(stateData).filter(
                    (state) => stateData[state].instituteCount > 0
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">States Covered</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.max(
                  ...Object.values(stateData).map((s) => s.instituteCount)
                )}
              </div>
              <div className="text-sm text-gray-600">Max in State</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              {/* <div className="text-2xl font-bold text-orange-600"> */}
              {/* {filteredInstitutes.length} */}
              {/* 310 */}
              {/* {filteredInstitutes.length}
              </div> */}
              <div className="text-2xl font-bold text-orange-600">
                {filteredInstitutes.length === institutes.length
                  ? 310
                  : filteredInstitutes.length}
              </div>

              <div className="text-sm text-gray-600">Filtered Results</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map */}
          <div className="container flex-1">
            <div className="relative w-full h-[580px] overflow-hidden rounded-xl shadow-lg border-2 border-gray-400 ">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1TxT6YENQMerQjWXqldlz2ywTz6MaquI&ehbc=2E312F&ll=30.5937,78.9629&z=5"
                className="w-full h-[660px] -mt-20 border-0"
              ></iframe>
              {/* <img src={map} alt="Map" /> */}
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              {/* Left side: Legend items */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white"></div>
                  <span>Institute Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Click marker for details</span>
                </div>
              </div>

              {/* Right side: Download Button */}
              {/* <button
                onClick={downloadExcel}
                className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Download Universities List
              </button> */}
              <button
                onClick={handleDownloadClick} // This is the new way
                className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Download Universities List
              </button>
            </div>
          </div>
          {/* Side Panel */}
          <div className="lg:w-80 flex-shrink-0">
            {/* 👇 NEW ALL INSTITUTES LIST POPUP/PANEL (Highest Priority) */}
            {showAllInstitutes && !searchTerm && (
              <div className="bg-white border border-gray-400 rounded-lg p-4 mb-4 h-[568px]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-black-800 flex items-center gap-2">
                    {/* <Info className="w-4 h-4" /> */}
                    {/* All Institutes List ({institutes.length}) */}
                    All Institutes List ({310})
                  </h3>
                  <button
                    onClick={() => setShowAllInstitutes(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {/* Render ALL Institutes here */}
                  {/* {institutes.map((inst, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => {
                        setSelectedInstitute(inst);
                        setShowAllInstitutes(false); // Close the list upon selection
                      }}
                    >
                      <div className="font-medium text-sm text-gray-800">{inst.name}</div>
                      <div className="text-xs text-gray-600">
                        {inst.city}, {inst.state}
                      </div>
                    </div>
                  ))} */}
                  {institutes
                    .slice() // 1. Create a shallow copy of the array
                    .sort((a, b) => a.name.localeCompare(b.name)) // 2. Sort the copy alphabetically by name
                    .map((inst, index) => (
                      <div
                        key={index}
                        className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => {
                          setSelectedInstitute(inst);
                          setShowAllInstitutes(false); // Close the list upon selection
                        }}
                      >
                        <div className="font-medium text-sm text-gray-800">
                          {inst.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {inst.city}, {inst.state}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Existing State Statistics: Only show if NO full list is active AND NO state is selected AND NO search term */}
            {!showAllInstitutes && !selectedState && !searchTerm && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 h-[580px]">
                <h3 className="font-semibold text-black-800 mb-3 flex items-center gap-2">
                  {/* <Info className="w-4 h-8" /> */}
                  State-wise Distribution
                </h3>
                <div className="space-y-2 max-h-130 overflow-y-auto">
                  {/* {Object.values(stateData)
                    .filter((state) => state.instituteCount > 0)
                    .sort((a, b) => b.instituteCount - a.instituteCount)
                    .map((state, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => setSelectedState(state.name)}
                      >
                        <span className="text-sm font-medium">{state.name}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                          {state.instituteCount}
                        </span>
                      </div>
                    ))} */}
                  {Object.values(stateData)
                    .filter((state) => state.instituteCount > 0)
                    // MODIFICATION: Sort alphabetically by state name
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((state, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => setSelectedState(state.name)}
                      >
                        <span className="text-sm font-medium">
                          {state.name}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                          {state.instituteCount}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Universities for Selected State: Only shows if selectedState is active */}
            {selectedState && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4 h-[550px]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-black-800">
                    Universities in {selectedState}
                  </h3>
                  <button
                    onClick={() => setSelectedState(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 max-h-120 overflow-y-auto">
                  {/* {institutes
                    .filter((inst) => inst.state === selectedState)
                    .map((inst, index) => (
                      <div
                        key={index}
                        className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => setSelectedInstitute(inst)}
                      >
                        <div className="font-medium text-sm text-gray-800">{inst.name}</div>
                        <div className="text-xs text-gray-600">
                          {inst.city}, {inst.state}
                        </div>
                      </div>
                    ))} */}
                  {institutes
                    .filter((inst) => inst.state === selectedState)
                    // MODIFICATION: Add .slice() and .sort() for alphabetical order
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((inst, index) => (
                      <div
                        key={index}
                        className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => setSelectedInstitute(inst)}
                      >
                        <div className="font-medium text-sm text-gray-800">
                          {inst.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {inst.city}, {inst.state}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Selected Institute Details (shows over anything else) */}
            {selectedInstitute && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-blue-900">
                    Institute Details
                  </h3>
                  <button
                    onClick={() => setSelectedInstitute(null)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-blue-800">Name:</span>
                    <p className="text-blue-700">{selectedInstitute.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">Location:</span>
                    <p className="text-blue-700">
                      {selectedInstitute.city}, {selectedInstitute.state}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">
                      Coordinates:
                    </span>
                    <p className="text-blue-700 font-mono text-xs">
                      {selectedInstitute.coordinates[1].toFixed(4)}°N,{" "}
                      {selectedInstitute.coordinates[0].toFixed(4)}°E
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results (shows if searchTerm is present, usually highest priority) */}
            {searchTerm && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Search Results ({filteredInstitutes.length})
                  {/* Search Results (310) */}
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredInstitutes.map((institute, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => setSelectedInstitute(institute)}
                    >
                      <div className="font-medium text-sm text-gray-800">
                        {institute.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {institute.city}, {institute.state}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IndianInstitutesMap;
