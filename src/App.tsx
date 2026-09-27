/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CivicProvider, useCivic } from './context/CivicContext';
import { Navbar } from './components/Navbar';
import { ReportCard } from './components/ReportCard';
import { ReportWizardModal } from './components/ReportWizardModal';
import { ReportDetailModal } from './components/ReportDetailModal';
import { CivicMap } from './components/CivicMap';
import { AuthorityDashboard } from './components/AuthorityDashboard';
import { PredictiveAnalyticsView } from './components/PredictiveAnalyticsView';
import { DigitalTwinView } from './components/DigitalTwinView';
import { CitizenRewardsView } from './components/CitizenRewardsView';
import { CivicChatbotModal } from './components/CivicChatbotModal';
import { AuthModal } from './components/AuthModal';
import { getTranslation } from './i18n/languages';
import { CivicReport, IssueCategory, IssueStatus } from './types';
import {
  Search,
  Filter,
  PlusCircle,
  Sparkles,
  MapPin,
  Building2,
  CheckCircle2,
  Flame,
  Radio,
  SlidersHorizontal,
  RotateCcw,
  Bot,
  ShieldCheck,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

function MainContent() {
  const {
    reports,
    language,
    role,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    filterSeverity,
    setFilterSeverity,
    filterWard,
    setFilterWard,
    selectedReport,
    setSelectedReport,
    activeLocation,
    setActiveLocation,
  } = useCivic();

  const t = (key: string) => getTranslation(key, language);

  const [activeTab, setActiveTab] = useState<string>('feed');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);

  // Extract unique wards for filter dropdown
  const uniqueWards = useMemo(() => {
    const set = new Set<string>();
    reports.forEach(r => {
      if (r.location?.ward) set.add(r.location.ward);
    });
    return Array.from(set);
  }, [reports]);

  // Filtered reports list
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = r.title.toLowerCase().includes(query);
        const matchDesc = r.description.toLowerCase().includes(query);
        const matchWard = r.location.ward.toLowerCase().includes(query);
        const matchAddress = r.location.address.toLowerCase().includes(query);
        const matchId = r.id.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchWard && !matchAddress && !matchId) return false;
      }

      // Category
      if (filterCategory !== 'all' && r.category !== filterCategory) return false;

      // Status
      if (filterStatus !== 'all' && r.status !== filterStatus) return false;

      // Ward
      if (filterWard !== 'all' && r.location.ward !== filterWard) return false;

      // Severity
      if (filterSeverity === 'critical' && r.severityScore < 9) return false;
      if (filterSeverity === 'high' && (r.severityScore < 7 || r.severityScore >= 9)) return false;
      if (filterSeverity === 'medium' && (r.severityScore < 4 || r.severityScore >= 7)) return false;
      if (filterSeverity === 'low' && r.severityScore >= 4) return false;

      return true;
    });
  }, [reports, searchQuery, filterCategory, filterStatus, filterWard, filterSeverity]);

  const resetFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setFilterStatus('all');
    setFilterSeverity('all');
    setFilterWard('all');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenChatModal={() => setIsChatModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* VIEW 1: FEED OF ALL REPORTS */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Hero Quick Metrics & Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-1.5 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20 backdrop-blur-md">
                    Civic Infrastructure AI Portal
                  </span>
                  <span className="text-xs text-blue-200">Pan-India Multilingual Platform</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Empowering Citizens • Resolving City Infrastructure
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                  Report potholes, overflowing garbage, broken streetlights, or drainage leaks via photo, voice, or video in any Indian language. AI triages severity and verifies completed repairs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 relative z-10">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-white hover:bg-blue-50 text-blue-900 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <PlusCircle className="w-4 h-4 text-blue-600" />
                  <span>{t('reportIssue')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('map')}
                  className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-emerald-300" />
                  <span>{t('liveMap')}</span>
                </button>
              </div>
            </div>

            {/* Comprehensive Filter & Search Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search input */}
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Category Filter */}
                  <select
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700"
                  >
                    <option value="all">All Categories ({reports.length})</option>
                    <option value="pothole">🕳️ {t('cat_pothole')}</option>
                    <option value="garbage">🗑️ {t('cat_garbage')}</option>
                    <option value="water_leakage">💧 {t('cat_water_leakage')}</option>
                    <option value="broken_streetlight">💡 {t('cat_broken_streetlight')}</option>
                    <option value="damaged_road">🛣️ {t('cat_damaged_road')}</option>
                    <option value="flooding">🌊 {t('cat_flooding')}</option>
                    <option value="damaged_building">🏚️ {t('cat_damaged_building')}</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="reported">{t('st_reported')}</option>
                    <option value="verified">{t('st_verified')}</option>
                    <option value="assigned">{t('st_assigned')}</option>
                    <option value="in_progress">{t('st_in_progress')}</option>
                    <option value="inspection">{t('st_inspection')}</option>
                    <option value="resolved">{t('st_resolved')}</option>
                    <option value="citizen_verified">{t('st_citizen_verified')}</option>
                  </select>

                  {/* Severity Filter */}
                  <select
                    value={filterSeverity}
                    onChange={e => setFilterSeverity(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700"
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">🚨 Critical (9-10)</option>
                    <option value="high">🔥 High (7-8)</option>
                    <option value="medium">⚡ Medium (4-6)</option>
                    <option value="low">🌱 Low (1-3)</option>
                  </select>

                  {/* Ward Filter */}
                  <select
                    value={filterWard}
                    onChange={e => setFilterWard(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700"
                  >
                    <option value="all">All Municipal Wards</option>
                    {uniqueWards.map(w => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>

                  {(searchQuery || filterCategory !== 'all' || filterStatus !== 'all' || filterSeverity !== 'all' || filterWard !== 'all') && (
                    <button
                      onClick={resetFilters}
                      className="px-3 py-2 text-xs text-blue-600 hover:text-blue-800 font-bold hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filter Count & Status Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>
                  Showing <strong className="text-slate-900">{filteredReports.length}</strong> verified civic tickets
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SHA-256 Tamper Protection Active
                </span>
              </div>
            </div>

            {/* Reports Grid */}
            {filteredReports.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No matching civic reports found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or filters, or be the first to report an issue in this ward!
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map(report => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onViewDetails={rep => setSelectedReport(rep)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: LIVE CIVIC MAP */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{t('liveMap')}</h2>
                <p className="text-xs text-slate-500">
                  Real-time geospatial hazard pins, severity heatmaps, and municipal ward zones
                </p>
              </div>
            </div>
            <CivicMap onSelectReport={rep => setSelectedReport(rep)} />
          </div>
        )}

        {/* VIEW 3: AUTHORITY DASHBOARD */}
        {activeTab === 'dashboard' && (
          <AuthorityDashboard onSelectReport={rep => setSelectedReport(rep)} />
        )}

        {/* VIEW 4: PREDICTIVE ANALYTICS */}
        {activeTab === 'predictive' && <PredictiveAnalyticsView />}

        {/* VIEW 5: DIGITAL TWIN ASSET VIEW */}
        {activeTab === 'digitalTwin' && <DigitalTwinView />}

        {/* VIEW 6: CITIZEN KARMA REWARDS */}
        {activeTab === 'rewards' && <CitizenRewardsView />}
      </main>

      {/* Floating Action Button for Nagarika AI Chatbot */}
      <button
        onClick={() => setIsChatModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer group"
        title="Open Nagarika AI Assistant"
      >
        <Sparkles className="w-5 h-5 text-white animate-pulse" />
        <span className="text-xs font-bold hidden sm:inline">Nagarika AI Assistant</span>
        <span className="w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
      </button>

      {/* Modals */}
      <ReportWizardModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <ReportDetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

      <CivicChatbotModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        onOpenReportWizard={() => {
          setIsChatModalOpen(false);
          setIsReportModalOpen(true);
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CivicProvider>
      <MainContent />
    </CivicProvider>
  );
}
