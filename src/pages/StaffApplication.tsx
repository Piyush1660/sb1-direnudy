import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

function StaffApplication() {
  const [formData, setFormData] = useState({
    discordId: '',
    age: '',
    timezone: '',
    experience: '',
    reason: '',
    strengths: '',
    additionalInfo: '',
    interviewtiming: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = "https://discord.com/api/webhooks/1339935195650064404/bsbzzU6XEhgTbQ4ODPocnwhfiTITEJJIDnq3bYIH6oYyjL_a2r7WBJnQxaZRtc6Hgdbd";
      const discordMessage = {
        embeds: [
          {
            title: "New Staff Application",
            color: 0x9C44FF,
            fields: [
              {
                name: "📝 Personal Information",
                value: `**Discord ID:** ${formData.discordId}\n**Age:** ${formData.age}\n**Timezone:** ${formData.timezone}`,
                inline: false
              },
              {
                name: "💼 Experience",
                value: formData.experience || "No prior experience provided",
                inline: false
              },
              {
                name: "🎯 Why Join as Staff?",
                value: formData.reason,
                inline: false
              },
              {
                name: "💪 Strengths",
                value: formData.strengths,
                inline: false
              },
              {
                name: "📝 Additional Information",
                value: formData.additionalInfo || "N/A",
                inline: false
              },
              {
                name: "📝 Interview Timing",
                value: formData.interviewtiming || "N/A",
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

      alert('Application submitted successfully! Our team will review it.');
      setFormData({
        discordId: '',
        age: '',
        timezone: '',
        experience: '',
        reason: '',
        strengths: '',
        additionalInfo: '',
        interviewtiming: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Staff Application Forms are Closed. Check out our discord #staff-announcement channel');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
            CTRP | Staff Application
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              <input type="text" name="discordId" placeholder="Discord ID" value={formData.discordId} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="text" name="timezone" placeholder="Timezone" value={formData.timezone} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="text" name="interviewtiming" placeholder="Your Free Timing For Interview" value={formData.interviewtiming} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Experience & Motivation</h2>
              <textarea name="experience" placeholder="Describe your experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <textarea name="reason" placeholder="Why do you want to join?" value={formData.reason} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Skills & Additional Info</h2>
              <textarea name="strengths" placeholder="What are your strengths?" value={formData.strengths} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <textarea name="additionalInfo" placeholder="Any additional information?" value={formData.additionalInfo} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting} className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Submitting...' : 'Submit Application You will be Notified On #staff-interview Channel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StaffApplication;