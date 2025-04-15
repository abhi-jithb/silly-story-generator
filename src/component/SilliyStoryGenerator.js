import React, { useState } from 'react';
import { Sparkles, Loader, Share2, Save, User } from "lucide-react";

const StoryGenerator = () => {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('fantasy');
  const [length, setLength] = useState('short');
  const [savedStories, setSavedStories] = useState([]);
  const [name, setName] = useState('');

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
    if (!name.trim()) {
      alert('Please enter your name first!');
      return;
    }
    
    setLoading(true);
    try {
      setTimeout(() => {
        const stories = {
          fantasy: {
            short: `In a magical realm where crystals sang and trees danced, a young wizard named ${name} discovered a mysterious glowing map...`,
            medium: `In a magical realm where crystals sang and trees danced, a young wizard named ${name} discovered a mysterious glowing map. As ${name} followed its shimmering path, ${name} encountered talking animals and floating islands. The map led ${name} to a hidden library where ancient spells were waiting to be discovered...`,
            long: `In a magical realm where crystals sang and trees danced, a young wizard named ${name} discovered a mysterious glowing map. As ${name} followed its shimmering path, ${name} encountered talking animals and floating islands. The map led ${name} to a hidden library where ancient spells were waiting to be discovered. With each spell ${name} learned, new realms opened before ${name}'s eyes. ${name} befriended a dragon who had lost its memory and together they embarked on a quest to restore the balance of magic in their world...`
          },
          space: {
            short: `Among the glittering stars of the Andromeda Galaxy, Captain ${name} received an unexpected distress signal from a ship thought lost centuries ago...`,
            medium: `Among the glittering stars of the Andromeda Galaxy, Captain ${name} received an unexpected distress signal from a ship thought lost centuries ago. As ${name} navigated through asteroid fields and space anomalies, ${name} discovered a hidden civilization that had mastered time travel...`,
            long: `Among the glittering stars of the Andromeda Galaxy, Captain ${name} received an unexpected distress signal from a ship thought lost centuries ago. As ${name} navigated through asteroid fields and space anomalies, ${name} discovered a hidden civilization that had mastered time travel. This discovery led to a series of events that would change the course of human history. ${name} had to make difficult choices between preserving the timeline and saving countless lives...`
          },
          pirates: {
            short: `The salty breeze carried whispers of a legendary treasure as Captain ${name}'s compass pointed to an island that wasn't on any map...`,
            medium: `The salty breeze carried whispers of a legendary treasure as Captain ${name}'s compass pointed to an island that wasn't on any map. ${name}'s crew was skeptical, but the promise of gold was too tempting. As they approached the mysterious island, they noticed strange lights in the water...`,
            long: `The salty breeze carried whispers of a legendary treasure as Captain ${name}'s compass pointed to an island that wasn't on any map. ${name}'s crew was skeptical, but the promise of gold was too tempting. As they approached the mysterious island, they noticed strange lights in the water. The island itself seemed to move with the tides. What they discovered was beyond their wildest dreams - a civilization of merfolk who had been protecting the treasure for centuries...`
          },
          jungle: {
            short: `Deep in the emerald heart of the Amazon, a young explorer named ${name} stumbled upon ancient ruins that seemed to pulse with forgotten magic...`,
            medium: `Deep in the emerald heart of the Amazon, a young explorer named ${name} stumbled upon ancient ruins that seemed to pulse with forgotten magic. The vines moved on their own, and the animals spoke in riddles. As ${name} deciphered the ancient carvings, ${name} realized ${name} was chosen to protect a sacred secret...`,
            long: `Deep in the emerald heart of the Amazon, a young explorer named ${name} stumbled upon ancient ruins that seemed to pulse with forgotten magic. The vines moved on their own, and the animals spoke in riddles. As ${name} deciphered the ancient carvings, ${name} realized ${name} was chosen to protect a sacred secret. The jungle itself was alive, and it had chosen ${name} to be its guardian. ${name} had to learn to communicate with the ancient spirits and prevent a group of treasure hunters from exploiting the jungle's power...`
          },
          underwater: {
            short: `Beneath the sapphire waves of the Pacific, a marine biologist named ${name} made friends with a peculiar octopus that could solve complex puzzles...`,
            medium: `Beneath the sapphire waves of the Pacific, a marine biologist named ${name} made friends with a peculiar octopus that could solve complex puzzles. Together, they discovered a hidden underwater city where sea creatures had developed their own advanced civilization. The octopus revealed that it was actually a scientist from this underwater world...`,
            long: `Beneath the sapphire waves of the Pacific, a marine biologist named ${name} made friends with a peculiar octopus that could solve complex puzzles. Together, they discovered a hidden underwater city where sea creatures had developed their own advanced civilization. The octopus revealed that it was actually a scientist from this underwater world. The city was facing a crisis - their energy source was depleting, and they needed human technology to survive. ${name} had to bridge the gap between two worlds while keeping their existence a secret...`
          }
        };
        setStory(stories[theme][length]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Error generating story:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Magical Story',
        text: story,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      const textArea = document.createElement('textarea');
      textArea.value = story;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Story copied to clipboard!');
    }
  };

  const handleSave = () => {
    const newStory = {
      id: Date.now(),
      theme,
      length,
      content: story,
      date: new Date().toLocaleDateString()
    };
    setSavedStories([...savedStories, newStory]);
    localStorage.setItem('savedStories', JSON.stringify([...savedStories, newStory]));
    alert('Story saved successfully!');
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

        {/* Name Input */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-6 h-6" /> Enter Your Name
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name here..."
              className="flex-1 p-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
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
                  ${theme === t.name ? 'ring-4 ring-white ring-opacity-60 scale-105' : 'opacity-80 hover:opacity-100'}`}
              >
                <div className="text-white text-center">
                  <div className="text-2xl mb-2">{t.emoji}</div>
                  <div className="capitalize">{t.name}</div>
                  {theme === t.name && (
                    <div className="mt-2 text-sm font-semibold bg-white/20 rounded-full px-2 py-1">
                      Selected
                    </div>
                  )}
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
              <button 
                onClick={handleShare}
                className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Share Story
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Story
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
