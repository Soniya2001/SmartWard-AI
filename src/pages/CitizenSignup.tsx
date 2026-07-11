import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  Globe, 
  Upload, 
  Trash2, 
  Info, 
  ArrowRight, 
  Smartphone, 
  Landmark, 
  CheckCircle, 
  MapPin, 
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Geography Demo Data for cascading dropdowns
interface DistrictData {
  corporations: string[];
  wards: string[];
}

interface StateData {
  districts: Record<string, DistrictData>;
}

const GEOGRAPHY_DATA: Record<string, StateData> = {
  'Tamil Nadu': {
    districts: {
      'Madurai': {
        corporations: ['Madurai Corporation', 'Melur Municipality', 'Thirumangalam Municipality'],
        wards: ['Ward 42', 'Ward 43', 'Ward 10', 'Ward 15', 'Ward 8']
      },
      'Chennai': {
        corporations: ['Chennai Metropolitan', 'Tambaram Corporation', 'Avadi Corporation'],
        wards: ['Ward 12', 'Ward 18', 'Ward 105', 'Ward 142']
      },
      'Coimbatore': {
        corporations: ['Coimbatore Corporation', 'Pollachi Municipality', 'Mettupalayam Municipality'],
        wards: ['Ward 3', 'Ward 24', 'Ward 45']
      }
    }
  },
  'Karnataka': {
    districts: {
      'Bengaluru': {
        corporations: ['BBMP Bengaluru', 'Yelahanka Municipality'],
        wards: ['Ward 4', 'Ward 12', 'Ward 84', 'Ward 112']
      },
      'Mysuru': {
        corporations: ['Mysuru City Corporation', 'Hunsur Municipality'],
        wards: ['Ward 1', 'Ward 5', 'Ward 18']
      }
    }
  },
  'Kerala': {
    districts: {
      'Thiruvananthapuram': {
        corporations: ['Trivandrum Corporation', 'Neyyattinkara Municipality'],
        wards: ['Ward 10', 'Ward 12', 'Ward 25']
      },
      'Kochi': {
        corporations: ['Kochi Municipal Corporation', 'Kalamassery Municipality'],
        wards: ['Ward 2', 'Ward 9', 'Ward 33']
      }
    }
  }
};

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' }
];

