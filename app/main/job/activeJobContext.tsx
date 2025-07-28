'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// Generic job type that can be extended by specific skill jobs
export interface BaseJob {
  id: string;
  name: string;
  duration: number;
  skillType: string;
}

export type JobStatus = 'idle' | 'in-progress' | 'completed' | 'cancelled';

interface ActiveJobContextType {
  activeJob: BaseJob | null;
  jobStatus: JobStatus;
  progress: number;
  startJob: (job: BaseJob) => void;
  completeJob: () => void;
  cancelJob: () => void;
  updateProgress: (newProgress: number) => void;
  resetJob: () => void;
}

const ActiveJobContext = createContext<ActiveJobContextType | undefined>(undefined);

interface ActiveJobProviderProps {
  children: ReactNode;
}

export const ActiveJobProvider: React.FC<ActiveJobProviderProps> = ({ children }) => {
  const [activeJob, setActiveJob] = useState<BaseJob | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus>('idle');
  const [progress, setProgress] = useState<number>(0);

  const startJob = useCallback((job: BaseJob) => {
    setActiveJob(job);
    setJobStatus('in-progress');
    setProgress(0);
  }, []);

  const completeJob = useCallback(() => {
    setJobStatus('completed');
    setProgress(100);
  }, []);

  const cancelJob = useCallback(() => {
    setJobStatus('cancelled');
  }, []);

  const resetJob = useCallback(() => {
    setActiveJob(null);
    setJobStatus('idle');
    setProgress(0);
  }, []);

  const updateProgress = useCallback((newProgress: number) => {
    setProgress(newProgress);
  }, []);

  const value = {
    activeJob,
    jobStatus,
    progress,
    startJob,
    completeJob,
    cancelJob,
    updateProgress,
    resetJob
  };

  return (
    <ActiveJobContext.Provider value={value}>
      {children}
    </ActiveJobContext.Provider>
  );
};

export function useActiveJob(): ActiveJobContextType {
  const context = useContext(ActiveJobContext);
  if (context === undefined) {
    throw new Error('useActiveJob must be used within an ActiveJobProvider');
  }
  return context;
}

// Helper hook to check if there's currently an active job
export function useIsJobActive(): boolean {
  const { activeJob, jobStatus } = useActiveJob();
  return activeJob !== null && jobStatus === 'in-progress';
}

// Helper hook to get the current job by specific skill type
export function useActiveJobBySkill(skillType: string): BaseJob | null {
  const { activeJob } = useActiveJob();
  
  if (activeJob && activeJob.skillType === skillType) {
    return activeJob;
  }
  
  return null;
}
