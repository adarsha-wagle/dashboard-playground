import { motion } from 'framer-motion'
import type { HTMLProps } from 'react'

type TSecondaryHeaderProps = {
  title: string
  description?: string
  className?: HTMLProps<HTMLDivElement>['className']
}

function SecondaryHeader({
  title,
  description,
  className,
}: TSecondaryHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={className}
    >
      <h1 className="text-foreground/80 text-20 font-semibold">{title}</h1>
      {description && (
        <p className="text-muted-foreground text-14">{description}</p>
      )}
    </motion.div>
  )
}

export default SecondaryHeader
