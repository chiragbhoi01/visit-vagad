import { Search, MapPin, Calendar, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
    return (
        <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-deepTeal-900">
            {/* Background Image Placeholder - In real app use Next.js Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-60 mix-blend-overlay"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2670&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-deepTeal-950 via-deepTeal-900/40 to-transparent" />

            <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-lg max-w-4xl mx-auto">
                    Discover the Soul of the <span className="text-terracotta">Tribal Circuit</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                    Explore Banswara, the 'City of Hundred Islands', and Dungarpur, the 'City of Hills'.
                    Experience the untold stories of Vagad.
                </p>

                {/* Smart Search Bar */}
                <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 flex flex-col md:flex-row items-center gap-2 mt-8 shadow-2xl">
                    <div className="flex-1 w-full md:w-auto flex items-center px-4 h-12 md:h-auto border-b md:border-b-0 md:border-r border-white/20">
                        <MapPin className="text-terracotta w-5 h-5 mr-3 shrink-0" />
                        <Input
                            type="text"
                            placeholder="Where to? (e.g. Banswara)"
                            className="border-none bg-transparent text-white placeholder:text-gray-300 focus-visible:ring-0 h-10 text-base"
                        />
                    </div>
                    <div className="flex-1 w-full md:w-auto flex items-center px-4 h-12 md:h-auto border-b md:border-b-0 md:border-r border-white/20">
                        <Compass className="text-terracotta w-5 h-5 mr-3 shrink-0" />
                        <Input
                            type="text"
                            placeholder="Experience (e.g. Tribal Art)"
                            className="border-none bg-transparent text-white placeholder:text-gray-300 focus-visible:ring-0 h-10 text-base"
                        />
                    </div>
                    <div className="flex-1 w-full md:w-auto flex items-center px-4 h-12 md:h-auto">
                        <Calendar className="text-terracotta w-5 h-5 mr-3 shrink-0" />
                        <Input
                            type="text"
                            placeholder="Dates"
                            className="border-none bg-transparent text-white placeholder:text-gray-300 focus-visible:ring-0 h-10 text-base"
                        />
                    </div>
                    <Button size="lg" className="w-full md:w-auto rounded-full bg-terracotta hover:bg-terracotta-600 text-white px-8 h-12">
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}
