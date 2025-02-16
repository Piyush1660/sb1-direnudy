import FormStats from "./FormStats";

const [logs, setLogs] = useState([]);

useEffect(() => {
  axios.get('/api/admin-logs').then(res => setLogs(res.data));
}, []);

return (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Admin Activity Logs</h2>
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th className="px-4 py-2">Action</th>
          <th className="px-4 py-2">Admin</th>
          <th className="px-4 py-2">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, idx) => (
          <tr key={idx}>
            <td className="border px-4 py-2">{log.action}</td>
            <td className="border px-4 py-2">{log.admin}</td>
            <td className="border px-4 py-2">{log.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FormStats;