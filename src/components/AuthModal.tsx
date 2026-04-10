import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth, isFirebaseEnabled } from "@/lib/firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = "signin" }) => {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const { signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFirebaseEnabled) {
      setError("Authentication is currently disabled due to missing configuration.");
      return;
    }
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: fullName });
        onClose();
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent. Check your inbox.");
        setTimeout(() => setMode("signin"), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || "Google sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-tiktok-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-tiktok-black border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-tiktok-red/10 rounded-full blur-[60px]" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-tiktok-cyan/10 rounded-full blur-[60px]" />
          </div>

          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-display uppercase italic mb-2">
              {mode === "signin" ? "Welcome Back" : mode === "signup" ? "Join the Elite" : "Reset Password"}
            </h2>
            <p className="text-white/40 text-sm font-heading">
              {mode === "signin" 
                ? "Access your growth intelligence dashboard" 
                : mode === "signup" 
                ? "Start your journey to algorithm mastery"
                : "Enter your email to receive a reset link"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-tiktok-red/10 border border-tiktok-red/20 rounded-xl flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-tiktok-red shrink-0 mt-0.5" />
              <p className="text-tiktok-red text-xs font-heading">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-tiktok-cyan/10 border border-tiktok-cyan/20 rounded-xl flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-tiktok-cyan shrink-0 mt-0.5" />
              <p className="text-tiktok-cyan text-xs font-heading">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-tiktok-cyan transition-colors font-heading"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-tiktok-cyan transition-colors font-heading"
              />
            </div>

            {mode !== "forgot" && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-tiktok-cyan transition-colors font-heading"
                />
              </div>
            )}

            {mode === "signin" && (
              <div className="text-right">
                <button 
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs text-white/40 hover:text-tiktok-cyan transition-colors font-medium uppercase tracking-widest"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-tiktok-red hover:bg-tiktok-red/90 text-white py-8 rounded-full text-xl font-display uppercase italic shadow-[0_0_30px_rgba(254,44,85,0.2)]"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-tiktok-black px-4 text-white/20 font-bold">Or continue with</span>
              </div>
            </div>

            <Button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              variant="outline"
              className="w-full border-white/10 hover:bg-white/5 text-white py-8 rounded-full text-lg font-display uppercase italic flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-sm text-white/40 hover:text-tiktok-cyan transition-colors font-heading"
            >
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <span className="text-tiktok-cyan font-bold underline underline-offset-4">
                {mode === "signin" ? "Join Now" : "Sign In"}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
