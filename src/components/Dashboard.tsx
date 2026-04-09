import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  History, 
  Zap, 
  BookOpen, 
  User, 
  LogOut, 
  TrendingUp, 
  Rocket, 
  DollarSign, 
  BarChart3,
  ChevronRight,
  Plus,
  Lock,
  Loader2,
  CheckCircle2,
  Sparkles,
  Play
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Link, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "simulations" | "tools" | "learning" | "account">("overview");
  const [simulations, setSimulations] = useState<any[]>([]);
  const [loadingSims, setLoadingSims] = useState(true);

  useEffect(() => {
    const fetchSimulations = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, "users", user.uid, "simulations"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const sims = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSimulations(sims);
      } catch (error) {
        console.error("Error fetching simulations:", error);
      } finally {
        setLoadingSims(false);
      }
    };

    fetchSimulations();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "simulations", label: "My Simulations", icon: <History className="w-5 h-5" /> },
    { id: "tools", label: "ViralFlow Tools", icon: <Zap className="w-5 h-5" /> },
    { id: "learning", label: "Members Area", icon: <BookOpen className="w-5 h-5" /> },
    { id: "account", label: "Account", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-tiktok-black text-white flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-white/10 flex flex-col bg-tiktok-black/50 backdrop-blur-xl fixed h-full z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-tiktok-red rounded-lg flex items-center justify-center rotate-3 shadow-[4px_4px_0px_#25F4EE]">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-2xl font-display tracking-tighter uppercase italic hidden lg:block">ViralFlow</span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                activeTab === item.id 
                  ? "bg-tiktok-red text-white shadow-[0_0_20px_rgba(254,44,85,0.2)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`${activeTab === item.id ? "text-white" : "group-hover:text-tiktok-cyan"}`}>
                {item.icon}
              </div>
              <span className="font-display uppercase italic text-sm tracking-widest hidden lg:block">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 p-4 text-white/40 hover:text-tiktok-red transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-display uppercase italic text-sm tracking-widest hidden lg:block">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 p-6 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-display uppercase italic mb-2">
                      Welcome back, <span className="text-tiktok-cyan">{user?.displayName?.split(' ')[0] || 'Creator'}</span>
                    </h1>
                    <p className="text-white/40 font-heading">Your growth intelligence lab is ready.</p>
                  </div>
                  <Link to="/">
                    <Button className="bg-tiktok-red hover:bg-tiktok-red/90 text-white px-8 py-6 rounded-full font-display uppercase italic group">
                      New Simulation
                      <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { label: "Total Simulations", value: simulations.length, icon: <History className="w-6 h-6" />, color: "tiktok-red" },
                    { label: "Avg. Potential", value: "High", icon: <TrendingUp className="w-6 h-6" />, color: "tiktok-cyan" },
                    { label: "Growth Status", value: "Elite", icon: <Rocket className="w-6 h-6" />, color: "white" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group">
                      <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity text-${stat.color}`}>
                        {stat.icon}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2">{stat.label}</div>
                      <div className={`text-4xl font-display italic text-${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Upgrade Banner */}
                <div className="bg-gradient-to-r from-tiktok-red/20 to-tiktok-cyan/20 border border-white/10 rounded-[2.5rem] p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-display uppercase italic mb-2">Remove Your <span className="text-tiktok-red">Growth Ceiling</span></h2>
                    <p className="text-white/60 font-heading text-sm">Stop guessing why your retention is dropping. Unlock advanced algorithm triggers and private strategy sessions.</p>
                  </div>
                  <Button className="relative z-10 bg-white text-black hover:bg-tiktok-cyan transition-all px-8 py-6 rounded-full font-display uppercase italic shadow-xl">
                    Upgrade to Elite
                  </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Recent Simulations */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display uppercase italic">Recent Simulations</h2>
                      <button onClick={() => setActiveTab("simulations")} className="text-xs text-tiktok-cyan uppercase tracking-widest font-bold hover:underline">View All</button>
                    </div>

                    {loadingSims ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-tiktok-red animate-spin" />
                      </div>
                    ) : simulations.length > 0 ? (
                      <div className="space-y-4">
                        {simulations.map((sim) => (
                          <div key={sim.id} className="bg-tiktok-black border border-white/5 p-6 rounded-2xl hover:border-tiktok-cyan transition-all group">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-lg font-display italic text-white group-hover:text-tiktok-cyan transition-colors">{sim.niche}</div>
                              <Badge className="bg-tiktok-red/10 text-tiktok-red border-none text-[10px]">{sim.viralPotential}</Badge>
                            </div>
                            <div className="text-xs text-white/40 font-heading">
                              {new Date(sim.createdAt?.seconds * 1000).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-white/20 font-heading mb-6">No simulations yet.</p>
                        <Link to="/">
                          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white rounded-full">Start First Simulation</Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Quick Tools */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                    <h2 className="text-2xl font-display uppercase italic mb-8">Growth Tools</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Hook Lab", icon: <Zap className="w-5 h-5" />, desc: "Fix Retention", premium: false },
                        { label: "Niche Scout", icon: <BarChart3 className="w-5 h-5" />, desc: "Stop Stagnation", premium: false },
                        { label: "Revenue Calc", icon: <DollarSign className="w-5 h-5" />, desc: "Monetize Reach", premium: true },
                        { label: "Strategy", icon: <BookOpen className="w-5 h-5" />, desc: "Viral Roadmap", premium: true },
                      ].map((tool, i) => (
                        <button key={i} className="bg-tiktok-black border border-white/5 p-6 rounded-2xl hover:border-tiktok-cyan text-left transition-all group relative overflow-hidden">
                          {tool.premium && (
                            <div className="absolute top-2 right-2">
                              <Lock className="w-3 h-3 text-tiktok-red" />
                            </div>
                          )}
                          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tiktok-cyan/10 transition-colors">
                            <div className="text-white/40 group-hover:text-tiktok-cyan transition-colors">{tool.icon}</div>
                          </div>
                          <div className="text-sm font-display uppercase italic mb-1">{tool.label}</div>
                          <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{tool.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "simulations" && (
              <motion.div
                key="simulations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-4xl lg:text-5xl font-display uppercase italic mb-12">Simulation <span className="text-tiktok-red">History</span></h1>
                
                {loadingSims ? (
                  <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-12 h-12 text-tiktok-red animate-spin" />
                  </div>
                ) : simulations.length > 0 ? (
                  <div className="grid gap-6">
                    {simulations.map((sim) => (
                      <div key={sim.id} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-tiktok-cyan transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-display italic">{sim.niche}</h3>
                              <Badge className="bg-tiktok-cyan/10 text-tiktok-cyan border-none">{sim.viralPotential}</Badge>
                            </div>
                            <p className="text-white/40 text-sm font-heading mb-4">Refined: {sim.refinedNiche}</p>
                            <div className="flex flex-wrap gap-2">
                              {sim.hooks?.slice(0, 2).map((hook: string, i: number) => (
                                <div key={i} className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-white/60 font-heading truncate max-w-[200px]">
                                  "{hook}"
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <div className="text-xl font-display italic text-tiktok-red">{sim.projectedViewsMax}</div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40">Max Views</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-display italic text-tiktok-cyan">{sim.monthlyRevenueMax}</div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40">Max Rev</div>
                            </div>
                            <Button variant="ghost" className="text-white/40 hover:text-white">
                              <ChevronRight className="w-6 h-6" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-white/5 border border-white/10 rounded-[2.5rem]">
                    <History className="w-16 h-16 text-white/10 mx-auto mb-6" />
                    <h3 className="text-2xl font-display uppercase italic mb-4">No History Found</h3>
                    <p className="text-white/40 font-heading mb-8">Run your first simulation to start building your growth library.</p>
                    <Link to="/">
                      <Button className="bg-tiktok-red text-white px-8 py-6 rounded-full font-display uppercase italic">Start Simulation</Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "learning" && (
              <motion.div
                key="learning"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center justify-between mb-12">
                  <h1 className="text-4xl lg:text-5xl font-display uppercase italic">Members <span className="text-tiktok-cyan">Area</span></h1>
                  <Badge className="bg-tiktok-red text-white px-4 py-1 rounded-full uppercase tracking-widest font-bold">Elite Access</Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: "Why You're Being Ignored", category: "Algorithm", duration: "45m", locked: false },
                    { title: "The 0.5s Psychology", category: "Hooks", duration: "32m", locked: false },
                    { title: "Escaping the 200 View Jail", category: "Growth", duration: "58m", locked: true },
                    { title: "Retention Leak Audit", category: "Technical", duration: "25m", locked: true },
                    { title: "High-Ceiling Niches", category: "Strategy", duration: "40m", locked: true },
                    { title: "Monetization Secrets", category: "Revenue", duration: "35m", locked: true },
                  ].map((lesson, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-tiktok-cyan transition-all">
                      <div className="aspect-video bg-tiktok-black relative flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/lesson${i}/640/360`} 
                          className={`w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700 ${lesson.locked ? 'blur-sm' : ''}`}
                          referrerPolicy="no-referrer"
                        />
                        {lesson.locked ? (
                          <div className="absolute inset-0 bg-tiktok-black/60 flex flex-col items-center justify-center gap-4">
                            <Lock className="w-10 h-10 text-tiktok-red" />
                            <span className="text-xs uppercase tracking-widest font-bold text-tiktok-red">Premium Only</span>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                              <Play className="w-6 h-6 fill-current ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase tracking-widest text-tiktok-cyan font-bold">{lesson.category}</span>
                          <span className="text-[10px] text-white/40 font-bold">{lesson.duration}</span>
                        </div>
                        <h3 className="text-xl font-display italic mb-4">{lesson.title}</h3>
                        <Button 
                          disabled={lesson.locked}
                          variant={lesson.locked ? "outline" : "default"}
                          className={`w-full rounded-full font-display uppercase italic ${lesson.locked ? 'border-white/10 text-white/20' : 'bg-white text-black hover:bg-tiktok-cyan'}`}
                        >
                          {lesson.locked ? "Upgrade to Unlock" : "Start Lesson"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "account" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-4xl lg:text-5xl font-display uppercase italic mb-12">My <span className="text-white">Account</span></h1>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                      <h2 className="text-2xl font-display uppercase italic mb-8">Profile Information</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                          <div className="bg-tiktok-black border border-white/5 p-4 rounded-xl text-white font-heading">
                            {user?.displayName || "Not set"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                          <div className="bg-tiktok-black border border-white/5 p-4 rounded-xl text-white font-heading">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                      <h2 className="text-2xl font-display uppercase italic mb-8">Security</h2>
                      <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white rounded-full font-display uppercase italic">
                        Change Password
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-tiktok-red/5 border border-tiktok-red/20 rounded-[2.5rem] p-8 relative overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-tiktok-red/10 rounded-full blur-[40px]" />
                      <h2 className="text-2xl font-display uppercase italic mb-2">Current Plan</h2>
                      <div className="text-4xl font-display italic text-tiktok-red mb-6">Free Tier</div>
                      <ul className="space-y-3 mb-8">
                        {[
                          { label: "Basic AI Simulations", active: true },
                          { label: "Standard Hook Gen", active: true },
                          { label: "Elite Members Area", active: false },
                          { label: "Advanced Analytics", active: false },
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-heading">
                            {item.active ? <CheckCircle2 className="w-4 h-4 text-tiktok-red" /> : <Lock className="w-4 h-4 text-white/20" />}
                            <span className={item.active ? "text-white/80" : "text-white/20"}>{item.label}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full bg-tiktok-red hover:bg-tiktok-red/90 text-white py-6 rounded-full font-display uppercase italic shadow-[0_0_20px_rgba(254,44,85,0.3)]">
                        Upgrade to Elite
                      </Button>
                    </div>

                    <Button 
                      onClick={handleSignOut}
                      variant="ghost" 
                      className="w-full text-white/40 hover:text-tiktok-red hover:bg-tiktok-red/5 py-6 rounded-full font-display uppercase italic border border-white/5"
                    >
                      <LogOut className="mr-2 w-5 h-5" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
