import { Link } from '@/lib/router';
import { Droplets } from 'lucide-react';

export default function Logo({
  variant = 'dark',
  onClick,
}: {
  variant?: 'dark' | 'light';
  onClick?: () => void;
}) {
  const textColor = variant === 'light' ? 'text-white' : 'text-navy-900';
  const subColor = variant === 'light' ? 'text-cream-200' : 'text-teal-600';

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group flex items-center gap-2.5 ${textColor}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg transition-transform group-hover:scale-105">
        <Droplets className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-base font-bold tracking-tight">
          Pariyani
        </span>
        <span className={`text-xs font-medium ${subColor}`}>Aqua Pearl</span>
      </div>
    </Link>
  );
}
