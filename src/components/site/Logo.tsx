import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={logo}
        alt="SnapCut AI logo"
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl transition-transform group-hover:scale-105"
      />
      <span className="font-display text-lg font-semibold tracking-tight">
        SnapCut <span className="text-gradient">AI</span>
      </span>
    </Link>
  );
}
