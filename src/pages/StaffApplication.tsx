import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

function StaffApplication() {
  const [formData, setFormData] = useState({
    discordId: '',
    age: '',
    timezone: '',
    staffExperience: '',
    microphone: false,
    strengths: '',
    weaknesses: '',
    whyJoin: '',
    scenarioResponse: '',
    availability: '',
    anyAdditionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = "https://discord.com/api/webhooks/your-webhook-url";

      const discordMessage = {
        embeds: [
          {
            title: "New Staff Application",
            color: 0x9C44FF,
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
                name: "📋 Staff Experience",
                value: formData.staffExperience || "No previous staff experience",
                inline: false
              },
              {
                name: "💪 Strengths & Weaknesses",
                value: `**Strengths:** ${formData.strengths}\n**Weaknesses:** ${formData.weaknesses}`,
                inline: false
              },
              {
                name: "❓ Why Join the Team?",
                value: formData.whyJoin,
                inline: false
              },
              {
                name: "⏳ Availability & Additional Info",
                value: `**Availability:** ${formData.availability}\n**Additional Info:** ${formData.anyAdditionalInfo || "None"}`,
                inline: false
              }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "City Town RP Staff Application"
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
      setFormData({
        discordId: '',
        age: '',
        timezone: '',
        staffExperience: '',
        microphone: false,
        strengths: '',
        weaknesses: '',
        whyJoin: '',
        scenarioResponse: '',
        availability: '',
        anyAdditionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
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
            🛠 Staff Application
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              <input type="text" name="discordId" placeholder="Discord ID" value={formData.discordId} onChange={handleChange} required />
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required min="15" />
              <input type="text" name="timezone" placeholder="Timezone" value={formData.timezone} onChange={handleChange} required />
              <label>
                <input type="checkbox" name="microphone" checked={formData.microphone} onChange={handleChange} /> I have a working microphone
              </label>
            </div>
            
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Experience & Qualities</h2>
              <textarea name="staffExperience" placeholder="Describe your previous staff experience" value={formData.staffExperience} onChange={handleChange} />
              <textarea name="strengths" placeholder="Your strengths" value={formData.strengths} onChange={handleChange} />
              <textarea name="weaknesses" placeholder="Your weaknesses" value={formData.weaknesses} onChange={handleChange} />
            </div>
            
            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting} className="bg-purple-500 px-8 py-3 rounded-lg font-semibold">
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

export default StaffApplication;