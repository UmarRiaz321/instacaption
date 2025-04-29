'use client'

import { motion } from 'framer-motion'

export default function UpgradeModal({ onClose, onUpgrade }: { onClose: () => void, onUpgrade: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white text-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">🚀 Upgrade to Premium</h2>
        <p className="text-gray-600 mb-6 text-center text-sm">
          You’ve hit your free caption limit for today.<br />
          Unlock unlimited captions for just <strong>£5 one-time</strong>!
        </p>

        <button
          onClick={onUpgrade}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold text-lg transition"
        >
          🌟 Upgrade Now
        </button>
      </motion.div>
    </div>
  )
}
