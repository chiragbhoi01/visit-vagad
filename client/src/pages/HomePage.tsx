import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-orange-900">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Discover Vagad
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Explore the hidden gems of Banswara & Dungarpur
        </p>

        <button
          onClick={() => navigate("/explore")}
          className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-orange-600 transition duration-300"
        >
          Explore Places
        </button>

        <div className="flex gap-8 mt-12 text-gray-400">
          <span>15+ Destinations</span>
          <span>2 Districts</span>
          <span>1 Hidden Gem</span>
        </div>

      </div>
    </div>
  )
}

export default HomePage