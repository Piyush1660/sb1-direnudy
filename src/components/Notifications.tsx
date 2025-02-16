import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await axios.get('/.netlify/functions/notifications');
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="bg-white/10 p-6 rounded-xl mb-8">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li key={notification.id} className="text-white/80">
            {notification.message} - <span className="text-sm text-gray-400">{notification.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