export const CitizenSignup: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Cascading Address Dropdowns
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedDistrict, setSelectedDistrict] = useState('Madurai');
  const [selectedCorporation, setSelectedCorporation] = useState('Madurai Corporation');
  const [selectedWard, setSelectedWard] = useState('Ward 42');

  // Preferred Language
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  // Profile Photo Upload
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Terms and conditions
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI Only validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitStepMessage, setSubmitStepMessage] = useState('');

  // Handle Cascading Address Updates
  useEffect(() => {
    // If state changes, update district to first available
    const districts = Object.keys(GEOGRAPHY_DATA[selectedState]?.districts || {});
    if (districts.length > 0 && !districts.includes(selectedDistrict)) {
      setSelectedDistrict(districts[0]);
    }
  }, [selectedState]);

  useEffect(() => {
    // If district changes, update corporation and ward to first available
    const districtInfo = GEOGRAPHY_DATA[selectedState]?.districts[selectedDistrict];
    if (districtInfo) {
      if (districtInfo.corporations.length > 0) {
        setSelectedCorporation(districtInfo.corporations[0]);
      }
      if (districtInfo.wards.length > 0) {
        setSelectedWard(districtInfo.wards[0]);
      }
    }
  }, [selectedDistrict, selectedState]);

  // Photo Selector Logic
  const handlePhotoSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfilePhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Inline Validation Helper
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === 'fullName') {
      if (!value.trim()) {
        newErrors.fullName = 'Full legal name is required.';
      } else if (value.trim().length < 3) {
        newErrors.fullName = 'Name must be at least 3 characters.';
      } else {
        delete newErrors.fullName;
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        newErrors.email = 'Email address is required.';
      } else if (!emailRegex.test(value)) {
        newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'mobileNumber') {
      const phoneRegex = /^\d{10}$/;
      if (!value) {
        newErrors.mobileNumber = 'Mobile number is required.';
      } else if (!phoneRegex.test(value.replace(/\D/g, ''))) {
        newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
      } else {
        delete newErrors.mobileNumber;
      }
    }

    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required.';
      } else if (value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      } else {
        delete newErrors.password;
      }

      // Revalidate confirm password if it's already filled
      if (confirmPassword && value !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      } else if (confirmPassword && value === confirmPassword) {
        delete newErrors.confirmPassword;
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        newErrors.confirmPassword = 'Please confirm your password.';
      } else if (value !== password) {
        newErrors.confirmPassword = 'Passwords do not match.';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  // Submit Handler with step simulation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run all validations
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full legal name is required.';
    else if (fullName.trim().length < 3) newErrors.fullName = 'Name must be at least 3 characters.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = 'Email address is required.';
    else if (!emailRegex.test(email)) newErrors.email = 'Please provide a valid email format.';

    const phoneRegex = /^\d{10}$/;
    if (!mobileNumber) newErrors.mobileNumber = 'Mobile number is required.';
    else if (!phoneRegex.test(mobileNumber.replace(/\D/g, ''))) newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match.';

    if (!termsAccepted) newErrors.terms = 'You must accept the Terms & Conditions.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(`citizen-signup-${firstErrorKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // All clear - execute registration sequence simulation
    try {
      setIsSubmitting(true);
      
      const steps = [
        'Initiating secure cryptographic connection...',
        'Validating national ID credentials against registry...',
        'Mapping geolocational ward routing nodes (Ward ' + selectedWard.replace(/\D/g, '') + ')...',
        'Provisioning SmartWard decentralized storage keys...',
        'Completing secure citizen onboarding...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setSubmitStepMessage(steps[i]);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Log in in AuthContext
      await register(email, fullName, 'citizen');
      
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/citizen/dashboard');
      }, 1500);

    } catch (err) {
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsLeft = [
    {
      id: 1,
      title: "Citizen Submission",
      desc: "Report local infrastructure, water, or safety issues in 30 seconds.",
      icon: Smartphone,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      title: "AI-Augmented Routing",
      desc: "SmartWard AI analyzes, translates, and routes issues to appropriate desks.",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Government Dispatch",
      desc: "Ward Engineers and City Officials deploy resolution crews and heavy machinery.",
      icon: Landmark,
      color: "from-amber-500 to-orange-600",
    },
    {
      id: 4,
      title: "Sovereign Resolution",
      desc: "Grievances closed with verified proof of work and public scorecards.",
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-600",
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-slate-50/50 font-sans" id="citizen-signup-container">
      
      {/* LEFT SPLIT PANEL (40% - Illustration & Value Props) */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-850 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-r border-slate-800">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gov-blue/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

        {/* Logo Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gov-blue flex items-center justify-center text-white shadow-lg shadow-gov-blue/20">
            <Shield className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="text-lg font-black font-display tracking-tight text-white leading-none">SmartWard <span className="text-gov-blue">AI</span></h1>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mt-0.5">Sovereign Grievance Engine</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 my-12 lg:my-0 space-y-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gov-blue/10 border border-gov-blue/30 text-xs text-gov-blue font-bold">
              <Sparkles className="h-3.5 w-3.5" /> Secure Public Registry
            </span>
            <h2 className="text-3xl lg:text-4xl font-black font-display tracking-tight text-white leading-tight">
              Create Your <br className="hidden lg:block" />
              SmartWard Account
            </h2>
            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-md">
              Join SmartWard AI to report civic issues, track complaint progress, receive updates, and contribute to building smarter, resilient communities.
            </p>
          </div>

          {/* Pipeline Steps - Dynamic Layout */}
          <div className="relative pl-1">
            {/* Timeline Vertical Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-slate-800 pointer-events-none hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {stepsLeft.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="relative flex items-start gap-4 p-3 bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/60 rounded-xl transition-all group">
                    <div className="relative z-10 h-9 w-9 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 shrink-0 group-hover:border-gov-blue group-hover:text-gov-blue transition-colors">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-0.5 text-left">
                      <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        {step.title}
                        <ChevronRight className="h-3 w-3 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium leading-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="relative z-10 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sovereign Node Security Verified</span>
          </div>
          <span className="font-mono text-[10px]">v1.4.0-STABLE</span>
        </div>

      </div>

      {/* RIGHT SPLIT PANEL (60% - Registration Form) */}
      <div className="lg:col-span-7 p-4 sm:p-10 lg:p-14 xl:p-18 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-2xl space-y-6">
          
          {/* Header Card for Mobile/Tablet */}
          <div className="lg:hidden text-center space-y-2 mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gov-blue text-white shadow-md mb-2">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Create Your SmartWard Account
            </h2>
            <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
              Join SmartWard AI to report civic issues, track complaint progress, and contribute to building smarter communities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl md3-shadow-lg overflow-hidden">
            
            {/* Top Interactive Bar */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider font-mono">Citizen Enrolment Form</h3>
                <p className="text-[10px] text-slate-500 font-medium">Please supply accurate, verified registry details below.</p>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-200 px-2.5 py-0.5 rounded uppercase">
                Step 1 of 1
              </span>
            </div>

            {/* Error Overlay / Submission State */}
            <AnimatePresence mode="wait">
              {isSubmitting && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
                >
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full border-4 border-gov-blue/20 border-t-gov-blue animate-spin" />
                    <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5.5 w-5.5 text-gov-blue" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-mono">Onboarding Sandbox Profile</h4>
                    <p className="text-xs text-slate-500 font-semibold">{submitStepMessage}</p>
                  </div>
                </motion.div>
              )}

              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-white flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 scale-110">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">Registration Complete!</h4>
                    <p className="text-xs text-slate-500 font-semibold">Your cryptographic citizen credentials have been provisioned.</p>
                  </div>
                  <p className="text-[11px] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-mono font-bold animate-pulse">
                    Routing to Digital Ward Dashboard...
                  </p>
                </motion.div>
              )}

              {!isSubmitting && !submitSuccess && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  className="p-6 sm:p-8 space-y-6 text-left"
                >
                  
                  {/* Photo Upload Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-slate-100">
                    <div 
                      onClick={handlePhotoSelectClick}
                      className="relative h-20 w-20 rounded-full border-2 border-dashed border-slate-300 hover:border-gov-blue bg-slate-50 hover:bg-slate-100/70 flex flex-col items-center justify-center cursor-pointer overflow-hidden group shrink-0 transition-all shadow-sm"
                      title="Select Profile Photo"
                    >
                      {photoPreview ? (
                        <img 
                          src={photoPreview} 
                          alt="Citizen preview" 
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-gov-blue">
                          <Upload className="h-5 w-5" />
                        </div>
                      )}

                      {photoPreview && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}

                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>

                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Profile Photo <span className="text-slate-400 font-normal">(Optional)</span></h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-normal max-w-sm">
                        Upload a clean, clear photo of yourself. This is used on your ward ID card and for official communications with your Ward Engineer.
                      </p>
                      <button
                        type="button"
                        onClick={handlePhotoSelectClick}
                        className="text-xs font-bold text-gov-blue hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        {photoPreview ? 'Change Image' : 'Choose Local Image'} <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Submission Main Errors */}
                  {errors.submit && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-danger-light border border-danger/10 text-xs text-danger font-medium">
                      <AlertCircle className="h-4.5 w-4.5 text-danger shrink-0 mt-0.5" />
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  {/* Form Fields: Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5" id="citizen-signup-fullName">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            validateField('fullName', e.target.value);
                          }}
                          onBlur={() => validateField('fullName', fullName)}
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border ${errors.fullName ? 'border-danger focus:ring-danger/20' : 'border-slate-300 focus:ring-gov-blue/20 focus:border-gov-blue'} rounded-xl focus:outline-none focus:ring-2 transition-all font-medium`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-[10px] text-danger font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 shrink-0" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5" id="citizen-signup-email">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="citizen@domain.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            validateField('email', e.target.value);
                          }}
                          onBlur={() => validateField('email', email)}
                          className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border ${errors.email ? 'border-danger focus:ring-danger/20' : 'border-slate-300 focus:ring-gov-blue/20 focus:border-gov-blue'} rounded-xl focus:outline-none focus:ring-2 transition-all font-medium`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[10px] text-danger font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 shrink-0" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1.5" id="citizen-signup-mobileNumber">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Mobile Number *</label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400 select-none">
                          +91
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="9876543210"
                          value={mobileNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setMobileNumber(val);
                            validateField('mobileNumber', val);
                          }}
                          onBlur={() => validateField('mobileNumber', mobileNumber)}
                          className={`w-full pl-12 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border ${errors.mobileNumber ? 'border-danger focus:ring-danger/20' : 'border-slate-300 focus:ring-gov-blue/20 focus:border-gov-blue'} rounded-xl focus:outline-none focus:ring-2 transition-all font-medium`}
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="text-[10px] text-danger font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 shrink-0" /> {errors.mobileNumber}
                        </p>
                      )}
                    </div>

                    {/* Language Preference */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Preferred Language *</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
                        <select
                          value={preferredLanguage}
                          onChange={(e) => setPreferredLanguage(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold appearance-none"
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 border-l border-slate-200 pl-2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5" id="citizen-signup-password">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            validateField('password', e.target.value);
                          }}
                          onBlur={() => validateField('password', password)}
                          className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border ${errors.password ? 'border-danger focus:ring-danger/20' : 'border-slate-300 focus:ring-gov-blue/20 focus:border-gov-blue'} rounded-xl focus:outline-none focus:ring-2 transition-all font-medium`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-[10px] text-danger font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 shrink-0" /> {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5" id="citizen-signup-confirmPassword">
                      <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Confirm Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            validateField('confirmPassword', e.target.value);
                          }}
                          onBlur={() => validateField('confirmPassword', confirmPassword)}
                          className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border ${errors.confirmPassword ? 'border-danger focus:ring-danger/20' : 'border-slate-300 focus:ring-gov-blue/20 focus:border-gov-blue'} rounded-xl focus:outline-none focus:ring-2 transition-all font-medium`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-[10px] text-danger font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 shrink-0" /> {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* ADDRESS INFORMATION SECTION (CASCADING DROPDOWNS) */}
                  <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
                      <MapPin className="h-4.5 w-4.5 text-gov-blue" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Territorial Jurisdiction Mapping</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Helps map and route grievances automatically to correct municipal desks.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      
                      {/* State Dropdown */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono block">State</label>
                        <div className="relative">
                          <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs bg-white hover:bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold appearance-none"
                          >
                            {Object.keys(GEOGRAPHY_DATA).map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* District Dropdown */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono block">District</label>
                        <div className="relative">
                          <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs bg-white hover:bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold appearance-none"
                          >
                            {Object.keys(GEOGRAPHY_DATA[selectedState]?.districts || {}).map((dist) => (
                              <option key={dist} value={dist}>{dist}</option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Corporation / Municipality */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono block">Corporation / Muni</label>
                        <div className="relative">
                          <select
                            value={selectedCorporation}
                            onChange={(e) => setSelectedCorporation(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs bg-white hover:bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold appearance-none"
                          >
                            {(GEOGRAPHY_DATA[selectedState]?.districts[selectedDistrict]?.corporations || []).map((corp) => (
                              <option key={corp} value={corp}>{corp}</option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Ward Number */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono block">Ward Number</label>
                        <div className="relative">
                          <select
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                            className="w-full px-2.5 py-2 text-xs bg-white hover:bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold appearance-none"
                          >
                            {(GEOGRAPHY_DATA[selectedState]?.districts[selectedDistrict]?.wards || []).map((w) => (
                              <option key={w} value={w}>{w}</option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                            ▼
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="space-y-2" id="citizen-signup-terms">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => {
                          setTermsAccepted(e.target.checked);
                          if (e.target.checked) {
                            const newErrors = { ...errors };
                            delete newErrors.terms;
                            setErrors(newErrors);
                          }
                        }}
                        className={`h-4.5 w-4.5 rounded text-gov-blue focus:ring-gov-blue/30 mt-0.5 ${errors.terms ? 'border-danger' : 'border-slate-300'}`}
                      />
                      <span className="text-xs text-slate-600 font-semibold leading-normal">
                        I agree to the <Link to="/about" className="text-gov-blue hover:underline">Terms & Conditions</Link> and <Link to="/about" className="text-gov-blue hover:underline">Privacy Policy</Link> governing official SmartWard AI registries.
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-[10px] text-danger font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" /> {errors.terms}
                      </p>
                    )}
                  </div>

                  {/* Buttons Section */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 text-sm font-bold text-white bg-gov-blue hover:bg-gov-blue-dark rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 hover:shadow"
                      id="citizen-signup-submit"
                    >
                      <CheckCircle2 className="h-4.5 w-4.5" />
                      Create Account
                    </button>

                    <div className="text-center text-xs text-slate-500 font-medium py-1">
                      Already have a citizen account?{' '}
                      <Link to="/login/citizen" className="font-bold text-gov-blue hover:underline inline-flex items-center gap-0.5">
                        Login to Portal <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Info Card Block */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2.5 text-[11px] leading-relaxed text-slate-500 font-semibold">
                    <Info className="h-4.5 w-4.5 text-gov-blue shrink-0 mt-0.5" />
                    <span>
                      Your information helps SmartWard AI automatically route complaints to the correct ward and authority. This avoids manual triage delay and secures 95%+ SLA compliance ratings.
                    </span>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </form>

        </div>
      </div>

    </div>
  );
};
