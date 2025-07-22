import React, { useState } from 'react';
import { ProgressBar } from '../../main/progress/progress';
import { MiningSkill } from './miningSkill';
import { MiningJob } from './miningTypes';
import JobList from '../../design/skill/jobList/joblist';
import { useCharacter } from '../../main/character/characterContext';
import { useAlert } from '../../design/alert/alert';

export const Mining: React.FC = () => {
    const { character, updateCharacter } = useCharacter();
    const { addAlert } = useAlert();
    const [miningSkill, setMiningSkill] = useState<MiningSkill>(character.skills.mining);
    const [activeJob, setActiveJob] = useState<MiningJob | null>(null);
    const [showProgress, setShowProgress] = useState(false);

    // Function to start mining job
    const startMiningJob = (job: MiningJob) => {
        if (miningSkill.canPerformJob(job.id)) {
            setActiveJob(job);
            setShowProgress(true);
            addAlert(`Started mining ${job.name}`, 'info');
        } else {
            addAlert(`You don't have the required level to mine ${job.name}`, 'error');
        }
    };

    // Function called when mining job completes
    const onMiningComplete = () => {
        if (activeJob) {
            const updatedSkill = new MiningSkill();
            updatedSkill.level = miningSkill.level;
            updatedSkill.experience = miningSkill.experience;
            updatedSkill.gainExperience(activeJob.experience);
            
            setMiningSkill(updatedSkill);
            
            // Update character with gained resources and updated skill
            const updatedCharacter = {...character};
            updatedCharacter.skills.mining = updatedSkill;
            
            // Add resources to inventory
            activeJob.resources.forEach(resource => {
                updatedCharacter.addItem({
                    id: resource.toLowerCase(),
                    name: resource,
                    quantity: activeJob.quantity,
                    value: activeJob.value || 1
                });
            });
            
            updateCharacter(updatedCharacter);
            
            // Show success alert
            addAlert(
                `Gained ${activeJob.quantity} ${activeJob.resources.join(', ')}`, 
                'success'
            );
            
            setShowProgress(false);
        }
    };

    // Filter jobs based on level
    const availableJobs = miningSkill.jobs.filter(job => miningSkill.level >= job.requiredLevel);

    return (
        <div className="mining-container">
            <h2>Mining Skill</h2>
            <div className="mining-stats">
                <p>Level: {miningSkill.level}</p>
                <p>Experience: {miningSkill.experience}</p>
            </div>

            {showProgress && activeJob && (
                <div className="mining-progress">
                    <h3>Mining {activeJob.name}...</h3>
                    <ProgressBar
                        duration={activeJob.duration}
                        onComplete={onMiningComplete}
                        color="#964B00" // Brown color for mining
                    />
                </div>
            )}

            <div className="mining-jobs">
                {availableJobs.length > 0 ? (
                    <JobList 
                        jobs={availableJobs} 
                        onSelectJob={startMiningJob}
                    />
                ) : (
                    <p>No mining jobs available at your level.</p>
                )}
            </div>
        </div>
    );
};

export default Mining;
