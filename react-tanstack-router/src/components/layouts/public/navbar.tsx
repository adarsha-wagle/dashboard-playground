import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'About', to: '/about' },
  { label: 'Dashboard', to: '/dashboard' },
]

export default function Navbar() {
  return (
    <header className="bg-background w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold tracking-tight">
          MyApp
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'text-muted-foreground hover:text-foreground text-sm font-medium transition-colors',
                '[&.active]:text-foreground [&.active]:font-semibold',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <Button asChild variant="outline">
          <Link to="/auth/login">Login</Link>
        </Button>
      </div>
    </header>
  )
}
