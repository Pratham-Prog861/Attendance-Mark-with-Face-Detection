# FaceAttend

FaceAttend is a web application for effortless attendance tracking using AI-powered facial recognition. Students can be enrolled and recognized via webcam, with all data processed securely and stored locally in the browser.

## Features

- Quick student enrollment with a single photo
- Real-time face recognition for instant check-ins
- Attendance records stored locally
- Modern UI with responsive design
- Secure and private: no cloud storage required

## Tech Stack

- [Next.js](https://nextjs.org/) (React)
- [Genkit](https://github.com/genkit-ai/genkit) for AI flows
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide Icons](https://lucide.dev/) for iconography
- [Zod](https://zod.dev/) for schema validation

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
npm install
```

### Development

Start the Next.js app:

```sh
npm run dev
```

Start Genkit AI flows (in a separate terminal):

```sh
npm run genkit:dev
```

### Build

```sh
npm run build
```

### Scripts

- `dev`: Start Next.js development server
- `genkit:dev`: Start Genkit AI server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint
- `typecheck`: Run TypeScript type checks

## Project Structure

```bash
src/
  ai/                # AI flows (enroll-face, recognize-face)
  app/               # Next.js app directory
  components/        # React UI components
  hooks/             # Custom React hooks
  lib/               # Types and utilities
  ...
```

Made with ❤️ using [Next.js](https://nextjs.org/)
