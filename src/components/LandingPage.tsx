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
          <div className="container mx-auto flex min-h-[80vh] sm:min-h-[90vh] flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 text-center">
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div className="relative z-10 w-full max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
                Face<span className="text-primary">Attend</span>
              </h1>
              <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-800">
                Effortless Attendance Tracking
              </h2>
              <p className="mt-4 sm:mt-6 mx-auto max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 px-4 sm:px-0">
                Harness the power of AI to streamline your attendance process.
                FaceAttend uses facial recognition for quick, secure, and accurate
                check-ins.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/webcam" className="font-medium">
                    Get Started
                    <Zap className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/learnmore" className="font-medium">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary/5 py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex flex-col items-center py-4">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold">1000+</p>
                <p className="text-sm sm:text-base text-gray-600">Students Enrolled</p>
              </div>
              <div className="flex flex-col items-center py-4">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold">100%</p>
                <p className="text-sm sm:text-base text-gray-600">Data Privacy</p>
              </div>
              <div className="flex flex-col items-center py-4">
                <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold">&lt;1s</p>
                <p className="text-sm sm:text-base text-gray-600">Recognition Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto py-10 sm:py-16 px-4 sm:px-6">
          <div className="relative isolate overflow-hidden bg-primary/10 px-4 sm:px-6 md:px-16 pt-10 sm:pt-16 shadow-2xl rounded-3xl lg:flex lg:gap-x-10 xl:gap-x-20 lg:px-16 xl:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-16 xl:py-32 lg:text-left">
              <h3 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl">
                Simple. Fast. Reliable.
              </h3>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-700">
                Say goodbye to manual attendance sheets. Our AI-powered system
                makes enrollment and recognition a breeze.
              </p>
              <div className="mt-6 sm:mt-8">
                <Button variant="secondary" className="w-full sm:w-auto">See How It Works</Button>
              </div>
            </div>
            <div className="relative mt-10 sm:mt-16 h-60 sm:h-80 lg:mt-8 overflow-hidden">
              <Image
                className="w-full h-full object-cover rounded-md bg-white/5 ring-1 ring-white/10 shadow-xl lg:absolute lg:left-0 lg:top-0 lg:w-auto lg:max-w-none"
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
        <section className="container mx-auto py-12 sm:py-20 px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose FaceAttend?</h3>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">Experience the future of attendance management</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="space-y-1 p-4 sm:p-6">
                <div className="bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2">
                  <Zap className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold">Quick Enrollment</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Register students in seconds with our streamlined enrollment process. 
                  Just one clear photo is all you need to get started.
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="space-y-1 p-4 sm:p-6">
                <div className="bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold">Instant Recognition</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  State-of-the-art AI technology ensures lightning-fast face recognition 
                  with unprecedented accuracy for hassle-free check-ins.
                </p>
              </CardContent>
            </Card>
            <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none">
              <CardHeader className="space-y-1 p-4 sm:p-6">
                <div className="bg-primary/10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2">
                  <AppLogo className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold">Security First</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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
