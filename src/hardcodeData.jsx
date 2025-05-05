import Monday1 from './assets/Monday/1.jpeg';
import Monday2 from './assets/Monday/2.jpeg';
import Monday3 from './assets/Monday/3.jpeg';
import Monday4 from './assets/Monday/4.jpeg';
import Monday5 from './assets/Monday/5.jpeg';
import Monday6 from './assets/Monday/6.jpeg';
import Tuesday1 from './assets/Tuesday/1.jpeg';
import Tuesday2 from './assets/Tuesday/2.jpeg';
import Tuesday3 from './assets/Tuesday/3.jpeg';
import Tuesday4 from './assets/Tuesday/4.jpeg';
import Tuesday5 from './assets/Tuesday/5.jpeg';
import Wednesday1 from './assets/Wednesday/1.jpeg';
import Wednesday2 from './assets/Wednesday/2.jpeg';
import Wednesday3 from './assets/Wednesday/3.jpeg';
import Wednesday4 from './assets/Wednesday/4.jpeg';
import Wednesday5 from './assets/Wednesday/5.jpeg';
import Wednesday6 from './assets/Wednesday/6.jpeg';
import Wednesday7 from './assets/Wednesday/7.png';
import Thursday1 from './assets/Thursday/1.jpeg';
import Thursday2 from './assets/Thursday/2.jpeg';
import Thursday3 from './assets/Thursday/3.jpeg';
import Thursday4 from './assets/Thursday/4.jpeg';
import Thursday5 from './assets/Thursday/5.jpeg';
import Thursday6 from './assets/Thursday/6.jpeg';
import Thursday7 from './assets/Thursday/7.jpeg';
import Thursday8 from './assets/Thursday/8.jpeg';
import Friday1 from './assets/Friday/1.jpeg';
import Friday2 from './assets/Friday/2.jpeg';
import Friday3 from './assets/Friday/3.jpeg';
import Friday4 from './assets/Friday/4.jpeg';
import Friday5 from './assets/Friday/5.jpeg';
import Friday6 from './assets/Friday/6.jpeg';
import Friday7 from './assets/Friday/7.jpeg';
import Saturday1 from './assets/Saturday/1.jpeg';
import Saturday2 from './assets/Saturday/2.jpeg';
import Saturday3 from './assets/Saturday/3.jpeg';
import Saturday4 from './assets/Saturday/4.jpeg';
import Saturday5 from './assets/Saturday/5.png';


