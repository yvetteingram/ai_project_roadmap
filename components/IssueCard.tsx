
import React from 'react';
import { NewsletterIssue, IssueStatus } from '../types';

interface IssueCardProps {
  issue: NewsletterIssue;
  onClick: (id: string) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case IssueStatus.IDEA: return 'bg-slate-600';
      case IssueStatus.DRAFT: return 'bg-blue-600';
      case IssueStatus.REVIEW: return 'bg-yellow-600';
      case IssueStatus.FINAL: return 'bg-emerald-600';
      case IssueStatus.PUBLISHED: return 'bg-purple-600';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div 
      onClick={() => onClick(issue.id)}
      className="bg-slate-800 border border-slate-700 p-5 rounded-xl hover:border-blue-500 transition-colors cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getStatusColor(issue.status)}`}>
          {issue.status}
        </span>
        <span className="text-slate-500 text-xs">{issue.publishDate}</span>
      </div>
      <h3 className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors mb-1 truncate">
        {issue.title || "Untitled Issue"}
      </h3>
      <p className="text-slate-400 text-xs mb-4 line-clamp-2">
        {issue.theme} • {issue.type}
      </p>
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-2">
           {[1].map(i => (
             <div key={i} className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[10px]">KD</div>
           ))}
        </div>
        <span className="text-slate-500 text-[10px]">1 Assignee</span>
      </div>
    </div>
  );
};
