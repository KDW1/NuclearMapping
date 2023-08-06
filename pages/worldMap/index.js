import WorldMap from "@/components/WorldMap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe, faHome } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function Page() {
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
       <WorldMap table={null} />
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