const hardcodeEntries = [
  {
    id: 1,
    title: "Monday",
    date: "April 21st, 2025",
    photoGroups: [
      {
        id: 1,
        photos: [
          { id: 101, src: Monday3 },
          { id: 102, src: Monday4 }
        ],
        caption: "Walked to Intro to Acting with my friend, Anjali this morning. She was wearing the goofiest hat — like something from a children's show — and I couldn’t stop laughing. We passed a tree in full bloom near Walnut that looked like something out of a painting, so of course we had to take a photo. The whole walk just felt like a soft, weirdly perfect way to start the week."
      },
      {
        id: 2,
        photos: [
          { id: 201, src: Monday5 },
          { id: 202, src: Monday6 }
        ],
        caption: "After class, I stopped at Joe's Cafe for an iced matcha and an egg sandwich, then headed to Computer Science Algorithms. We dove into vertex covers and NP-complete problems — it was heavy but interesting. I grabbed a few photos of the chalkboard; I’ll need them when I inevitably forget everything by Thursday."
      },
      {
        id: 3,
        photos: [
            { id: 301, src: Monday1 },
            { id: 302, src: Monday2 }
        ],
        caption: "Lunch was quick: leftover grain bowl with salmon, chickpeas, and farro. Nothing fancy. Around 6, I went over to my friend, Skylar’s apartment with Avia. We baked lemon shortbread cookies, made tea, and talked for hours. Very cozy vibes. There were oven mitts worn on heads at one point. Skylar lit a candle that smelled like vanilla and cedar — it weirdly made me feel safe."
      }
    ]
  },
  {
    id: 2,
    title: "Tuesday",
    date: "April 22nd, 2025",
    photoGroups: [
      {
        id: 4,
        photos: [
          { id: 401, src: Tuesday2 },
          { id: 402, src: Tuesday3 }
        ],
        caption: "Today was one of those weirdly scattered but solid days. Started with Ethical Algorithms class — I honestly didn’t fully grasp what was going on, but we were talking about some fairness algorithm from the late ’90s? Game theory stuff. I took a photo of the whiteboard hoping it would make more sense later. It hasn’t yet, but future me might thank me."
      },
      {
        id: 5,
        photos: [
          { id: 501, src: Tuesday1 },
        ],
        caption: "Had a bagel and coffee from Federal Donuts on the way there — cinnamon sugar, no regrets. After class, I worked on my HCI assignment, where I designed a basic UI for a weather app. I got kind of into it, playing around with color gradients and layout. Took a screenshot I might drop in my portfolio later, if I clean it up a bit."
      },
      {
        id: 6,
        photos: [
          { id: 601, src: Tuesday4 },
          { id: 602, src: Tuesday5 }
        ],
        caption: `No formal workout today, but I walked a lot — between classes, errands, and wandering with my friend Siri after we both finished up for the day. We randomly stumbled on a Ben & Jerry’s promo and got free cones. I got Cherry Garcia, she got Phish Food. There’s something about surprise ice cream that instantly upgrades your whole afternoon.
                We sat on the edge of a planter and talked about everything and nothing. I always feel better after time with her — like the inside of my brain gets less tangled. Afterward, I hit the library and did some light editing on my HCI writeup and skimmed slides for tomorrow’s acting class.`
      },
    ]
  },
  {
    id: 3,
    title: "Wednesday",
    date: "April 23rd, 2025",
    photoGroups: [
      {
        id: 7,
        photos: [
          { id: 701, src: Wednesday1 },
          { id: 702, src: Wednesday2 }
        ],
        caption: "After class, I got a chicken bowl for lunch. I was SO hangry, it was delicious. I met up with Maria for lunch. We sat in that little courtyard area and caught up. Classic mid-semester mood."
      },
      {
        id: 8,
        photos: [
          { id: 801, src: Wednesday7 }
        ],
        caption: "Then I headed to Huntsman and met up with Nikita. We camped out in one of the comp labs and worked for hours — I was editing my weather app UI for HCI and trying to debug some alignment issues that wouldn’t go away. We split snacks (gummy worms and trail mix, the fuel of champions) and took a couple lap breaks around the floor to stay sane."
      },
      {
        id: 9,
        photos: [
          { id: 901, src: Wednesday4 },
          { id: 902, src: Wednesday5 }
        ],
        caption: "Later, I was working on my homework for Human Computer Inteaction class. I needed help with the assignment. Most specifically, I needed help with my GitHub repo for the computer science class, so I stopped by Braden’s place. His house didn’t have a usable table (classic), so we literally used the pool table as a makeshift workstation. Honestly? Not the worst setup. He helped me sort through the issue and pushed a clean commit. Life-saver."
      },
      {
        id: 10,
        photos: [
          { id: 1001, src: Wednesday6 }
        ],
        caption: `Wrapped up the night with Ryan — we were having a late night chat session and got hungry. So, we hit 7/11 for late-night snacks. I got Hot Cheetos and a Coke, and we sat outside just talking and decompressing. It was chill, silly, and the perfect way to end a long one.
                Brain = tired. Heart = full.`
      }
    ]
  },
  {
    id: 4,
    title: "Thursday",
    date: "April 24th, 2025",
    photoGroups: [
      {
        id: 11,
        photos: [
          { id: 1101, src: Thursday8 }
        ],
        caption: "Next was Software Engineering, which was mostly focused on testing this week — not the most thrilling, but useful. I made some solid progress on my team’s sprint checklist after class. Then, Social Psych with Theo. It was a lighter lecture, but he had this fun bit about perception and memory distortion that led to a class-wide debate. He always knows how to keep people engaged."
      },
      {
        id: 12,
        photos: [
          { id: 1201, src: Thursday6 },
          { id: 1202, src: Thursday7 }
        ],
        caption: "After classes wrapped up, I needed to work on my computer science homework. I went to Huntsman hall where I met my teammates, Alan and Connor. We spent the afternoon grinding out CS algorithms homework. The problems were really hard and it took us a long time! Alan had a really clean approach for question 3 that helped us unblock a whole section, and I actually think we might finish early for once? Wild. Alan and I walked back together — it was cold and windy, but we were laughing most of the way. Something about mutual academic pain is bonding."
      },
      {
        id: 13,
        photos: [
          { id: 1301, src: Thursday1 },
          { id: 1302, src: Thursday2 },
          { id: 1303, src: Thursday3 },
          { id: 1304, src: Thursday4 },
          { id: 1305, src: Thursday5 }
        ],
        caption: `Then I rushed to change and head to Hita’s birthday dinner downtown — we went to a beautiful Israeli restaurant. The lighting was warm, the food was incredible (I’m still thinking about the roasted eggplant), and Hita was glowing. We split a few dishes, toasted with wine, and just talked for a long time. The cold walk back after dinner felt less harsh — maybe because I was still full and happy.
                Ending the night tired but content. It was one of those days that felt like University of Pennsylvania at its best.`
      }
    ]
  },
  {
    id: 5,
    title: "Friday",
    date: "April 25th, 2025",
    photoGroups: [
        {
            id: 14,
            photos: [
              { id: 1401, src: Friday6 }
            ],
            caption: `No classes today, but still a packed schedule. Spent most of the morning cleaning the kitchen — and honestly, it needed it. When that many girls share one space, it doesn’t take long for dishes, mystery containers, and tea mugs to accumulate like a science experiment. I blasted music and went full deep-clean mode. Scrubbed the counters, reorganized the spice rack, and finally threw out the half-sliced onion that had been haunting the fridge. It was chaos, then it was peace.`
        },
        {
            id: 15,
            photos: [
                { id: 1501, src: Friday1 }
            ],
            caption: `Later in the day I had a few meetings for the engineering club I run. They went smoothly — mostly timeline updates and brainstorming for our spring event. I’m proud of how the team’s shaping up. Everyone’s really stepping into their roles, and I didn’t have to chase anyone down for once, which felt like a miracle.`
        },
        {
            id: 16,
            photos: [
              { id: 1601, src: Friday2 },
              { id: 1602, src: Friday3 },
              { id: 1603, src: Friday4 },
              { id: 1604, src: Friday5 },
              { id: 1605, src: Friday7 }
            ],
            caption: `In the evening, I got dressed up — not like over-the-top fancy, but definitely nicer than my usual leggings-and-hoodie situation. Just felt like treating myself a little. Nikita and I went to Barcelona Wine Bar for dinner, and it was so good. We ordered way too much (as usual) — patatas bravas, garlic shrimp, eggplant, and the softest bread with olive oil. We lingered over everything, sipping wine and talking about life, classes, and future stuff. It felt like one of those dinners where you lose track of time on purpose.
                    We didn’t walk back — we caught a ride and listened to music the whole way, full and sleepy and just… content. I don’t get a lot of slow Fridays like this, so I’m holding onto this one.`
        }
    ]
  },
  {   
    id: 6,
    title: "Saturday",
    date: "April 26th, 2025",
    photoGroups: [
        {
            id: 17,
            photos: [
              { id: 1701, src: Saturday2 },
              { id: 1702, src: Saturday3 }
            ],
            caption: `Finally, a nice day. Sunny but breezy — the kind of weather that makes campus feel like it’s in a movie. I started the morning solo, doing some focused studying inside. Brought out the whiteboard and went full strategy mode on my algorithms problem set. There’s something about physically writing things out that makes me feel like I’m solving actual puzzles instead of just typing into a void.`
        },
        {
            id: 18,
            photos: [
              { id: 1801, src: Saturday4 }
            ],
            caption: `Later, I met up with Siri and Hita to hangout — we found a spot with outdoor seating (blessing) and just enjoyed the sun and catching up. It felt like a reset button.`
        },
        {
            id: 19,
            photos: [
              { id: 1901, src: Saturday5 }
            ],
            caption: `In the afternoon, I moved outside to keep working and ended up hanging out with Harper, who joined me on the bench near the bio building. She told me all about the bio research she’s doing. I definitely didn’t follow every detail, but she lit up when she talked about it, and that kind of energy is contagious. We shared a snack and laughed about how different our majors are.`
        },
        {
            id: 20,
            photos: [
              { id: 2001, src: Saturday1 }
            ],
            caption: `Wrapped up the day at the basketball game, which was such a fun shift in vibe. The energy in the arena was wild — students packed in, yelling, hype music between plays. I didn’t expect to care so much, but I was fully into it by halftime. Ran into a few friends I hadn’t seen in a while and got pulled into a group photo I definitely wasn’t camera-ready for. Oh well.
                    Now I’m home, feet up, hoodie on, fully recharged. Perfect Saturday.`
        },
    ]
  }
];

