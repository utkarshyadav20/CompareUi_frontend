import { ArrowRight } from 'lucide-react';

export function SupportPage() {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-4xl">
        <h2 className="text-black dark:text-white text-2xl mb-6">Support</h2>
        
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-black/5 dark:bg-white/10 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <h3 className="text-black dark:text-white text-lg mb-4">Contact Support</h3>
            <div className="space-y-4">
              <div>
                <label className="text-black dark:text-white block mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full bg-white dark:bg-black border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 outline-none"
                />
              </div>
              <div>
                <label className="text-black dark:text-white block mb-2">Message</label>
                <textarea
                  rows={6}
                  placeholder="Describe your issue..."
                  className="w-full bg-white dark:bg-black border border-black/50 dark:border-white/50 rounded-lg px-4 py-3 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 outline-none resize-none"
                />
              </div>
              <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors font-semibold">
                Send Message
              </button>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-black/5 dark:bg-white/10 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <h3 className="text-black dark:text-white text-lg mb-4">Documentation</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-3 bg-white dark:bg-black rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="text-black dark:text-white">Getting Started Guide</span>
                <ArrowRight className="w-4 h-4 text-black/50 dark:text-white/50" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 bg-white dark:bg-black rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="text-black dark:text-white">API Documentation</span>
                <ArrowRight className="w-4 h-4 text-black/50 dark:text-white/50" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 bg-white dark:bg-black rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="text-black dark:text-white">FAQs</span>
                <ArrowRight className="w-4 h-4 text-black/50 dark:text-white/50" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
