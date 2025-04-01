"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export function Search() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      {isExpanded ? (
        <div className="flex items-center">
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] md:w-[300px]"
            autoFocus
            onBlur={() => setIsExpanded(false)}
          />
        </div>
      ) : (
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsExpanded(true)}>
          <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Search</span>
        </Button>
      )}
    </div>
  )
}

