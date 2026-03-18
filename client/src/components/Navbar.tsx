import { Link } from "react-router-dom"

const Navbar = () => {
  const navSection = [
    { section: "Explore", to: "/explore", icon: null },
    { section: "Login", to: "/login", icon: null },
    { section: "Register", to: "/register", icon: null },
  ]

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-orange-500 font-bold text-xl">
        Visit Vagad
      </Link>

      <div className="flex gap-6">
        {navSection.map((navItems) => (
          <Link
            key={navItems.to}
            to={navItems.to}
            className="text-gray-600 hover:text-orange-500"
          >
            {navItems.section}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar