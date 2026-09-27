import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { AssetTwin } from '../types';
import {
  Building2,
  Activity,
  Layers,
  Calendar,
  AlertCircle,
  Clock,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Sparkles
} from 'lucide-react';

export const DigitalTwinView: React.FC = () => {
  const { assets } = useCivic();
  const [selectedAsset, setSelectedAsset] = useState<AssetTwin>(assets[0] || null);

  const getConditionColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Infrastructure Digital Twin & Asset Health Registry
            </h2>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 rounded-full">
              BIM / GIS v4.0
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous structural monitoring, IoT telemetry, lifecycle maintenance history, and open complaints tracking
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Asset List Navigation */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
            <span>Registered Municipal Assets</span>
            <span>{assets.length} Assets</span>
          </div>

          <div className="space-y-2">
            {assets.map(asset => {
              const isSelected = selectedAsset?.id === asset.id;
              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-600">
                        {asset.id}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
                        {asset.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{asset.ward}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${getConditionColor(
                          asset.conditionScore
                        )}`}
                      >
                        {asset.conditionScore}% Health
                      </span>
                      {asset.openTicketsCount > 0 && (
                        <span className="block text-[10px] font-bold text-red-600 mt-1">
                          {asset.openTicketsCount} open ticket(s)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Asset Digital Twin Detail & 3D Isometric View */}
        {selectedAsset && (
          <div className="lg:col-span-2 space-y-5">
            {/* 3D Isometric Asset Visualization Schematic */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-700 relative overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    Live Telemetry • Digital Twin Model
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedAsset.name}</h3>
                  <p className="text-xs text-slate-400">
                    {selectedAsset.type} • {selectedAsset.zone} • Installed Year {selectedAsset.installedYear}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Structural Health Index
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-400">
                    {selectedAsset.conditionScore}/100
                  </span>
                </div>
              </div>

              {/* Isometric Visual Canvas Graphic */}
              <div className="my-6 py-6 flex items-center justify-center relative">
                <svg viewBox="0 0 400 160" className="w-full max-w-md">
                  {/* Base Platform */}
                  <polygon
                    points="200,20 380,70 200,120 20,70"
                    fill="#1e293b"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {/* Center Column Structure */}
                  <polygon points="160,50 240,50 240,90 160,90" fill="#334155" />
                  <polygon points="160,90 200,110 240,90 200,70" fill="#475569" />
                  {/* Top Deck Line */}
                  <path
                    d="M 40,70 Q 200,30 360,70"
                    stroke="#10b981"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Sensor Nodes */}
                  <circle cx="100" cy="62" r="5" fill="#3b82f6" className="animate-ping" />
                  <circle cx="100" cy="62" r="4" fill="#60a5fa" />
                  <circle cx="200" cy="40" r="5" fill="#10b981" className="animate-ping" />
                  <circle cx="200" cy="40" r="4" fill="#34d399" />
                  <circle cx="300" cy="62" r="5" fill="#f59e0b" className="animate-ping" />
                  <circle cx="300" cy="62" r="4" fill="#fbbf24" />
                </svg>

                <div className="absolute bottom-1 right-2 text-[10px] font-mono text-slate-400">
                  Mesh Resolution: 0.05m LiDAR Scan
                </div>
              </div>

              {/* Asset Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-700 text-xs">
                {Object.entries(selectedAsset.specifications).map(([k, v]) => (
                  <div key={k} className="p-2 bg-slate-800/80 rounded-xl">
                    <span className="text-[10px] font-medium text-slate-400 uppercase block truncate">
                      {k.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-bold text-slate-200 text-xs block truncate mt-0.5">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance & Audit History */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Maintenance History & Inspection Records
                  </h4>
                  <p className="text-xs text-slate-500">
                    Audited work orders, repair costs, and contractor assignments
                  </p>
                </div>
                <button
                  onClick={() => alert('New inspection audit scheduled.')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  + Schedule Field Audit
                </button>
              </div>

              <div className="space-y-2.5">
                {selectedAsset.maintenanceHistory.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Wrench className="w-3.5 h-3.5 text-blue-600" />
                        <span>{m.workType}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Contractor: {m.contractor} • Date: {m.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-800 text-xs">{m.cost}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
