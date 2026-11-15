import React from 'react';
import { X, Globe, CheckCircle2, Copy, ExternalLink, Terminal } from 'lucide-react';

export default function DeployGuideModal({ onClose }) {
  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    alert('Copied to clipboard: ' + cmd);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#faf8f5] dark:bg-[#121316] border border-stone-300 dark:border-stone-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Deploying to idkloves.com
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Complete, zero-cost guide to publish your site and hook up your new custom domain.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
          
          {/* Option A: Vercel */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#181a1f] border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-[10px] font-bold">▲</span>
                Option 1: Deploy with Vercel (Fastest & Free)
              </span>
              <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                Recommended
              </span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-stone-600 dark:text-stone-400 pl-1">
              <li>Run <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[11px]">npx vercel</code> inside the <code className="font-mono text-[11px]">idkloves</code> folder.</li>
              <li>Press enter to accept defaults — your site goes live on a vercel.app link instantly.</li>
              <li>Go to your Vercel Dashboard → <strong>Settings</strong> → <strong>Domains</strong>.</li>
              <li>Type <code className="font-mono font-bold text-stone-900 dark:text-stone-100">idkloves.com</code> and click <strong>Add</strong>.</li>
              <li>In your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains, etc.), add the DNS records Vercel shows:
                <div className="mt-2 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-900 font-mono text-[11px] text-stone-800 dark:text-stone-200 space-y-1">
                  <div>Type: <strong>A</strong> | Name: <strong>@</strong> | Value: <strong>76.76.21.21</strong></div>
                  <div>Type: <strong>CNAME</strong> | Name: <strong>www</strong> | Value: <strong>cname.vercel-dns.com</strong></div>
                </div>
              </li>
            </ol>
          </div>

          {/* Option B: Cloudflare Pages / GitHub Pages */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#181a1f] border border-stone-200 dark:border-stone-800 space-y-2">
            <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">☁</span>
              Option 2: Cloudflare Pages / GitHub Pages / Netlify
            </span>
            <p className="text-stone-600 dark:text-stone-400 text-xs">
              Push this repository to GitHub, link it to Cloudflare Pages or Netlify, and point your DNS. Build command is <code className="font-mono bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">npm run build</code>, and output directory is <code className="font-mono bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">dist</code>.
            </p>
          </div>

          {/* Local Preview command */}
          <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
              Local Development Commands
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-black/50 border border-stone-200 dark:border-stone-800">
                <span>npm run dev <span className="text-stone-400"># Start local server</span></span>
                <button onClick={() => copyCommand('cd idkloves && npm run dev')} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-black/50 border border-stone-200 dark:border-stone-800">
                <span>npm run build <span className="text-stone-400"># Build static dist bundle</span></span>
                <button onClick={() => copyCommand('cd idkloves && npm run build')} className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium hover:opacity-90"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
