export const metadata = {
    title: 'Terms of Service – Caption Wizard AI',
    description: 'The legal terms you agree to when using our site.',
  }
  
  export default function TermsPage() {
    return (
      <main className="min-h-screen bg-[#f4f4fb] text-gray-800 p-6 flex justify-center items-start">
        <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6">
          <h1 className="text-3xl font-bold">📄 Terms of Service</h1>
  
          <p className="text-sm text-gray-600">
            By using Caption Wizard AI, you agree to use the tool responsibly and for personal or commercial social media content.
          </p>
  
          <p className="text-sm text-gray-600">
            You may not use the captions or platform to generate harmful, offensive, or misleading content.
          </p>
  
          <p className="text-sm text-gray-600">
            We reserve the right to update or restrict access if the tool is misused.
          </p>
  
          <p className="text-sm text-gray-600">
            These terms are subject to change. Continued use after changes means you accept them.
          </p>
        </div>
      </main>
    )
  }
  