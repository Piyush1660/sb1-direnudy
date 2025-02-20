import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

function StreamerApplication() {
  const [formData, setFormData] = useState({
    discordId: '',
    age: '',
    timezone: '',
    streamingexperience: '',
    microphone: false,
    characterName: '',
    characterAge: '',
    backstory: '',
    whyJoin: '',
    scenarioResponse: '',
    streamingPlatform: '',
    streamingPlatformlink: '',
    averageViewers: '',
    hoursStreaming: '',
    anyAdditionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace this URL with your actual Discord webhook URL
      const webhookUrl = "https://discord.com/api/webhooks/1342141207312072704/-Gf_3rk2oDlSu9c0MmoANOlsijtVX0OgaIQZzt7kTyHE1NrGx3uBn7FYCIrqHc910vbC";

      const discordMessage = {
        embeds: [
          {
            title: "New Streamer Whitelist Application",
            color: 0x9C44FF, // Purple color
            fields: [
              {
                name: "📝 Personal Information",
                value: [
                  `**Discord ID:** ${formData.discordId}`,
                  `**Age:** ${formData.age}`,
                  `**Timezone:** ${formData.timezone}`,
                  `**Has Microphone:** ${formData.microphone ? "Yes" : "No"}`,
                ].join('\n'),
                inline: false
              },
              {
                name: "📺 Streaming Experience",
                value: formData.streamingexperience || "No previous streaming experience",
                inline: false
              },
              {
                name: "❓ Why Join City Town RP",
                value: formData.whyJoin,
                inline: false
              },
              {
                name: "👤 Character Information",
                value: [
                  `**Name:** ${formData.characterName}`,
                  `**Age:** ${formData.characterAge}`,
                ].join('\n'),
                inline: false
              },
              {
                name: "📖 Character Backstory",
                value: formData.backstory.slice(0, 1024),
                inline: false
              },
              {
                name: "🎬 Scenario Response",
                value: formData.scenarioResponse.slice(0, 1024),
                inline: false
              },
              {
                name: "🔒 Whitelisting Questions",
                value: [
                  `**Streaming Platform:** ${formData.streamingPlatform}`,
                  `**Streaming Platform Link:** ${formData.streamingPlatformlink}`,
                  `**Average Viewers:** ${formData.averageViewers}`,
                  `**Hours Streaming per Week:** ${formData.hoursStreaming}`,
                  `**Additional Info:** ${formData.anyAdditionalInfo || "None"}`
                ].join('\n'),
                inline: false
              }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "City Town RP Streamer Whitelist Application"
            }
          }
        ]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage)
      });

      if (!response.ok) {
        throw new Error('Failed to send application');
      }

      alert('Application submitted successfully! Please wait for our team to review your application.');
      // Reset form
      setFormData({
        discordId: '',
        age: '',
        timezone: '',
        streamingexperience: '',
        microphone: false,
        characterName: '',
        characterAge: '',
        backstory: '',
        whyJoin: '',
        scenarioResponse: '',
        streamingPlatform: '',
        streamingPlatformlink: '',
        averageViewers: '',
        hoursStreaming: '',
        anyAdditionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          🔴  Streamer Application
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              
              <div>
                <label htmlFor="discordId" className="block text-sm font-medium text-gray-300 mb-2">
                  Discord ID*
                </label>
                <input
                  type="text"
                  id="discordId"
                  name="discordId"
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 1234567890123456"
                  value={formData.discordId}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                  Age*
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="15"
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone*
                </label>
                <input
                  type="text"
                  id="timezone"
                  name="timezone"
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., EST, GMT+1"
                  value={formData.timezone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="microphone"
                    checked={formData.microphone}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-500 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-300">I have a working microphone*</span>
                </label>
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Streaming Experience</h2>
              
              <div>
                <label htmlFor="streamingexperience" className="block text-sm font-medium text-gray-300 mb-2">
                  Previous Streaming Experience
                </label>
                <textarea
                  id="streamingexperience"
                  name="streamingexperience"
                  rows={4}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your previous streaming experience (if any)"
                  value={formData.streamingexperience}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="whyJoin" className="block text-sm font-medium text-gray-300 mb-2">
                  Why do you want to join City Town RP?*
                </label>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  required
                  rows={4}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.whyJoin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Character Information</h2>
              
              <div>
                <label htmlFor="characterName" className="block text-sm font-medium text-gray-300 mb-2">
                  Character Name*
                </label>
                <input
                  type="text"
                  id="characterName"
                  name="characterName"
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="First and Last Name"
                  value={formData.characterName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="characterAge" className="block text-sm font-medium text-gray-300 mb-2">
                  Character Age*
                </label>
                <input
                  type="number"
                  id="characterAge"
                  name="characterAge"
                  required
                  min="18"
                  max="100"
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.characterAge}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="backstory" className="block text-sm font-medium text-gray-300 mb-2">
                  Character Backstory*
                </label>
                <textarea
                  id="backstory"
                  name="backstory"
                  required
                  rows={6}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell us about your character's background, motivations, and goals..."
                  value={formData.backstory}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="scenarioResponse" className="block text-sm font-medium text-gray-300 mb-2">
                  Roleplay Scenario*
                </label>
                <p className="text-sm text-gray-400 mb-4">
                  Your character witnesses a robbery at a local convenience store. How would they react to this situation?
                </p>
                <textarea
                  id="scenarioResponse"
                  name="scenarioResponse"
                  required
                  rows={6}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.scenarioResponse}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Streaming Questions</h2>
              
              <div>
                <label htmlFor="streamingPlatform" className="block text-sm font-medium text-gray-300 mb-2">
                  Which platform do you primarily stream on?*
                </label>
                <input
                  type="text"
                  id="streamingPlatform"
                  name="streamingPlatform"
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Twitch, YouTube, Facebook Gaming"
                  value={formData.streamingPlatform}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="streamingPlatform" className="block text-sm font-medium text-gray-300 mb-2">
                  platform link?*
                </label>
                <input
                  type="text"
                  id="streamingPlatformLink"
                  name="streamingPlatformLink"
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., https://www.youtube.com/@CTRPOFFICIAL"
                  value={formData.streamingPlatformlink}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="averageViewers" className="block text-sm font-medium text-gray-300 mb-2">
                  What is your average viewer count?*
                </label>
                <input
                  type="number"
                  id="averageViewers"
                  name="averageViewers"
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter a number"
                  value={formData.averageViewers}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="hoursStreaming" className="block text-sm font-medium text-gray-300 mb-2">
                  How many hours per week do you typically stream?*
                </label>
                <input
                  type="number"
                  id="hoursStreaming"
                  name="hoursStreaming"
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number of hours"
                  value={formData.hoursStreaming}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="anyAdditionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
                  Any additional information you'd like to share?
                </label>
                <textarea
                  id="anyAdditionalInfo"
                  name="anyAdditionalInfo"
                  rows={4}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Optional"
                  value={formData.anyAdditionalInfo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StreamerApplication;
