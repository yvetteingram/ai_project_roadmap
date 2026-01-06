
import { GoogleGenAI, Type } from "@google/genai";
import { ChecklistResponse } from "../types";

export type RoadmapMode = 'FREE' | 'PAID';

export const generateChecklist = async (input: string, mode: RoadmapMode = 'FREE'): Promise<ChecklistResponse> => {
  // Always initialize GoogleGenAI inside the function as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = mode === 'PAID' 
    ? `You generate high-momentum roadmaps for beginners. 
       
       Rules for PAID outputs:
       - Exactly 10 steps.
       - Format for EACH step:
         - Title: "STEP #: [One-line title, max 10 words]"
         - What this step is: 2–3 short sentences, plain language, providing the "detailed strategy" for this stage.
         - Where to start: 1 concrete "immediate action" doable in 10 minutes or less.
       - Tone: Calm, supportive, and encouraging.
       - Constraints: No extra sections. Keep language simple.`
    : `STRICT MODE: FREE.
       
       STRICT OUTPUT GUARDRAILS:
       - Output MUST contain only 10 step titles.
       - Titles must be one line each.
       - No explanations. No instructions. No examples.
       - No verbs that imply action beyond the title itself.
       - No colons beyond "STEP #:".
       - No paragraphs. No bullet points.
       - No "What this step is". No "Where to start".
       - Return JSON where "whatItIs" and "whereToStart" are ALWAYS empty strings "".
       
       Failure condition: If you include anything beyond the 10 step titles, you have failed.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: mode === 'FREE' 
      ? `MODE: FREE

User goal/problem:
${input}

Generate the FREE roadmap.

Rules:
- Exactly 10 steps
- Titles only
- One line per step
- No additional text before or after the steps
- Do not explain anything
- Do not give advice
- Do not include setup, tips, or next actions

Failure condition:
If you include anything beyond the 10 step titles, you have failed.

Now generate the FREE roadmap.`
      : `User goal/problem: ${input}\n\nGenerate the full detailed roadmap using the PAID format. Include detailed strategies and immediate actions for every step.`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "A motivating roadmap title."
          },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                step: { 
                  type: Type.STRING, 
                  description: "One line title, format 'STEP X: Title'." 
                },
                whatItIs: { 
                  type: Type.STRING, 
                  description: "Must be empty string for FREE mode." 
                },
                whereToStart: { 
                  type: Type.STRING, 
                  description: "Must be empty string for FREE mode." 
                }
              },
              required: ["step", "whatItIs", "whereToStart"]
            },
            minItems: 10,
            maxItems: 10
          }
        },
        required: ["title", "steps"]
      }
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as ChecklistResponse;
};
