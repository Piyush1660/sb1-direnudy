import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import axios from 'axios';

function StaffApplication() {
  const [formData, setFormData] = useState({
    discordId: '',
    age: '',
    timezone: '',
    position: '',
    experience: '',
    reason: '',
    strengths: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get('/.netlify/functions/staff-form-status')
      .then((response) => {
        setIsFormOpen(response.data.isStaffFormOpen);
      })
      .catch((error) => {
        console.error('Failed to fetch staff form status:', error);
        setIsFormOpen(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE';

      const discordMessage = {
        embeds: [
          {
            title: 'New Staff Application',
            color: 0x0099ff,
            fields: [
              {
                name: '📝 Personal Information',
                value: `**→ Discord ID:** ${formData.discordId}\n**→ Age:** ${formData.age}\n**→ Timezone:** ${formData.timezone}`,
                inline: false
              },
              {
                name: '🎭 Position Applied For',
                value: formData.position,
                inline: false
              },
              {
                name: '💼 Experience',
                value: formData.experience || 'No prior experience provided',
                inline: false
              },
              {
                name: '🎯 Why Join as Staff?',
                value: formData.reason,
                inline: false
              },
              {
                name: '💪 Strengths',
                value: formData.strengths,
                inline: false
              },
              {
                name: '📝 Additional Information',
                value: formData.additionalInfo || 'N/A',
                inline: false
              }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'City Town RP Staff Application'
            }
          }
        ]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        position: '',
        experience: '',
        reason: '',
        strengths: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Staff applications are currently closed. Check our Discord announcements for updates.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isFormOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
            Staff Applications are Currently Closed
          </h1>
          <p className="text-lg">Check out our Discord #announcements channel for updates!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
            CTRP | Staff Application
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {['discordId', 'age', 'timezone', 'position'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {field.replace(/([A-Z])/g, ' $1').trim()}*
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {['experience', 'reason', 'strengths', 'additionalInfo'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold">
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StaffApplication;
