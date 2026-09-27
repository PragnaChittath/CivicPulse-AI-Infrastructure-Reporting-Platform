import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { getTranslation } from '../i18n/languages';
import { CivicReport, IssueStatus } from '../types';
import {
  TrendingUp,
  AlertOctagon,
  Clock,
  CheckCircle2,
  Building2,
  Users,
  HardHat,
  Filter,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  Radio,
  FileSpreadsheet
} from 'lucide-react';

interface AuthorityDashboardProps {
  onSelectReport: (report: CivicReport) => void;
}

export const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({ onSelectReport }) => {
  const { reports, language, updateReportStatus } = useCivic();
  const t = (key: string) => getTranslation(key, language);

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState<string>('all');

  // Stats calculation
  const totalReports = reports.length;
  const resolvedCount = reports.filter(r => r.status === 'resolved' || r.status === 'citizen_verified').length;
  const inProgressCount = reports.filter(r => r.status === 'in_progress' || r.status === 'inspection').length;
  const emergencyCount = reports.filter(r => r.isEmergency).length;
  const resolutionRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0;
  const avgResolutionHours = 28.4;
  const slaCompliancePercent = 94.2;

  // Department workload distribution
  const departments = [
    'Public Works Department (PWD)',
    'Solid Waste Management (SWM)',
    'Water Supply & Sewerage Board',
    'Electricity Supply & Lighting (DISCOM)',
    'Disaster Management & Drainage',
  ];

  const deptStats = departments.map(dept => {
    const deptReports = reports.filter(r => r.department === dept);
    const resolved = deptReports.filter(r => r.status === 'resolved' || r.status === 'citizen_verified').length;
    const active = deptReports.length - resolved;
    return {
      name: dept,
      total: deptReports.length,
      active,
      resolved,
      percentage: deptReports.length > 0 ? Math.round((resolved / deptReports.length) * 100) : 100
    };
  });

  // Filtered reports for the table
  const filteredTableReports = reports.filter(r => {
    if (selectedDeptFilter !== 'all' && r.department !== selectedDeptFilter) return false;
    if (selectedSeverityFilter === 'critical' && r.severityScore < 9) return false;
    if (selectedSeverityFilter === 'high' && (r.severityScore < 7 || r.severityScore >= 9)) return false;
    if (selectedSeverityFilter === 'medium' && r.severityScore >= 7) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Authority Command & Analytics Center
            </h2>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
              Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time municipal triage, department workload balancing, and SLA compliance tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                ['ID,Title,Category,Status,Severity,Department,Ward']
                  .concat(
                    reports.map(
                      r =>
                        `"${r.id}","${r.title}","${r.category}","${r.status}",${r.severityScore},"${r.department}","${r.location.ward}"`
                    )
                  )
                  .join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', 'CivicPulse_Municipal_Report.csv');
              document.body.appendChild(link);
              link.click();
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Total Civic Tickets</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalReports}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              +12% wk
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{inProgressCount} in active remediation</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Resolution Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{resolutionRate}%</span>
            <span className="text-xs font-semibold text-emerald-600">{resolvedCount} verified</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">High citizen satisfaction index</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Avg Resolution Time</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{avgResolutionHours}h</span>
            <span className="text-xs font-semibold text-emerald-600">-6.2h vs benchmark</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Target turnaround &lt; 48 hours</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Active Emergencies</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-red-600">{emergencyCount}</span>
            <span className="text-xs font-extrabold text-red-600 uppercase">Priority 1</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Directly routed to rapid response unit</p>
        </div>
      </div>

      {/* Department Workload Matrix */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Department Workload & Efficiency Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Active caseload vs resolved tickets per municipal division
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl">
            SLA Compliance: {slaCompliancePercent}%
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {deptStats.map(d => (
            <div key={d.name} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-900">{d.name}</span>
                <span className="text-slate-600">
                  {d.active} Active / {d.total} Total ({d.percentage}% Complete)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Triage Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Municipal Tickets & Dispatch Queue
            </h3>
            <p className="text-xs text-slate-500">
              Review, assign crew, or advance verification stages
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDeptFilter}
              onChange={e => setSelectedDeptFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={selectedSeverityFilter}
              onChange={e => setSelectedSeverityFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical (9-10)</option>
              <option value="high">High (7-8)</option>
              <option value="medium">Medium (&lt; 7)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Ticket ID</th>
                <th className="px-4 py-3">Issue & Location</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTableReports.map(rep => (
                <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-blue-600">
                    #{rep.id}
                  </td>
                  <td className="px-4 py-3.5 max-w-xs">
                    <div className="font-bold text-slate-900 truncate">{rep.title}</div>
                    <div className="text-[11px] text-slate-400 truncate">{rep.location.address}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        rep.severityScore >= 8 ? 'text-red-600' : 'text-amber-600'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      {rep.severityScore}/10
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {t(`st_${rep.status}`)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 text-[11px]">
                    {rep.department}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectReport(rep)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>

                      {rep.status !== 'resolved' && rep.status !== 'citizen_verified' && (
                        <button
                          onClick={() => updateReportStatus(rep.id, 'resolved', 'Fast-tracked resolution by Authority Control desk.')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
