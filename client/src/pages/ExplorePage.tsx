import { useEffect, useState } from "react"
import { getAllPlacesApi } from "../apis/places.api"

function ExplorePage() {
  const [places, setPlaces] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await getAllPlacesApi()
        setPlaces(res.data.data || [])
      } catch (err: any) {
        setError("Failed to fetch places")
      } finally {
        setLoading(false)
      }
    }

    fetchPlaces()
  }, [])

  // 🔥 Filtering logic
  const filteredPlaces = places.filter((place: any) => {
    const matchesSearch = place.name
      ?.toLowerCase()
      .includes(search.toLowerCase())

    const matchesDistrict = selectedDistrict
      ? place.district === selectedDistrict
      : true

    const matchesCategory = selectedCategory
      ? place.category === selectedCategory
      : true

    return matchesSearch && matchesDistrict && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10">
      
      <h1 className="text-3xl font-bold text-white mb-6">
        Explore Places
      </h1>

      {/* 🔍 Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          
          <input
            type="text"
            placeholder="Search places..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg w-full bg-gray-800 text-white outline-none"
          />

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white"
          >
            <option value="">All Districts</option>
            <option value="Banswara">Banswara</option>
            <option value="Dungarpur">Dungarpur</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white"
          >
            <option value="">All Categories</option>
            <option value="temple">Temple</option>
            <option value="nature">Nature</option>
            <option value="historical">Historical</option>
            <option value="spiritual">Spiritual</option>
            <option value="tribal">Tribal</option>
          </select>

        </div>
      </div>

      {/* ⏳ Loading */}
      {loading && (
        <p className="text-gray-400">Loading places...</p>
      )}

      {/* ❌ Error */}
      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {/* 📦 Grid */}
      {!loading && !error && (
        <>
          {filteredPlaces.length === 0 ? (
            <p className="text-gray-400">No places found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPlaces.map((place: any) => (
                <div
                  key={place._id}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
                >
                  <img
                    src={place.images?.[0] || "https://placehold.co/400x200"}
                    alt={place.name}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4">
                    <h2 className="text-white text-xl font-semibold">
                      {place.name}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      {place.district} • {place.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default ExplorePage