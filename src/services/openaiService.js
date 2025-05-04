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

// Simple round-robin matching: evenly distribute photo groups across themes
function matchThemesToPhotoGroups(themes, entries) {
  const allGroups = entries.flatMap(entry => entry.photoGroups);
  
  return themes.map((theme, i) => ({
    title: theme.theme,
    summary: theme.caption,
    photoGroups: allGroups.filter((_, idx) => idx % themes.length === i)
  }));
}

// Save the generated timeframe to localStorage
function saveTimeframeToStorage(timeframeData) {
  try {
    let timeframes = [];
    const savedTimeframes = localStorage.getItem('timeframes');
    
    if (savedTimeframes) {
      timeframes = JSON.parse(savedTimeframes);
    }
    
    // Add the new timeframe to the beginning of the array
    timeframes = [timeframeData, ...timeframes];
    
    // Save back to localStorage
    localStorage.setItem('timeframes', JSON.stringify(timeframes));
    console.log('TimeFrame saved to localStorage');
  } catch (error) {
    console.error('Error saving timeframe to storage:', error);
  }
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

  // Create the timeframe data with metadata
  const timeframeData = {
    id: `tf-${Date.now()}`, // Generate unique ID
    title: title.trim(),
    summary: summary.trim(),
    createdAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    groups: matchedGroups
  };

  // Save to localStorage
  saveTimeframeToStorage(timeframeData);

  return timeframeData;
}