const timeframe =
  {
    id: 1,
    title: "TimeFrame",
    photoGroups: [
      {
        id: 1,
        title: "Friends",
        photos: [
          { id: 101, src: Monday3 },
          { id: 102, src: Monday4 }
        ],
        caption: ""
      },
      {
        id: 2,
        title: "Studying", 
        photos: [
          { id: 201, src: Monday5 },
          { id: 203, src: Saturday2 },
          { id: 204, src: Saturday3 },
          { id: 205, src: Thursday6 },
          { id: 207, src: Tuesday2 },
          { id: 209, src: Tuesday1 },
          { id: 210, src: Wednesday5 },
          { id: 211, src: Wednesday7 },
        ],
        caption: `This week, you logged major academic miles: six classes, two project deadlines, and one emergency GitHub session solved on a pool table. From trying to emotionally project by standing still in Acting class, to wrestling with NP-complete problems in Algorithms, you pushed through every wall — literal and mental.
                You built UI mockups for HCI, debated fairness frameworks from the '90s, and somehow kept your brain tethered through endless whiteboard battles.
                Late nights, study campouts, emergency lap breaks around Huntsman — all just part of the grind.`
      }
    ]
  };

  const timeframe2 =
  {
    id: 1,
    title: "TimeFrame",
    groups: [
      {
        id: 1,
        title: "You Got it Done!", 
        summary: `This week, you logged major academic miles: six classes, two project deadlines, and one emergency GitHub session solved on a pool table. From trying to emotionally project by standing still in Acting class, to wrestling with NP-complete problems in Algorithms, you pushed through every wall — literal and mental.
                You built UI mockups for HCI, debated fairness frameworks from the '90s, and somehow kept your brain tethered through endless whiteboard battles.
                Late nights, study campouts, emergency lap breaks around Huntsman — all just part of the grind.`,
        photoGroups: [
          {
            id: 1,
            photos: [
              { id: 210, src: Wednesday5 },
              { id: 211, src: Wednesday4 },
            ],
            caption: "Turning Braden’s pool table into a makeshift GitHub headquarters"
          },
          {
            id: 2,
            photos: [
              { id: 205, src: Thursday6 },
              { id: 206, src: Thursday7 }
            ],
            caption: "Unlocking Question 3 on the CS Algorithms homework with Alan and Connor"
          },
          {
            id: 3,
            photos: [
              { id: 213, src: Tuesday1 }
            ],
            caption: "Editing your weather app UI for way too many hours (but hey, it’s portfolio-ready now)"
          }
        ]
      },
      {
        id: 2,
        title: "Powered by Friends (and Free Ice Cream)", 
        summary: `Forget the coursework — the real highlight reel was stitched together by the people you spent it with. You managed to see or talk with 11 different friends this week, making friendship your unofficial full-time job.
                  Your most frequent friends were Nikita (studying, Barcelona wine night, life talks) and Siri (free ice cream, mental untangling sessions). Between sidewalk debates, late-night snack runs, outdoor lunches, and tea-fueled deep talks, you packed your days with the good stuff — the kind that doesn’t show up on syllabi but makes everything else worth it. `,
        photoGroups: [
          {
            id: 1,
            photos: [
              { id: 210, src: Wednesday5 },
              { id: 211, src: Wednesday4 },
            ],
            caption: "Free Ben & Jerry’s surprise with Siri (Cherry Garcia, of course)"
          },
          {
            id: 2,
            photos: [
              { id: 205, src: Thursday6 },
              { id: 206, src: Thursday7 }
            ],
            caption: "Birthday dinner glow with Hita downtown"
          }
        ]
      }
    ]
  };


//   {   
//     id: ,
//     title: "",
//     date: "",
//     photoGroups: [
//         {
//             id: ,
//             photos: [
//               { id: , src:  }
//             ],
//             caption: ``
//         }
//     ]
//   }

export { hardcodeEntries, timeframe, timeframe2 };
