import React from 'react';
import Image from 'next/image';

export interface Reward {
  name: string;
  quantity: number;
  icon?: string;
}

export interface JobProps {
  /** Name of the job */
  name: string;
  /** Duration of the job in milliseconds */
  duration: number;
  /** Optional rewards gained from completing the job */
  rewards?: Reward[];
  /** Optional experience points gained from the job */
  experience?: number;
  /** Optional image URL for the job */
  imageUrl?: string;
  /** Optional level requirement for the job */
  requiredLevel?: number;
  /** Whether the job is currently active */
  isActive?: boolean;
  /** Callback function when the job is clicked */
  onSelect?: () => void;
  /** Callback function when the job is completed */
  onComplete?: () => void;
}

export const Job: React.FC<JobProps> = ({
  name,
  duration,
  rewards = [],
  experience = 0,
  imageUrl,
  requiredLevel,
  isActive = false,
  onSelect,
  // onComplete,
}) => {
  // Format duration from milliseconds to seconds
  const durationInSeconds = Math.round(duration / 1000);
  
  return (
    <div 
      className={`job-container ${isActive ? 'job-active' : ''}`}
      onClick={onSelect}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '12px',
        margin: '8px 0',
        cursor: onSelect ? 'pointer' : 'default',
        backgroundColor: isActive ? '#f0f8ff' : 'white',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div className="job-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {imageUrl && (
          <div className="job-image">
            <Image 
              src={imageUrl} 
              alt={`${name} icon`} 
              width={48} 
              height={48}
              style={{ borderRadius: '4px' }}
            />
          </div>
        )}
        
        <div className="job-title-info">
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{name}</h3>
          {requiredLevel && (
            <span style={{ fontSize: '14px', color: '#666' }}>
              Required Level: {requiredLevel}
            </span>
          )}
        </div>
      </div>

      <div className="job-details" style={{ fontSize: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Duration: {durationInSeconds}s</span>
          {experience > 0 && <span>XP: +{experience}</span>}
        </div>
      </div>

      {rewards.length > 0 && (
        <div className="job-rewards" style={{ fontSize: '14px' }}>
          <div style={{ marginBottom: '4px' }}>Rewards:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {rewards.map((reward, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: '#f5f5f5', 
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
              >
                {reward.icon && (
                  <Image 
                    src={reward.icon} 
                    alt={reward.name} 
                    width={16} 
                    height={16} 
                    style={{ marginRight: '4px' }}
                  />
                )}
                <span>{reward.quantity}x {reward.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Job;