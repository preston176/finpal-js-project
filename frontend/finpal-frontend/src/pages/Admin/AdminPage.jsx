import { Link } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { BrainCog } from 'lucide-react';
import { model } from '../../services/GenAI';

function AdminPage() {
    const [totalData, setTotalData] = useState({
        users: 0,
        totalAmount: 0,
        TransactionsDone: 0
    });

    const [recentTransactions, setRecentTransactions] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [aiInsights, setAiInsights] = useState(null); // State for AI insights

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users
                const { data: usersData } = await axiosInstance.get("http://localhost:8000/api/admin/users");
                const totalUsers = usersData.length;

                // Fetch transactions
                const { data: transactionsData } = await axiosInstance.get("http://localhost:8000/api/admin/transactions");

                const totalAmount = transactionsData.reduce((acc, t) => acc + t.amount, 0);
                const transactionsDone = transactionsData.length;

                // Sort recent 5
                const recent = transactionsData.slice(0, 5);

                // Prepare chart data by month (assume `date` is ISO string)
                const monthlyData = {};
                transactionsData.forEach(t => {
                    const date = new Date(t.date);
                    const month = date.toLocaleString('default', { month: 'short' });

                    if (!monthlyData[month]) {
                        monthlyData[month] = { Income: 0, Expense: 0, month };
                    }
                    monthlyData[month][t.type] += t.amount;
                });

                const formattedChartData = Object.values(monthlyData);

                setTotalData({
                    users: totalUsers,
                    totalAmount: totalAmount.toFixed(2),
                    TransactionsDone: transactionsDone
                });

                setRecentTransactions(recent);
                setChartData(formattedChartData);
            } catch (err) {
                console.error("Fetching data failed", err);
            }
        };

        fetchData();
    }, []);

    // Mock function to simulate AI-powered insights (this will be replaced with actual logic)
    useEffect(() => {
        const fetchAiInsights = async () => {
            try {
                // Mock AI response for insights (replace with real AI model integration later)
                const prompt = `Based on ${recentTransactions} give me strictly 2 lines of insight on how money is being spent. Example: AI Insight: Based on recent trends, Income transactions have increased by 15% in the past month. Use even the least amount of data. At all cost dont say insufficient`;


                const result = await model.generateContent(prompt);


                await setAiInsights(result.response.text());
            } catch (err) {
                console.error("AI Insights fetch failed", err);
            }
        };

        fetchAiInsights();
    }, [recentTransactions]);

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-50 text-gray-800">
            <Sidebar />
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <h1 className="text-3xl font-bold mb-6">Finpal Admin Dashboard</h1>

                {/* Dashboard cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <DashboardCard title="Total Users" value={totalData.users} link="/admin/users" />
                    <DashboardCard title="Transactions Amount" value={`Kes ${totalData.totalAmount}`} link="/admin/transactions" />
                    <DashboardCard title="Transactions Done" value={totalData.TransactionsDone} link="/admin/transactions" />
                </div>

                {/* AI Insights Section */}
                {aiInsights && (
                    <div className="bg-white p-6 rounded shadow mb-5">
                        <h2 className="text-lg font-semibold mb-4 flex gap-2"><span><BrainCog /></span> AI Insights</h2>
                        <p className="text-lg font-medium text-gray-600">{aiInsights}</p>
                    </div>
                )}

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Income vs Expense</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Income" fill="#34d399" />
                                <Bar dataKey="Expense" fill="#f87171" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Transaction Trends</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Income" stroke="#10b981" strokeWidth={2} />
                                <Line type="monotone" dataKey="Expense" stroke="#ef4444" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white p-6 rounded shadow mb-8">
                    <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
                    <ul className="divide-y divide-gray-200">
                        {recentTransactions.map((tx, idx) => (
                            <li key={idx} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{tx.description || tx.type}</p>
                                    <p className="text-sm text-gray-500">  {new Date(tx.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}</p>
                                </div>
                                <span className={`font-semibold ${tx.type === 'Income' ? 'text-green-500' : 'text-red-500'}`}>
                                    Kes {tx.amount.toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>
        </div>
    );
}

// DashboardCard Component
function DashboardCard({ title, value, link }) {
    return (
        <Link to={link} className="p-6 bg-white rounded shadow hover:shadow-lg transition duration-200">
            <h2 className="text-md font-medium text-gray-600">{title}</h2>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </Link>
    );
}

export default AdminPage;
