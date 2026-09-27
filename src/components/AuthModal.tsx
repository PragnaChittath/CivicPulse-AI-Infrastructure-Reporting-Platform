import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { UserRole } from '../types';
import { getTranslation } from '../i18n/languages';
import {
  X,
  User,
  Mail,
  Lock,
  Building2,
  HardHat,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, language } = useCivic();
  const t = (key: string) => getTranslation(key, language);

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [ward, setWard] = useState<string>('Ward 142 - Indiranagar, Bengaluru');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signup(name, email, role, ward);
    } else {
      login(email, role);
    }
    onClose();
  };

  const handleDemoLogin = (targetRole: UserRole, demoEmail: string) => {
    login(demoEmail, targetRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isSignUp ? t('signUp') : t('signIn')} • CivicPulse
            </h3>
            <p className="text-xs text-slate-500">
              {isSignUp ? 'Create your citizen or municipal account' : 'Access your civic workspace'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Fast Demo Role Login Section */}
        <div className="p-6 bg-slate-50 border-b border-slate-200/70 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            ⚡ 1-Click Instant Demo Access:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('citizen', 'citizen@civicpulse.in')}
              className="p-2.5 bg-white hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-300 text-center transition-all cursor-pointer group shadow-2xs"
            >
              <User className="w-5 h-5 mx-auto text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800 block">Citizen</span>
              <span className="text-[9px] text-slate-400 block">Reporter</span>
            </button>

            <button
              onClick={() => handleDemoLogin('authority', 'pwd.engineer@bbmp.gov.in')}
              className="p-2.5 bg-white hover:bg-blue-50 rounded-2xl border border-slate-200 hover:border-blue-300 text-center transition-all cursor-pointer group shadow-2xs"
            >
              <HardHat className="w-5 h-5 mx-auto text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800 block">Engineer</span>
              <span className="text-[9px] text-slate-400 block">Field Officer</span>
            </button>

            <button
              onClick={() => handleDemoLogin('admin', 'commissioner@civicpulse.gov.in')}
              className="p-2.5 bg-white hover:bg-purple-50 rounded-2xl border border-slate-200 hover:border-purple-300 text-center transition-all cursor-pointer group shadow-2xs"
            >
              <Building2 className="w-5 h-5 mx-auto text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800 block">Admin</span>
              <span className="text-[9px] text-slate-400 block">Commissioner</span>
            </button>
          </div>
        </div>

        {/* Regular Auth Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="citizen@example.com"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as UserRole)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="citizen">Citizen Reporter</option>
                <option value="authority">Department Field Engineer</option>
                <option value="admin">City Administrator / Commissioner</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            {isSignUp ? 'Create CivicPulse Account' : 'Sign In'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
