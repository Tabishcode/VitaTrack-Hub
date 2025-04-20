import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/admin/all-users");
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  // Analytics
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.isAdmin).length;
  const totalNonAdmins = totalUsers - totalAdmins;
  const usersWithHealthData = users.filter(
    (u) => u.calories !== undefined
  ).length;
  const totalFemales = users.filter(
    (u) => u.gender?.toLowerCase() === "female"
  ).length;

  const goalStats = users.reduce((acc, user) => {
    const goal = user.goal?.toLowerCase();
    if (goal) {
      acc[goal] = (acc[goal] || 0) + 1;
    }
    return acc;
  }, {});

  const goalData = Object.keys(goalStats).map((goal) => ({
    name: goal.charAt(0).toUpperCase() + goal.slice(1),
    users: goalStats[goal],
  }));

  const genderStats = users.reduce(
    (acc, user) => {
      const gender = user.gender?.toLowerCase();
      if (gender === "male") acc.male++;
      else if (gender === "female") acc.female++;
      else acc.unknown++;
      return acc;
    },
    { male: 0, female: 0, unknown: 0 }
  );

  const genderData = [
    { name: "Male", value: genderStats.male },
    { name: "Female", value: genderStats.female },
    { name: "Unknown", value: genderStats.unknown },
  ];

  const COLORS = ["#4f46e5", "#ec4899", "#9ca3af"];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-2 text-indigo-700">
        Admin Dashboard
      </h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
        <Card label="Total Users" value={totalUsers} />
        <Card label="Admins" value={totalAdmins} />
        
        <Card label="Users w/ Health Data" value={usersWithHealthData} />
        
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-2">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            User Goals Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={goalData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#4f46e5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Gender Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users List */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
              </p>
              <p>
                <strong>DOB:</strong> {user.dob?.split("T")[0] || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender || "N/A"}
              </p>
              <p>
                <strong>Goal:</strong> {user.goal || "N/A"}
              </p>
              <p>
                <strong>Height:</strong> {user.height || "N/A"}
              </p>
              <p>
                <strong>Weight:</strong> {user.weight || "N/A"}
              </p>
              <p>
                <strong>Calories:</strong> {user.calories || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Card Component
const Card = ({ label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-md transition-shadow">
    <p className="text-lg text-gray-600">{label}</p>
    <p className="text-2xl font-bold text-indigo-600">{value}</p>
  </div>
);

export default AdminDashboard;
