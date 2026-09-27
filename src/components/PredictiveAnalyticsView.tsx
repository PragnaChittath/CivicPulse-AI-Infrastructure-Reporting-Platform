import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CloudRain,
  ShieldAlert,
  Zap,
  DollarSign,
  Activity,
  ArrowRight,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const PredictiveAnalyticsView: React.FC = () => {
  const { predictiveZones, reports, triggerCelebration } = useCivic();

  const [season, setSeason] = useState<string>('Pre-Monsoon Peak (July - August)');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [monsoonIndex, setMonsoonIndex] = useState<number>(78);
  const [zones, setZones] = useState(predictiveZones);
  const [potholeForecast, setPotholeForecast] = useState<string>(
    'Current 42 minor surface cracks are projected to expand into 18 high-severity potholes within 2 weeks of intense precipitation if bitumen micro-seal is not applied.'
  );

  const runAiForecast = async () => {
    setIsSimulating(true);
    try {
      const response = await fetch('/api/gemini/predict-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wardData: { count: reports.length, season },
          season,
          historicalCount: 148,
        }),
      });
      const data = await response.json();
      if (data.success && data.data) {
        setMonsoonIndex(data.data.monsoonVulnerabilityIndex || 82);
        if (data.data.criticalRiskZones) {
          setZones(data.data.criticalRiskZones);
        }
        if (data.data.potholeProgressionForecast) {
          setPotholeForecast(data.data.potholeProgressionForecast);
        }
      }
      triggerCelebration();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20 text-white backdrop-blur-md">
              AI Machine Learning Model
            </span>
            <span className="text-xs text-blue-200">Municipal Foresight v3.2</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-1">
            Predictive Infrastructure Risk & Seasonality Forecasting
          </h2>
          <p className="text-xs text-blue-100 max-w-xl mt-1">
            Analyze historical complaint clustering, road age, drainage capacity, and upcoming monsoon weather patterns to prevent infrastructure failure before citizen complaints arise.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runAiForecast}
            disabled={isSimulating}
            className="px-5 py-2.5 rounded-2xl bg-white hover:bg-blue-50 text-blue-900 text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 active:scale-95"
          >
            <Sparkles className={`w-4 h-4 text-blue-600 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Running AI Model...' : 'Execute AI Risk Simulation'}</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Monsoon Vulnerability Gauge */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">
              Monsoon Vulnerability Index
            </span>
            <CloudRain className="w-4 h-4 text-blue-600" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{monsoonIndex}%</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              High Seasonal Alert
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-600 rounded-full transition-all duration-700"
              style={{ width: `${monsoonIndex}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Based on catchment basin topography and culvert silt load simulations.
          </p>
        </div>

        {/* Projected Preventative Savings */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">
              Est. Preventative Savings
            </span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">₹26.6 Lakhs</span>
            <span className="text-xs font-semibold text-emerald-700">Cost Avoidance</span>
          </div>

          <p className="text-[11px] text-slate-600">
            Proactive micro-surfacing and pre-monsoon desilting costs ~70% less than post-disaster road sub-base rebuilding.
          </p>
        </div>

        {/* Pothole Expansion Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">
              Road Degradation Velocity
            </span>
            <Activity className="w-4 h-4 text-amber-600" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">3.8x</span>
            <span className="text-xs font-semibold text-slate-600">Rainfall Acceleration</span>
          </div>

          <p className="text-[11px] text-slate-600">
            Unsealed hairline asphalt cracks deteriorate into deep craters 3.8x faster under water pressure.
          </p>
        </div>
      </div>

      {/* Critical High Risk Spatial Zones */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Critical Risk Hotspots Requiring Proactive Intervention
            </h3>
            <p className="text-xs text-slate-500">
              Identified by spatial density algorithms and hydraulic flow modelling
            </p>
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-xl">
            {zones.length} Actionable Zones
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {zones.map((z, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      z.riskType === 'Flooding'
                        ? 'bg-blue-100 text-blue-700'
                        : z.riskType === 'Road Collapse'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {z.riskType === 'Flooding' ? '🌊' : z.riskType === 'Road Collapse' ? '🛣️' : '⚡'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{z.zoneName}</h4>
                    <span className="text-[10px] text-slate-500">{z.riskType} Threat</span>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  {z.probability}% Risk
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Recommended Proactive Action:
                </span>
                <p className="text-slate-800 font-medium mt-0.5">{z.recommendedAction}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium pt-1">
                <span className="text-emerald-700 font-bold">
                  💰 Savings: {z.preventativeCostSavings}
                </span>
                <button
                  onClick={() => alert(`Proactive work order dispatched for ${z.zoneName}`)}
                  className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
                >
                  Dispatch Crew
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pothole Expansion AI Simulation Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            Asphalt & Pavement Deterioration AI Forecast
          </h3>
        </div>
        <p className="text-xs text-slate-700 font-medium leading-relaxed bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
          {potholeForecast}
        </p>
      </div>
    </div>
  );
};
