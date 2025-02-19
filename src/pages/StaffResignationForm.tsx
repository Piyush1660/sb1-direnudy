import React, { useState } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StaffResignationForm = () => {
  const [formData, setFormData] = useState({
    username_userid: "",
    resignationDate: "",
    reason: "",
    additionalInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitResignation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const webhookUrl =
        "https://discord.com/api/webhooks/1341664992952320060/7OGaoerPBjZV8cARlLdprqgUlyw54wBN5hO51gxbJeZl2PBKc-HesPzo3Kdi6Q3wvDCf";
      const discordMessage = {
        embeds: [
          {
            title: "New Staff Resignation Request",
            color: 0xff4444,
            fields: [
              {
                name: "📝 Resignation Details",
                value: `**  → Username/userid:** ${formData.username_userid}\n**  → Resignation Date:** ${formData.resignationDate}\n**  → Reason:** ${formData.reason}\n** → Additional Information:** ${formData.additionalInfo || "N/A"}`,
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "CTRP Staff Resignation Request",
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
        throw new Error("Failed to send resignation request");
      }

      alert("Resignation request submitted successfully!");
      setFormData({
        username_userid: "",
        resignationDate: "",
        reason: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error submitting resignation request:", error);
      alert("Resignation form submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white py-20">
      <div className="container mx-auto px-4">
        <Link to="/staff-dashboard" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Staff Resignation Request
          </h1>

          <form onSubmit={handleSubmitResignation} className="space-y-8">
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <div>
                <label htmlFor="username_userid" className="block text-sm font-medium text-gray-300 mb-2">
                  Username/Userid
                </label>
                <textarea
                  name="username_userid"
                  id="username_userid"
                  placeholder="Username/Userid"
                  value={formData.username_userid}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="resignationDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Resignation Date
                </label>
                <input
                  type="date"
                  name="resignationDate"
                  id="resignationDate"
                  value={formData.resignationDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                  Reason for Resignation
                </label>
                <textarea
                  name="reason"
                  id="reason"
                  placeholder="Why are you resigning?"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  name="additionalInfo"
                  id="additionalInfo"
                  placeholder="Any additional details?"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Calendar className="w-5 h-5" />
                {isSubmitting ? "Submitting..." : "Submit Resignation"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffResignationForm;
