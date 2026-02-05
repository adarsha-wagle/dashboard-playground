import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/_public/')({
  component: App,
})

function App() {
  return (
    <motion.main
      className="bg-background flex h-screen items-center justify-center"
      initial={false}
      animate={{
        marginLeft: 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
    >
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="text-foreground mb-2 text-center text-3xl font-bold">
            Welcome to your Dashboard
          </h1>
          <p className="text-muted-foreground mb-8 text-center">
            It's a template that shows how you contains components that you will
            be using in your app.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Form Fields',
              description:
                'Form fields that works with React Hook Form and Zod.',
            },
            {
              title: 'Text Editor',
              description:
                'Rich text editor with support for images, links, and tables.',
            },
            {
              title: 'Table',
              description:
                'Table component with sorting, filtering, and pagination.',
            },
            {
              title: 'Charts',
              description:
                'Customizable bar, line, area, scatter, and pie charts.',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-card-foreground mb-2 font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Usage hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="mt-8 border-dashed p-6 text-center"
        >
          <p>Please run the server and sign-up before you start.</p>
          <Link to="/dashboard">
            <p className="text-muted-foreground text-sm">Goto Dashboard</p>
          </Link>
        </motion.div>
      </div>
    </motion.main>
  )
}
