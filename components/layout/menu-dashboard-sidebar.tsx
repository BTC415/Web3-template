'use client'

import { HTMLAttributes, ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menuDashboard } from '@/config/menu-dashboard'
import { cn } from '@/lib/utils'

export const MenuDashboardSidebar = ({ className }: HTMLAttributes<HTMLElement>) => {
  const cx = cn(className, 'flex flex-col gap-1')

  const pathname = usePathname()
  return (
    <div className={cx}>
      {menuDashboard.map((item) => {
        return (
          <Item key={item.href} currentPath={pathname} className="menu-item my-2" href={item.href}>
            <span className="text-lg">{item.label}</span>
          </Item>
        )
      })}
    </div>
  )
}

interface ItemProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  href: string
  currentPath: string | null
}

const Item = ({ children, href, currentPath, ...props }: ItemProps) => {
  const cx = cn('menu-item my-2', {
    active: currentPath === href,
  })

  return (
    <Link className={cx} href={href} {...props}>
      {children}
    </Link>
  )
}
