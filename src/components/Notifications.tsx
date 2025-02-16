import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  id: string | number;
  message: string;
  date: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('/.netlify/functions/notifications');
        console.log(data); // Debugging line to inspect the fetched data

        if (Array.isArray(data)) {
          setNotifications(data);
        } else if (data.notifications && Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        } else {
          console.error('Invalid data format for notifications:', data);
          setNotifications([]); // Fallback to an empty array
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Loading notifications...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="bg-white/10 p-6 rounded-xl mb-8">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li key={notification.id} className="text-white/80">
              {notification.message} - <span className="text-sm text-gray-400">{notification.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white/60">No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
