import Link from "next/link"

export function AdminFooter() {
    return (
        <footer className="bg-deepTeal-950 text-deepTeal-100 py-12 border-t border-deepTeal-800">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <h4 className="font-bold text-white text-lg">VisitVagad</h4>
                        <p className="text-sm text-deepTeal-300">
                            Connecting you to the untamed beauty and rich heritage of the Vagad region.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Explore</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/destinations" className="hover:text-terracotta">Destinations</Link></li>
                            <li><Link href="/experiences" className="hover:text-terracotta">Experiences</Link></li>
                            <li><Link href="/events" className="hover:text-terracotta">Events</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-terracotta">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-terracotta">FAQs</Link></li>
                            <li><Link href="/privacy" className="hover:text-terracotta">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Social</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-terracotta">Instagram</Link></li>
                            <li><Link href="#" className="hover:text-terracotta">Facebook</Link></li>
                            <li><Link href="#" className="hover:text-terracotta">Twitter</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Admin Dashboard Preview / Live Stats */}
                <div className="border-t border-deepTeal-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-deepTeal-500">
                            © 2024 VisitVagad. All rights reserved.
                        </p>
                        <div className="bg-deepTeal-900/50 rounded-lg p-3 flex items-center gap-6 border border-deepTeal-800">
                            <span className="text-xs font-semibold text-deepTeal-400 uppercase tracking-wider">Live Tourism Stats</span>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <span className="block text-lg font-bold text-terracotta">12.5k</span>
                                    <span className="text-[10px] text-deepTeal-300">Active Visitors</span>
                                </div>
                                <div className="w-px h-8 bg-deepTeal-800" />
                                <div className="text-center">
                                    <span className="block text-lg font-bold text-terracotta">450+</span>
                                    <span className="text-[10px] text-deepTeal-300">Reg. Artisans</span>
                                </div>
                                <div className="w-px h-8 bg-deepTeal-800" />
                                <div className="text-center">
                                    <span className="block text-lg font-bold text-terracotta">85</span>
                                    <span className="text-[10px] text-deepTeal-300">RIPS Homestays</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
