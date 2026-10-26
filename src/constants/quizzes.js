export const QUIZZES = [
  {
    id: 'web-foundations', title: 'Web Development Foundations', category: 'Technology', difficulty: 'Beginner', duration: 6,
    description: 'Test your understanding of the building blocks behind the modern web.',
    questions: [
      { prompt: 'Which HTML element is intended for the main content of a page?', options: ['<section>', '<main>', '<article>', '<body>'], answer: 1, explanation: 'The main element identifies the dominant content unique to the page.' },
      { prompt: 'What does CSS primarily control?', options: ['Page structure', 'Database queries', 'Presentation and layout', 'Server routing'], answer: 2, explanation: 'CSS describes how HTML content is presented, including colors, layout, and typography.' },
      { prompt: 'Which attribute provides alternative text for an image?', options: ['title', 'alt', 'caption', 'label'], answer: 1, explanation: 'The alt attribute provides a text alternative for users and assistive technology.' },
      { prompt: 'Which JavaScript method selects an element by its ID?', options: ['queryAll()', 'getElementById()', 'selectId()', 'findElement()'], answer: 1, explanation: 'document.getElementById() returns the element with the matching id.' },
      { prompt: 'What does responsive design help a website do?', options: ['Load without JavaScript', 'Adapt to different screen sizes', 'Store user passwords', 'Compile CSS in the browser'], answer: 1, explanation: 'Responsive layouts adapt to the available viewport on phones, tablets, and desktops.' },
    ],
  },
  {
    id: 'javascript-es6', title: 'JavaScript & ES6 Essentials', category: 'Programming', difficulty: 'Intermediate', duration: 7,
    description: 'Explore modern JavaScript syntax, arrays, scope, and asynchronous code.',
    questions: [
      { prompt: 'Which declaration cannot be reassigned?', options: ['var', 'let', 'const', 'function'], answer: 2, explanation: 'A const binding cannot be reassigned, though objects stored in it can still be mutated.' },
      { prompt: 'What does Array.prototype.map() return?', options: ['The first matching item', 'A new transformed array', 'A boolean value', 'The original array only'], answer: 1, explanation: 'map creates a new array from the return value of the callback for each item.' },
      { prompt: 'Which syntax creates a template literal?', options: ['Single quotes', 'Double quotes', 'Backticks', 'Parentheses'], answer: 2, explanation: 'Backticks allow interpolation with ${...} and multiline strings.' },
      { prompt: 'What does an async function always return?', options: ['An array', 'A Promise', 'A callback', 'A generator'], answer: 1, explanation: 'An async function wraps its result in a Promise.' },
      { prompt: 'Which operator provides a fallback only for null or undefined?', options: ['||', '&&', '??', '?.'], answer: 2, explanation: 'Nullish coalescing (??) uses its right side only when the left side is null or undefined.' },
    ],
  },
  {
    id: 'react-hooks', title: 'React & Hooks', category: 'Technology', difficulty: 'Intermediate', duration: 7,
    description: 'Check your knowledge of components, state, effects, and routing.',
    questions: [
      { prompt: 'Which hook adds state to a function component?', options: ['useEffect', 'useState', 'useMemo', 'useRef'], answer: 1, explanation: 'useState returns the current state and a setter that triggers a render.' },
      { prompt: 'When does useEffect run with an empty dependency array?', options: ['After every render', 'After the initial mount', 'Only when unmounted', 'Before every event'], answer: 1, explanation: 'An empty dependency array schedules the effect after the component mounts.' },
      { prompt: 'Why should list items have stable keys?', options: ['To style list items', 'To help React track item identity', 'To enable routing', 'To prevent all renders'], answer: 1, explanation: 'Keys let React match items across renders when a list changes.' },
      { prompt: 'What is a controlled input?', options: ['An input whose value is driven by React state', 'An input with a disabled attribute', 'An input managed by the browser only', 'A custom HTML element'], answer: 0, explanation: 'A controlled input receives its value from state and updates it through an event handler.' },
      { prompt: 'What is React Router used for in a single-page app?', options: ['Managing CSS themes', 'Mapping URLs to views', 'Persisting state to disk', 'Fetching images'], answer: 1, explanation: 'React Router connects URL paths with the components rendered for those paths.' },
    ],
  },
  {
    id: 'career-ready', title: 'Career-Ready Communication', category: 'Professional Skills', difficulty: 'Beginner', duration: 5,
    description: 'Practice clear communication, collaboration, and interview fundamentals.',
    questions: [
      { prompt: 'What is the strongest way to describe an achievement on a resume?', options: ['List duties only', 'Use a specific result with evidence', 'Use the longest possible sentence', 'Avoid numbers'], answer: 1, explanation: 'Specific outcomes and evidence make the impact of your work clear.' },
      { prompt: 'What is active listening?', options: ['Planning your reply while someone speaks', 'Giving focused attention and checking understanding', 'Taking notes without responding', 'Changing the subject quickly'], answer: 1, explanation: 'Active listening includes attention, reflection, and clarifying questions.' },
      { prompt: 'What should you do when you do not know an interview answer?', options: ['Guess confidently', 'Explain your reasoning and how you would find out', 'Change the topic', 'End the interview'], answer: 1, explanation: 'A thoughtful process shows problem-solving and intellectual honesty.' },
      { prompt: 'Which approach helps resolve a team disagreement?', options: ['Assume intent', 'Focus on shared goals and evidence', 'Avoid the conversation', 'Escalate immediately'], answer: 1, explanation: 'Grounding a discussion in shared goals and evidence encourages constructive resolution.' },
    ],
  },
  {
    id: 'digital-literacy', title: 'Digital Literacy & Online Safety', category: 'General Learning', difficulty: 'Beginner', duration: 5,
    description: 'Build good habits for evaluating information and protecting accounts.',
    questions: [
      { prompt: 'Which is the safest response to an unexpected password reset email?', options: ['Click its link immediately', 'Verify through the service’s official site', 'Forward it to everyone', 'Reply with your password'], answer: 1, explanation: 'Visit the official service directly to verify a request before taking action.' },
      { prompt: 'What makes a source more credible?', options: ['It has a dramatic headline', 'It cites verifiable evidence and expertise', 'It is shared often', 'It confirms your opinion'], answer: 1, explanation: 'Credible sources explain their evidence, authorship, and methods.' },
      { prompt: 'What is multi-factor authentication?', options: ['Using multiple usernames', 'Using two or more kinds of verification', 'Changing a password weekly', 'Saving passwords in a document'], answer: 1, explanation: 'MFA combines distinct factors, such as a password and a device-based code.' },
      { prompt: 'Why should you check the date on an online article?', options: ['To find its font', 'Information may become outdated', 'To identify its file type', 'It changes the URL'], answer: 1, explanation: 'Dates help assess whether facts or guidance remain current.' },
    ],
  },
]
