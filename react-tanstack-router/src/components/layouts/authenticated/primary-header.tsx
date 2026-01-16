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
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {description && <p className=" text-muted-foreground ">{description}</p>}
    </motion.div>
  )
}

export default PrimaryHeader
