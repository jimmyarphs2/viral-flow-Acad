import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Video, 
  Users, 
  Zap, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Youtube,
  Menu,
  X,
  Search,
  Star,
  Flame,
  Rocket,
  Target,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const stats = [
  { label: "Active Students", value: "12,400+" },
  { label: "Viral Videos Created", value: "85k+" },
  { label: "Total Views Generated", value: "2.4B+" },
  { label: "Success Rate", value: "94%" },
];

const features = [
  {
    title: "The Hook Strategy",
    description: "Learn how to stop the scroll in the first 0.5 seconds with our proven psychological triggers.",
    icon: <Zap className="w-6 h-6 text-tiktok-red" />,
  },
  {
    title: "Retention Mastery",
    description: "Keep viewers watching until the end with advanced editing techniques and storytelling loops.",
    icon: <Video className="w-6 h-6 text-tiktok-cyan" />,
  },
  {
    title: "Algorithm Hacking",
    description: "Understand the math behind the FYP and how to trigger the viral explosion every time.",
    icon: <TrendingUp className="w-6 h-6 text-tiktok-red" />,
  },
  {
    title: "Niche Authority",
    description: "Build a brand that people recognize and trust, turning viewers into loyal followers.",
    icon: <Users className="w-6 h-6 text-tiktok-cyan" />,
  },
];

const curriculum = [
  {
    id: "item-1",
    title: "Module 1: The Foundation",
    content: "Setting up your profile for maximum conversion, understanding your target audience, and finding your unique voice.",
  },
  {
    id: "item-2",
    title: "Module 2: Content Creation Workflow",
    content: "Our rapid-fire scripting method, high-quality filming with just a phone, and the 'Viral Edit' checklist.",
  },
  {
    id: "item-3",
    title: "Module 3: Growth & Monetization",
    content: "Leveraging trends without being a 'trend-chaser', brand deals, and selling your own products.",
  },
];

const testimonials = [
  {
    name: "Alex Rivera",
    handle: "@alexcreates",
    text: "I went from 200 views to 1.2M in just 3 weeks. The hook strategies alone are worth 10x the price.",
    avatar: "https://picsum.photos/seed/alex/100/100",
  },
  {
    name: "Sarah Chen",
    handle: "@sarahvlogs",
    text: "ViralFlow changed everything. I finally understand WHY my videos weren't working. Now I hit the FYP daily.",
    avatar: "https://picsum.photos/seed/sarah/100/100",
  },
  {
    name: "Marcus Thorne",
    handle: "@marcustalks",
    text: "The community is insane. Having experts review my scripts made all the difference in my growth.",
    avatar: "https://picsum.photos/seed/marcus/100/100",
  },
];

