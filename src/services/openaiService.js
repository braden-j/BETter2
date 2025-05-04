import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo'; 

// Core API caller
async function callOpenAI(prompt) {
  try {
    const response = await axios.post(
      OPENAI_URL,
      {
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error("OpenAI API call failed:", error.message);
    return '';
  }
}

/*// Helper to match photo groups to themes by caption keywords
function matchPhotoGroupsToTheme(theme, photoGroups) {
  const keyword = theme.toLowerCase();
  return photoGroups
    .filter(group => group.caption.toLowerCase().includes(keyword))
    .slice(0, 2); // return top 1–2 matching groups
}*/


// Simple round-robin matching: evenly distribute photo groups across themes
function matchThemesToPhotoGroups(themes, entries) {
  const allGroups = entries.flatMap(entry => entry.photoGroups);
  
  return themes.map((theme, i) => ({
    title: theme.theme,
    summary: theme.caption,
    photoGroups: allGroups.filter((_, idx) => idx % themes.length === i)
  }));
}


// Core orchestrator function called by JournalSelection.jsx
export async function generateTimeFrameFromEntries(entries) {
  const allCaptions = entries.flatMap(entry =>
    entry.photoGroups.map(group => group.caption || '')
  );
  const textBlob = allCaptions.join('\n');

  // Prompt all 3 generations in parallel
  const [title, summary, themesRaw] = await Promise.all([
    callOpenAI(`Create a short and fun title summarizing this set of journal captions (they might not be from the same day), max 40 characters:\n\n${textBlob}`),
    callOpenAI(`Write a concise and thoughtful paragraph that captures the tone and highlights of the following journal captions (they might not be from the same day):\n\n${textBlob}`),
    callOpenAI(`From the following text:\n\n${textBlob}\n\nIdentify 4 to 8 themes. For each theme, generate a fun, short caption. Remember, this is a aggregated journal entry that might be from multiple days. Return your output as a JSON array with keys: "theme" and "caption".`)
  ]);

  let themes = [];
  try {
    const parsed = JSON.parse(themesRaw);
    themes = Array.isArray(parsed) ? parsed : parsed.themes;
  } catch (err) {
    console.warn("Failed to parse theme JSON:", err);
    themes = [{ theme: 'Moments', caption: 'Snapshots from a week of memories.' }];
  }

  // Match photo groups to each theme
  const matchedGroups = matchThemesToPhotoGroups(themes, entries);

  console.log(title);
  console.log(summary);
  console.log("AI themes:", themes);
  console.log("Matched groups:", matchedGroups);

  return {
    title: title.trim(),
    summary: summary.trim(),
    groups: matchedGroups
  };


}

/*
export async function generateTimeFrameFromEntries(entries) {
  return {
    title: "My Fun Week",
    summary: "This week was packed with memories, laughs, and spontaneous adventures.",
    groups: entries.flatMap(entry =>
      entry.photoGroups.map(group => ({
        title: "Theme Testing",
        summary: "No caption provided.",
        photoGroups: [group]
      }))
    )
  };
}
*/
