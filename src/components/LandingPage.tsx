import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { CheckCircle, Zap, Users, Shield, Clock } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { AppLogo } from './icons'

export const LandingPage = () => {
  return (
    <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container mx-auto flex min-h-[90vh] flex-col items-center justify-center py-16 text-center">
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div className="relative z-10">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                Face<span className="text-primary">Attend</span>
              </h1>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                Effortless Attendance Tracking
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Harness the power of AI to streamline your attendance process.
                FaceAttend uses facial recognition for quick, secure, and accurate
                check-ins.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/webcam" className="font-medium">
                    Get Started
                    <Zap className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/learnmore" className="font-medium">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary/5 py-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 text-primary" />
                <p className="mt-4 text-3xl font-bold">1000+</p>
                <p className="text-gray-600">Students Enrolled</p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-8 w-8 text-primary" />
                <p className="mt-4 text-3xl font-bold">100%</p>
                <p className="text-gray-600">Data Privacy</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 text-primary" />
                <p className="mt-4 text-3xl font-bold">&lt;1s</p>
                <p className="text-gray-600">Recognition Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto py-16">
          <div className="relative isolate overflow-hidden bg-primary/10 px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h3 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Simple. Fast. Reliable.
              </h3>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                Say goodbye to manual attendance sheets. Our AI-powered system
                makes enrollment and recognition a breeze.
              </p>
              <div className="mt-8">
                <Button variant="secondary">See How It Works</Button>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <Image
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10 shadow-xl"
                src="https://placehold.co/1152x864.png"
                alt="App screenshot"
                width={1152}
                height={864}
                data-ai-hint="facial recognition app"
              />
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="container mx-auto py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900">Why Choose FaceAttend?</h3>
            <p className="mt-4 text-lg text-gray-600">Experience the future of attendance management</p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="space-y-1">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
            <Zap className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">Quick Enrollment</CardTitle>
              </CardHeader>
              <CardContent>
          <p className="text-gray-600 leading-relaxed">
            Register students in seconds with our streamlined enrollment process. 
            Just one clear photo is all you need to get started.
          </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="space-y-1">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
            <CheckCircle className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">Instant Recognition</CardTitle>
              </CardHeader>
              <CardContent>
          <p className="text-gray-600 leading-relaxed">
            State-of-the-art AI technology ensures lightning-fast face recognition 
            with unprecedented accuracy for hassle-free check-ins.
          </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="space-y-1">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
            <AppLogo className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">Security First</CardTitle>
              </CardHeader>
              <CardContent>
          <p className="text-gray-600 leading-relaxed">
            Your privacy matters. All facial data is processed and stored locally 
            with enterprise-grade security standards.
          </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
  )
}
