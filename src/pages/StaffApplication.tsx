import React, { useState } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StaffApplication = () => {
  const [formData, setFormData] = useState({
    discordId: "",
    age: "",
    timezone: "",
    staffExperience: "",
    microphone: false,
    strengths: "",
    weaknesses: "",
    whyJoin: "",
    scenarioResponse: "",
    availability: "",
    anyAdditionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const webhookUrl =
        "https://discord.com/api/webhooks/1339935195650064404/bsbzzU6XEhgTbQ4ODPocnwhfiTITEJJIDnq3bYIH6oYyjL_a2r7WBJnQxaZRtc6Hgdbd";
      
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
                ].join("\n"),
                inline: false,
              },
              {
                name: "📋 Staff Experience",
                value: formData.staffExperience || "No previous staff experience",
                inline: false,
              },
              {
                name: "💪 Strengths & Weaknesses",
                value: `**Strengths:** ${formData.strengths}\n**Weaknesses:** ${formData.weaknesses}`,
                inline: false,
              },
              {
                name: "❓ Why Join the Team?",
                value: formData.whyJoin,
                inline: false,
              },
              {
                name: "🎭 Scenario Response",
                value: formData.scenarioResponse || "Not provided",
                inline: false,
              },
              {
                name: "⏳ Availability & Additional Info",
                value: `**Availability:** ${formData.availability}\n**Additional Info:** ${
                  formData.anyAdditionalInfo || "None"
                }`,
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "CTRP Staff Application",
            },
          },
        ],
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to send application request");
      }

      alert("Application submitted successfully!");
      setFormData({
        discordId: "",
        age: "",
        timezone: "",
        staffExperience: "",
        microphone: false,
        strengths: "",
        weaknesses: "",
        whyJoin: "",
        scenarioResponse: "",
        availability: "",
        anyAdditionalInfo: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Application form submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
            Staff Application
          </h1>

          <form onSubmit={handleSubmitApplication} className="space-y-8">
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <div>
                <label htmlFor="discordId" className="block text-sm font-medium text-gray-300 mb-2">
                  Discord ID
                </label>
                <input
                  type="text"
                  name="discordId"
                  id="discordId"
                  placeholder="Enter your Discord ID"
                  value={formData.discordId}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <input
                  type="text"
                  name="timezone"
                  id="timezone"
                  placeholder="Enter your timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="staffExperience" className="block text-sm font-medium text-gray-300 mb-2">
                  Staff Experience
                </label>
                <textarea
                  name="staffExperience"
                  id="staffExperience"
                  placeholder="Describe your past staff experience, if any"
                  value={formData.staffExperience}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="strengths" className="block text-sm font-medium text-gray-300 mb-2">
                  Strengths
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
                <label htmlFor="weaknesses" className="block text-sm font-medium text-gray-300 mb-2">
                  Weaknesses
                </label>
                <textarea
                  name="weaknesses"
                  id="weaknesses"
                  placeholder="What are your weaknesses?"
                  value={formData.weaknesses}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="whyJoin" className="block text-sm font-medium text-gray-300 mb-2">
                  Why do you want to join?
                </label>
                <textarea
                  name="whyJoin"
                  id="whyJoin"
                  placeholder="Explain why you want to be part of the team"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="scenarioResponse" className="block text-sm font-medium text-gray-300 mb-2">
                  Scenario Response
                </label>
                <textarea
                  name="scenarioResponse"
                  id="scenarioResponse"
                  placeholder="How would you handle a difficult situation as a staff member?"
                  value={formData.scenarioResponse}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-2">
                  Availability
                </label>
                <textarea
                  name="availability"
                  id="availability"
                  placeholder="How many hours can you dedicate weekly?"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="microphone"
                    checked={formData.microphone}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-500 border-gray-600 rounded focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-gray-300">I have a working microphone*</span>
                </label>
              </div>
            </div>

            
            

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Calendar className="w-5 h-5" />
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffApplication;
