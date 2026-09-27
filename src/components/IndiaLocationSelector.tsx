import React, { useState, useEffect, useRef } from 'react';
import {
  INDIA_STATES_AND_UTS,
  IndiaState,
  SearchLocationResult,
  searchLocalIndiaLocations,
  getApproxCoordsForStateCity,
} from '../data/indiaLocations';
import {
  MapPin,
  Search,
  RefreshCw,
  Check,
  ChevronDown,
  Navigation,
  Globe,
  X,
  Compass,
  Layers,
  Crosshair,
  Sliders,
  ChevronRight
} from 'lucide-react';

export interface LocationSelection {
  state: string;
  district: string;
  cityOrTown: string;
  ward: string;
  pincode: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface IndiaLocationSelectorProps {
  initialLocation?: Partial<LocationSelection>;
  onChange: (location: LocationSelection) => void;
  compact?: boolean;
}

export const IndiaLocationSelector: React.FC<IndiaLocationSelectorProps> = ({
  initialLocation,
  onChange,
  compact = false,
}) => {
  // Current selections
  const [selectedState, setSelectedState] = useState<string>(
    initialLocation?.state || 'Karnataka'
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    initialLocation?.district || 'Bengaluru Urban'
  );
  const [cityOrTown, setCityOrTown] = useState<string>(
    initialLocation?.cityOrTown || 'Bengaluru'
  );
  const [ward, setWard] = useState<string>(
    initialLocation?.ward || 'Ward 142 - Indiranagar'
  );
  const [address, setAddress] = useState<string>(
    initialLocation?.address || '100 Feet Road, Indiranagar'
  );
  const [pincode, setPincode] = useState<string>(
    initialLocation?.pincode || '560038'
  );
  const [latitude, setLatitude] = useState<number>(
    initialLocation?.latitude || 12.9783
  );
  const [longitude, setLongitude] = useState<number>(
    initialLocation?.longitude || 77.6408
  );

  // Search and UI state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchLocationResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [showPinMap, setShowPinMap] = useState<boolean>(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Active state object
  const currentStateObj =
    INDIA_STATES_AND_UTS.find(s => s.name === selectedState) ||
    INDIA_STATES_AND_UTS[13]; // Karnataka default

  // Notify parent on changes
  useEffect(() => {
    onChange({
      state: selectedState,
      district: selectedDistrict,
      cityOrTown,
      ward,
      pincode,
      address,
      latitude,
      longitude,
    });
  }, [selectedState, selectedDistrict, cityOrTown, ward, address, pincode, latitude, longitude]);

  // Handle outside clicks to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live searchable geographic lookup (API + local comprehensive index)
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const apiRes = await fetch(
          `/api/geo/search?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await apiRes.json();

        if (data.success && data.results && data.results.length > 0) {
          setSearchResults(data.results);
          setIsSearchOpen(true);
          setIsSearching(false);
          return;
        }
      } catch (err) {
        console.log('Using local geographic dataset search fallback');
      }

      // Local fallback dataset
      const localMatches = searchLocalIndiaLocations(searchQuery);
      setSearchResults(localMatches);
      setIsSearchOpen(true);
      setIsSearching(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle selecting a search suggestion
  const handleSelectSearchResult = (res: SearchLocationResult) => {
    if (res.state) setSelectedState(res.state);
    if (res.district) setSelectedDistrict(res.district);
    if (res.cityOrTown) setCityOrTown(res.cityOrTown);
    if (res.pincode) setPincode(res.pincode);
    if (res.latitude && res.longitude) {
      setLatitude(res.latitude);
      setLongitude(res.longitude);
    }
    setAddress(res.displayName);
    setWard(`Ward - ${res.name}`);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  // State dropdown change
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const st = INDIA_STATES_AND_UTS.find(s => s.name === stateName);
    if (st) {
      const firstDist = st.districts[0] || stateName;
      const firstCity = st.popularCities[0] || firstDist;
      setSelectedDistrict(firstDist);
      setCityOrTown(firstCity);
      setWard(`Ward - ${firstCity} Central`);
      const coords = getApproxCoordsForStateCity(stateName, firstCity);
      setLatitude(coords.lat);
      setLongitude(coords.lng);
      setAddress(`${firstCity}, ${stateName}`);
    }
  };

  // District dropdown change
  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    setCityOrTown(distName);
    setWard(`Ward - ${distName} Sector 1`);
    const coords = getApproxCoordsForStateCity(selectedState, distName);
    setLatitude(coords.lat);
    setLongitude(coords.lng);
    setAddress(`${distName}, ${selectedState}`);
  };

  // GPS Auto-detect with reverse lookup
  const detectLiveGPS = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);
          setIsLocating(false);
          setAddress(`GPS Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}, ${cityOrTown}`);
        },
        () => {
          setIsLocating(false);
          setLatitude(12.9783);
          setLongitude(77.6408);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  // Interactive Pin Map Click handler
  const handleInteractiveMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Offset coordinates slightly based on click position
    const latOffset = ((height / 2 - y) / height) * 0.04;
    const lngOffset = ((x - width / 2) / width) * 0.04;

    const baseCoords = getApproxCoordsForStateCity(selectedState, cityOrTown);
    const newLat = parseFloat((baseCoords.lat + latOffset).toFixed(5));
    const newLng = parseFloat((baseCoords.lng + lngOffset).toFixed(5));

    setLatitude(newLat);
    setLongitude(newLng);
    setAddress(`Pinned Point near ${ward}, ${cityOrTown}`);
  };

  return (
    <div className="space-y-3.5 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
      {/* Header & GPS auto-detect button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              India Geographic Location
            </span>
            <span className="text-[10px] text-slate-500">
              Hierarchical 28 States, 8 UTs, 750+ Districts & Wards
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowPinMap(!showPinMap)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              showPinMap
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{showPinMap ? 'Hide Pin Map' : 'Interactive Pin'}</span>
          </button>

          <button
            type="button"
            onClick={detectLiveGPS}
            disabled={isLocating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors cursor-pointer"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'GPS Detect'}</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb Hierarchy Display */}
      <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70 overflow-x-auto whitespace-nowrap">
        <span className="font-semibold text-slate-400">India</span>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="font-bold text-blue-700">{selectedState}</span>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="font-bold text-slate-800">{selectedDistrict}</span>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="font-medium text-emerald-700">{cityOrTown}</span>
        <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="text-slate-600 truncate">{ward}</span>
      </div>

      {/* Global Search Bar with Autocomplete Dropdown */}
      <div ref={searchBoxRef} className="relative">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) setIsSearchOpen(true);
            }}
            placeholder="Search any Indian city, town, village, district, ward, or pin code (e.g. Indiranagar, Pune, 110001)..."
            className="w-full pl-9.5 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800 placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown search results */}
        {isSearchOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 max-h-60 overflow-y-auto">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Matching Indian Locations ({searchResults.length})
            </div>
            {searchResults.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSearchResult(item)}
                className="w-full text-left px-3 py-2 hover:bg-blue-50/70 transition-colors flex items-start gap-2 border-b border-slate-50 last:border-0 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.displayName || `${item.district}, ${item.state}`}
                  </div>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium shrink-0">
                  {item.state}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* State & District Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            State / Union Territory
          </label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={e => handleStateChange(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 appearance-none pr-8 cursor-pointer"
            >
              {INDIA_STATES_AND_UTS.map(st => (
                <option key={st.code} value={st.name}>
                  {st.name} ({st.type === 'Union Territory' ? 'UT' : 'State'})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">
            District ({currentStateObj.districts.length} available)
          </label>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={e => handleDistrictChange(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 appearance-none pr-8 cursor-pointer"
            >
              {currentStateObj.districts.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Popular Localities / Cities in this State */}
      {currentStateObj.popularCities.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] font-semibold text-slate-400">Popular:</span>
          {currentStateObj.popularCities.slice(0, 5).map((city, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCityOrTown(city);
                setWard(`Ward - ${city} Central`);
                const coords = getApproxCoordsForStateCity(selectedState, city);
                setLatitude(coords.lat);
                setLongitude(coords.lng);
                setAddress(`${city}, ${selectedState}`);
              }}
              className={`text-[10px] px-2 py-0.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                cityOrTown === city
                  ? 'bg-blue-600 text-white border-blue-600 font-bold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Interactive Pin-on-Map Overlay (Click to Pin Exact Point) */}
      {showPinMap && (
        <div className="space-y-2 pt-1 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-blue-600" />
              Click anywhere on the grid to pin exact location:
            </span>
            <span className="text-[10px] text-slate-400">
              Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}
            </span>
          </div>

          <div
            onClick={handleInteractiveMapClick}
            className="relative h-40 w-full rounded-2xl overflow-hidden border-2 border-blue-400/80 bg-slate-900 cursor-crosshair group shadow-inner"
          >
            {/* SVG Grid / Map Texture */}
            <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              {/* Decorative civic road lines */}
              <path d="M 0 60 Q 150 120 400 30 T 800 100" fill="none" stroke="#60a5fa" strokeWidth="3" opacity="0.6" />
              <path d="M 120 0 Q 180 80 220 160" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
              <path d="M 320 0 Q 340 90 380 160" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
            </svg>

            {/* City & Ward Label */}
            <div className="absolute top-2 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              📍 {cityOrTown} • {ward}
            </div>

            {/* Pin Marker positioned at center with pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <span className="w-8 h-8 rounded-full bg-red-500/30 animate-ping absolute -top-1" />
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white z-10">
                <MapPin className="w-4 h-4 fill-white" />
              </div>
              <span className="bg-slate-900/90 text-white text-[9px] font-mono px-1.5 py-0.5 rounded mt-1 shadow-xs">
                {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </span>
            </div>

            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-slate-300 text-[9px] px-2 py-0.5 rounded">
              Click to reposition pin
            </div>
          </div>
        </div>
      )}

      {/* Granular Ward, Street & PIN Code Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
            City / Town / Village
          </label>
          <input
            type="text"
            value={cityOrTown}
            onChange={e => setCityOrTown(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            placeholder="e.g. Indiranagar, Bengaluru"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
            Ward / Local Area / Block
          </label>
          <input
            type="text"
            value={ward}
            onChange={e => setWard(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            placeholder="e.g. Ward 142 - Indiranagar"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
            Postal PIN Code
          </label>
          <input
            type="text"
            value={pincode}
            onChange={e => setPincode(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            placeholder="e.g. 560038"
          />
        </div>
      </div>

      {/* Street Address & Landmark */}
      <div>
        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">
          Detailed Street Address / Landmark
        </label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="e.g. Opposite Metro Pillar #42, 100 Feet Road"
          className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
        />
      </div>

      {/* Locked GPS Coordinates Badge */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600">
        <span className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold text-slate-700">GIS Coordinate Geotag:</span>
        </span>
        <span className="font-mono text-slate-800 font-bold">
          {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
        </span>
      </div>
    </div>
  );
};
