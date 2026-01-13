import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'About', to: '/about' },
  { label: 'Invoices', to: '/invoices' },
]

export default function Navbar() {
  return (
    <header className="w-full border-b bg-background">
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
                'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
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
