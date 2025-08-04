import Headers from "@/components/Headers";
import { Footer } from "@/components/Footer";
import { LandingPage } from "@/components/LandingPage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Headers />
      <LandingPage />
      <Footer />
    </div>
  );
}
