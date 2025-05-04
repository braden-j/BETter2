import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo'; 

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

const systemPrompt = `
You're a journaling assistant in an app called TimeFrame.

Given a list of user-written captions (each representing a group of photos), do the following:
1. Generate a title for the week — poetic, witty, or summary-like.
2. Write a friendly paragraph summary of the week (2–3 sentences).
3. Extract 4–8 themes from the captions. For each theme:
   - Provide a short, lighthearted caption/snippet.
   - List which photo group captions relate to the theme (by their index in the input).

Return ONLY valid JSON. Structure it like this:

{
  "title": "...",
  "summary": "...",
  "themes": [
    {
      "theme": "...",
      "snippet": "...",
      "groupIndices": [0, 2]
    },
    ...
  ]
}
`;

export async function generateTimeframeFromCaptions(photoGroups, captions) {
  const userPrompt = `
Here are the photo group captions:

${captions.map((caption, idx) => `${idx + 1}. ${caption}`).join('\n')}

Generate the timeframe data as described.
`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
      },
      { headers }
    );

    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content);

    // Map groupIndices back to actual groups
    const themes = parsed.themes.map(theme => ({
      ...theme,
      photoGroups: theme.groupIndices.map(idx => photoGroups[idx])
    }));

    return {
      title: parsed.title,
      summary: parsed.summary,
      themes,
      groups: photoGroups // optionally keep this for TimeFrame.jsx display
    };
  } catch (err) {
    console.error("OpenAI error:", err.response?.data || err.message);
    throw new Error("Failed to generate AI content.");
  }
}
