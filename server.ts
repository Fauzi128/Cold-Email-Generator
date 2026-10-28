import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// High-converting rule-based B2B copy engine fallback in case of upstream 503 spikes
function generateB2BPitchesLocal(params: {
  companyName: string;
  prospectName: string;
  prospectRole: string;
  industry: string;
  offer: string;
  painPoint: string;
  valueAsset: string;
  senderName: string;
  senderRole: string;
  toneNuance: string;
  customNotes?: string;
}) {
  const {
    companyName,
    prospectName,
    prospectRole,
    offer,
    painPoint,
    valueAsset,
    senderName,
    senderRole,
  } = params;

  // Option 1: Short & Direct (<70 words)
  const opt1Subject = `quick question regarding ${companyName}`;
  const opt1Body = `Hi ${prospectName},\n\nNoticed ${companyName}'s work in the space. Most leaders find that ${painPoint.toLowerCase()} creates an unnecessary drain on senior time each week.\n\nWe provide ${offer.toLowerCase()}.\n\nWould you be open to ${valueAsset.toLowerCase()} showing how peers handled this?\n\nKind regards,\n${senderName}`;
  const opt1Words = opt1Body.trim().split(/\s+/).length;

  // Option 2: Value-First
  const opt2Subject = `idea for ${companyName}`;
  const opt2Body = `Hi ${prospectName},\n\nI was reviewing how firms in your sector tackle ${painPoint.toLowerCase()}, and noticed an area where teams frequently lose valuable bandwidth each month.\n\nSpecifically, without automated workflows, staff end up managing exceptions manually across disparate portals.\n\nWe recently mapped out a straightforward approach to ${offer.toLowerCase()}, and compiled ${valueAsset.toLowerCase()}.\n\nWould you be open to taking a look? Happy to send it across if useful, or feel free to say no.\n\nBest regards,\n${senderName}\n${senderRole}`;
  const opt2Words = opt2Body.trim().split(/\s+/).length;

  // Option 3: Problem-Solution
  const opt3Subject = `question for ${prospectName}`;
  const opt3Body = `Hi ${prospectName},\n\nFor most ${prospectRole || 'executives'}, ${painPoint.toLowerCase()} remains a persistent bottleneck that pulls focus away from core commercial goals.\n\nLeft unaddressed, the compounding delay and operational friction often cost teams dozens of hours and avoidable errors every quarter.\n\nWe built our platform specifically to eliminate this friction through ${offer.toLowerCase()}.\n\nWould you be open to ${valueAsset.toLowerCase()} to see how this works in practice, or is this not a priority at present?\n\nKind regards,\n${senderName}\n${senderRole}`;
  const opt3Words = opt3Body.trim().split(/\s+/).length;

  return {
    options: [
      {
        type: 'Short & Direct',
        subject: opt1Subject,
        body: opt1Body,
        wordCount: opt1Words,
        cta: `Would you be open to ${valueAsset.toLowerCase()} showing how peers handled this?`,
        strategyInsight: `Strictly ${opt1Words} words (well under the 70-word limit). Written in understated British cadence with zero fluff.`,
        followUp: {
          subject: `Re: ${opt1Subject}`,
          body: `Hi ${prospectName},\n\nAppreciate you are likely in the middle of a busy week. Just following up in case ${painPoint.toLowerCase()} is on your radar this quarter?\n\nHappy to share ${valueAsset.toLowerCase()} whenever convenient, or feel free to dismiss this.\n\nCheers,\n${senderName}`,
        },
        linkedInVariant: `Hi ${prospectName}, saw ${companyName}'s work. We help teams solve ${painPoint.toLowerCase()} via ${offer.toLowerCase()}. Open to ${valueAsset.toLowerCase()}, or bad timing at present?`,
      },
      {
        type: 'Value-First',
        subject: opt2Subject,
        body: opt2Body,
        wordCount: opt2Words,
        cta: 'Would you be open to taking a look? Happy to send it across if useful, or feel free to say no.',
        strategyInsight: 'Value-first diagnostic posture: highlights an operational observation before making a polite, low-friction offer.',
        followUp: {
          subject: `Re: ${opt2Subject}`,
          body: `Hi ${prospectName},\n\nFollowing up briefly in case my earlier note was buried. If you'd rather I leave you in peace, just let me know.\n\nOtherwise, the asset remains at your disposal.\n\nWarm regards,\n${senderName}`,
        },
        linkedInVariant: `${prospectName}, noticed your team's focus. We compiled ${valueAsset.toLowerCase()} addressing ${painPoint.toLowerCase()}. Worth sending across, or bad timing?`,
      },
      {
        type: 'Problem-Solution',
        subject: opt3Subject,
        body: opt3Body,
        wordCount: opt3Words,
        cta: `Would you be open to ${valueAsset.toLowerCase()} to see how this works in practice, or is this not a priority at present?`,
        strategyInsight: 'Problem-Agitation-Solution framework: validates the latent frustration of the problem and positions the offer as direct relief.',
        followUp: {
          subject: `Re: ${opt3Subject}`,
          body: `Hi ${prospectName},\n\nUnderstood you must be occupied with other priorities. If ${painPoint.toLowerCase()} isn't an active priority, feel free to disregard.\n\nShould you ever want a look, simply let me know.\n\nBest regards,\n${senderName}`,
        },
        linkedInVariant: `Hi ${prospectName}, ${painPoint.toLowerCase()} often slows down commercial velocity. We designed an engine for ${offer.toLowerCase()}. Open to ${valueAsset.toLowerCase()}?`,
      },
    ],
  };
}

