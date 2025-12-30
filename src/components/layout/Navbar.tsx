"use client"

import Link from "next/link"
import { Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-deepTeal-600 bg-deepTeal-500 text-white backdrop-blur supports-[backdrop-filter]:bg-deepTeal-500/95">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
                            VisitVagad
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/destinations"
                            className="transition-colors hover:text-terracotta-200"
                        >
                            Destinations
                        </Link>
                        <Link
                            href="/experiences"
                            className="transition-colors hover:text-terracotta-200"
                        >
                            Experiences
                        </Link>
                        <Link
                            href="/plan"
                            className="transition-colors hover:text-terracotta-200"
                        >
                            Plan Your Trip
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Mobile Search Trigger or minimal search could go here */}
                    </div>
                    <nav className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-deepTeal-600 hover:text-white"
                        >
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                        <Button variant="secondary" className="bg-terracotta text-white hover:bg-terracotta-600 border-none hidden md:flex">
                            Book Now
                        </Button>
                        <div className="md:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-deepTeal-600">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Toggle Menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px] bg-white text-deepTeal-900">
                                    <DropdownMenuItem asChild>
                                        <Link href="/destinations">Destinations</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/experiences">Experiences</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/plan">Plan Your Trip</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/book">Book Now</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