const processSteps = [
  {
    title: "Identify",
    description: "Find your winning niche using our data-driven research tools.",
    icon: <Search className="w-8 h-8 text-tiktok-cyan" />,
    step: "01"
  },
  {
    title: "Produce",
    description: "Create high-retention videos with our plug-and-play scripts.",
    icon: <Video className="w-8 h-8 text-tiktok-red" />,
    step: "02"
  },
  {
    title: "Hack",
    description: "Deploy the ViralFlow algorithm triggers to force FYP placement.",
    icon: <Zap className="w-8 h-8 text-tiktok-cyan" />,
    step: "03"
  },
  {
    title: "Monetize",
    description: "Turn your viral views into a sustainable six-figure business.",
    icon: <Rocket className="w-8 h-8 text-tiktok-red" />,
    step: "04"
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-tiktok-black text-white selection:bg-tiktok-red selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-tiktok-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-tiktok-red rounded-lg flex items-center justify-center rotate-3 shadow-[4px_4px_0px_#25F4EE]">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-2xl font-display tracking-tighter uppercase italic">ViralFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#features" className="hover:text-tiktok-red transition-colors">Strategies</a>
            <a href="#curriculum" className="hover:text-tiktok-cyan transition-colors">Curriculum</a>
            <a href="#testimonials" className="hover:text-tiktok-red transition-colors">Success Stories</a>
            <Button className="bg-white text-black hover:bg-tiktok-red hover:text-white transition-all rounded-none font-bold px-8">
              Join Now
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-tiktok-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-display uppercase italic">
              <a href="#features" onClick={() => setIsMenuOpen(false)}>Strategies</a>
              <a href="#curriculum" onClick={() => setIsMenuOpen(false)}>Curriculum</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Success Stories</a>
              <Button className="w-full bg-tiktok-red text-white py-8 text-xl rounded-none font-display italic">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tiktok-red/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tiktok-cyan/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-tiktok-red/10 text-tiktok-red border-tiktok-red/20 px-4 py-1 rounded-full uppercase tracking-widest font-bold">
                The #1 Short-Form Academy
              </Badge>
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display leading-[0.85] uppercase italic tracking-tighter mb-8">
                Stop <span className="text-tiktok-red">Posting</span><br />
                Start <span className="text-tiktok-cyan">Winning</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-heading">
                Master the psychological triggers that force the algorithm to push your content to millions. No dancing required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="bg-tiktok-red text-white hover:bg-white hover:text-black transition-all rounded-none font-display italic text-2xl px-12 py-8 group">
                  Join the Academy
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex items-center gap-4 text-white/40 font-medium uppercase tracking-widest text-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-tiktok-black" referrerPolicy="no-referrer" />
                    ))}
                  </div>
                  <span>12k+ Creators Joined</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-white/5 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display italic text-tiktok-cyan mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-24 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-display uppercase italic leading-none mb-6">
              The <span className="text-tiktok-red">ViralFlow</span> Path
            </h2>
            <p className="text-white/40 uppercase tracking-widest text-sm font-bold">Your Journey to Content Mastery</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute -top-6 -left-4 text-8xl font-display italic text-white/5 group-hover:text-tiktok-red/10 transition-colors pointer-events-none">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-tiktok-cyan/50 transition-all group-hover:rotate-3 shadow-xl">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-display uppercase italic mb-4 group-hover:text-tiktok-cyan transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed font-heading">
                    {step.description}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent -ml-8 z-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-7xl font-display uppercase italic leading-none mb-8">
                The <span className="text-tiktok-red">Viral</span><br />Framework
              </h2>
              <p className="text-xl text-white/60 mb-12 font-heading">
                We don't teach you how to use the app. We teach you how to use the human brain. Our framework is based on data from over 1,000 viral campaigns.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <div key={i} className="group">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tiktok-red/20 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-display uppercase italic mb-2">{feature.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-card border border-white/10 p-4 rounded-[2rem] shadow-2xl rotate-3">
                <div className="aspect-[9/16] bg-tiktok-black rounded-[1.5rem] overflow-hidden relative">
                  <img 
                    src="https://picsum.photos/seed/viral/1080/1920" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full border-2 border-tiktok-cyan overflow-hidden">
                        <img src="https://picsum.photos/seed/pro/40/40" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">@viral_master</div>
                        <div className="text-[10px] text-white/60">2.4M Views • 450k Likes</div>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="h-full bg-tiktok-red"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-tiktok-cyan/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-tiktok-red/30 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-24 bg-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-display uppercase italic mb-6">The Curriculum</h2>
            <p className="text-white/40 uppercase tracking-widest text-sm font-bold">From Zero to Viral in 30 Days</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {curriculum.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border border-white/10 bg-tiktok-black rounded-2xl px-6">
                <AccordionTrigger className="text-xl font-display uppercase italic hover:no-underline py-6">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-lg pb-6 font-heading">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-display uppercase italic leading-none mb-8">
              Real <span className="text-tiktok-cyan">Results</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 h-full hover:border-tiktok-red/50 transition-colors group">
                  <CardContent className="pt-8">
                    <div className="flex items-center gap-4 mb-6">
                      <img src={t.avatar} className="w-12 h-12 rounded-full border-2 border-tiktok-cyan" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-bold">{t.name}</div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">{t.handle}</div>
                      </div>
                    </div>
                    <p className="text-white/80 italic leading-relaxed mb-6">"{t.text}"</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="w-4 h-4 fill-tiktok-red text-tiktok-red" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-48 relative">
        <div className="absolute inset-0 bg-tiktok-red/10" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-display uppercase italic tracking-tighter mb-12">
              Ready to go <span className="text-tiktok-cyan">Viral?</span>
            </h2>
            <p className="text-2xl text-white/60 mb-12 max-w-2xl mx-auto font-heading">
              Join 12,000+ creators who have cracked the code. The next viral video could be yours.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-tiktok-cyan transition-all rounded-none font-display italic text-3xl px-16 py-10">
              Claim Your Spot
            </Button>
            <p className="mt-8 text-white/40 text-sm uppercase tracking-widest font-bold">
              Limited spots available for the April cohort
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-tiktok-red rounded flex items-center justify-center rotate-3">
                <Play className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-xl font-display tracking-tighter uppercase italic">ViralFlow</span>
            </div>
            <div className="flex gap-8 text-white/40 text-xs uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-white/40 hover:text-tiktok-red transition-colors cursor-pointer" />
              <Twitter className="w-5 h-5 text-white/40 hover:text-tiktok-cyan transition-colors cursor-pointer" />
              <Youtube className="w-5 h-5 text-white/40 hover:text-tiktok-red transition-colors cursor-pointer" />
            </div>
          </div>
          <Separator className="my-8 bg-white/10" />
          <div className="text-center text-white/20 text-[10px] uppercase tracking-[0.3em]">
            © 2026 ViralFlow Academy. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-tiktok-red text-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_#25F4EE] hover:scale-110 active:scale-95 transition-transform"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
