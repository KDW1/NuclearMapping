import Image from 'next/image'
import { Inter } from 'next/font/google'
import { simpleTables } from '@/utils/statistics'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faHome } from '@fortawesome/free-solid-svg-icons'
import SearchBar from '@/components/SearchBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  console.log("Simple Tables: ", simpleTables)
  return (
    <>
    <div className="px-12 py-4 bg-white mx-auto pt-4">
        <Link href="/">
            <p className="text-3xl bruh:text-5xl md:text-6xl font-semibold text-center">Nuclear Data</p>
        </Link>
        <div className="text-center">
            <p className="text-2xl text-center inline">Mapping project by </p>
            <Link className="text-2xl font-bold text-red-200 underline hover:text-red-500 transition-all duration-300" href="https://kingcode.dev">KingCode</Link>
            <p className="text-2xl">Check out the study <Link className='font-bold text-red-200 underline hover:text-red-500 transition-all duration-300' href={"https://www.nature.com/articles/s43016-022-00573-0"}>here</Link></p>
            <p className="text-base w-5/6 md:w-1/4 mx-auto text-red-300">We used the information listed under the {"Supplementary Information"} page</p>
        </div>
    </div>
    <div className="mx-auto w-min min-w-max my-4">
      <Link className='mx-auto w-min min-w-max' href="/worldMap">
          <FontAwesomeIcon className='p-3 cursor-pointer hover:-rotate-12 hover:-translate-x-2 hover:-translate-y-1 transition duration-300 bg-white rounded-xl' icon={faGlobe}>
          </FontAwesomeIcon>
      </Link>
    </div>
    <SearchBar />

        <div className="mb-12 px-12 pt-4 pb-8 shadow-xl shadow-shade relative bg-white mt-4 w-11/12 md:w-3/4 rounded-xl mx-auto">
            <p className="text-center text-4xl mt-6 font-semibold">Tables:</p>
            <p className="mt-2 text-base text-center"><strong>*</strong>You can click the sections to see tables fully</p>
            
{
  simpleTables.map((table, i) => (
    <div key={`table${i}`}>
    {
      table.metrics[0] == "Nation" || table.metrics[0] == "Nations" ? 
      <Link href={`/worldTable/${i+1}`}>
        <div className="hover:scale-105 bg-white w-full px-4 py-2 transition duration-300 ease-in-out cursor-pointer mt-12 mx-auto border-b-2 pb-4">
          <p className="text-3xl font-semibold line-clamp-1">{table.title}:</p>
            <p className="text-lg line-clamp-3 mt-2">{table.description}</p>
        </div>
        </Link>
        
         :
      
         <Link href={`/table/${i+1}`}>
        <div className="hover:scale-105 bg-white w-fullpx-4 py-2 transition duration-300 ease-in-out cursor-pointer mt-12 mx-auto border-b-2 pb-4">
           <p className="text-3xl font-semibold line-clamp-1">{table.title}:</p>
             <p className="text-lg line-clamp-3 mt-2">{table.description}</p>
         </div>
         </Link>
    }
    </div>
  ))
}
        </div>
        
    </>
  )
}