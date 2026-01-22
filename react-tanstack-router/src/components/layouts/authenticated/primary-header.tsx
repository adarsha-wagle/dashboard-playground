import { motion } from 'framer-motion'
import type { HTMLProps } from 'react'

type TPrimaryHeaderProps = {
  title: string
  description?: string
  className?: HTMLProps<HTMLDivElement>['className']
}

function PrimaryHeader({ title, description, className }: TPrimaryHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={className}
    >
      <h1 className="text-foreground text-24 font-semibold">{title}</h1>
      {description && (
        <p className="text-muted-foreground text-16">{description}</p>
      )}
    </motion.div>
  )
}

export default PrimaryHeader
