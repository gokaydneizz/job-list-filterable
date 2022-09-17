import React, {useState} from 'react';
import {useContext} from 'react';
import {useEffect} from 'react';
import {FilterContext} from '../context/FilterContext';

const JobAdv = ({data, tags}) => {
  const {
    company,
    contract,
    new: newFeature,
    featured,
    logo,
    postedAt,
    location,
    position,
  } = data;

  const {tools, role, level, languages} = tags;

  const {filters, setFilters} = useContext(FilterContext);

  return (
    <div
      className={featured ? 'job-adv-container featured' : 'job-adv-container'}>
      <div className='introduction'>
        <img src={logo} alt='job-img' className='job-img' />
        <div className='content'>
          <div className='header'>
            <span className='company'>{company}</span>
            {newFeature && <span className='new'>NEW!</span>}
            {featured && <span className='featured'>Featured</span>}
          </div>
          <h3>{position}</h3>
          <div className='info'>
            <span className='publish-time'>{postedAt}• </span>
            <span className='work-hours'>{contract} • </span>
            <span className='location'>{location}</span>
          </div>
        </div>
      </div>
      <div className='tags'>
        <button
          onClick={e =>
            setFilters([
              ...filters,
              {filter: e.target.value, id: Math.random()},
            ])
          }
          value={role}>
          {role}
        </button>
        <button
          onClick={e =>
            setFilters([
              ...filters,
              {filter: e.target.value, id: Math.random()},
            ])
          }
          value={level}>
          {level}
        </button>
        {languages?.map((language, idx) => (
          <button
            onClick={e =>
              setFilters([
                ...filters,
                {filter: e.target.value, id: Math.random()},
              ])
            }
            key={idx}
            value={language}>
            {language}
          </button>
        ))}
        {tools?.map((tool, idx) => (
          <button
            onClick={e =>
              setFilters([
                ...filters,
                {filter: e.target.value, id: Math.random()},
              ])
            }
            key={idx}
            value={tool}>
            {tool}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobAdv;
