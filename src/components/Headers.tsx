import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { AppLogo } from './icons'

const Headers = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <AppLogo className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            FaceAttend
          </h1>
        </div>
        <Button asChild variant="default" size="sm">
          <Link href="/webcam" className="font-medium">
            Launch App
          </Link>
        </Button>
      </div>
    </header>
  )
}

export default Headers