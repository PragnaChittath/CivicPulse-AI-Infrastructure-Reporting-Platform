import React, { useState } from 'react';
import { CivicReport, IssueCategory, IssueStatus } from '../types';
import { useCivic } from '../context/CivicContext';
import { getTranslation } from '../i18n/languages';
import {
  MapPin,
  ThumbsUp,
  Clock,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  ShieldCheck,
  Eye,
  Camera,
  Trash2,
  X
} from 'lucide-react';

interface ReportCardProps {
  report: CivicReport;
  onViewDetails: (report: CivicReport) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onViewDetails }) => {
  const { language, upvoteReport, currentUser, role, deleteReport } = useCivic();
  const t = (key: string) => getTranslation(key, language);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Strict ownership check: User can ONLY delete their own reports, or Admin
  const isOwner =
    (currentUser && report.reporter?.id === currentUser.id) ||
    (currentUser && report.reporter?.name === currentUser.name) ||
    (!currentUser && report.reporter?.isAnonymous) ||
    (role === 'admin');

  const getStatusBadge = (status: IssueStatus) => {
    switch (status) {
      case 'reported':
        return { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: t('st_reported') };
      case 'verified':
        return { bg: 'bg-blue-50 text-blue-700 border-blue-200', label: t('st_verified') };
      case 'assigned':
        return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', label: t('st_assigned') };
      case 'in_progress':
        return { bg: 'bg-cyan-50 text-cyan-800 border-cyan-200', label: t('st_in_progress') };
      case 'inspection':
        return { bg: 'bg-purple-50 text-purple-700 border-purple-200', label: t('st_inspection') };
      case 'resolved':
        return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: t('st_resolved') };
      case 'citizen_verified':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold', label: `✓ ${t('st_citizen_verified')}` };
      default:
        return { bg: 'bg-slate-100 text-slate-700 border-slate-200', label: status };
    }
  };

  const getCategoryColor = (cat: IssueCategory) => {
    switch (cat) {
      case 'pothole':
      case 'damaged_road':
        return 'bg-amber-500 text-white';
      case 'garbage':
        return 'bg-emerald-600 text-white';
      case 'water_leakage':
      case 'flooding':
        return 'bg-sky-600 text-white';
      case 'broken_streetlight':
        return 'bg-amber-600 text-white';
      case 'damaged_building':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const statusInfo = getStatusBadge(report.status);

  // Calculate 7-stage progress percentage
  const stages: IssueStatus[] = ['reported', 'verified', 'assigned', 'in_progress', 'inspection', 'resolved', 'citizen_verified'];
  const currentIndex = stages.indexOf(report.status);
  const progressPercent = Math.round(((currentIndex + 1) / stages.length) * 100);

  const handleDeleteConfirm = () => {
    deleteReport(report.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
        {/* Card Media Preview Header */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          {report.images?.before?.[0] ? (
            <img
              src={report.images.before[0]}
              alt={report.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
              <Camera className="w-8 h-8" />
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-md ${getCategoryColor(
                report.category
              )}`}
            >
              {t(`cat_${report.category}`)}
            </span>

            <div className="flex items-center gap-1.5">
              {report.isEmergency && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white shadow-md animate-pulse">
                  🚨 {t('emergency')}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-900/80 backdrop-blur-md text-white shadow-xs">
                #{report.id}
              </span>
            </div>
          </div>

          {/* Bottom Bar: AI Severity Meter */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-[11px] font-semibold text-slate-300">Severity:</span>
              <span
                className={`font-bold ${
                  report.severityScore >= 8
                    ? 'text-red-400'
                    : report.severityScore >= 5
                    ? 'text-amber-300'
                    : 'text-emerald-300'
                }`}
              >
                {report.severityScore}/10
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GPS Locked</span>
            </div>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Status Badge, Stage Bar & Ownership Indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusInfo.bg}`}>
                {statusInfo.label}
              </span>
              <div className="flex items-center gap-1.5">
                {isOwner && (
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                    My Report
                  </span>
                )}
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Stage {currentIndex + 1}/7 • {progressPercent}%
                </span>
              </div>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  report.status === 'citizen_verified'
                    ? 'bg-emerald-500'
                    : report.status === 'resolved'
                    ? 'bg-emerald-600'
                    : 'bg-blue-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Title */}
            <h4
              onClick={() => onViewDetails(report)}
              className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
            >
              {report.title}
            </h4>

            {/* Description */}
            <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
              {report.description}
            </p>

            {/* Location details */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{report.location.address}</span>
            </div>

            {/* Department badge */}
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{report.department}</span>
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            {/* Left Action: Upvote & Delete for Owner */}
            <div className="flex items-center gap-1.5">
              {/* Upvote Button */}
              <button
                onClick={() => upvoteReport(report.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  report.userHasUpvoted
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title="Upvote Issue"
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${report.userHasUpvoted ? 'fill-blue-600' : ''}`} />
                <span>{report.upvotes}</span>
              </button>

              {/* Delete Button (Only for Author / Admin) */}
              {isOwner && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                  title="Delete My Report"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Details Button */}
            <button
              onClick={() => onViewDetails(report)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <span>{t('viewDetails')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                Delete Report #{report.id}?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to delete your report <strong className="text-slate-800">"{report.title}"</strong>? This will permanently remove the ticket, evidence, and tracking history.
              </p>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Only you (as the author) can delete this report.</span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
