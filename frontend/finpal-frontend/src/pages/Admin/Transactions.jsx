import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Sidebar from './components/sidebar';
import { Download } from "lucide-react"


const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState('All');
    const [sortKey, setSortKey] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        // Simulated API call – Replace with your real API
        const fetchData = async () => {
            const income = [
                {
                    _id: '1',
                    userId: 'user1',
                    type: 'Income',
                    categoryOrSource: 'Salary',
                    amount: 5000,
                    date: '2025-04-01',
                    createdAt: '2025-04-01',
                },
            ];

            const expenses = [
                {
                    _id: '2',
                    userId: 'user1',
                    type: 'Expense',
                    categoryOrSource: 'Food',
                    amount: 200,
                    date: '2025-04-02',
                    createdAt: '2025-04-02',
                },
            ];

            setTransactions([...income, ...expenses]);
        };

        fetchData();
    }, []);

    const filtered = transactions
        .filter((t) => filter === 'All' || t.type === filter)
        .sort((a, b) => {
            const valueA = sortKey === 'amount' ? a.amount : new Date(a.date).getTime();
            const valueB = sortKey === 'amount' ? b.amount : new Date(b.date).getTime();
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        });

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filtered);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
        XLSX.writeFile(workbook, 'transactions.xlsx');
    };

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            {/* Sidebar */}
            <Sidebar />
            <div className="mt-20 ml-10 w-full container">
                <h1 className="text-3xl font-bold mb-6">All Transactions</h1>

                <div className="">
                    <div className="flex flex-wrap gap-4 mb-6">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            <option value="All">All</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>

                        <select
                            value={sortKey}
                            onChange={(e) => setSortKey(e.target.value)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>

                        <div className="flex ">
                            <button className='border rounded-sm px-4 flex gap-2 items-center' onClick={exportToExcel}><Download /><span>Export to Excel</span></button>
                        </div>
                    </div>
                </div>


                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-300">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-2 border">Type</th>
                                <th className="px-4 py-2 border">Category / Source</th>
                                <th className="px-4 py-2 border">Amount</th>
                                <th className="px-4 py-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((t) => (
                                <tr key={t._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{t.type}</td>
                                    <td className="px-4 py-2 border">{t.categoryOrSource}</td>
                                    <td className="px-4 py-2 border">KES {t.amount.toLocaleString()}</td>
                                    <td className="px-4 py-2 border">
                                        {new Date(t.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No transactions found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
