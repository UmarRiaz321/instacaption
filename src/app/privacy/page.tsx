export const metadata = {
    title: 'Privacy Policy – Caption Wizard AI',
    description: 'Our policy on data collection and privacy.',
  }
  
  export default function PrivacyPolicy() {
    return (
      <main className="min-h-screen bg-[#f4f4fb] text-gray-800 p-6 flex justify-center items-start">
        <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6">
          <h1 className="text-3xl font-bold">🔐 Privacy Policy</h1>
  
          <p className="text-sm text-gray-600">
            We only collect your email to personalize your session and track your Premium status or invite progress.
          </p>
  
          <p className="text-sm text-gray-600">
            We do not collect any sensitive personal data, and we never share your email with third parties.
          </p>
  
          <p className="text-sm text-gray-600">
            Your data is stored securely and used only to enhance your experience with Caption Wizard AI.
          </p>
  
          <p className="text-sm text-gray-600">
            If you want your data removed, email us at <strong>support@captionwizard.pro</strong>.
          </p>
        </div>
      </main>
    )
  }
  