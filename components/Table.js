export default function Table({table, globalInfo}) {
    return <><div className="overflow-x-scroll">
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
            </div></>
}