import { useState } from "react"
import { useRouter } from "next/router"

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const router = useRouter()
    return (
        <div className="px-12 mb-2 py-4 shadow-xl shadow-shade relative bg-white w-min min-w-max mx-auto rounded-md mt-4  hover:-translate-y-2 ease-in-out transition duration-300">
            <form className="mx-auto w-min" onSubmit={(e) => {
                e.preventDefault()
                console.log("Country: ", query)
                router.push(`/country/${query}`)
            }}>
                <label className="text-center block font-medium text-xl align-baseline" for="">Search by Country:</label>
                <input onChange={(e) => setQuery(e.target.value)} className="mt-2 mx-auto px-2 py-2 rounded align-baseline border-2" value={query} type="text"/>
            </form>
        </div>
    )
}