import { cn } from '@/lib/utils'

interface IHeadingProps {
  children: React.ReactNode
  className?: string
}

export const Heading = ({ children, className = '' }: IHeadingProps) => {
  return (
    <h1 className={cn('text-2xl lg:text-3xl font-extrabold mb-8 flex items-baseline gap-2', className)}>
      <div className='size-4 lg:size-5 from-[#ba97f7] to-[#978df8] bg-gradient-to-tl rounded relative top-0.5' />
      {children}
    </h1>
  )
}
