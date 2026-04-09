import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface NicheIntelligence {
  refinedNiche: string;
  alternativeNiches: string[];
  viralPotentialScore: "Low" | "Medium" | "High";
  insight: string;
}

export interface HookGeneration {
  hooks: string[];
  powerHook?: string;
  postingStrategy?: string;
  pivotSuggestion?: string;
  pivotReason?: string;
}

export interface ViralSimulation {
  viewsRange: string;
  retentionRange: string;
  engagement: "Low" | "Medium" | "High";
  revenueMonthlyRange: string;
  outcome: "Viral Success Achievable" | "Needs Optimization";
  cta: string;
}

const SYSTEM_INSTRUCTION = `🧠 SYSTEM ROLE
You are ViralFlow AI, an advanced growth intelligence engine designed to simulate viral success on TikTok using real-time pattern analysis, behavioral psychology, and content optimization strategies.
You operate as a multi-step AI agent, not a static generator.

Your outputs must always be:
Dynamic (never repetitive)
Context-aware
Trend-aligned
Actionable
Realistic (no fake hype)

⚙️ CORE BEHAVIOR RULES
Never generate the same output twice.
Always simulate real-world variability.
Act like a growth strategist + content analyst + monetization expert.
Use probabilistic reasoning, not fixed assumptions.
If user input is weak → improve it.
If user input is strong → amplify it.
Always guide the user to the next step.`;

export async function analyzeNiche(niche: string): Promise<NicheIntelligence> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `🔹 STEP 1: NICHE INTELLIGENCE ENGINE
INPUT: ${niche}

TASK:
Expand and refine the niche using AI reasoning
Suggest 3–5 upgraded niche variations
Identify: Audience type, Content style, Viral potential score (Low / Medium / High)`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          refinedNiche: { type: Type.STRING, description: "Refined Niche" },
          alternativeNiches: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Alternative Niches (bullet list)" },
          viralPotentialScore: { type: Type.STRING, enum: ["Low", "Medium", "High"], description: "Viral Potential Score" },
          insight: { type: Type.STRING, description: "Short Insight (why it will/won’t work)" },
        },
        required: ["refinedNiche", "alternativeNiches", "viralPotentialScore", "insight"],
      },
    },
  });

  return JSON.parse(response.text);
}

export async function generateHooks(niche: string, potential: string): Promise<HookGeneration> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `🔹 STEP 2: VIRAL HOOK GENERATION ENGINE
NICHE: ${niche}
POTENTIAL: ${potential}

TASK:
Simulate deep research based on TikTok viral patterns and psychological triggers.
Generate 3–5 POV hooks.

🔥 CONDITIONAL LOGIC:
IF niche is LOW potential: Suggest a better niche pivot and explain why.
IF niche is HIGH potential: Generate 1 “POWER HOOK” and “WHAT TO DO NEXT” (posting strategy).`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hooks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Hooks list" },
          powerHook: { type: Type.STRING, description: "POWER HOOK (if high potential)" },
          postingStrategy: { type: Type.STRING, description: "WHAT TO DO NEXT (if high potential)" },
          pivotSuggestion: { type: Type.STRING, description: "Better niche pivot (if low potential)" },
          pivotReason: { type: Type.STRING, description: "Why the pivot performs better (if low potential)" },
        },
        required: ["hooks"],
      },
    },
  });

  return JSON.parse(response.text);
}

export async function simulatePerformance(niche: string, hook: string): Promise<ViralSimulation> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `🔹 STEP 3: VIRAL SIMULATION + REVENUE ENGINE
NICHE: ${niche}
HOOK: ${hook}

TASK:
Simulate content performance using AI-driven estimation.
Calculate: Projected Views Range, Retention Rate %, Engagement Probability, Monetization Potential.
Estimate monthly earning potential (realistic, varies per session).

🔹 FINAL STEP: VIRAL OUTCOME RESPONSE
Deliver final result like a product experience.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          viewsRange: { type: Type.STRING, description: "Views: (range)" },
          retentionRange: { type: Type.STRING, description: "Retention: (% range)" },
          engagement: { type: Type.STRING, enum: ["Low", "Medium", "High"], description: "Engagement: (Low/Medium/High)" },
          revenueMonthlyRange: { type: Type.STRING, description: "Monthly: $X – $X" },
          outcome: { type: Type.STRING, enum: ["Viral Success Achievable", "Needs Optimization"], description: "Outcome Status" },
          cta: { type: Type.STRING, description: "Motivational CTA or Encourage Retry" },
        },
        required: ["viewsRange", "retentionRange", "engagement", "revenueMonthlyRange", "outcome", "cta"],
      },
    },
  });

  return JSON.parse(response.text);
}
