'use client'

import { useState} from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js'

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale)

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  const [totalUsers, setTotalUsers] = useState(0)
  const [premiumUsers, setPremiumUsers] = useState(0)
  const [startToday, setStartToday] = useState(0)
  const [generateToday, setGenerateToday] = useState(0)
  const [revenueToday, setRevenueToday] = useState(0)

  const [userGrowth, setUserGrowth] = useState<number[]>([])
  const [captionGrowth, setCaptionGrowth] = useState<number[]>([])

  const handleLogin = () => {
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setAuthenticated(true)
      fetchData()
    } else {
      alert('Wrong password!')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setPasswordInput('')
  }

  const fetchData = async () => {
    try {
      const statsRes = await fetch('/api/admin-stats')
      const stats = await statsRes.json()
      setTotalUsers(stats.totalUsers)
      setPremiumUsers(stats.premiumUsers)

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const isoToday = today.toISOString()

      const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LOGSNAG_TOKEN}`,
        'Content-Type': 'application/json',
      }

      const startRes = await fetch('https://api.logsnag.com/v1/insight', {
        method: 'POST',
        headers,
        body: JSON.stringify({ project: 'caption-wizard', name: 'start', since: isoToday }),
      })

      const generateRes = await fetch('https://api.logsnag.com/v1/insight', {
        method: 'POST',
        headers,
        body: JSON.stringify({ project: 'caption-wizard', name: 'generate', since: isoToday }),
      })

      const startData = await startRes.json()
      const generateData = await generateRes.json()

      setStartToday(startData.count || 0)
      setGenerateToday(generateData.count || 0)

      const revenueRes = await fetch('/api/admin-revenue')
      const revenueData = await revenueRes.json()
      setRevenueToday(revenueData.totalRevenue || 0)

      // Dummy simulated growth data (last week + today)
      setUserGrowth([5, 8, 12, 15, 18, 20, startData.count || 0])
      setCaptionGrowth([10, 15, 22, 25, 30, 34, generateData.count || 0])

    } catch (error) {
      console.error('Admin fetchData error:', error)
    }
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f4f4fb] flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full mb-4 p-3 rounded-md border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-md transition"
          >
            Login
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f4fb] flex flex-col">
      {/* Sticky Header */}
      <header className="bg-gradient-to-r from-indigo-100 to-purple-100 shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="text-lg font-bold text-gray-700">Caption Wizard Admin</div>
        <div className="flex items-center gap-3">
          <span className="text-green-600 text-sm font-medium bg-green-100 px-3 py-1 rounded-full">
            👑 Admin
          </span>
          <button onClick={handleLogout} className="text-sm font-semibold text-red-500 underline">
            Logout
          </button>
        </div>
      </header>

      {/* Admin Dashboard Content */}
      <section className="flex-grow py-10 px-6 max-w-6xl w-full mx-auto space-y-10">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="New Users Today" value={startToday} color="from-blue-100 to-blue-200" />
          <StatCard label="Captions Generated" value={generateToday} color="from-green-100 to-green-200" />
          <StatCard label="Total Users" value={totalUsers} color="from-yellow-100 to-yellow-200" />
          <StatCard label="Premium Users" value={premiumUsers} color="from-purple-100 to-purple-200" />
          <StatCard label="Revenue (Last 7d)" value={`£${revenueToday}`} color="from-pink-100 to-pink-200" />
        </div>

        {/* Growth Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GrowthChart title="📈 User Growth" data={userGrowth} color="rgb(99, 102, 241)" />
          <GrowthChart title="✍️ Caption Generation Growth" data={captionGrowth} color="rgb(34, 197, 94)" />
        </div>
      </section>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 bg-[#f4f4fb] text-center text-xs py-4 text-gray-400">
        © {new Date().getFullYear()} Caption Wizard Admin
      </footer>
    </main>
  )
}

function StatCard({ label, value, color }: { label: string, value: number | string, color: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-md`}>
      <h2 className="text-gray-600 font-semibold mb-2">{label}</h2>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  )
}

function GrowthChart({ title, data, color }: { title: string, data: number[], color: string }) {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today']

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        backgroundColor: `${color}20`,
        borderColor: color,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-gray-700 font-semibold mb-4">{title}</h3>
      <Line data={chartData} options={options} height={200} />
    </div>
  )
}
