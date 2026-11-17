// English copy for the landing page. Keys match ru.js.
// Feature names follow the app: Focus, Groups, Study Coins, Group Points,
// Study rooms, Apartment, Streak freeze.

const en = {
  lang: 'en',
  locale: 'en-US',

  common: {
    skip: 'Skip to content',
    brandAria: 'StudyCrew — home',
    navAria: 'Sections',
    footerNavAria: 'Footer sections',
    cta: 'Join beta',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langAria: 'Site language',
    nav: {
      groups: 'Groups',
      focus: 'Focus',
      apartment: 'Apartment',
      friends: 'Friends',
      coins: 'Coins',
      safety: 'Safety',
      faq: 'FAQ',
    },
  },

  hero: {
    eyebrow: 'Closed beta · Android',
    titleA: 'Studying ',
    titleHl: 'together',
    titleDash: '',
    titleB: ' is more fun',
    lead:
      'StudyCrew is an app for school and university students that turns studying into a team effort. ' +
      'Groups with shared homework, a Focus timer, Study Coins for studying, daily streaks and challenges ' +
      'with friends help you study regularly — and never alone.',
    ctaBeta: 'How to join the beta',
    ctaMore: 'See what’s inside',
    facts: [
      ['5–180', 'minutes per Focus session'],
      ['100', 'days — the longest streak reward'],
      ['13+', 'minimum age'],
    ],
    phoneLabel: 'Concept of the Focus timer screen',
    floatA: ['14-day streak', '+50 coins'],
    floatB: ['Masha finished algebra', '10B · photo under review'],
    floatC: ['+1 coin', 'for every minute'],
  },

  pillars: {
    aria: 'Highlights',
    items: [
      ['Groups', 'Homework, chat and shared goals for your class or course.'],
      ['Focus', 'An honest timer and stats for every subject.'],
      ['Motivation', 'Study Coins, streaks and rewards for showing up every day.'],
    ],
  },

  groups: {
    eyebrow: 'Study groups',
    title: 'Your whole class in one group',
    lead: 'Shared homework, photo checks, chat and challenges — see who has done what and who needs a hand.',
    feats: [
      ['Groups', 'A group for your class or course that friends join with a code. Every group has an owner and admins.'],
      ['Shared homework', 'Homework with a subject and a due date is visible to the whole group. Everyone marks whether they’ve started, finished or need help.'],
      ['Photo check', 'Attach a photo to finished homework, and reviewers in your group confirm it.'],
      ['Group challenges', 'A shared goal for a few days: study minutes or finished homework. You see the group’s progress and your own part, and everyone who helped earns coins.'],
      ['Group chat', 'Messages, photos and reactions. Admins keep things in order.'],
    ],
    phoneLabel: 'Concept of a group screen with shared homework',
    tryme: 'Tap “Started”, “Done” or “Help” — that’s how your whole group sees your status',
    chatLabel: 'Concept of a group chat',
  },

  focus: {
    eyebrow: 'Focus and progress',
    title: 'An honest timer you can’t trick',
    lead: 'Sessions from 5 to 180 minutes. Time only counts while you’re in the app — so your results are real.',
    reportLabel: 'Concept of the weekly report',
    feats: [
      ['Subjects', 'Add a subject to a session and see how much time went into each one this week and this month.'],
      ['Weekly report', 'Minutes, study days, top subjects and a comparison with last week. You can share your results.'],
      ['Streaks and calendar', 'The calendar shows your study days, and streaks of 3, 7, 14, 30, 60 and 100 days earn rewards.'],
      ['Study rooms', 'A shared timer for your group: see who’s studying right now.'],
      ['Push notifications', 'Reminders about homework and new chat messages. You can turn off each type in your profile.'],
      ['Streak freeze', 'Missed a day? A Streak freeze bought with coins keeps your streak going.'],
    ],
    streakTitle: 'Streak rewards',
    streakText: 'Study every day and earn coins at every new milestone. Each reward is given only once.',
  },

  apartment: {
    eyebrow: 'Group Apartment',
    title: 'A cozy 3D Apartment for your group',
    lead: 'Every group has its own Apartment: members show up as animal avatars, so you can see at a glance who’s studying, taking a break or just online.',
    feats: [
      ['Who’s doing what', 'See who’s studying, taking a break or online.'],
      ['Study room above the table', 'A sign above the table shows the active Study room with its timer and name. Tap it to join.'],
      ['Chat bubbles', 'Chat messages pop up as bubbles above members.'],
      ['Group Points', 'Your group earns Group Points together and spends them on new rooms and furniture you can arrange the way you like.'],
    ],
    caption: 'The group Apartment in the app',
  },

  friends: {
    eyebrow: 'Friends',
    title: 'Compete with people you know',
    lead: 'Find friends, chat and compare study minutes — with classmates from your groups or just with your friends.',
    feats: [
      ['Friends and @username', 'Find someone by name or @username and add them as a friend.'],
      ['Direct messages', 'Chat with friends, with photos and reactions.'],
      ['Leaderboard', 'Study minutes for the week, month and year among your group members or friends.'],
    ],
    periodAria: 'Period',
    periods: { week: 'Week', month: 'Month', year: 'Year' },
    scopeAria: 'Compare with',
    scopes: { groups: 'Groups', friends: 'Friends' },
    boardLabel: 'Concept of the leaderboard',
  },

  coins: {
    eyebrow: 'Coins and profile',
    title: 'Study Coins — for studying, not for cheating',
    lead: 'Earn coins for studying and rewards. Only the server hands them out, so there’s no way to fake them.',
    caption: 'How you earn coins',
    head: ['What', 'Coins', 'When'],
    rows: [
      ['One minute of study', '1', 'counted session time'],
      ['3 / 7 / 14-day streak', '10 / 25 / 50', 'once'],
      ['30 / 60 / 100-day streak', '100 / 150 / 250', 'once'],
      ['Group challenge', '20', 'for your part in the shared goal'],
    ],
    feats: [
      ['Style shop', 'Spend coins on profile frames, badges and colors.'],
      ['Avatars', 'Drawn avatars or 40 emoji to choose from.'],
    ],
  },

  safety: {
    eyebrow: 'Safety and privacy',
    title: 'A calm place to study',
    lead: 'Moderation, spam protection and server-side checks keep groups comfortable and rewards fair.',
    items: [
      ['Reports and moderation', 'Report a message or a person anonymously. People who break the rules get blocked.'],
      ['Spam protection', 'Limits on floods of messages and reports that you won’t notice in normal chatting.'],
      ['Your data is yours', 'Nobody can change someone else’s data or give themselves rewards: the server checks every important action.'],
      ['Account deletion', 'Delete your account right in the app.'],
      ['No sign-up needed', 'Try the app in demo mode, without an account.'],
    ],
    ageTitle: 'Age',
    ageText: 'StudyCrew is made for school and university students aged 13 and up.',
  },

  soon: {
    eyebrow: 'Coming soon',
    title: 'What we’re working on next',
    badge: 'soon',
    items: [
      'Streak widget for your home screen',
      'Planner with your groups’ homework',
      'Your own photo in your profile',
      'Photos in help requests',
    ],
  },

  beta: {
    eyebrow: 'Closed beta',
    title: 'StudyCrew is in closed beta on Android',
    text:
      'Get your group ready for when access opens: invite your classmates, set a shared goal ' +
      'and study together. You need to be 13 or older.',
    join: 'Join the beta',
    soon: 'Beta invites are going out gradually',
    write: 'Contact us',
    facts: ['Android', 'Demo mode without an account', '13+'],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    qa: [
      ['Which devices does StudyCrew work on?', 'Right now the app is available on Android, in closed beta.'],
      ['Can I try it without signing up?', 'Yes. The app has a demo mode where you can look around without an account.'],
      ['How old do I need to be?', 'StudyCrew is for users aged 13 and up.'],
      ['How do I join my class group?', 'Ask the group owner or an admin for the code and enter it in the app.'],
      ['Can I fake minutes or coins?', 'No. Session time only counts while you’re in the app, and only the server hands out coins. Important actions are checked on the server, so nobody can change someone else’s data or give themselves rewards.'],
      ['What happens if I miss a day?', 'Your streak ends — unless you have a Streak freeze. You can buy one with coins, and it saves your streak for the missed day.'],
      ['How do I delete my account?', 'Right in the app — no emails or support requests needed.'],
    ],
  },

  footer: {
    tagline: 'Studying together is more fun.',
    legal: [
      ['/privacy#en', 'Privacy'],
      ['/rules#en', 'Community rules'],
      ['/delete-account#en', 'Delete account'],
    ],
    fine: 'Interface images on this site are concepts and may differ from the app.',
  },

  /* ---------- Screen mockups (Screens.jsx, Phone.jsx) ---------- */
  phone: {
    tabs: { groups: 'Groups', focus: 'Focus', friends: 'Friends', profile: 'Profile' },
  },

  screens: {
    focus: {
      coins: '1,240',
      kicker: 'Focus session',
      subject: 'Algebra',
      of: 'of 45 min',
      pause: 'Pause',
      hint: 'Time only runs while you’re in the app',
    },
    group: {
      ava: '10B',
      name: 'Class 10B',
      meta: '28 members · code K7Q2M',
      tabs: ['Homework', 'Chat', 'Challenge'],
      hw: [
        { subj: 'Algebra', title: 'Problems 214–218, p. 96', due: 'due Thu' },
        { subj: 'Physics', title: 'Lab 4 — write-up', due: 'due Fri' },
        { subj: 'Literature', title: 'Essay on “Romeo and Juliet”', due: 'due Mon' },
      ],
      done: 'done',
      started: 'in progress',
      help: 'need help',
      statusAria: 'My status',
      statuses: { started: 'Started', done: 'Done', help: 'Help' },
      photoTitle: 'Photo under review',
      photoSub: '1 of 2 confirmations',
      helpTitle: 'Your group can see you need help',
      helpSub: 'Tell the chat which problem you’re stuck on',
    },
    chat: {
      title: '10B · chat',
      online: '12 online',
      sys: 'Lena joined with the group code',
      masha: 'Masha',
      admin: 'admin',
      q: 'Who solved 216? My answer doesn’t match the textbook',
      timur: 'Timur',
      a: 'Here’s how I did it — check the sign in the second line',
      me: 'Oh right! Thanks, found my mistake 🙈',
      composer: 'Message…',
    },
    report: {
      kicker: 'Weekly report',
      range: 'Oct 26 – Nov 1',
      minutes: 'minutes',
      days: 'study days',
      delta: '▲ 18% more than last week',
      dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      topLabel: 'Top subjects',
      subjects: ['Algebra', 'Physics', 'English', 'History'],
      share: 'Share results',
    },
    board: {
      kicker: 'Leaderboard',
      groups: 'Members of my groups',
      friends: 'My friends',
      suffix: ' · study minutes',
      me: 'You',
    },
    search: {
      name1: 'Timur Aliev',
      user1: '@timur.study · 10B',
      sent: 'Request sent',
      name2: 'Tim K.',
      add: 'Add',
    },
    challenge: {
      title: 'Pre-test marathon',
      goal: 'Group goal: 3,000 minutes in 5 days',
      now: '2,140',
      of: ' / 3,000 min',
      left: '2 days left',
      mine: 'Your part: 310 min',
      reward: '+20 each',
    },
    apt: {
      aria: 'Group Apartment with animal avatars',
      points: 'Group Points',
      sign: 'Algebra · 17:42',
      join: 'Join',
      bubble: 'Who did #5?',
      studying: 'studying',
      resting: 'on a break',
      online: 'online',
    },
  },

  /* ---------- Interactive demos (Demos.jsx) ---------- */
  demos: {
    focus: {
      tag: 'Try it',
      note: 'sped-up demo: a session takes ~15 seconds',
      counted: 'counted',
      minLeft: 'min left',
      duration: 'Duration',
      min: 'min',
      subjectLabel: 'Subject',
      subjects: ['Algebra', 'Physics', 'English', 'History', 'Chemistry'],
      start: 'Start session',
      pause: 'Pause',
      away: 'Minimize the app',
      resume: 'Resume',
      restart: 'Start over',
      again: 'Again',
      idle: 'Pick a duration and a subject, then start your session.',
      // [text before the coin, text after the coin]
      running: (s, n) => [`Session in progress · ${s}. Counted ${n} min · `, ` +${n}`],
      paused: (n) => `Paused. Counted ${n} min.`,
      awayMsg: ' You left the app — time doesn’t count while you’re away.',
      done: (m, s) => [`Session counted: ${m} min · ${s} · `, ` +${m} coins`],
    },
    calendar: {
      month: 'October 2026',
      streak: '14-day streak',
      aria: 'Study calendar for October',
      dow: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      frozen: 'Streak freeze',
      study: 'Study day',
      none: 'No study',
      legendStudy: 'study day',
      legendFrozen: 'Streak freeze saved the streak',
    },
    track: {
      aria: 'Streak rewards',
      days: (n) => `${n} days`,
    },
    studio: {
      name: 'Anya Morozova',
      user: '@anya.m · 10B',
      noBadges: 'no badges selected',
      stats: [['14', 'streak'], ['2,310', 'min this month'], ['1,240', 'coins']],
      typeAria: 'Avatar type',
      emojiTab: '40 emoji',
      drawnTab: 'Drawn',
      emojiAria: 'Emoji avatar',
      drawnAria: 'Drawn avatar',
      avatarN: (n) => `Avatar ${n}`,
      frame: 'Frame',
      shop: 'shop',
      color: 'Profile color',
      badges: 'Badges',
      upTo3: 'up to three',
      frames: { none: 'No frame', classic: 'Classic', gold: 'Gold', rays: 'Sunburst', dash: 'Dashed' },
      colors: { teal: 'Teal', ink: 'Deep', sun: 'Sunny', coral: 'Coral', sky: 'Sky', plum: 'Plum' },
      badgeNames: { streak: 'Streak 30', focus: 'Focus master', helper: 'Group helper', star: 'Early bird' },
    },
  },
};

export default en;
