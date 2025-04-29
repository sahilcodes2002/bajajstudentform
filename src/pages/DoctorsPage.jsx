import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AutocompleteSearch from '../components/AutocompleteSearch';
import FilterPanel from '../components/FilterPanel';
import DoctorList from '../components/DoctorList';
import axios from 'axios';

function DoctorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [specialties, setSpecialties] = useState(new Set());

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json'
        );
        const data = response.data || [];
        setDoctors(data);
        const allSpecialties = data.flatMap(d =>
          Array.isArray(d.specialities)
            ? d.specialities.map(s => s.name)
            : []
        );
        setSpecialties(new Set(allSpecialties));
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  
  const searchQuery = searchParams.get('search') || '';
  const consultationType = searchParams.get('consultation') || '';
  const selectedSpecialties = searchParams.get('specialties')?.split(',') || [];
  const sortBy = searchParams.get('sort') || '';

  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch =
      doctor.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConsultation =
      !consultationType ||
      (consultationType === 'Video Consult'
        ? doctor.video_consult
        : doctor.in_clinic);
    const matchesSpecialties =
      selectedSpecialties.length === 0 ||
      selectedSpecialties.every(spec =>
        (doctor.specialities || []).map(s => s.name).includes(spec)
      );
    return matchesSearch && matchesConsultation && matchesSpecialties;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'fees') {
      const aFee = parseInt(a.fees?.replace(/\D/g, ''), 10) || 0;
      const bFee = parseInt(b.fees?.replace(/\D/g, ''), 10) || 0;
      return aFee - bFee;
    }
    if (sortBy === 'experience') {
      const aExp = parseInt(a.experience, 10) || 0;
      const bExp = parseInt(b.experience, 10) || 0;
      return bExp - aExp;
    }
    return 0;
  });

  
  const updateParams = params => setSearchParams(params, { replace: true });
  const handleSearch = q => {
    const p = new URLSearchParams(searchParams);
    q ? p.set('search', q) : p.delete('search');
    updateParams(p);
  };
  const handleConsultationChange = type => {
    const p = new URLSearchParams(searchParams);
    type ? p.set('consultation', type) : p.delete('consultation');
    updateParams(p);
  };
  const handleSpecialtyChange = (spec, checked) => {
    const p = new URLSearchParams(searchParams);
    let specs = p.get('specialties')?.split(',') || [];
    specs = checked ? [...specs, spec] : specs.filter(s => s !== spec);
    specs.length ? p.set('specialties', specs.join(',')) : p.delete('specialties');
    updateParams(p);
  };
  const handleSortChange = sortType => {
    const p = new URLSearchParams(searchParams);
    sortType ? p.set('sort', sortType) : p.delete('sort');
    updateParams(p);
  };
  
  const handleClearSpecialties = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('specialties');
    updateParams(p);
  };
  const handleClearConsultation = () => {
    const p = new URLSearchParams(searchParams);
    p.delete('consultation');
    updateParams(p);
  };

  if (isLoading) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div className="w-full text-xs h-screen overflow-hidden bg-slate-100 flex flex-col">
      
      <div className="bg-blue-600 py-3 px-10 h-14 z-50">
        <AutocompleteSearch
          value={searchQuery}
          onChange={handleSearch}
          doctors={doctors}
        />
      </div>

      
      <div className="mx-40 flex flex-1 min-h-0 text-xs z-10">
        
        <div className="w-72 overflow-hidden z-50">
          <FilterPanel
            consultationType={consultationType}
            selectedSpecialties={selectedSpecialties}
            sortBy={sortBy}
            specialties={Array.from(specialties)}
            onConsultationChange={handleConsultationChange}
            onSpecialtyChange={handleSpecialtyChange}
            onSortChange={handleSortChange}
            onClearSpecialties={handleClearSpecialties}
            onClearConsultation={handleClearConsultation}
          />
        </div>

        
        <div className="flex-1 min-h-0 overflow-y-auto px-4 scroll-container">
          <DoctorList doctors={sortedDoctors} />
        </div>
      </div>
    </div>
  );
}

export default DoctorsPage;