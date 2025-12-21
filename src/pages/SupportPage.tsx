import { ArrowRight } from "lucide-react";

export function SupportPage() {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-4xl">
        <h2 className="text-foreground text-2xl mb-6">Support</h2>

        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-muted/40 border border-border rounded-lg p-6">
            <h3 className="text-foreground text-lg mb-4">Contact Support</h3>
            <div className="space-y-4">
              <div>
                <label className="text-foreground block mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full bg-input border border-input rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-ring"
                />
              </div>
              <div>
                <label className="text-foreground block mb-2">Message</label>
                <textarea
                  rows={6}
                  placeholder="Describe your issue..."
                  className="w-full bg-input border border-input rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none resize-none focus:border-ring"
                />
              </div>
              <button className="bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-colors font-semibold">
                Send Message
              </button>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-muted/40 border border-border rounded-lg p-6">
            <h3 className="text-foreground text-lg mb-4">Documentation</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <span className="text-foreground">Getting Started Guide</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <span className="text-foreground">API Documentation</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <span className="text-foreground">FAQs</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
