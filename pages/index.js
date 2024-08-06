import Image from "next/image";
import { Inter } from "next/font/google";
import { simpleTables } from "@/utils/statistics";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHome } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log("Simple Tables: ", simpleTables);
  return (
    <>
      <div className="px-12 py-4 bg-white w-2/3 bruh:w-1/2 rounded-md my-2 mx-auto pt-4">
        <Link href="/">
          <p className="text-3xl bruh:text-5xl md:text-6xl font-semibold text-center">
            Nuclear Famine Project
          </p>
        </Link>
        <div className="text-center pb-4">
          <p className="text-2xl text-center inline">Mapping project by </p>
          <p className="font-bold group text-2xl space-x-2">
            <span className="text-lg text-main duration-300 transition ease-in-out">
              programmed by
            </span>
            <Link
              className="font-bold text-main underline hover:text-shade duration-300 ease-in-out transition"
              href="https://kingcode.dev"
            >
              King-Diorr Willsun
            </Link>
            .{" "}
            <span className="text-lg text-main">
              Coordinated by
            </span>{" "}
            Dhruv Reddy, and Chris Serrao
          </p>
        </div>
      </div>
      <div className="mx-auto w-min min-w-max my-4">
        <Link className="mx-auto w-min min-w-max" href="/worldMap">
          <FontAwesomeIcon
            className="p-3 cursor-pointer hover:-rotate-12 hover:-translate-x-2 hover:-translate-y-1 transition duration-300 bg-white rounded-xl"
            icon={faGlobe}
          ></FontAwesomeIcon>
        </Link>
      </div>
      <div className="bg-white px-6 py-4 w-3/4 mx-auto rounded-md text-start">
        <p className="text-lg overflow-y-auto px-10 py-4 h-64">
          {`Lili Xia, Alan Robock and colleagues published a paper in Nature Food in
           2022 which predicted that catastrophic global famine that would follow a
            nuclear war. Smoke from burning targets of nuclear weapons would rise into
             the upper atmosphere, block out the Sun, and make it cold and dark at Earth’s
              surface for years. The study looked at several different scenarios involving
               different numbers and sizes of nuclear warheads and examined the extent of
                the famine for each scenario given a number of possible strategies that people
                 might adopt to try to mitigate the effects. This website allows you to access
                  the vast amount of data contained in the study on a country-by-country basis.
                   You can either click on the globe icon and then click on an individual country,
                    or you can type in the name of the country.`}
<br />
<br />
            <span className="font-bold">{`Here is the study:`}</span>
<br />
            {`Xia, Lili, Alan Robock, Kim Scherrer, Cheryl S. Harrison, Benjamin Leon Bodirsky,
             Isabelle Weindl, Jonas Jägermeyr, Charles G. Bardeen, Owen B. Toon,
              and Ryan Heneghan, 2022: Global food insecurity and famine from reduced crop,
               marine fishery and livestock production due to climate disruption from nuclear
                war soot injection. Nature Food, 3, 586-596, doi:10.1038/s43016-022-00573-0.
                 You can download it here: https://www.nature.com/articles/s43016-022-00573-0,`}{" "}
                 <br /> <br />
 <span className="font-bold">                 {`Table 1 of the paper (The Statistics Table on the website)`}  
 </span>   {`summarizes the results. As horrific as the direct effects of nuclear war would be, due to blast, fire, and radioactivity, more than 10 times as many people would die from the indirect effects on agriculture, in places far removed from any targets.`}
<br/>
          <Link
            className="font-bold text-secondaryLightText underline hover:text-shade transition-all duration-300"
            href={"https://www.nature.com/articles/s43016-022-00573-0"}
          >
            (study here)
          </Link>
        </p>
        <p className="text-sm sm:text-base w-full md:w-1/2 lg:w-1/4 mx-auto text-secondaryLightText">
          We display the table data listed under the{" "}
          {"Supplementary Information"} page
        </p>
      </div>
      <SearchBar />

      <div className="mb-12 px-12 pt-4 pb-8 shadow-xl shadow-shade relative bg-white mt-4 w-11/12 md:w-3/4 w-3 rounded-xl mx-auto">
        <p className="text-center text-4xl mt-6 font-semibold">Tables:</p>
        <p className="mt-2 text-base text-center">
          <strong>*</strong>You can click the sections to see tables fully
        </p>

        {simpleTables.map((table, i) => (
          <div key={`table${i}`}>
            {table.metrics[0] == "Nation" || table.metrics[0] == "Nations" ? (
              <Link href={`/worldTable/${i + 1}`}>
                <div className="hover:scale-105 bg-white w-full px-4 py-2 transition duration-300 ease-in-out cursor-pointer mt-12 mx-auto border-b-2 pb-4">
                  <p className="text-3xl font-semibold line-clamp-1">
                    {table.title}:
                  </p>
                  <p className="text-lg line-clamp-3 mt-2">
                    {table.description}
                  </p>
                </div>
              </Link>
            ) : (
              <Link href={`/table/${i + 1}`}>
                <div className="hover:scale-105 bg-white w-fullpx-4 py-2 transition duration-300 ease-in-out cursor-pointer mt-12 mx-auto border-b-2 pb-4">
                  <p className="text-3xl font-semibold line-clamp-1">
                    {table.title}:
                  </p>
                  <p className="text-lg line-clamp-3 mt-2">
                    {table.description}
                  </p>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
