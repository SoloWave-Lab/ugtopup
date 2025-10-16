import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
      navigate("/");
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    toast.info("Google sign-in coming soon!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-neutral-950 via-red-950/20 to-neutral-950">
      {/* Animated Red Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-background to-rose-500/20 animate-gradient" />
      
      {/* Multiple Animated Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-red-500/30 to-rose-600/30 rounded-full blur-[100px] animate-float" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-red-600/25 to-rose-400/25 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-500/15 to-rose-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,59,59,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,59,59,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Login Card with Floating Animation */}
        <div className="bg-gradient-to-br from-neutral-900/70 via-neutral-900/60 to-neutral-900/70 backdrop-blur-2xl rounded-3xl p-8 border border-red-500/20 shadow-2xl shadow-red-500/10 animate-float-slow hover:shadow-red-500/20 transition-shadow duration-700">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-red-400 via-rose-300 to-red-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(255,82,82,0.3)]">
              Welcome Back
            </h1>
            <p className="text-neutral-400 text-sm font-medium">
              Log in to access your our services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-neutral-300 font-medium">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 transition-all group-hover:text-red-300 group-hover:scale-110" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 h-12 bg-neutral-900/50 border-neutral-700 rounded-xl text-neutral-200 placeholder:text-neutral-500 focus:border-red-400 focus:ring-red-400/20 transition-all hover:border-red-400/50 hover:bg-neutral-900/70"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-neutral-300 font-medium">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400 transition-all group-hover:text-red-300 group-hover:scale-110" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12 pr-12 h-12 bg-neutral-900/50 border-neutral-700 rounded-xl text-neutral-200 placeholder:text-neutral-500 focus:border-red-400 focus:ring-red-400/20 transition-all hover:border-red-400/50 hover:bg-neutral-900/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button with Enhanced Glow */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 hover:from-red-600 hover:via-rose-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-[1.03] shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/60 animate-gradient bg-[length:200%_auto]"
            >
              {loading ? "Please wait..." : "Login"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-neutral-900/60 text-neutral-400">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-12 bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800/50 hover:border-red-400/30 text-neutral-200 rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-red-500/10"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
              Continue with Google
            </Button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-neutral-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
