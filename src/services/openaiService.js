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


// const themes = [
//   { theme: "Friends", caption: "Social moments where bonding or fun is the main focus. Think hangouts, deep talks, silly outings, emotional support." },
//   { theme: "Work", caption: "When the main focus is productivity: studying, classes, homework, meetings, solo or group work. Even if others are mentioned." },
//   { theme: "Food", caption: "When meals, snacks, coffee, or restaurants are central to the moment. Food is the highlight." },
//   { theme: "Exercise", caption: "Any physical activity: workouts, walks, sports, movement that’s intentional or energizing." }
// ];

async function getBestThemeMatch(caption, themes) {
  const themeDescriptions = themes.map(t => `- ${t.theme}: ${t.caption}`).join('\n');

  const prompt = `
Classify this journal photo caption into one of four themes.
The theme should reflect the *main purpose* or *activity*, NOT just who is mentioned.

Here are the valid themes:
- Friends: Only choose this if the focus is emotional connection, friendship, or fun.
- Work: Choose this for studying, doing homework or problem sets, classes, productivity, or meetings — even if others are mentioned.
- Food: Choose if the main focus is eating, meals, dinners, drinks, or eating experiences.
- Exercise: Choose for working out, walking, cardio, or physical activity.

Examples:
- "Quick with Maya, then cranked out our Computer Science group project for hours" → Work
- "Grabbed coffee with Avia and talked for hours about life" → Friends
- "Didn't have time for a long workout so went for a walk instead" → Exercise
- "Salmon grain bowl and matcha = perfect lunch" → Food

Caption:
"${caption}"

Return only the best matching theme name.
`;

  const response = await callOpenAI(prompt);
  return response.trim();
}



// // Ask GPT to pick the best-matching theme for a given caption
// async function getBestThemeMatch(caption, themes) {
//   const themeNames = themes.map(t => t.theme).join(', ');
//   const prompt = `
// Choose the best-matching theme from the list below for this journal photo caption.

// Caption:
// "${caption}"

// Themes:
// ${themeNames}

// Just return the name of the best matching theme.
//   `;

//   const response = await callOpenAI(prompt);
//   return response.trim();
// }

// // Simple round-robin matching: evenly distribute photo groups across themes
// function matchThemesToPhotoGroups(themes, entries) {
//   const allGroups = entries.flatMap(entry => entry.photoGroups);
  
//   return themes.map((theme, i) => ({
//     title: theme.theme,
//     summary: theme.caption,
//     photoGroups: allGroups.filter((_, idx) => idx % themes.length === i)
//   }));
// }

async function matchThemesToPhotoGroups(themes, entries) {
  const allGroups = entries.flatMap(entry => entry.photoGroups);

  const groupsByTheme = {};

  for (const theme of themes) {
    groupsByTheme[theme.theme] = {
      title: theme.theme,
      summary: theme.caption,
      photoGroups: []
    };
  }

  for (const group of allGroups) {
    const bestMatch = await getBestThemeMatch(group.caption || '', themes);

    if (groupsByTheme[bestMatch]) {
      groupsByTheme[bestMatch].photoGroups.push(group);
    } else {
      // fallback group
      groupsByTheme['Uncategorized'] ??= { title: 'Uncategorized', summary: '', photoGroups: [] };
      groupsByTheme['Uncategorized'].photoGroups.push(group);
    }
  }

  return Object.values(groupsByTheme);
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

export async function generateTimeFrameFromEntries(entries) {
  const allCaptions = entries.flatMap(entry =>
    entry.photoGroups.map(group => group.caption || '')
  );
  const textBlob = allCaptions.join('\n');

  // Prompt all 3 generations in parallel
  const [title, summary, themesRaw] = await Promise.all([
    callOpenAI(`Create a short and fun title summarizing this set of journal captions. They are likely from different days. We want the caption to highlight the highest level information from the journal entries. Think puns, think millennial humor, think catchy. Max 30 characters:\n\n${textBlob}`),
    callOpenAI(`Please write a concise and thoughtful paragraph that summarizes these journal entries from Emma's past week. It can start with "What a week you've had!" It can address the author (Emma) as "you" and should mention the high-level accomplishments of Emma's week, including her time with friends, the meals she ate, the work that she did, and her workout habits:\n\n${textBlob}`),
    callOpenAI(`From the following text:\n\n${textBlob}\n\nGenerate 4 fun and short captions for the 4 core themes: Fun with Friends, Grind Time, Yummy in Your Tummy, and Sweating it Out. Return your output as a JSON array with keys: "theme" and "caption".`)
  ]);

  // Set static internal theme labels
  let themes = [
    { theme: "Friends", caption: "" },
    { theme: "Work", caption: "" },
    { theme: "Food", caption: "" },
    { theme: "Exercise", caption: "" }
  ];

  // Apply GPT captions to correct theme names
  try {
    const parsed = JSON.parse(themesRaw);
    for (const theme of themes) {
      const match = parsed.find(p => p.theme.toLowerCase().includes(theme.theme.toLowerCase()));
      if (match) {
        theme.caption = match.caption;
      }
    }
  } catch (err) {
    console.warn("Failed to parse theme JSON:", err);
    themes = [{ theme: 'Moments', caption: 'Snapshots from a week of memories.' }];
  }

  // Match photo groups to each theme
  const matchedGroups = await matchThemesToPhotoGroups(themes, entries);

  console.log(title);
  console.log(summary);
  console.log("AI themes with updated captions:", themes);
  console.log("Matched groups:", matchedGroups);

  // Create the timeframe data with metadata
  const timeframeData = {
    id: `tf-${Date.now()}`,
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
