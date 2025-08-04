import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-8 px-4">
        <div className='flex px-56 justify-between items-center'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Brand */}
          <div className='text-center'>
            <h3 className="font-bold text-xl text-primary mb-2">FaceAttend</h3>
            <p className="text-gray-600 text-sm">
              Modern attendance tracking powered by AI
            </p>
          </div>

          {/* Contact */}
          <div className='text-center'>
            <h4 className="font-semibold mb-2">Contact</h4>
            <a
              href="mailto:pratham8355@gmail.com"
              className="text-gray-600 hover:text-primary text-sm transition"
            >
              pratham8355@gmail.com
            </a>
          </div>

          {/* Social */}
          <div className='text-center'>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-3 justify-center">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition"
                aria-label="Github"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition"
                aria-label="Linkedin"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} FaceAttend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
