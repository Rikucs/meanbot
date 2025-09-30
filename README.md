# MeanBot - AI Chat with Personality

MeanBot is a React-based chat application powered by Google's Gemini AI, featuring four distinct and entertaining personalities:

- **Intellectual**: Sophisticated, sarcastic, and condescending
- **Labrego**: Rough, direct, and brutally honest  
- **Sarcastic**: Pure sarcasm and passive-aggressive responses
- **Unhinged**: Completely chaotic and paranoid conspiracy theories

## Features

- 🤖 Multiple AI personalities to choose from
- 💬 Real-time chat interface
- 🎨 Modern React + TypeScript + Vite setup
- 🚀 Deployed on GitHub Pages

## Live Demo

Visit the live application: [MeanBot on GitHub Pages](https://yourusername.github.io/meanbot/)

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Gemini API key from Google AI Studio

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meanbot.git
cd meanbot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Gemini API key:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The project includes GitHub Actions for automatic deployment:

1. Push your code to the `main` branch
2. Add your `GEMINI_API_KEY` to GitHub repository secrets:
   - Go to Settings > Secrets and variables > Actions
   - Add a new repository secret named `GEMINI_API_KEY`
   - Paste your Gemini API key as the value
3. The GitHub Action will automatically build and deploy to GitHub Pages

### Manual Deployment

```bash
npm run build
npm run deploy
```

## Project Structure

```
meanbot/
├── components/          # React components
│   ├── ChatMessage.tsx
│   ├── MessageInput.tsx
│   └── PersonaSelector.tsx
├── services/           # API services
│   └── geminiService.ts
├── .github/workflows/  # GitHub Actions
├── App.tsx            # Main app component
├── types.ts           # TypeScript types
└── ...
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Google Gemini AI** - AI chat capabilities
- **GitHub Pages** - Hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is open source and available under the MIT License.
