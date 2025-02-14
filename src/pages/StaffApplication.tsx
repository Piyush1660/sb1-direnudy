import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

function StaffApplication() {
  const [formData, setFormData] = useState({
    discordId: '',
    age: '',
    timezone: '',
    experience: '',
    staffExperience: '',
    strengths: '',
    handleRuleBreakers: '',
    dealWithConflict: '',
    availability: '',
    whyStaff: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL";
      const discordMessage = {
        embeds: [
          {
            title: "New Staff Application",
            color: 0xFFD700, // Gold color
            fields: [
              {
                name: "📝 Personal Information",
                value: `**Discord ID:** ${formData.discordId}\n**Age:** ${formData.age}\n**Timezone:** ${formData.timezone}`,
                inline: false
              },
              {
                name: "🛠️ Previous Experience",
                value: formData.experience || "No previous experience",
                inline: false
              },
              {
                name: "🔧 Staff Experience",
                value: formData.staffExperience || "No prior staff experience",
                inline: false
              },
              {
                name: "💪 Strengths as Staff",
                value: formData.strengths,
                inline: false
              },
              {
                name: "🚨 Handling Rule Breakers",
                value: formData.handleRuleBreakers,
                inline: false
              },
              {
                name: "⚖️ Conflict Resolution",
                value: formData.dealWithConflict,
                inline: false
              },
              {
                name: "🕒 Availability",
                value: formData.availability,
                inline: false
              },
              {
                name: "❓ Why do you want to be staff?",
                value: formData.whyStaff,
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage)
      });

      if (!response.ok) throw new Error('Failed to send application');

      alert('Application submitted successfully!');
      setFormData({
        discordId: '',
        age: '',
        timezone: '',
        experience: '',
        staffExperience: '',
        strengths: '',
        handleRuleBreakers: '',
        dealWithConflict: '',
        availability: '',
        whyStaff: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Staff Application
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              <input type="text" name="discordId" required placeholder="Discord ID" value={formData.discordId} onChange={handleChange} className="input" />
              <input type="number" name="age" required placeholder="Age" value={formData.age} onChange={handleChange} className="input" />
              <input type="text" name="timezone" required placeholder="Timezone" value={formData.timezone} onChange={handleChange} className="input" />
            </div>

            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Staff Questions</h2>
              <textarea name="experience" placeholder="Describe your previous roleplay experience" value={formData.experience} onChange={handleChange} className="textarea" />
              <textarea name="staffExperience" placeholder="Do you have previous staff experience?" value={formData.staffExperience} onChange={handleChange} className="textarea" />
              <textarea name="strengths" placeholder="What strengths do you bring to the staff team?" value={formData.strengths} onChange={handleChange} className="textarea" />
              <textarea name="handleRuleBreakers" placeholder="How would you handle a player breaking the rules?" value={formData.handleRuleBreakers} onChange={handleChange} className="textarea" />
              <textarea name="dealWithConflict" placeholder="How would you resolve a conflict between players?" value={formData.dealWithConflict} onChange={handleChange} className="textarea" />
              <textarea name="availability" placeholder="What is your availability for moderation?" value={formData.availability} onChange={handleChange} className="textarea" />
              <textarea name="whyStaff" placeholder="Why do you want to become a staff member?" value={formData.whyStaff} onChange={handleChange} className="textarea" />
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting} className={`button ${isSubmitting ? 'opacity-50' : ''}`}>
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
