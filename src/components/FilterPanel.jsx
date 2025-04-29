

import React from 'react';

const FilterPanel = ({
  consultationType,
  selectedSpecialties,
  sortBy,
  specialties,
  onConsultationChange,
  onSpecialtyChange,
  onSortChange,
  onClearSpecialties,
  onClearConsultation
}) => (
  <div className="space-y-8 z-10">
    
    <div className="rounded-md bg-white space-y-4 p-5 text-xs z-10">
      <h3 
        className="text-xs font-semibold text-gray-700 uppercase tracking-wide"
        data-testid="filter-header-sort"
      >
        Sort By
      </h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2  text-gray-600">
          <input
            type="radio"
            className="form-radio text-blue-600"
            checked={sortBy === 'fees'}
            onChange={() => onSortChange('fees')}
            data-testid="sort-fees"
          />
          <span>Fees - Low to High</span>
        </label>
        <label className="flex items-center space-x-2 text-sm text-gray-600">
          <input
            type="radio"
            className="form-radio text-blue-600"
            checked={sortBy === 'experience'}
            onChange={() => onSortChange('experience')}
            data-testid="sort-experience"
          />
          <span>Experience - High to Low</span>
        </label>
      </div>
    </div>

    
    <div className="rounded-md bg-white p-5 space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h3 
          className="text-xs font-semibold text-gray-700 uppercase tracking-wide"
          data-testid="filter-header-speciality"
        >Speciality</h3>
        <button
          className="text-blue-600 text-xs hover:underline"
          onClick={onClearSpecialties}
        >
          Clear
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto scrollbar-hide">
        {specialties.map(specialty => {
          const testId = `filter-specialty-${specialty.replace(/[\s/]+/g, '-')}`;
          return (
            <label 
              key={specialty} 
              className="flex items-center space-x-2  text-gray-600"
            >
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 rounded"
                checked={selectedSpecialties.includes(specialty)}
                onChange={e => onSpecialtyChange(specialty, e.target.checked)}
                data-testid={testId}
              />
              <span>{specialty}</span>
            </label>
          );
        })}
      </div>
    </div>

    
    <div className="space-y-4 rounded-md bg-white p-5 text-xs">
      <div className="flex items-center justify-between">
        <h3 
          className="text-xs font-semibold text-gray-700 uppercase tracking-wide"
          data-testid="filter-header-moc"
        >Consultation Mode</h3>
        <button
          className="text-blue-600 text-xs hover:underline"
          onClick={onClearConsultation}
        >
          Clear
        </button>
      </div>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-gray-600">
          <input
            type="radio"
            className="form-radio text-blue-600"
            checked={consultationType === 'Video Consult'}
            onChange={() => onConsultationChange('Video Consult')}
            data-testid="filter-video-consult"
          />
          <span>Video Consult</span>
        </label>
        <label className="flex items-center space-x-2 text-sm text-gray-600">
          <input
            type="radio"
            className="form-radio text-blue-600"
            checked={consultationType === 'In Clinic'}
            onChange={() => onConsultationChange('In Clinic')}
            data-testid="filter-in-clinic"
          />
          <span>In Clinic</span>
        </label>
      </div>
    </div>
  </div>
);

export default FilterPanel;