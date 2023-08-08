import WorldMap from "@/components/WorldMap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe, faHome, faTable } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { fullTables } from "@/utils/statistics"
import { useEffect, useState } from "react"

export const getServerSideProps = async (context) => {
    let { tableIndex } = context.query
    //Range of 1-13
    //Bc javascript array index standars and blah blah....
    
    //Make sure the table is one that includes nations

    if(tableIndex <= 0 || tableIndex > 13) {
        return {
            redirect: {
            destination: '/worldMap',
            permanent: true,
            },
        } //Invalid table index :(, redirect
    }
    
    tableIndex--
    //  Get the total tables
    // let containsCountries = false;
    // updateInfo();
    let table = fullTables[tableIndex];
    let containsCountries = false
    console.log(table);
    if(table.metrics[0] == 'Nations' || table.metrics[0] == 'Nation') {
        containsCountries = true;
    }
    
    table.containsCountries = containsCountries
    let globalInfo = [];
    if(table.data[table.data.length-1][0] == "Total" || table.data[table.data.length-1][0] == "Global") {
        globalInfo = table.data[table.data.length-1];
    }

    return { props: {table, globalInfo}}
}

export default function CountryTable({table, globalInfo}) {
    // useEffect(() => {
    //     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //         anchor.addEventListener('click', function (e) {
    //             e.preventDefault();
    
    //             document.querySelector(this.getAttribute('href')).scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         });
    //     });
    // }, [])
    //Make Country Search Component
    return (
        <><div>
        <div className="mx-auto mt-4 mb-4 space-x-4 w-min min-w-max">
            <Link className='mx-auto w-min min-w-max' href="/">
                <FontAwesomeIcon className='p-3 cursor-pointer hover:-rotate-12 hover:-translate-x-2 hover:-translate-y-1 transition duration-300 bg-white rounded-xl' icon={faHome}>
                </FontAwesomeIcon>
            </Link>
            { table.containsCountries ? 
                <Link className='mx-auto w-min min-w-max' href={`/worldTable/${table.numberedIndex}`}>
                    <FontAwesomeIcon className='p-3 cursor-pointer hover:-rotate-12 hover:-translate-x-2 hover:-translate-y-1 transition duration-300 bg-white rounded-xl' icon={faGlobe}>
                    </FontAwesomeIcon>
                </Link>
            : 
            <>
            </>}
        </div>
        <div className="shadow-xl shadow-shade relative mx-auto px-8 py-4 w-3/4 bg-white rounded-xl">
            <p className="text-xl sm:text-3xl font-semibold text-center line-clamp-2">{table.title}</p>
            <p className="text-xs sm:text-base mt-2 text-center">{table.description }</p>
        </div>
        <div className="mb-12 shadow-xl shadow-shade relative mx-auto px-8 py-4 w-3/4 bg-white rounded-xl mt-4">
            <p className="mt-8 text-xl sm:text-3xl font-semibold text-center">Table {table.numberedIndex}</p>
            {
                table.unit != '' ? <p className="text-base sm:text-xl text-center">Unit: {table.unit}</p> : <></>
            }
            {
                table.containsCountries ? 
                <p className="mt-2 text-xs sm:text-base text-center"><strong>*</strong>You can click on a {"country's"} name to see all tables under it</p>
                : <></>
            }
            <p className="block overflow-x:hidden text-center text-sm md:text-base mt-4 font-semibold w-3/4 mx-auto relative"><strong>*</strong> You can scroll to see the rest of the table...</p>
            <div className="overflow-x-scroll">
                <table className=" table-auto mx-auto mt-4 uppercase mb-12">
                    <thead>
                        <tr>
                            {
                                table.metrics.map((data, i) => (
                                    <th key={i} className="text-start pr-10 text-xs sm:text-sm font-semibold">{data}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="space-y-2">
                        <tr>
                            {globalInfo ? globalInfo?.map((data, i) => (
                                <td key={i} className="font-bold">{data}</td>
                            )) : <></>}
                        </tr>
                        {/* data[0] is the country name */}
                        {table.data.map((data, i) => (
                            <>
                                {
                                    data[0] != "Total" && data[0] != "Global" ? 
                                    <>
                                    
                                    <tr onClick={() => {data[0].trim() != '' ? location.href = `/country/${data[0]}` : ''}} key={data[0]} className={`group text-base ${data[0].trim() != '' ? "group-hover:text-lg" : ""}`}>
                                        {/* <Link href={`/country/${data[0]}`}> */}
                                    {
                                        <>
                                        {
                                            data.map((d, i) => (
                                                <>
                                                    {
                                                        d != '' ?
                                                        <td className={`transition-all group-hover:py-4 duration-300 ease-in-out ${ i == 0 ? "cursor-pointer group-hover:font-bold" : ""} %> w-min pr-2`} >{d}</td>
                                                        :
                                                        <td className={`transition-all duration-300 ease-in-out font-semibold pr-2`} >Yes</td>
                                                    }
                                                </>
                                            ))
                                        }
                                        </>
                                    }
                                        {/* </Link> */}
                                    </tr>
                                    </>  : <></>
                                }

                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
        </>
    )
}