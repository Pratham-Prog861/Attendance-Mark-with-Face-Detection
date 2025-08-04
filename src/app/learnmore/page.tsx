import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'

export default function page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Understanding <span className="text-primary">FaceAttend</span>
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto text-lg">
            Learn how our AI-powered attendance system revolutionizes the way you track attendance,
            making it faster, more accurate, and completely secure.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Privacy First</h3>
              <p className="text-gray-600">
                All facial recognition data is processed locally in your browser.
                We never store or transmit sensitive biometric information.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Recognition takes less than a second, making check-ins quick and
                efficient for both students and teachers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Easy Enrollment</h3>
              <p className="text-gray-600">
                Register students with a single photo. Our AI handles the rest,
                making enrollment simple and hassle-free.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Secure Storage</h3>
              <p className="text-gray-600">
                Attendance records are stored securely and can be exported
                anytime in multiple formats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of institutions already using FaceAttend to
            streamline their attendance tracking process.
          </p>
          <Button size="lg" asChild>
            <Link href="/app">
              Try FaceAttend Now
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
