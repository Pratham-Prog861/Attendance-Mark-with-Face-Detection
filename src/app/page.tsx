import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap } from "lucide-react";
import { AppLogo } from "@/components/icons";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <AppLogo className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-gray-800">FaceAttend</h1>
        </div>
        <Button asChild>
          <Link href="/app">Launch App</Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto flex flex-col items-center py-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Effortless Attendance Tracking
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Harness the power of AI to streamline your attendance process.
            FaceAttend uses facial recognition for quick, secure, and accurate
            check-ins.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/app">
                Get Started
                <Zap className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto py-16">
          <div className="relative isolate overflow-hidden bg-primary/10 px-6 pt-16 shadow-2xl rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h3 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Simple. Fast. Reliable.
              </h3>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                Say goodbye to manual attendance sheets. Our AI-powered system
                makes enrollment and recognition a breeze.
              </p>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <Image
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src="https://placehold.co/1152x864.png"
                alt="App screenshot"
                width={1152}
                height={864}
                data-ai-hint="facial recognition app"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="text-primary" />
                  Quick Enrollment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Easily register students with a single clear photo.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CheckCircle className="text-primary" />
                  Instant Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI recognizes faces in real-time for fast check-ins.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AppLogo className="text-primary" />
                  Secure & Private
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All data is processed securely and stored locally in your
                  browser.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="container mx-auto py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} FaceAttend. All rights reserved.</p>
      </footer>
    </div>
  );
}
