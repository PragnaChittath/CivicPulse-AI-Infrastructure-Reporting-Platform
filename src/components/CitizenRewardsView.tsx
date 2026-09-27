import React from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Award,
  Flame,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  TrendingUp,
  Gift,
  Zap
} from 'lucide-react';

export const CitizenRewardsView: React.FC = () => {
  const { currentUser, reports } = useCivic();

  const userKarma = currentUser?.civicKarma || 480;

  const badges = [
    { name: 'Pothole Pioneer', icon: '🕳️', desc: 'Reported 5+ verified road defects', unlocked: true },
    { name: 'Green Guardian', icon: '🌱', desc: 'Resolved 3+ solid waste & sanitary issues', unlocked: true },
    { name: 'Rapid Reporter', icon: '⚡', desc: 'Reported an emergency hazard in under 2 mins', unlocked: true },
    { name: 'Community Validator', icon: '🔍', desc: 'Audited & confirmed 10+ contractor repairs', unlocked: true },
    { name: 'Water Warrior', icon: '💧', desc: 'Saved 50,000L of potable water via leak alert', unlocked: false },
    { name: 'Civic Legend', icon: '👑', desc: 'Earned 1,000+ Karma across multiple municipal wards', unlocked: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'Vikramaditya Sengupta', ward: 'Ward 142 Indiranagar', karma: 940, badgesCount: 6, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
    { rank: 2, name: 'Aarav Sharma (You)', ward: 'Ward 142 Indiranagar', karma: userKarma, badgesCount: 4, avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' },
    { rank: 3, name: 'Priya Nambiar', ward: 'Ward 151 Koramangala', karma: 420, badgesCount: 4, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
    { rank: 4, name: 'Karthik Raman', ward: 'Ward 176 BTM Layout', karma: 390, badgesCount: 3, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80' },
    { rank: 5, name: 'Sunita Devi', ward: 'Ward 109 Chickpet', karma: 340, badgesCount: 3, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Karma Card */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/20 backdrop-blur-md">
            Civic Contribution & Reputation Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Your Civic Karma: {userKarma} Points
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1 leading-relaxed">
            Every verified report (+50) and confirmed field repair (+30) makes your city safer, faster to navigate, and cleaner for all residents.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[180px]">
          <span className="text-[10px] font-bold text-blue-200 uppercase block">Community Impact</span>
          <span className="text-2xl font-black text-white block mt-0.5">4,200+</span>
          <span className="text-xs text-emerald-200 font-semibold">Commuters Protected</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Citizen Recognition Badges & Honors
          </h3>
          <p className="text-xs text-slate-500">
            Earn official municipal badges for high-integrity reporting and community auditing
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {badges.map(b => (
            <div
              key={b.name}
              className={`p-4 rounded-2xl border text-center transition-all ${
                b.unlocked
                  ? 'bg-gradient-to-b from-blue-50/70 to-emerald-50/70 border-blue-200 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="text-3xl mb-2">{b.icon}</div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">{b.name}</h4>
              <p className="text-[10px] text-slate-500 mt-1">{b.desc}</p>
              <span
                className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  b.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {b.unlocked ? '✓ Unlocked' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Civic Karma Leaderboard */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Ward & City Top Civic Champions</h3>
            <p className="text-xs text-slate-500">
              Citizens leading the transformation in urban safety and infrastructure quality
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
            Monthly Cycle #9
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {leaderboard.map(u => (
            <div
              key={u.rank}
              className={`p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors ${
                u.rank === 2 ? 'bg-blue-50/40' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    u.rank === 1
                      ? 'bg-amber-400 text-amber-950 font-black shadow-md'
                      : u.rank === 2
                      ? 'bg-slate-300 text-slate-800'
                      : u.rank === 3
                      ? 'bg-amber-700 text-amber-100'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  #{u.rank}
                </div>

                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {u.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{u.ward}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-extrabold text-emerald-600">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{u.karma} Karma</span>
                </div>
                <span className="text-[10px] text-slate-400">{u.badgesCount} Badges earned</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
