import { ChevronDown, ChevronRight } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import React from 'react'
import type { LinkProps } from '@tanstack/react-router'

export interface ICustomBreadCrumb {
  id: number
  label: string
  href: LinkProps['href']
  hasDropdown?: boolean
  dropDownItems?: {
    id: number
    label: string
    href: LinkProps['href']
  }[]
}

type TCustomBreadCrumbProps = {
  breadCrumbs: ICustomBreadCrumb[]
}

export function CustomBreadCrumb({ breadCrumbs }: TCustomBreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbs.map((crumb, index) => {
          if (index === breadCrumbs.length - 1) {
            return (
              <BreadcrumbItem key={crumb.id}>
                <BreadcrumbPage className="font-afacad responsive__fontsize15">
                  {crumb.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )
          }
          if (crumb.hasDropdown) {
            return (
              <BreadcrumbItem key={crumb.id} className="border-none">
                <DropdownMenu>
                  <DropdownMenuTrigger className="font-afacad responsive__fontsize15 flex items-end gap-1 border-0">
                    {crumb.label}
                    <ChevronDown className="h-4 w-4 text-yellow-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="rounded-none bg-gray-100"
                  >
                    {crumb.dropDownItems?.map((item) => (
                      <DropdownMenuItem key={item.id}>
                        <BreadcrumbLink
                          href={item.href}
                          className="font-afacad responsive__fontsize15"
                        >
                          {item.label}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            )
          }

          return (
            <React.Fragment key={crumb.id}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={crumb.href}
                  className="font-afacad responsive__fontsize15"
                >
                  {crumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="text-yellow-400" />
              </BreadcrumbSeparator>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
