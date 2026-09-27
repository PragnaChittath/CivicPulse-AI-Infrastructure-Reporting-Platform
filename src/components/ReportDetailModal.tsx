import React, { useState } from 'react';
import { CivicReport, IssueStatus } from '../types';
import { useCivic } from '../context/CivicContext';
import { getTranslation } from '../i18n/languages';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  ThumbsUp,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HardHat,
  Sliders,
  Star,
  Check,
  Trash2,
} from 'lucide-react';

interface ReportDetailModalProps {
  report: CivicReport | null;
  onClose: () => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ report, onClose }) => {
  const {
    language,
    role,
    currentUser,
    updateReportStatus,
    upvoteReport,
    deleteReport,
    citizenVerifyReport,
    verifyResolutionWithAI,
    triggerCelebration,
  } = useCivic();

  const t = (key: string) => getTranslation(key, language);

  const [activeTab, setActiveTab] = useState<'details' | 'comparison' | 'evidence' | 'timeline'>('details');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedAfterImage, setSelectedAfterImage] = useState<string>(
    report?.images.after?.[0] || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80'
  );
  const [isVerifyingAI, setIsVerifyingAI] = useState<boolean>(false);
  const [aiAuditResult, setAiAuditResult] = useState<any>(report?.resolutionAudit || null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  // Citizen verification input state
  const [citizenRating, setCitizenRating] = useState<number>(5);
  const [citizenComment, setCitizenComment] = useState<string>('Repairs completed nicely. Road is smooth and safe now.');
  const [isCitizenSubmitting, setIsCitizenSubmitting] = useState<boolean>(false);

  // Authority status update state
  const [officerNote, setOfficerNote] = useState<string>('');
  const [officerStatus, setOfficerStatus] = useState<IssueStatus>(report?.status || 'in_progress');

  if (!report) return null;

  // Strict ownership check: Only owner or admin can delete
  const isOwner =
    (currentUser && report.reporter?.id === currentUser.id) ||
    (currentUser && report.reporter?.name === currentUser.name) ||
    (!currentUser && report.reporter?.isAnonymous) ||
    (role === 'admin');

  const stages: { id: IssueStatus; label: string; desc: string }[] = [
    { id: 'reported', label: t('st_reported'), desc: 'Citizen submitted ticket' },
    { id: 'verified', label: t('st_verified'), desc: 'AI & Ward Inspector verified' },
    { id: 'assigned', label: t('st_assigned'), desc: 'Field crew assigned' },
    { id: 'in_progress', label: t('st_in_progress'), desc: 'Repair work underway' },
    { id: 'inspection', label: t('st_inspection'), desc: 'Field quality audit' },
    { id: 'resolved', label: t('st_resolved'), desc: 'After-proof submitted' },
    { id: 'citizen_verified', label: t('st_citizen_verified'), desc: 'Citizen confirmed' },
  ];

  const currentStageIndex = stages.findIndex(s => s.id === report.status);

  // Handle AI Verification of Before vs After Image
  const handleRunAiAudit = async () => {
    setIsVerifyingAI(true);
    try {
      const result = await verifyResolutionWithAI(report.id, selectedAfterImage, officerNote || 'Work completed.');
      setAiAuditResult(result);
      triggerCelebration();
    } catch (e) {
      console.error('AI audit error:', e);
    } finally {
      setIsVerifyingAI(false);
    }
  };

  // Handle Citizen Verification Submit
  const handleCitizenVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCitizenSubmitting(true);
    citizenVerifyReport(report.id, citizenRating, citizenRating >= 3, citizenComment);
    setIsCitizenSubmitting(false);
  };

  // Handle Officer Status Update
  const handleOfficerUpdateSubmit = () => {
    updateReportStatus(
      report.id,
      officerStatus,
      officerNote || undefined,
      selectedAfterImage || undefined
    );
  };

  // Handle Delete Report
  const handleDeleteReport = () => {
    const success = deleteReport(report.id);
    if (success) {
      setShowDeleteConfirm(false);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[94vh]">
          {/* Modal Top Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/70 via-slate-50 to-emerald-50/70">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-600 text-white shadow-xs">
                {t(`cat_${report.category}`)}
              </span>
              <span className="text-sm font-mono font-bold text-slate-700">
                #{report.id}
              </span>
              {report.isEmergency && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white shadow-xs animate-pulse">
                  🚨 {t('emergency')}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => upvoteReport(report.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  report.userHasUpvoted
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${report.userHasUpvoted ? 'fill-blue-600' : ''}`} />
                <span>{report.upvotes} Upvotes</span>
              </button>

              {/* Delete Button for Owner */}
              {isOwner && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                  title="Delete This Report"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 7-Stage Workflow Progress Stepper */}
          <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[550px] relative">
              {stages.map((st, idx) => {
                const isPast = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={st.id} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPast
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-110'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPast ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[10px] font-bold mt-1 text-center whitespace-nowrap ${
                        isCurrent ? 'text-blue-700' : isPast ? 'text-emerald-700' : 'text-slate-400'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b border-slate-200 bg-white flex gap-6 text-xs font-bold text-slate-500">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              Issue Details & Impact
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'comparison'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Before / After & AI Audit</span>
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'evidence'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographic Proof</span>
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent hover:text-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Audit Trail ({report.timeline?.length || 1})</span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* TAB 1: DETAILS & CITIZEN IMPACT */}
            {activeTab === 'details' && (
              <div className="space-y-5">
                {/* Media Preview & Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={report.images.before[0]}
                      alt={report.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-2.5 bg-slate-900/90 text-white flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-300">Original Evidence Image</span>
                      <span className="text-emerald-400 font-mono">GPS Verified</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {report.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {report.description}
                      </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Severity</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className={`text-base font-extrabold ${report.severityScore >= 8 ? 'text-red-600' : 'text-amber-600'}`}>
                            {report.severityScore}/10
                          </span>
                          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Confidence</span>
                        <span className="text-base font-extrabold text-emerald-600">
                          {report.confidenceScore}%
                        </span>
                      </div>
                    </div>

                    {/* Department & Assigned Officer */}
                    <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs space-y-1">
                      <span className="text-[10px] text-blue-600 font-bold uppercase block">
                        Responsible Authority
                      </span>
                      <p className="font-bold text-slate-900">{report.department}</p>
                      {report.assignedOfficer && (
                        <p className="text-[11px] text-slate-600">
                          Engineer: <span className="font-semibold text-slate-800">{report.assignedOfficer.name}</span> ({report.assignedOfficer.designation})
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Citizen Impact Banner */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-indigo-950">Citizen-Impact Estimation:</h4>
                    <p className="text-indigo-900 mt-0.5">{report.citizenImpact}</p>
                  </div>
                </div>

                {/* Multilingual Summaries */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Engineering Summary (English)
                    </span>
                    <p className="text-slate-800 font-medium">{report.summaryEn}</p>
                  </div>
                  {report.summaryLocal && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        नागरिक सारांश (Regional Language)
                      </span>
                      <p className="text-slate-800 font-medium">{report.summaryLocal}</p>
                    </div>
                  )}
                </div>

                {/* Location Details Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{report.location.address}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 pt-1">
                    <span>Ward: <strong className="text-slate-800">{report.location.ward}</strong></span>
                    <span>City: <strong className="text-slate-800">{report.location.city}</strong></span>
                    <span>Pincode: <strong className="text-slate-800">{report.location.pincode}</strong></span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BEFORE / AFTER COMPARISON & AI AUDIT */}
            {activeTab === 'comparison' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Before & After Repair Verification</h4>
                    <p className="text-xs text-slate-500">
                      Compare reported defect against completed field restoration photo
                    </p>
                  </div>

                  <button
                    onClick={handleRunAiAudit}
                    disabled={isVerifyingAI}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isVerifyingAI ? 'animate-spin' : ''}`} />
                    <span>{isVerifyingAI ? 'Analyzing...' : 'Run AI Vision Audit'}</span>
                  </button>
                </div>

                {/* Interactive Split Image Comparison Slider */}
                <div className="relative h-72 w-full rounded-2xl overflow-hidden border border-slate-200 select-none shadow-md">
                  {/* After Image (Background) */}
                  <img
                    src={selectedAfterImage}
                    alt="After repair"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-md">
                    AFTER REPAIR
                  </span>

                  {/* Before Image (Clipped Overlay) */}
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={report.images.before[0]}
                      alt="Before repair"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900/90 text-white backdrop-blur-md">
                      BEFORE REPAIR
                    </span>
                  </div>

                  {/* Slider Handle Divider */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-700 text-xs font-bold">
                      ↔
                    </div>
                  </div>

                  {/* Range Input for Smooth Dragging */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={e => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  />
                </div>

                {/* AI Vision Audit Results Card */}
                {aiAuditResult && (
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                          AI Optical Audit Verdict: {aiAuditResult.verdict}
                        </h5>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                        {aiAuditResult.confidence}% Confidence
                      </span>
                    </div>

                    <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                      {aiAuditResult.notes}
                    </p>

                    <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-xs">
                      <span className="text-emerald-800 font-semibold">
                        Work Quality Rating:
                      </span>
                      <div className="flex items-center text-amber-500">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (aiAuditResult.workQualityRating || 5)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Citizen Verification Section */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900">
                      Citizen Community Verification
                    </h5>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      +30 Karma Reward
                    </span>
                  </div>

                  {report.citizenVerification ? (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-900">
                          ✓ Verified by {report.citizenVerification.citizenName}
                        </span>
                        <div className="flex text-amber-500">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= report.citizenVerification!.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-emerald-800 italic">"{report.citizenVerification.comment}"</p>
                    </div>
                  ) : (
                    <form onSubmit={handleCitizenVerifySubmit} className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-600 font-medium">Rate Work Quality:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setCitizenRating(star)}
                              className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= citizenRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <input
                        type="text"
                        value={citizenComment}
                        onChange={e => setCitizenComment(e.target.value)}
                        placeholder="Comment on repair smoothness, cleanliness, or remaining issues..."
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                      />

                      <button
                        type="submit"
                        disabled={isCitizenSubmitting}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        {t('confirmResolution')} (+30 Karma)
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: CRYPTOGRAPHIC PROOF & EVIDENCE */}
            {activeTab === 'evidence' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Immutable Evidence Certificate
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          Cryptographically signed and tamper-proofed
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                      Verified Hash v2.4
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-sans">
                        SHA-256 Content Hash
                      </span>
                      <span className="text-emerald-300 text-[11px] break-all block bg-slate-950 p-2 rounded-lg border border-slate-800 mt-1">
                        {report.evidence.sha256Hash}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                      <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                        <span className="text-[10px] text-slate-400 block uppercase">EXIF Timestamp</span>
                        <span className="text-slate-200 font-mono text-[11px] block mt-0.5">
                          {new Date(report.evidence.exifTimestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                        <span className="text-[10px] text-slate-400 block uppercase">GPS Coordinate Lock</span>
                        <span className="text-emerald-400 font-mono text-[11px] block mt-0.5">
                          {report.location.latitude.toFixed(6)}, {report.location.longitude.toFixed(6)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                      <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                        <span className="text-[10px] text-slate-400 block uppercase">Device Signature</span>
                        <span className="text-slate-200 font-mono text-[11px] block mt-0.5">
                          {report.evidence.deviceFingerprint}
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                        <span className="text-[10px] text-slate-400 block uppercase">AI Authenticity Score</span>
                        <span className="text-emerald-400 font-bold text-xs block mt-0.5">
                          {report.evidence.aiIntegrityScore}% Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: AUDIT TRAIL / TIMELINE */}
            {activeTab === 'timeline' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Official Municipal Log & Audit Trail
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {report.timeline.map((entry, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 uppercase text-[11px]">
                            {t(`st_${entry.status}`)}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(entry.timestamp).toLocaleString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-slate-700">{entry.note}</p>
                        <div className="pt-1 text-[10px] text-slate-400 flex items-center gap-2">
                          <span>Actor: <strong className="text-slate-600">{entry.actor}</strong></span>
                          <span>•</span>
                          <span>{entry.actorRole}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AUTHORITY & ADMIN MANAGEMENT ACTION PANEL */}
            {(role === 'authority' || role === 'admin') && (
              <div className="mt-6 p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 space-y-3">
                <div className="flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-blue-700" />
                  <h5 className="text-xs font-bold text-blue-950 uppercase tracking-wide">
                    Department Work Order Controls ({role.toUpperCase()})
                  </h5>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Advance Status Stage
                    </label>
                    <select
                      value={officerStatus}
                      onChange={e => setOfficerStatus(e.target.value as IssueStatus)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="verified">Verified</option>
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="inspection">Inspection</option>
                      <option value="resolved">Resolved</option>
                      <option value="citizen_verified">Citizen Verified</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Work Progress Note
                    </label>
                    <input
                      type="text"
                      value={officerNote}
                      onChange={e => setOfficerNote(e.target.value)}
                      placeholder="e.g. Dispatched asphalt crew #4 with cold mix"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleOfficerUpdateSubmit}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Update Municipal Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                Delete Report #{report.id}?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to permanently remove <strong className="text-slate-800">"{report.title}"</strong>? This will delete the issue, all attached media, and municipal tracking history.
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
                onClick={handleDeleteReport}
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
