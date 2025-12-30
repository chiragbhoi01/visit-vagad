import { ArrowRight, Star, ShieldCheck, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ImpactModules() {
    return (
        <section className="py-16 md:py-24 space-y-24 container px-4 md:px-6">

            {/* Bhil Bazaar Module */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <Badge variant="outline" className="text-terracotta border-terracotta px-4 py-1 text-sm bg-terracotta/5">
                        Tribal Crafts
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-deepTeal-900 tracking-tight">
                        Bhil Bazaar
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Directly from the artisans of Vagad. Every purchase supports the preservation of centuries-old Bhil craftsmanship.
                    </p>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-terracotta h-5 w-5" />
                        <span className="font-medium text-deepTeal-700">Verified Artisan Badges</span>
                    </div>
                    <Button className="bg-deepTeal-900 text-white hover:bg-deepTeal-700 h-12 px-8 rounded-full">
                        Shop Authentic Crafts <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group">
                        {/* Placeholder */}
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                            Bamboo Craft Image
                        </div>
                    </div>
                </div>
            </div>

            {/* Vagad Stays Module */}
            <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                <div className="md:order-2 space-y-6">
                    <Badge variant="outline" className="text-deepTeal-600 border-deepTeal-600 px-4 py-1 text-sm bg-deepTeal-50">
                        Authentic Stays
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-deepTeal-900 tracking-tight">
                        Vagad Stays
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Experience true hospitality in RIPS 2024 Certified homestays. Stay with locals, eat local, and live the culture.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-terracotta/10 flex items-center justify-center">
                                <Star className="h-3.5 w-3.5 text-terracotta fill-terracotta" />
                            </div>
                            <span className="text-gray-700">Govt. Certified Excellence</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full bg-terracotta/10 flex items-center justify-center">
                                <Star className="h-3.5 w-3.5 text-terracotta fill-terracotta" />
                            </div>
                            <span className="text-gray-700">Verified Hosts & Amenities</span>
                        </li>
                    </ul>
                    <Button variant="outline" className="border-deepTeal-900 text-deepTeal-900 hover:bg-deepTeal-50 h-12 px-8 rounded-full">
                        Find a Homestay <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                <div className="md:order-1 aspect-square md:aspect-auto h-full min-h-[400px] bg-gray-100 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                        Homestay Image
                    </div>
                </div>
            </div>

            {/* Cultural Highlights Module */}
            <div className="text-center space-y-12">
                <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-deepTeal-900 tracking-tight">
                        Cultural Highlights
                    </h2>
                    <p className="text-xl text-gray-600">
                        Walk through history at our National Monuments and spiritual centers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="overflow-hidden border-none shadow-lg group cursor-pointer">
                        <div className="h-64 bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-deepTeal-900/20 group-hover:bg-deepTeal-900/0 transition-all duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                Mangarh Dham Image
                            </div>
                        </div>
                        <CardHeader className="text-left">
                            <CardTitle className="flex justify-between items-center text-xl">
                                Mangarh Dham
                                <Badge className="bg-terracotta hover:bg-terracotta-600">National Monument</Badge>
                            </CardTitle>
                            <CardDescription>The Jallianwala Bagh of Rajasthan</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="overflow-hidden border-none shadow-lg group cursor-pointer">
                        <div className="h-64 bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-deepTeal-900/20 group-hover:bg-deepTeal-900/0 transition-all duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                Beneshwar Dham Image
                            </div>
                        </div>
                        <CardHeader className="text-left">
                            <CardTitle className="flex justify-between items-center text-xl">
                                Beneshwar Dham
                                <Badge className="bg-deepTeal-700 hover:bg-deepTeal-600">Spiritual Hub</Badge>
                            </CardTitle>
                            <CardDescription>The Kumbh of Tribals</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>

        </section>
    )
}
