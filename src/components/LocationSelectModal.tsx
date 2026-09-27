import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { IndiaLocationSelector, LocationSelection } from './IndiaLocationSelector';
import {
  X,
  MapPin,
  Globe,
  CheckCircle2,
  Navigation,
  RotateCcw
} from 'lucide-react';

interface LocationSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationSelectModal: React.FC<LocationSelectModalProps> = ({ isOpen, onClose }) => {
  const { activeLocation, setActiveLocation, setFilterWard } = useCivic();

  const [currentLoc, setCurrentLoc] = useState<LocationSelection>({
    state: activeLocation?.state || 'Karnataka',
    district: activeLocation?.district || 'Bengaluru Urban',
    cityOrTown: activeLocation?.cityOrTown || 'Bengaluru',
    ward: activeLocation?.ward || 'Ward 142 - Indiranagar',
    pincode: '560038',
    address: 'Indiranagar, Bengaluru',
    latitude: 12.9783,
    longitude: 77.6408,
  });

  if (!isOpen) return null;

  const handleApplyLocation = () => {
    setActiveLocation({
      state: currentLoc.state,
      district: currentLoc.district,
      cityOrTown: currentLoc.cityOrTown,
      ward: currentLoc.ward,
    });
    setFilterWard('all');
    onClose();
  };

  const handleResetToAllIndia = () => {
    setActiveLocation(null);
    setFilterWard('all');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-slate-50 to-emerald-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Select Municipal & Civic Location
              </h3>
              <p className="text-xs text-slate-500">
                Pan-India coverage: 28 States, 8 UTs, Districts, Wards & Villages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Active selection banner */}
          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 block">Current Active Region</span>
                <span className="font-bold text-slate-900">
                  {activeLocation
                    ? `${activeLocation.cityOrTown || activeLocation.district}, ${activeLocation.state}`
                    : 'All India (All Municipalities)'}
                </span>
              </div>
            </div>

            {activeLocation && (
              <button
                type="button"
                onClick={handleResetToAllIndia}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to All</span>
              </button>
            )}
          </div>

          {/* India Location Selector Component */}
          <IndiaLocationSelector
            initialLocation={currentLoc}
            onChange={setCurrentLoc}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToAllIndia}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              View All India
            </button>
            <button
              type="button"
              onClick={handleApplyLocation}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
