import { Skill } from '../skillClass';
import miningJobs from './miningJobs';
import { MiningJob } from './miningTypes';

// Mining skill class that extends the base Skill class
export class MiningSkill extends Skill {
    jobs: MiningJob[];
    
    constructor() {
        // Initialize with Mining name and default values
        super('Mining', 0, 1);
        
        // Define mining jobs
        this.jobs = miningJobs;
    }
}


export default MiningSkill;

