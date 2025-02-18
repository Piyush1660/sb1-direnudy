import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import axios from 'axios';

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
  const [isFormOpen, setIsFormOpen] = useState(true); // Initially set the form to be open

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch the staff form status from the Netlify function
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl =
        'https://discord.com/api/webhooks/1339935195650064404/bsbzzU6XEhgTbQ4ODPocnwhfiTITEJJIDnq3bYIH6oYyjL_a2r7WBJnQxaZRtc6Hgdbd';
      const discordMessage = {
        embeds: [
          {
            title: 'New Staff Application',
            color: 0x9c44ff,
            fields: [
              {
                name: '📝 Personal Information',
                value: `**  → Discord ID:** ${formData.discordId}\n**  → Age:** ${formData.age}\n**  → Timezone:** ${formData.timezone}\n**  → Interview Timing:** ${formData.interviewtiming}`,
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(discordMessage)
      });

      if (!response.ok) {
        throw new Error('Failed to send application');
      }

      alert('Application submitted successfully! Our team will review it.');
      // Reset form fields after successful submission
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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isFormOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Staff Applications are Currently Closed
          </h1>
          <p className="text-lg">Check out our Discord #staff-announcement channel for updates!</p>
        </div>
      </div>
    );
  }

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
            {/* Personal Information */}
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              <div>
                <label htmlFor="discordId" className="block text-sm font-medium text-gray-300 mb-2">
                  Discord ID*
                </label>
                <input
                  type="text"
                  name="discordId"
                  id="discordId"
                  placeholder="Discord ID"
                  value={formData.discordId}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                  Age*
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone*
                </label>
                <input
                  type="text"
                  name="timezone"
                  id="timezone"
                  placeholder="Timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="interviewtiming" className="block text-sm font-medium text-gray-300 mb-2">
                  Interview Timing*
                </label>
                <input
                  type="text"
                  name="interviewtiming"
                  id="interviewtiming"
                  placeholder="Interview Timing?"
                  value={formData.interviewtiming}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Experience & Motivation */}
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Experience & Motivation</h2>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                  Experience
                </label>
                <textarea
                  name="experience"
                  id="experience"
                  placeholder="Describe your experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                  Why do you want to join?
                </label>
                <textarea
                  name="reason"
                  id="reason"
                  placeholder="Why do you want to join?"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Skills & Additional Info */}
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Skills & Additional Info</h2>
              <div>
                <label htmlFor="strengths" className="block text-sm font-medium text-gray-300 mb-2">
                  What are your strengths?
                </label>
                <textarea
                  name="strengths"
                  id="strengths"
                  placeholder="What are your strengths?"
                  value={formData.strengths}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  id="additionalInfo"
                  placeholder="Any additional information?"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold transition-all ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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

export default StaffApplication;