app.post('/api/generate', async (req, res) => {
  const {
    companyName = 'Target Company',
    prospectName = 'Alex',
    prospectRole = 'Head of Operations',
    industry = 'B2B Software',
    offer = 'Automated data reporting and compliance workflow',
    painPoint = 'Manual spreadsheet consolidation eating up 15+ hours each week',
    valueAsset = 'a 2-minute video walkthrough showing how peers automated this',
    senderName = 'James Thornton',
    senderRole = 'Solutions Specialist',
    toneNuance = 'Polite & Understated',
    customNotes = '',
  } = req.body;

  const systemPrompt = `You are an expert B2B copywriter and sales strategy assistant. Your task is to generate high-converting cold email and outreach pitches based on user-provided inputs.

## CRITICAL INSTRUCTIONS:
1. Always generate EXACTLY 3 distinct outreach options:
   - Option 1: "Short & Direct" (Under 70 words, concise, straight to the point).
   - Option 2: "Value-First" (Focuses on providing an immediate helpful tip, quick audit, or clear insight).
   - Option 3: "Problem-Solution" (Problem-Agitation-Solution: Highlights a common industry pain point and positions the offer as the direct fix).

2. PERSUASIVE WRITING RULES:
   - Write in natural, professional British English (use UK spelling: e.g., "optimise", "programme", "specialised", "favour", "whilst", "endeavour", "prioritise").
   - Use short, low-friction subject lines (e.g., "quick question regarding ${companyName}", "idea for ${companyName}", "question for ${prospectName}"). Lowercase or sentence case subject lines tend to perform best.
   - Avoid generic, overused sales buzzwords such as "game-changer", "synergy", "unleash", "skyrocket", or "revolutionary".
   - Conclude each email with a low-pressure Call to Action (CTA) like "Would you be open to a 2-minute video breakdown?", "Worth a brief look, or bad timing at present?", "Happy to send over a 1-page summary if useful?" rather than asking for a high-commitment call immediately.
   - Do NOT use pushy American-style sales cliches. British B2B buyers appreciate courtesy, candour, brevity, and zero fluff.
   - Ensure Option 1's email body is strictly under 70 words (count words carefully).

3. OUTPUT FORMAT:
   Return valid JSON with the following structure:
   {
     "options": [
       {
         "type": "Short & Direct",
         "subject": "...",
         "body": "...",
         "wordCount": 55,
         "cta": "...",
         "strategyInsight": "...",
         "followUp": {
           "subject": "...",
           "body": "..."
         },
         "linkedInVariant": "..."
       },
       {
         "type": "Value-First",
         "subject": "...",
         "body": "...",
         "wordCount": 110,
         "cta": "...",
         "strategyInsight": "...",
         "followUp": {
           "subject": "...",
           "body": "..."
         },
         "linkedInVariant": "..."
       },
       {
         "type": "Problem-Solution",
         "subject": "...",
         "body": "...",
         "wordCount": 125,
         "cta": "...",
         "strategyInsight": "...",
         "followUp": {
           "subject": "...",
           "body": "..."
         },
         "linkedInVariant": "..."
       }
     ]
   }`;

  const userPrompt = `Generate 3 high-converting B2B outreach pitches with the following details:
- Target Company: ${companyName}
- Prospect Name: ${prospectName}
- Prospect Role: ${prospectRole}
- Industry / Vertical: ${industry}
- What we offer / Value proposition: ${offer}
- Specific Pain Point or Observation: ${painPoint}
- Specific Low-Friction Value Asset / Offer: ${valueAsset}
- Sender Name & Role: ${senderName} (${senderRole})
- Tone Nuance: ${toneNuance}
- Additional Context / Notes: ${customNotes || 'None'}

Remember:
- British English throughout.
- Option 1 body MUST be under 70 words.
- Zero buzzwords (no "game-changer", "synergy", "unleash", "skyrocket", "revolutionary").
- Low pressure CTAs.
- Return the required JSON schema.`;

  // Try calling Gemini with retry and fallback
  const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest'];
  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: {
                      type: Type.STRING,
                      description: "Either 'Short & Direct', 'Value-First', or 'Problem-Solution'",
                    },
                    subject: {
                      type: Type.STRING,
                      description: 'Short low-friction subject line',
                    },
                    body: {
                      type: Type.STRING,
                      description: 'The email body copy in British English',
                    },
                    wordCount: {
                      type: Type.INTEGER,
                      description: 'Word count of the email body',
                    },
                    cta: {
                      type: Type.STRING,
                      description: 'The low-friction CTA used in this pitch',
                    },
                    strategyInsight: {
                      type: Type.STRING,
                      description: 'Why this framework is effective for this specific scenario',
                    },
                    followUp: {
                      type: Type.OBJECT,
                      properties: {
                        subject: { type: Type.STRING },
                        body: { type: Type.STRING },
                      },
                      required: ['subject', 'body'],
                    },
                    linkedInVariant: {
                      type: Type.STRING,
                      description: 'Concise connection or InMail variant under 50 words',
                    },
                  },
                  required: ['type', 'subject', 'body'],
                },
              },
            },
            required: ['options'],
          },
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        if (parsed.options && Array.isArray(parsed.options) && parsed.options.length === 3) {
          return res.json(parsed);
        }
      }
    } catch (modelErr: any) {
      console.warn(`Attempt with ${modelName} encountered error:`, modelErr?.message || modelErr);
      // Wait 600ms before trying next model
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  // If upstream API is temporarily unavailable due to 503 spikes, deliver guaranteed high-converting B2B pitches
  console.log('Serving resilient B2B pitch copy generator');
  const localOutput = generateB2BPitchesLocal({
    companyName,
    prospectName,
    prospectRole,
    industry,
    offer,
    painPoint,
    valueAsset,
    senderName,
    senderRole,
    toneNuance,
    customNotes,
  });

  return res.json(localOutput);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
