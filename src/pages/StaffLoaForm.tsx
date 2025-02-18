import React, { useState } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StaffLoaForm = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    username_userid: "",
    reason: "",
    additionalInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitLoa = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const webhookUrl =
        "https://discord.com/api/webhooks/1341408106910847037/UOVyUUm6Uv14r9DX31hEwZQSy6BVpRCRXCvTFhol8EyylpEtEFMktTacO5BJnZbwK72l";
      const discordMessage = {
        embeds: [
          {
            title: "New Staff LOA Request",
            color: 0x9c44ff,
            fields: [
              {
                name: "📝 LOA Details",
                value: `**  → Start Date:** ${formData.startDate}\n**  → End Date:** ${formData.endDate}\n**  → Username/userid:** ${formData.username_userid}\n**  → Reason:** ${formData.reason}\n** → Additional Information:** ${formData.additionalInfo || "N/A"}`,
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "CTRP Staff LOA Request",
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
        throw new Error("Failed to send LOA request");
      }

      alert("LOA request submitted successfully!");
      setFormData({
        startDate: "",
        endDate: "",
        username_userid: "",
        reason: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error submitting LOA request:", error);
      alert("LOA form submission failed.");
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
        <Link
          to="/staff-dashboard"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Staff Leave of Absence Request
          </h1>

          <form onSubmit={handleSubmitLoa} className="space-y-8">
            {/* LOA Form Fields */}
            <div className="bg-white/5 p-8 rounded-xl space-y-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="username_userid"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Username/Userid
                </label>
                <textarea
                  name="username_userid"
                  id="username_userid"
                  placeholder="Username/Userid"
                  value={formData.username_userid}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>


              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Reason for LOA
                </label>
                <textarea
                  name="reason"
                  id="reason"
                  placeholder="Why do you need leave?"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label
                  htmlFor="additionalInfo"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Additional Information (Optional)
                </label>
                <textarea
                  name="additionalInfo"
                  id="additionalInfo"
                  placeholder="Any additional details?"
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
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Calendar className="w-5 h-5" />
                {isSubmitting ? "Submitting..." : "Submit LOA Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffLoaForm;
