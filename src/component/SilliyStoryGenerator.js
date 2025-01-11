import React, { useState } from 'react';
import { Sparkles, Loader } from "lucide-react";

const StoryGenerator = () => {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('fantasy');
  const [length, setLength] = useState('short');

  const themes = [
    { name: 'fantasy', emoji: '🧙‍♂️', color: 'from-purple-500 to-blue-500' },
    { name: 'space', emoji: '🚀', color: 'from-blue-600 to-indigo-600' },
    { name: 'pirates', emoji: '🏴‍☠️', color: 'from-red-500 to-yellow-500' },
    { name: 'jungle', emoji: '🌴', color: 'from-green-500 to-emerald-500' },
    { name: 'underwater', emoji: '🐠', color: 'from-cyan-500 to-blue-500' },
  ];

  const lengths = [
    { name: 'short', text: 'Short Tale', emoji: '📝' },
    { name: 'medium', text: 'Medium Adventure', emoji: '📖' },
    { name: 'long', text: 'Epic Saga', emoji: '📚' },
  ];

  const generateStory = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        const stories = {
          fantasy: "In a magical realm where crystals sang and trees danced, a young wizard named Luna discovered a mysterious glowing map...",
          space: "Among the glittering stars of the Andromeda Galaxy, Captain Nova received an unexpected distress signal from a ship thought lost centuries ago...",
          pirates: "The salty breeze carried whispers of a legendary treasure as Captain Jack's compass pointed to an island that wasn't on any map...",
          jungle: "Deep in the emerald heart of the Amazon, a young explorer stumbled upon ancient ruins that seemed to pulse with forgotten magic...",
          underwater: "Beneath the sapphire waves of the Pacific, a marine biologist made friends with a peculiar octopus that could solve complex puzzles..."
        };
        setStory(stories[theme]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Error generating story:', error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            🌟 Magical Story Generator 🌟
          </h1>
          <p className="text-gray-600">Let's create something magical together!</p>
        </div>

        {/* Theme Selection */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" /> Choose Your Theme
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`p-4 rounded-lg bg-gradient-to-r ${t.color} 
                  transform hover:scale-105 transition-all duration-200
                  ${theme === t.name ? 'ring-4 ring-white ring-opacity-60' : ''}`
                }
              >
                <div className="text-white text-center">
                  <div className="text-2xl mb-2">{t.emoji}</div>
                  <div className="capitalize">{t.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Length Selection */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4">Choose Story Length</h2>
          <div className="grid grid-cols-3 gap-4">
            {lengths.map((l) => (
              <button
                key={l.name}
                onClick={() => setLength(l.name)}
                className={`p-4 rounded-lg border-2 transition-all duration-200
                  ${length === l.name 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-200'}`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{l.emoji}</div>
                  <div>{l.text}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateStory}
          disabled={loading}
          className={`w-full p-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600
            text-white font-bold text-lg hover:opacity-90 transition-opacity
            ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="w-6 h-6 animate-spin" />
              Crafting your story...
            </span>
          ) : (
            'Generate Story! ✨'
          )}
        </button>

        {/* Story Display */}
        {story && (
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-4">Your Magical Tale</h2>
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{story}</p>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
                Share Story 📤
              </button>
              <button className="px-4 py-2 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors">
                Save Story 💾
              </button>
            </div>
          </div>
        )}

        {/* Pro Tip Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="text-lg font-bold text-blue-700">✨ Pro Tip!</h3>
          <p className="text-blue-600">
            Try different themes and lengths to unlock unique story variations. Each combination creates a special adventure!
          </p>
        </div>

        {/* Branding */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700">
            Created with 💖 by{' '}
            <a
              href="https://www.buymeacoffee.com/Abhijithb" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-purple-600 font-semibold hover:text-purple-800 transition-colors"
            >
              Abhijith
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryGenerator;
