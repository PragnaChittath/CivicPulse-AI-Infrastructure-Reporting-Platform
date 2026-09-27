import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { INDIAN_LANGUAGES, getTranslation } from '../i18n/languages';
import { UserRole } from '../types';
import { LocationSelectModal } from './LocationSelectModal';
import {
  ShieldAlert,
  Globe,
  Bell,
  Sparkles,
  MapPin,
  UserCheck,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Building2,
  HardHat,
  Award,
  CheckCircle2,
  Radio,
  WifiOff,
  Flame,
} from 'lucide-react';

interface NavbarProps {
  onOpenReportModal: () => void;
  onOpenAuthModal: () => void;
  onOpenChatModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReportModal,
  onOpenAuthModal,
  onOpenChatModal,
  activeTab,
  setActiveTab,
}) => {
  const {
    currentUser,
    role,
    setUserRole,
    language,
    setAppLanguage,
    activeLocation,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    isOffline,
    offlineQueue,
    syncOfflineQueue,
    logout,
  } = useCivic();

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const t = (key: string) => getTranslation(key, language);
  const currentLangObj = INDIAN_LANGUAGES.find(l => l.code === language) || INDIAN_LANGUAGES[0];

  const unreadNotifs = notifications.filter(n => !n.read);

  const roleLabels: Record<UserRole, { title: string; icon: any; color: string; desc: string }> = {
    citizen: {
      title: t('roleCitizen'),
      icon: UserIcon,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: 'Report issues, track status, earn Karma'
    },
    authority: {
      title: t('roleAuthority'),
      icon: HardHat,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      desc: 'Resolve work orders, upload after-proof'
    },
    admin: {
      title: t('roleAdmin'),
      icon: Building2,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      desc: 'City command center & predictive analytics'
    },
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Top Banner for Offline or Sync */}
        {isOffline && (
          <div className="bg-amber-500 text-white text-xs px-4 py-1.5 flex items-center justify-between font-medium">
            <div className="flex items-center gap-2">
              <WifiOff className="w-3.5 h-3.5 animate-pulse" />
              <span>{t('offlineBanner')} ({offlineQueue.length} pending sync)</span>
            </div>
            <button
              onClick={() => syncOfflineQueue()}
              className="underline text-[11px] font-semibold cursor-pointer hover:text-amber-100"
            >
              {t('syncNow')}
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('feed')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 relative group shrink-0">
                <ShieldAlert className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                    Civic<span className="text-blue-600">Pulse</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full">
                    <Radio className="w-2.5 h-2.5 text-blue-600 animate-pulse" />
                    Live AI Gov
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden md:block leading-none mt-0.5">
                  {t('tagline')}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('feed')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'feed'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t('allIssues')}
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'map'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t('liveMap')}
              </button>
              {(role === 'authority' || role === 'admin') && (
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t('dashboard')}
                </button>
              )}
              <button
                onClick={() => setActiveTab('predictive')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'predictive'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t('predictiveAI')}
              </button>
              <button
                onClick={() => setActiveTab('digitalTwin')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'digitalTwin'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t('digitalTwin')}
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'rewards'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t('citizenRewards')}
              </button>
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* India Location Selector Button */}
              <button
                onClick={() => setShowLocationModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold border border-slate-200 hover:border-blue-200 transition-all cursor-pointer shadow-2xs group"
                title="Filter by City, District, or State across India"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[11px] leading-tight truncate max-w-[110px] sm:max-w-[140px]">
                    {activeLocation ? activeLocation.cityOrTown || activeLocation.district : 'Location'}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate max-w-[110px] sm:max-w-[140px] leading-none">
                    {activeLocation ? activeLocation.state : 'All India'}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {/* Indian Language Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                    setShowRoleMenu(false);
                    setShowNotifs(false);
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  title="Switch Language (All Indian Languages)"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline font-medium">{currentLangObj.nativeName}</span>
                  <span className="sm:hidden uppercase">{currentLangObj.code}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Select Indian Language (भारतीय भाषाएं)
                      </p>
                    </div>
                    <div className="grid grid-cols-1 divide-y divide-slate-50">
                      {INDIAN_LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setAppLanguage(lang.code);
                            setShowLangMenu(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-blue-50/80 transition-colors cursor-pointer ${
                            language === lang.code ? 'bg-blue-50 font-bold text-blue-700' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">{lang.nativeName}</span>
                            <span className="text-[10px] text-slate-400">{lang.name} • {lang.region}</span>
                          </div>
                          {language === lang.code && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Role Switcher Pill */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => {
                    setShowRoleMenu(!showRoleMenu);
                    setShowLangMenu(false);
                    setShowNotifs(false);
                    setShowUserMenu(false);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${roleLabels[role].color}`}
                >
                  {React.createElement(roleLabels[role].icon, { className: 'w-3.5 h-3.5' })}
                  <span className="font-semibold">{roleLabels[role].title}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Simulate Workspace Role
                      </p>
                    </div>
                    {(['citizen', 'authority', 'admin'] as UserRole[]).map(r => {
                      const info = roleLabels[r];
                      return (
                        <button
                          key={r}
                          onClick={() => {
                            setUserRole(r);
                            setShowRoleMenu(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs flex items-start gap-2.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                            role === r ? 'bg-blue-50/70 text-blue-900' : 'text-slate-700'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${info.color}`}>
                            {React.createElement(info.icon, { className: 'w-4 h-4' })}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 font-bold">
                              <span>{info.title}</span>
                              {role === r && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">{info.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* AI Assistant Chatbot Trigger Button */}
              <button
                onClick={onOpenChatModal}
                className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                title="Open Nagarika AI Assistant"
              >
                <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                <span className="sr-only">Nagarika AI</span>
              </button>

              {/* Notifications Drawer */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifs(!showNotifs);
                    setShowLangMenu(false);
                    setShowRoleMenu(false);
                    setShowUserMenu(false);
                  }}
                  className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadNotifs.length}
                    </span>
                  )}
                </button>

                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h4 className="text-xs font-bold text-slate-900">Notifications & Alerts</h4>
                      {unreadNotifs.length > 0 && (
                        <button
                          onClick={clearAllNotifications}
                          className="text-[11px] text-blue-600 hover:underline font-medium cursor-pointer"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 py-6 text-center">No notifications yet</p>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                              !n.read ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="text-xs font-semibold text-slate-900">{n.title}</h5>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Citizen Karma & User Profile */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                      setShowLangMenu(false);
                      setShowRoleMenu(false);
                      setShowNotifs(false);
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-xl object-cover border border-slate-300"
                    />
                    <div className="hidden xl:flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                        {currentUser.name}
                        <UserCheck className="w-3 h-3 text-blue-600" />
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                        {currentUser.civicKarma} Karma
                      </span>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-300"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{currentUser.name}</h4>
                          <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 text-[9px] font-bold uppercase bg-blue-100 text-blue-800 rounded-md">
                            {currentUser.role}
                          </span>
                        </div>
                      </div>
                      <div className="py-2 border-b border-slate-100 text-xs">
                        <div className="flex items-center justify-between text-slate-600 py-1">
                          <span>Ward</span>
                          <span className="font-semibold text-slate-800">{currentUser.ward}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600 py-1">
                          <span>Civic Karma</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            {currentUser.civicKarma} pts
                          </span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('signOut')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  {t('signIn')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden border-t border-slate-200 bg-slate-50/90 px-3 py-2 flex items-center justify-around text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'feed' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            {t('allIssues')}
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'map' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            {t('liveMap')}
          </button>
          {(role === 'authority' || role === 'admin') && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
              }`}
            >
              {t('dashboard')}
            </button>
          )}
          <button
            onClick={() => setActiveTab('predictive')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'predictive' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            {t('predictiveAI')}
          </button>
          <button
            onClick={() => setActiveTab('digitalTwin')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'digitalTwin' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            {t('digitalTwin')}
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${
              activeTab === 'rewards' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            {t('citizenRewards')}
          </button>
        </div>
      </header>

      {/* Global Location Selection Modal */}
      <LocationSelectModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
      />
    </>
  );
};
