"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "./theme-switch";
import { useTOC } from "./toc-context";

export const Sidebar = () => {
  const pathname = usePathname();
  const { topics } = useTOC();

  const routes = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Code Lab (Blogs)" },
    { href: "/admin", label: "Admin Panel" },
  ];

  return (
    <aside className="h-screen sticky top-0 w-64 flex-col border-r border-divider bg-background hidden md:flex z-50">
      <div className="p-6 flex items-center justify-center border-b border-divider/50 gap-3">
        {/* Using standard img tag to ensure static file loads correctly */}
        <img src="/logo.png" alt="Logo" className="w-15 h-15 object-contain" />
        <h1 className="text-xl font-bold text-primary tracking-wider">
          SHIVAM&apos;S<br />CODE LAB
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 group ${
              pathname === route.href
                ? "bg-primary/10 text-primary font-bold shadow-sm"
                : "text-foreground/70 hover:bg-default-100 hover:text-foreground"
            }`}
          >
            {route.label}
          </Link>
        ))}

        {/* Dynamic Topic Navigation */}
        {topics.length > 0 && (
          <div className="pt-6 animate-appearance-in">
            <div className="px-4 mb-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-divider" />
              <span className="text-xs font-bold text-default-400 uppercase tracking-wider">On this page</span>
              <div className="h-px flex-1 bg-divider" />
            </div>
            <div className="space-y-1">
              {topics.map((topic, idx) => (
                <a
                  key={topic.id || idx}
                  href={`#topic-${idx}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`topic-${idx}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block px-4 py-2 text-sm text-foreground/60 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors truncate border-l-2 border-transparent hover:border-primary"
                >
                  {idx + 1}. {topic.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-divider flex items-center justify-between bg-background">
        <span className="text-sm text-foreground/50">Theme</span>
        <ThemeSwitch />
      </div>
    </aside>
  );
};