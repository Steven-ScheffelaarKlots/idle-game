import React from 'react';
import Job from '../job/job';
import jobType from '../../types/jobTypes';

// JobList component that takes an array of jobs
interface JobListProps {
  jobs: jobType[];
  onSelectJob?: (job: jobType) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob }) => {
  if (!jobs || jobs.length === 0) {
    return <div className="empty-job-list">No jobs available</div>;
  }

  return (
    <div className="job-list-container">
      <h2>Available Jobs</h2>
      <div className="job-list">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="job-item-wrapper" 
            onClick={() => onSelectJob && onSelectJob(job)}
          >
            <Job {...job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
