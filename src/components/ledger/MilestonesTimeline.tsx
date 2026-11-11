import React from 'react';
import { CheckCircle2, Clock, CalendarClock, MapPin } from 'lucide-react';
import { MILESTONES } from '../../data/milestones';
import { ProjectMilestone } from '../../types/domain';

export const MilestonesTimeline: React.FC = () => {
  const getStatusBadge = (status: ProjectMilestone['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>COMPLETED</span>
          </span>
        );
      case 'IN PROGRESS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            <span>IN PROGRESS</span>
          </span>
        );
      case 'SCHEDULED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-stone-500/10 text-stone-700 dark:text-stone-400 border border-stone-500/30">
            <CalendarClock className="w-3 h-3" />
            <span>SCHEDULED</span>
          </span>
        );
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 border-l-2 border-saharaTerracotta-500/30 dark:border-stone-800 space-y-8 my-4">
      {MILESTONES.map((ms) => (
        <div key={ms.id} className="relative group">
          {/* Timeline Node Indicator */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-sandLinen dark:border-deepNavy bg-saharaTerracotta-500 shadow-sm" />

          {/* Milestone Card */}
          <div className="p-6 rounded-2xl bg-sandSurface/70 dark:bg-panelDark/70 border border-sandMuted/50 dark:border-stone-800 shadow-sahara-soft hover:border-saharaTerracotta-400 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-saharaTerracotta-600 dark:text-saharaTerracotta-400 tracking-wider">
                  {ms.date}
                </span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <div className="inline-flex items-center gap-1 text-xs font-mono text-stone-600 dark:text-stone-400">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{ms.nodeName}</span>
                </div>
              </div>
              {getStatusBadge(ms.status)}
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 dark:text-stone-100 leading-snug mb-2">
              {ms.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {ms.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MilestonesTimeline;
