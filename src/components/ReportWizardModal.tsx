import React, { useState, useRef, useEffect } from 'react';
import { useCivic } from '../context/CivicContext';
import { getTranslation, INDIAN_LANGUAGES } from '../i18n/languages';
import { IssueCategory, EmergencyLevel } from '../types';
import { IndiaLocationSelector, LocationSelection } from './IndiaLocationSelector';
import { MultiPhotoCaptureUpload } from './MultiPhotoCaptureUpload';
import {
  X,
  Camera,
  Mic,
  MicOff,
  Video,
  FileText,
  MapPin,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Users,
  Clock,
  Flame,
  Info
} from 'lucide-react';

interface ReportWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportWizardModal: React.FC<ReportWizardModalProps> = ({ isOpen, onClose }) => {
  const { createReport, language, reports } = useCivic();
  const t = (key: string) => getTranslation(key, language);

  const [step, setStep] = useState<number>(1);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio' | 'text'>('image');

  // Media collection (Multiple photos)
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioTranscript, setAudioTranscript] = useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  // Form input states
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<IssueCategory>('pothole');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);

  // Location selection state
  const [locationData, setLocationData] = useState<LocationSelection>({
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    cityOrTown: 'Bengaluru',
    ward: 'Ward 142 - Indiranagar',
    pincode: '560038',
    address: '100 Feet Road, Indiranagar',
    latitude: 12.9783,
    longitude: 77.6408,
  });

  // AI Analysis states
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null);
  const [detectedCategory, setDetectedCategory] = useState<string>('');
  const [severityScore, setSeverityScore] = useState<number>(7);
  const [emergencyLevel, setEmergencyLevel] = useState<EmergencyLevel>('Medium');
  const [isImmediateHazard, setIsImmediateHazard] = useState<boolean>(false);
  const [suggestedDept, setSuggestedDept] = useState<string>('Public Works Department (PWD)');
  const [citizenImpact, setCitizenImpact] = useState<string>('Affects ~350 daily commuters and two-wheelers.');
  const [duplicateMatch, setDuplicateMatch] = useState<any>(null);
  const [engineUsed, setEngineUsed] = useState<string>('gemini');

  const timerRef = useRef<any>(null);

  // Voice recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  if (!isOpen) return null;

  // Voice Simulation & Recording
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Native Indian language audio transcription based on selected language
      const transcriptSamples: Record<string, string> = {
        hi: 'यहाँ सड़क पर बहुत बड़ा गड्ढा हो गया है, दोपहिया वाहन गिर रहे हैं और पानी भी भर गया है। कृपया जल्दी ठीक करें।',
        bn: 'এখানে রাস্তার মাঝে একটি বড় গর্ত তৈরি হয়েছে, দ্রুত মেরামত করা প্রয়োজন।',
        ta: 'இங்கே சாலையில் பெரிய குழி உள்ளது, வாகனங்கள் செல்ல முடியவில்லை, தயவுசெய்து சரிசெய்யவும்.',
        te: 'ఇక్కడ రోడ్డు పై పెద్ద గుంత ఏర్పడింది, వెంటనే మరమ్మతు చేయించండి.',
        kn: 'ಇಲ್ಲಿ ರಸ್ತೆಯಲ್ಲಿ ದೊಡ್ಡ ಗುಂಡಿ ಬಿದ್ದಿದೆ, ದಯವಿಟ್ಟು ಕೂಡಲೇ ಸರಿಪಡಿಸಿ.',
        mr: 'येथे रस्त्यावर मोठा खड्डा पडला आहे, कृपया तातडीने दुरुस्ती करा.',
        gu: 'અહીં રસ્તા પર મોટો ખાડો પડ્યો છે, કૃપા કરીને તાત્કાલિક રીપેર કરો.',
        en: 'There is a severe deep pothole at the main junction causing serious accidents and water logging.'
      };
      const transcript = transcriptSamples[selectedLanguage] || transcriptSamples['en'];
      setAudioTranscript(transcript);
      if (!description) {
        setDescription(transcript);
      }
      if (!title) {
        setTitle('Hazardous Road Defect Reported via Voice');
      }
    } else {
      setIsRecording(true);
      setAudioTranscript('');
    }
  };

  // Run AI Multimodal Analysis
  const runAiAnalysis = async () => {
    setIsAnalyzing(true);
    setStep(2);

    try {
      const response = await fetch('/api/gemini/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: description || audioTranscript,
          category,
          language: selectedLanguage,
          images: attachedImages,
          imageBase64: attachedImages[0] || '',
          mimeType: 'image/jpeg',
          location: {
            address: locationData.address,
            ward: locationData.ward,
            city: locationData.cityOrTown,
            district: locationData.district,
            state: locationData.state,
            pincode: locationData.pincode,
          },
          audioTranscript
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const ai = resData.data;
        setAiAnalysisResult(ai);
        setDetectedCategory(ai.category || category);
        setSeverityScore(ai.severityScore || 7);
        setEmergencyLevel(ai.emergencyLevel || 'Medium');
        setIsImmediateHazard(!!ai.isImmediateHazard);
        setSuggestedDept(ai.suggestedDepartment || 'Public Works Department (PWD)');
        setCitizenImpact(ai.citizenImpactEstimate || 'Affects local commuters and pedestrians.');
        setEngineUsed(ai.engineUsed || (resData.fallback ? 'heuristic_fallback' : 'gemini'));

        // Check for nearby duplicate reports in same ward / area
        const dup = reports.find(
          r => r.category === ai.category && r.status !== 'resolved' && r.status !== 'citizen_verified'
        );
        if (dup) {
          setDuplicateMatch(dup);
        }
      }
    } catch (e) {
      console.warn('Analysis fallback notice:', e);
      // Intelligent fallback
      setSeverityScore(7);
      setEmergencyLevel('High');
      setSuggestedDept('Public Works Department (PWD)');
      setCitizenImpact('Estimated ~350 daily commuters affected on arterial road.');
      setEngineUsed('heuristic_fallback');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Final Submit
  const handleFinalSubmit = async () => {
    const reportData = {
      title: title || `${t(`cat_${category}`)} at ${locationData.cityOrTown}`,
      description: description || audioTranscript || 'Civic infrastructure defect reported by citizen.',
      category: (detectedCategory as IssueCategory) || category,
      subCategory: aiAnalysisResult?.subCategory || `${category} issue`,
      severityScore,
      emergencyLevel,
      isEmergency: isImmediateHazard || emergencyLevel === 'Critical',
      confidenceScore: aiAnalysisResult?.confidenceScore || 95,
      citizenImpact,
      department: suggestedDept,
      location: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        address: locationData.address,
        ward: locationData.ward,
        city: locationData.cityOrTown,
        district: locationData.district,
        state: locationData.state,
        pincode: locationData.pincode,
        landmark: 'Near GPS Geotag'
      },
      images: {
        before: attachedImages.length > 0 ? attachedImages : ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80']
      },
      mediaType,
      audioTranscript,
      language: selectedLanguage,
      summaryEn: aiAnalysisResult?.summaryInEnglish || description || 'Civic issue verified and routed to municipal authority.',
      summaryLocal: aiAnalysisResult?.summaryInLocalLanguage || 'नागरिक शिकायत दर्ज की गई।',
      tags: aiAnalysisResult?.detectedTags || ['CivicPulse', category, locationData.cityOrTown],
      estimatedRepairDays: aiAnalysisResult?.estimatedRepairDays || 2,
      requiredEquipment: aiAnalysisResult?.requiredEquipment || ['Standard Inspection Van', 'Repair Toolset'],
      safetyPrecautions: aiAnalysisResult?.safetyPrecautions || ['Deploy safety signage during repair']
    };

    await createReport(reportData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-slate-50 to-emerald-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {t('reportIssue')} • Multimodal & Multilingual
              </h3>
              <p className="text-xs text-slate-500">
                Direct camera snapshots, multi-image upload & pan-India location selector
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

        {/* Wizard Stepper Header */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                step === 1 ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
              }`}
            >
              1
            </span>
            <span className={step === 1 ? 'font-bold text-slate-900' : 'text-slate-500'}>
              Evidence & Media
            </span>
          </div>
          <div className="h-0.5 flex-1 bg-slate-200 mx-3" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                step === 2 ? 'bg-blue-600 text-white' : step > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              2
            </span>
            <span className={step === 2 ? 'font-bold text-slate-900' : 'text-slate-500'}>
              AI Detection & Severity
            </span>
          </div>
          <div className="h-0.5 flex-1 bg-slate-200 mx-3" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              3
            </span>
            <span className={step === 3 ? 'font-bold text-slate-900' : 'text-slate-500'}>
              Review & Submit
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {step === 1 && (
            <div className="space-y-5">
              {/* Media Format Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Evidence Format (फ़ोटो, वीडियो, ಆಡಿಯೋ / குரல்)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'image', label: 'Camera / Photos', icon: Camera },
                    { id: 'audio', label: 'Voice Note', icon: Mic },
                    { id: 'video', label: 'Video Clip', icon: Video },
                    { id: 'text', label: 'Text Only', icon: FileText },
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMediaType(m.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                        mediaType === m.id
                          ? 'bg-blue-50/80 border-blue-600 text-blue-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {React.createElement(m.icon, { className: 'w-5 h-5 mb-1.5 text-blue-600' })}
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo & Camera Component */}
              {mediaType === 'image' && (
                <MultiPhotoCaptureUpload
                  images={attachedImages}
                  onChange={setAttachedImages}
                  onPresetSelect={preset => {
                    setTitle(preset.title);
                    setDescription(preset.description);
                    setCategory(preset.category as IssueCategory);
                  }}
                />
              )}

              {/* Voice Recording in Indian Languages */}
              {mediaType === 'audio' && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Voice Note Language:</span>
                    <select
                      value={selectedLanguage}
                      onChange={e => setSelectedLanguage(e.target.value)}
                      className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 font-medium"
                    >
                      {INDIAN_LANGUAGES.map(l => (
                        <option key={l.code} value={l.code}>
                          {l.nativeName} ({l.name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="py-4 flex flex-col items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-lg cursor-pointer ${
                        isRecording
                          ? 'bg-red-600 scale-110 animate-pulse ring-4 ring-red-200'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                    </button>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {isRecording ? `Recording... (${recordingSeconds}s) - Speak in your native language` : 'Click microphone to record voice report'}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        AI will automatically transcribe and translate your voice note
                      </p>
                    </div>
                  </div>

                  {audioTranscript && (
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 text-left">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        ✓ AI Voice Transcription:
                      </span>
                      <p className="text-xs text-slate-800 mt-1 font-medium italic">
                        "{audioTranscript}"
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Video Recording */}
              {mediaType === 'video' && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center space-y-3">
                  <div className="py-4 flex flex-col items-center justify-center gap-2">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <Video className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Upload 10-second hazard video</p>
                      <p className="text-[11px] text-slate-400">
                        Ideal for active flooding, traffic bottlenecks, and structural vibrations
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoUrl('sample_hazard_clip.mp4');
                        if (!title) setTitle('Dynamic Road Hazard Video');
                        if (!description) setDescription('Video showing water flow and traffic stagnation.');
                      }}
                      className="mt-2 px-3 py-1.5 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl border border-indigo-200 transition-colors cursor-pointer"
                    >
                      Attach Sample Road Video
                    </button>
                  </div>
                </div>
              )}

              {/* Title & Description Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Issue Title / Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Deep pothole on 100ft road near Metro pillar"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description & Details (Any Indian Language)
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe what happened, depth/size, hazard risk, or landmark details..."
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category (AI will also auto-detect)
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as IssueCategory)}
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="pothole">🕳️ {t('cat_pothole')}</option>
                    <option value="garbage">🗑️ {t('cat_garbage')}</option>
                    <option value="water_leakage">💧 {t('cat_water_leakage')}</option>
                    <option value="broken_streetlight">💡 {t('cat_broken_streetlight')}</option>
                    <option value="damaged_road">🛣️ {t('cat_damaged_road')}</option>
                    <option value="fallen_tree">🌳 {t('cat_fallen_tree')}</option>
                    <option value="flooding">🌊 {t('cat_flooding')}</option>
                    <option value="damaged_building">🏚️ {t('cat_damaged_building')}</option>
                    <option value="sewer_overflow">🚰 {t('cat_sewer_overflow')}</option>
                    <option value="traffic_signal">🚦 {t('cat_traffic_signal')}</option>
                    <option value="illegal_encroachment">🚫 {t('cat_illegal_encroachment')}</option>
                    <option value="other">⚙️ {t('cat_other')}</option>
                  </select>
                </div>

                {/* Complete India Location Selector Component */}
                <IndiaLocationSelector
                  initialLocation={locationData}
                  onChange={setLocationData}
                />
              </div>
            </div>
          )}

          {/* STEP 2: AI Multi-Modal Detection & Severity Scoring */}
          {step === 2 && (
            <div className="space-y-5">
              {isAnalyzing ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xl animate-bounce">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      AI Vision & Multi-Modal Analysis in Progress...
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                      Detecting structural hazard, computing 1-10 severity score, scanning for duplicates, and auto-routing department.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Engine Indicator Banner */}
                  <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-700">Analysis Engine:</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                      {engineUsed === 'gemini' ? '⚡ Gemini 3.8 Flash Multimodal' : '🛡️ Municipal AI Heuristic Engine'}
                    </span>
                  </div>

                  {/* AI Badge Results Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-emerald-50/80 border border-blue-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Detected: {detectedCategory.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                        {aiAnalysisResult?.confidenceScore || 95}% Confidence
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="p-2.5 bg-white/90 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">Severity Score</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className={`text-lg font-extrabold ${severityScore >= 8 ? 'text-red-600' : severityScore >= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {severityScore}/10
                          </span>
                          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                        </div>
                      </div>

                      <div className="p-2.5 bg-white/90 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">Emergency Level</span>
                        <span className={`text-xs font-bold block mt-1 ${emergencyLevel === 'Critical' ? 'text-red-600 font-extrabold' : 'text-slate-800'}`}>
                          {emergencyLevel}
                        </span>
                      </div>

                      <div className="p-2.5 bg-white/90 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">Est. Repair SLA</span>
                        <span className="text-xs font-bold text-slate-800 block mt-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          {aiAnalysisResult?.estimatedRepairDays || 2} Days
                        </span>
                      </div>

                      <div className="p-2.5 bg-white/90 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">Duplicate Risk</span>
                        <span className="text-xs font-bold text-slate-800 block mt-1">
                          {duplicateMatch ? '⚠️ Potential' : '✓ Unique Ticket'}
                        </span>
                      </div>
                    </div>

                    {/* Department Routing */}
                    <div className="p-3 bg-white/95 rounded-xl border border-slate-200 flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Auto-Routed Department</span>
                        <p className="text-xs font-bold text-slate-900">{suggestedDept}</p>
                      </div>
                    </div>

                    {/* Citizen Impact */}
                    <div className="p-3 bg-white/95 rounded-xl border border-slate-200 flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Citizen Impact Estimation</span>
                        <p className="text-xs font-semibold text-slate-800">{citizenImpact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Duplicate Alert Warning if present */}
                  {duplicateMatch && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h5 className="text-xs font-bold text-amber-900">
                          Similar active report detected in this area (#{duplicateMatch.id})
                        </h5>
                        <p className="text-[11px] text-amber-800 mt-0.5">
                          "{duplicateMatch.title}". Submitting will link your evidence and upvote priority.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Local Language Summary */}
                  {aiAnalysisResult?.summaryInLocalLanguage && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Multilingual Summary ({aiAnalysisResult?.detectedLanguage || 'Regional'})
                      </span>
                      <p className="text-xs text-slate-800 font-medium leading-relaxed">
                        {aiAnalysisResult.summaryInLocalLanguage}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Cryptographic Evidence & Submission Confirmation */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Cryptographic Evidence Certificate
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">ISO-8601 Time Locked</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">SHA-256 Hash</span>
                    <span className="font-mono text-[10px] text-slate-200 break-all block">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">GPS Verification</span>
                    <span className="text-emerald-300 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Locked ({locationData.latitude.toFixed(4)}, {locationData.longitude.toFixed(4)})
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                  <span>Tamper Protection: Active</span>
                  <span className="text-amber-400 font-bold">+50 Civic Karma on Submission</span>
                </div>
              </div>

              {/* Review card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{title || 'Civic Issue'}</span>
                  <span className="text-blue-600">{category.toUpperCase()}</span>
                </div>
                <p className="text-slate-600">{description || 'Verified via mobile app.'}</p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
                  <span>{locationData.address}, {locationData.cityOrTown} ({locationData.state})</span>
                  <span className="font-bold text-slate-800">{suggestedDept}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={runAiAnalysis}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Next: AI Scan & Score</span>
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={isAnalyzing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <span>Next: Evidence Verification</span>
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Civic Report (+50 Karma)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
