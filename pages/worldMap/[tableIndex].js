import WorldMap from "@/components/WorldMap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe, faHome } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { fullTables } from "@/json/nuclearData"
import { useState } from "react"

export const getServerSideProps = async (context) => {
    let { tableIndex } = context.query
    tableIndex--
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
    //  Get the total tables
    // let containsCountries = false;
    // updateInfo();
    let table = fullTables[tableIndex];
    let containsCountries = false
    console.log(table);
    if(table.metrics[0] == 'Nations' || table.metrics[0] == 'Nation') {
        containsCountries = true;
    }
    if(containsCountries) {
        console.log("\n\nTable:");
        console.log(table);
        return { props: { table }}
    } else {
        console.log("No countries involved....");
        return {
            redirect: {
            destination: '/worldMap',
            permanent: true,
            },
        }
    }
    return { props: {table: null}}
}

export default function Page({table}) {
   const getFirstValid = (metrics) => {
      for(let i = 0; i < metrics.length; i++) {
         let metric = metrics[i]
         console.log(metric)
         if(metric !== "Nations" && metric !== "Nation" && metric !== "Population") return metric
      }
   }

   const initialValue = getFirstValid(table.metrics)
   const [currentMetric, setCurrentMetric] = useState(initialValue) //First metric
   
   return (
        <>

        {/* <!--In this svg, countries represented by one body are IDed and those represented by multiple bodies are classes-->
        <!--TODO: Recieve data and color nations based on percentage of people who died --> */}
       <div className="flex space-x-4 mx-auto w-min min-w-max">
          
      <Link className='mx-auto w-min mt-4 min-w-max' href="/">
          <FontAwesomeIcon className='p-3 cursor-pointer hover:-rotate-12 hover:-translate-x-2 hover:-translate-y-1 transition duration-300 bg-white rounded-xl' icon={faHome}>
          </FontAwesomeIcon>
      </Link>
          {/* <% if(locals.table) { %>
             <a href="/table/<%= locals.table.numberedIndex %> ">
               <svg className="px-4 py-4 mx-auto bg-white rounded-xl h-12 mt-4 mb-2 cursor-pointer hover:-rotate-12 hover:-translate-x-2 hover:-translate-y-1 transition duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/>
               </svg>
             </a>
          <% } %>  */}
       </div>
       <div className="px-8 py-4 mb-6 shadow-xl shadow-shade relative bg-white w-min min-w-max mx-auto rounded-md mt-4  hover:-translate-y-2 ease-in-out transition duration-300">
           <form className="mx-auto w-min" action="/country" method="post">
               <label className="text-center block font-medium text-lg align-baseline" for="">Search by Country:</label>
               <input className="mt-2 mx-auto px-2 py-1 rounded align-baseline border-2" name="country" type="text"/>
           </form>
       </div>
       {
        table ? <>
        <p className="mx-auto text-center mb-2 w-1/3 text-xl md:text-2xl lg:text-3xl text-white font-bold border-b-4 border-white">
           Table #{table.numberedIndex}
        </p>
        <p className="mx-auto text-center mb-2 w-2/3 text-base md:text-xl lg:text-3xl text-white font-bold">
           {table.title}
        </p>
        <div className="mx-auto">
           <p className="block mx-auto w-min text-2xl text-white font-bold">
              Metrics:
           </p>
           <select value={currentMetric} onChange={(e) =>{
            console.log("Value: ", e.target.value)
            setCurrentMetric(e.target.value)
           }} id="metric" className="block outline-none mx-auto text-center mt-2 mb-2 px-2 rounded-lg w-min shadow-shade/75 shadow-xl transition duration-400 hover:scale-105 hover:-translate-y-1">
                {
                    table.metrics.map((metric, i) =>
                     (
                        <>
                        {
                           metric !== "Nations" && metric !== "Nation" && metric !== "Population" ?
                           <option selected={i==0} value={metric} key={`metric${i}`}>{metric}</option> : <></> 
                        }
                        </>
                     ))
                }
           </select>
           
           <p className="block mb-2 mx-auto w-min min-w-max text-base text-white font-semibold">
              Unit: {table.unit}
           </p>
           <p className="block mb-4 mx-auto w-min min-w-max text-base text-white font-semibold">
              Displaying countries mentioned in data
           </p> 
           <div className="flex-col md:flex-row md:flex mx-auto min-w-max w-min space-y-2 md:space-x-4 mb-4">
              <div></div>
              <div className="flex">
                 <div className="h-8 w-8 bg-white rounded-md">
     
                 </div>
                 <p className="text-white text-lg ml-2 font-semibold">
                 { table.unit == '% change in caloric production' ? "more than 0%" : "less than 0%" }

                 </p>
              </div>
              <div className="flex">
                 <div className="h-8 w-8 bg-[#fdff83] rounded-md">
     
                 </div>
                 <p className="text-white text-lg ml-2 font-semibold">
                 { table.unit == '% change in caloric production' ? "0% to 25%" : "0% to -25%" }
                 </p>
              </div>
              <div className="flex">
                 <div className="h-8 w-8 bg-[#ffdf2c] rounded-md">
     
                 </div>
                 <p className="text-white text-lg ml-2 font-semibold">
                    { table.unit == '% change in caloric production' ? "25% to 50%" : "-25% to -50%" }
                 </p>
              </div>
              <div className="flex">
                 <div className="h-8 w-8 bg-[#ff9531] rounded-md">
     
                 </div>
                 <p className="text-white text-lg ml-2 font-semibold">
                    { table.unit == '% change in caloric production' ? "50% to 75%" : "-50% to 75%" }
                 </p>
              </div>
              <div className="flex">
                 <div className="h-8 w-8 bg-[#ff2929] rounded-md">
     
                 </div>
                 <p className="text-white text-lg ml-2 font-semibold">
                 { table.unit == '% change in caloric production' ? "75%+" : "-75%-" }
                 </p>
              </div>
           </div>
        </div>
        </> : <></>
       }
       <WorldMap currentMetric={currentMetric} table={table ?? null} />
        <style>
            {`
             svg#world g:hover path{
                fill: #e22b43;
             } 
    
             svg#world path:hover{
                fill: #e22b43;
             }
    
             .color0 {
                fill: #fff !important;
             }
    
             g.colored:hover path.color0 {
                fill: #fdff86 !important;
             }
    
             .color0:hover {
                fill: #fdff86 !important;
             }
    
             .color1 {
                fill: #fdff83 !important;
             }
    
             g.colored:hover path.color1 {
                fill: #ffe864 !important;
             }
    
             .color1:hover {
                fill: #ffe864 !important;
             }
    
             .color2 {
                fill: #ffdf2c !important;
             }
             
             g.colored:hover path.color2 {
                fill: #ffb71c !important;
             }
    
             .color2:hover {
                fill: #ffb71c !important;
             }
    
             .color3 {
                fill: #ff9531 !important;
             }
             
             g.colored:hover path.color3 {
                fill: #f55128 !important;
             }
    
             .color3:hover {
                fill: #f55128 !important;
             }
    
             .color4 {
                fill: #ff2929 !important;
             }
             
             g.colored:hover path.color4 {
                fill: #e91744 !important;
             }
    
             .color4:hover {
                fill: #e91744 !important;
             }
             `}
        </style>
        </>
    )
}