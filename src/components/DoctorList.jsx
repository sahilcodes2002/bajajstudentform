import React from 'react';


const DoctorList = ({ doctors = [] }) => (
  <div className="grid grid-cols-1 gap-4 pb-4 overflow-y-auto">
    {doctors.map(doctor => (
      <DoctorCard key={doctor.id} doctor={doctor} />
    ))}
  </div>
);

export default DoctorList;

function DoctorCard({ doctor }) {
  
  const renderIcon = (iconName) => {
    const icons = {
      clinic: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
        </svg>
      ),
      city: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
      experience: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    };

    return icons[iconName] || null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow" data-testid="doctor-card">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4">
        
        <img
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
          src={doctor.photo}
          alt={doctor.name || 'Doctor image'}
          onError={e => (e.target.style.display = 'none')}
        />

        <div className="space-y-1">
          <h3 className="font-semibold text-gray-800 text-lg" data-testid="doctor-name">
            {doctor.name || 'Unknown Doctor'}
          </h3>
          
          <p className="text-sm text-gray-600" data-testid="doctor-specialty">
            {(doctor.specialities || [])
              .map(s => s.name)
              .filter(Boolean)
              .join(', ') || 'No specialties listed'}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            {renderIcon('experience')}
            <span data-testid="doctor-experience">
              {doctor.experience?.split(' ')[0] || '0'} years experience
            </span>
          </div>

          <p className="text-sm text-gray-600" data-testid="doctor-fee">
            fee: {doctor.fees || 'Not available'}
          </p>
        </div>

        
        <div className="flex flex-col justify-between mt-6 ">
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {renderIcon('clinic')}
              <span>{doctor.clinic?.name || 'Clinic not available'}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {renderIcon('city')}
              <span>{doctor.clinic?.address?.city || 'City not available'}</span>
            </div>
          </div>

          <button className="mt-4 ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2">
            <span>Book Appointment</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}