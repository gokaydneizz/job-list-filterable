import {useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import JobAdv from './Components/JobAdv';
import Navbar from './Components/Navbar';
import {FilterContext} from './context/FilterContext';
import JobAdvertisements from './data.json';
import RemoveIcon from './images/icon-remove.svg';

function App() {
  const {filters, setFilters} = useContext(FilterContext);
  const filterNames = [];
  const [job, setJob] = useState(JobAdvertisements);
  const [filteredJob, setFilteredJob] = useState([]);
  const names = filters.map(filter => filter.filter);
  const filtered = filters.filter(
    ({filter}, index) => !names.includes(filter, index + 1)
  );

  for (const filter of filters) {
    filterNames.push(filter.filter);
  }

  const filterNamesSet = Array.from(new Set(filterNames));

  const deleteFilters = id => {
    setFilters(
      filters.filter(filter => {
        return filter.id !== id;
      })
    );
  };

  const clearHandler = () => {
    setFilters([]);
  };

  useEffect(() => {
    if (filtered.length > 0) {
      setFilteredJob(
        job.filter(job => {
          return filterNamesSet.every(name => job.tags?.includes(name));
        })
      );
    } else {
      setFilteredJob(job);
    }
  }, [filtered.length]);

  return (
    <>
      <Navbar />
      {filtered.length !== 0 && (
        <div className='filter-container'>
          <div className='filters'>
            {filtered?.map((filter, idx) => (
              <div key={idx} className='filter'>
                <span>{filter.filter}</span>
                <div
                  onClick={deleteFilters.bind(null, filter.id)}
                  className='removeIconBox'>
                  <img src={RemoveIcon} alt='' />
                </div>
              </div>
            ))}
          </div>
          <span onClick={clearHandler} className='clear'>
            Clear
          </span>
        </div>
      )}
      <main className='App'>
        <div className='job-advertisements'>
          {filteredJob.map(data => (
            <JobAdv
              data={data}
              key={data.id}
              tags={{
                tools: data.tools,
                role: data.role,
                level: data.level,
                languages: data.languages,
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
