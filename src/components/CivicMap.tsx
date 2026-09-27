import React, { useState, useMemo } from 'react';
import { useCivic } from '../context/CivicContext';
import { CivicReport, IssueCategory } from '../types';
import { getTranslation } from '../i18n/languages';
import {
  MapPin,
  Layers,
  Flame,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation,
  Eye,
  AlertTriangle,
  Clock,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface CivicMapProps {
  onSelectReport: (report: CivicReport) => void;
}

export const CivicMap: React.FC<CivicMapProps> = ({ onSelectReport }) => {
  const { reports, language, filterCategory, setFilterCategory, filterStatus, setFilterStatus } = useCivic();
  const t = (key: string) => getTranslation(key, language);

  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [showWards, setShowWards] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activePin, setActivePin] = useState<CivicReport | null>(null);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      if (filterCategory !== 'all' && r.category !== filterCategory) return false;
      if (filterStatus !== 'all' && r.status !== filterStatus) return false;
      return true;
    });
  }, [reports, filterCategory, filterStatus]);

  // Center coordinate reference around central Bangalore (approx 12.9716, 77.5946)
  const mapCenter = { lat: 12.9650, lng: 77.6200 };
  const latSpan = 0.08;
  const lngSpan = 0.12;

  // Transform lat/lng to SVG percentage (0-100%)
  const getCoordinates = (lat: number, lng: number) => {
    const x = ((lng - (mapCenter.lng - lngSpan / 2)) / lngSpan) * 100;
    const y = (((mapCenter.lat + latSpan / 2) - lat) / latSpan) * 100;
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y))
    };
  };

  const getCategoryColor = (cat: IssueCategory, severity: number) => {
    if (severity >= 9) return '#ef4444'; // Red
    switch (cat) {
      case 'pothole':
      case 'damaged_road':
        return '#f97316'; // Orange
      case 'garbage':
        return '#10b981'; // Emerald
      case 'water_leakage':
      case 'flooding':
        return '#0284c7'; // Sky Blue
      case 'broken_streetlight':
        return '#eab308'; // Yellow
      case 'damaged_building':
        return '#8b5cf6'; // Purple
      default:
        return '#64748b'; // Slate
    }
  };

  const resetMap = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-[620px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Layer Controls */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-md border border-slate-200 text-xs">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
              showHeatmap ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>AI Risk Heatmap</span>
          </button>

          <button
            onClick={() => setShowWards(!showWards)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
              showWards ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Wards</span>
          </button>

          <span className="text-slate-300">|</span>

          <span className="text-slate-600 font-semibold text-[11px] hidden sm:inline">
            {filteredReports.length} Active Hazard Markers
          </span>
        </div>

        {/* Right: Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-md border border-slate-200 text-xs">
          <button
            onClick={() => setZoomLevel(prev => Math.min(2.2, prev + 0.25))}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.25))}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetMap}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas Map Rendering */}
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden select-none bg-slate-50">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full transition-transform duration-300"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            {/* Heatmap Gradients */}
            <radialGradient id="heatHigh" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heatMed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Landmass & Roads Grid */}
          <rect width="1000" height="600" fill="#f8fafc" />

          {/* Grid pattern for urban plan feel */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
          </pattern>
          <rect width="1000" height="600" fill="url(#grid)" opacity="0.6" />

          {/* Major Urban Arterial Road Network */}
          <g stroke="#cbd5e1" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8">
            <path d="M 50 150 Q 300 220 500 200 T 950 240" />
            <path d="M 120 520 Q 380 400 520 300 T 880 100" />
            <path d="M 480 50 L 520 550" />
            <path d="M 220 80 Q 260 300 240 520" />
            <path d="M 750 60 Q 720 320 780 540" />
          </g>

          {/* Expressways */}
          <g stroke="#94a3b8" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.6">
            <path d="M 80 80 L 920 480" />
            <path d="M 80 480 L 920 80" />
          </g>

          {/* Water Bodies & Lake Corridors */}
          <path
            d="M 680 340 C 720 320 780 330 800 370 C 810 400 760 440 710 430 C 670 420 650 360 680 340 Z"
            fill="#bae6fd"
            stroke="#7dd3fc"
            strokeWidth="2"
            opacity="0.85"
          />
          <text x="715" y="385" fontSize="11" fill="#0369a1" fontWeight="600">
            Madivala Lake
          </text>

          <path
            d="M 280 180 C 320 160 380 170 390 200 C 400 230 350 250 310 245 C 270 240 260 200 280 180 Z"
            fill="#bae6fd"
            stroke="#7dd3fc"
            strokeWidth="2"
            opacity="0.85"
          />
          <text x="305" y="215" fontSize="11" fill="#0369a1" fontWeight="600">
            Ulsoor Lake
          </text>

          {/* Municipal Ward Boundaries */}
          {showWards && (
            <g stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.7">
              {/* Ward 142 Indiranagar */}
              <polygon points="520,120 780,140 760,290 500,260" />
              <text x="610" y="195" fontSize="12" fill="#3b82f6" fontWeight="bold" opacity="0.8">
                Ward 142 (Indiranagar)
              </text>

              {/* Ward 151 Koramangala */}
              <polygon points="500,280 770,300 740,480 480,440" />
              <text x="580" y="380" fontSize="12" fill="#3b82f6" fontWeight="bold" opacity="0.8">
                Ward 151 (Koramangala)
              </text>

              {/* Ward 109 Chickpet / CBD */}
              <polygon points="240,140 490,130 470,320 220,310" />
              <text x="320" y="220" fontSize="12" fill="#3b82f6" fontWeight="bold" opacity="0.8">
                Ward 109 (Chickpet / CBD)
              </text>

              {/* Ward 176 BTM */}
              <polygon points="480,450 750,490 710,580 460,560" />
              <text x="560" y="525" fontSize="12" fill="#3b82f6" fontWeight="bold" opacity="0.8">
                Ward 176 (BTM Layout)
              </text>
            </g>
          )}

          {/* AI Heatmap Intensity Layer */}
          {showHeatmap && (
            <g className="transition-opacity duration-500">
              {filteredReports.map(rep => {
                const coords = getCoordinates(rep.location.latitude, rep.location.longitude);
                const svgX = coords.x * 10;
                const svgY = coords.y * 6;
                const radius = rep.severityScore >= 8 ? 80 : 55;
                const gradientId = rep.severityScore >= 8 ? 'url(#heatHigh)' : 'url(#heatMed)';

                return (
                  <circle
                    key={`heat-${rep.id}`}
                    cx={svgX}
                    cy={svgY}
                    r={radius}
                    fill={gradientId}
                    pointerEvents="none"
                  />
                );
              })}
            </g>
          )}

          {/* Interactive Report Pins */}
          {filteredReports.map(rep => {
            const coords = getCoordinates(rep.location.latitude, rep.location.longitude);
            const svgX = coords.x * 10;
            const svgY = coords.y * 6;
            const color = getCategoryColor(rep.category, rep.severityScore);
            const isSelected = activePin?.id === rep.id;

            return (
              <g
                key={`pin-${rep.id}`}
                transform={`translate(${svgX}, ${svgY})`}
                onClick={() => setActivePin(rep)}
                className="cursor-pointer transition-transform hover:scale-125"
              >
                {/* Emergency Pulsing Radar Ring */}
                {rep.isEmergency && (
                  <circle
                    r="22"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    className="animate-ping"
                    opacity="0.75"
                  />
                )}

                {/* Outer pin background */}
                <circle
                  r={isSelected ? '16' : '12'}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? '3.5' : '2.5'}
                  filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.3))"
                />

                {/* Inner status dot */}
                <circle r="4" fill="#ffffff" />

                {/* Severity Score Pill */}
                <rect
                  x="-12"
                  y="-26"
                  width="24"
                  height="13"
                  rx="6"
                  fill="#0f172a"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="-17"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="bold"
                  fill="#ffffff"
                >
                  {rep.severityScore}/10
                </text>
              </g>
            );
          })}
        </svg>

        {/* Pin Quick Preview Card (Bottom Floating) */}
        {activePin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 z-30 animate-in fade-in slide-in-from-bottom-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white shadow-xs"
                  style={{ backgroundColor: getCategoryColor(activePin.category, activePin.severityScore) }}
                >
                  {t(`cat_${activePin.category}`)}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  #{activePin.id}
                </span>
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-3 mt-2.5">
              {activePin.images?.before?.[0] && (
                <img
                  src={activePin.images.before[0]}
                  alt="Hazard preview"
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                  {activePin.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-1">
                  📍 {activePin.location.address}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    🔥 Severity {activePin.severityScore}/10
                  </span>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {t(`st_${activePin.status}`)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  onSelectReport(activePin);
                  setActivePin(null);
                }}
                className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('viewDetails')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend Footer */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-800">Legend:</span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            Critical Hazard (9-10)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            Potholes & Roads
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            Water & Flooding
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Garbage & SWM
          </span>
        </div>

        <span className="text-slate-400 font-mono text-[10px]">
          GIS Geo-Engine • Indian Spatial Datum WGS-84
        </span>
      </div>
    </div>
  );
};
