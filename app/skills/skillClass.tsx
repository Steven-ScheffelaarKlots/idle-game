type Job = {
    id: string;
    name: string;
    description?: string;
    requiredLevel: number;
    duration: number; // Duration in milliseconds
    experience: number; // Experience gained from the job
};

export class Skill {
    name: string;
    experience: number;
    level: number;
    jobs?: Job[];

    constructor(
        name: string,
        experience: number = 0,
        level: number = 1,
        jobs?: Job[]
    ) {
        this.name = name;
        this.experience = experience;
        this.level = level;
        this.jobs = jobs;
    }

        // Method to gain experience
        gainExperience(amount: number) {
            this.experience += amount;
            this.checkLevelUp();
        }
    
        // Check if the player can level up
        checkLevelUp() {
            // Simple level formula: level = sqrt(experience / 10)
            const newLevel = Math.floor(Math.sqrt(this.experience / 10)) + 1;
            if (newLevel > this.level) {
                this.level = newLevel;
                return true;
            }
            return false;
        }
    
        // Check if a job can be performed based on level requirement
        canPerformJob(jobId: string): boolean {
            if (!this.jobs) {
                return false;
            }

            const job = this.jobs.find(j => j.id === jobId);
            if (!job) {
                return false;
            }
            return this.level >= job.requiredLevel;
        }

        getLevel(): number {
            return this.level;
        }

        getExperience(): number {
            return this.experience;
        }

        getJobs(): Job[] {
            return this.jobs || [];
        }

        getName(): string {
            return this.name;
        }
}