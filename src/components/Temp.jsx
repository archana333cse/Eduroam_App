// import React from 'react'

// function Temp() {
//   return (
//     <div>
//                <div className="flex-1">
//             <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
//               <svg
//                 width="100%"
//                 height="500"
//                 viewBox={`0 0 ${svgWidth} ${svgHeight}`}
//                 className="w-full h-auto"
//               >
//                 {/* India outline */}
//                 <path
//                   d={indiaPath}
//                   fill="url(#gradient)"
//                   stroke="#374151"
//                   strokeWidth="2"
//                   className="drop-shadow-sm"
//                 />

//                 {/* Gradient definition */}
//                 <defs>
//                   <linearGradient
//                     id="gradient"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#f0f9ff" />
//                     <stop offset="100%" stopColor="#e0f2fe" />
//                   </linearGradient>
//                 </defs>

//                 {/* Institute markers */}
//                 {filteredInstitutes.map((institute, index) => {
//                   // Convert lat/lng to SVG coordinates (simplified projection)
//                   const x =
//                     ((institute.coordinates[0] - 68) / (97 - 68)) *
//                       (svgWidth - 100) +
//                     50;
//                   const y =
//                     ((35 - institute.coordinates[1]) / (35 - 6)) *
//                       (svgHeight - 100) +
//                     50;

//                   return (
//                     <g key={index}>
//                       <circle
//                         cx={x}
//                         cy={y}
//                         r="4"
//                         fill="#dc2626"
//                         stroke="#fff"
//                         strokeWidth="2"
//                         className="cursor-pointer hover:r-6 transition-all duration-200 drop-shadow-sm"
//                         onClick={() =>
//                           setSelectedInstitute({
//                             ...institute,
//                             coordinates: institute.coordinates as [
//                               number,
//                               number
//                             ],
//                           })
//                         }
//                         onMouseEnter={() => setHoveredState(institute.state)}
//                         onMouseLeave={() => setHoveredState(null)}
//                       />
//                       {hoveredState === institute.state && (
//                         <text
//                           x={x}
//                           y={y - 8}
//                           textAnchor="middle"
//                           className="text-xs font-medium fill-gray-800 pointer-events-none"
//                           style={{ textShadow: "1px 1px 2px white" }}
//                         >
//                           {institute.city}
//                         </text>
//                       )}
//                     </g>
//                   );
//                 })}

//                 {/* State labels */}
//                 {Object.values(stateData).map((state, index) => {
//                   if (state.instituteCount === 0) return null;
//                   const x =
//                     ((state.coordinates[0] - 68) / (97 - 68)) *
//                       (svgWidth - 100) +
//                     50;
//                   const y =
//                     ((35 - state.coordinates[1]) / (35 - 6)) *
//                       (svgHeight - 100) +
//                     50;

//                   return (
//                     <text
//                       key={index}
//                       x={x}
//                       y={y + 25}
//                       textAnchor="middle"
//                       className="text-xs font-bold fill-gray-700 pointer-events-none"
//                       style={{ textShadow: "1px 1px 3px white" }}
//                     >
//                       {state.name} ({state.instituteCount})
//                     </text>
//                   );
//                 })}
//               </svg>
//             </div>

//             {/* Legend */}
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
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
//             </div>
//           </div>  
//     </div>
//   )
// }

// export default Temp
