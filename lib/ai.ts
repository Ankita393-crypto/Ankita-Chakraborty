// AI lesson generation. Works when OPENAI_API_KEY is set; otherwise the
// caller shows a friendly "pilot mode" message instead.

export type GeneratedCourse = {
  title: string;
  description: string;
  lessons: { title: string; content: string }[];
  questions: { q: string; options: string[]; correct: number }[];
};

export function aiAvailable(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

const LANG_NAMES: Record<string, string> = { en: "English", hi: "Hindi", bn: "Bengali" };

export async function generateCourse(topic: string, lang: string): Promise<GeneratedCourse> {
  const language = LANG_NAMES[lang] ?? "English";
  const prompt = `Create a short beginner course about "${topic}" in ${language}.
Respond with ONLY valid JSON, no markdown fences, in this exact shape:
{
  "title": "course title",
  "description": "2-sentence course description",
  "lessons": [
    { "title": "lesson title", "content": "3 paragraphs of clear teaching content, separated by \\n\\n" }
  ],
  "questions": [
    { "q": "multiple choice question", "options": ["a","b","c","d"], "correct": 0 }
  ]
}
Rules: exactly 3 lessons, exactly 8 questions, "correct" is the 0-based index of the right option, factual and educational content only.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AI provider error (${res.status}): ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI provider returned an empty response");
  const parsed = JSON.parse(content) as GeneratedCourse;
  if (!parsed.title || !Array.isArray(parsed.lessons) || !Array.isArray(parsed.questions)) {
    throw new Error("AI response missing required fields");
  }
  return parsed;
}

export type GeneratedNotes = { title: string; content: string };

// Generates a UPSC-coursebook-style subject chapter for the weakness report's
// "study this subject" links. Cached per subject+language by the caller.
export async function generateSubjectNotes(subject: string, lang: string): Promise<GeneratedNotes> {
  const language = LANG_NAMES[lang] ?? "English";
  const prompt = `Write a study chapter on "${subject}" for Indian competitive exam preparation (UPSC/SSC level), in ${language}.
Respond with ONLY valid JSON, no markdown fences, in this exact shape:
{
  "title": "chapter title",
  "content": "the chapter text"
}
Rules for "content":
- Write it the way a standard UPSC coursebook chapter reads: structured, factual, exam-oriented.
- 8 to 12 substantial paragraphs separated by \\n\\n, moving from fundamentals to exam-frequent details.
- Include specific verifiable facts (articles, dates, names, figures) that are standard reference facts.
- End with a final paragraph titled "Key points for revision:" listing the 10 most exam-relevant facts of the chapter.
- Never invent facts. If something is uncertain or changes year to year, say so explicitly rather than guessing.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AI provider error (${res.status}): ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI provider returned an empty response");
  const parsed = JSON.parse(content) as GeneratedNotes;
  if (!parsed.title || !parsed.content) throw new Error("AI response missing required fields");
  return parsed;
}
