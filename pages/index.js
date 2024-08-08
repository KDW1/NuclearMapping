import Image from "next/image";
import { Inter } from "next/font/google";
import { simpleTables } from "@/utils/statistics";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHome } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log("Simple Tables: ", simpleTables);
  return (
    <>
      <div className="px-12 py-4 bg-white w-11/12 rounded-md my-2 mx-auto pt-4">
        <Link href="/">
          <p className="text-3xl bruh:text-5xl md:text-6xl font-semibold text-center">
            Nuclear Famine Project
          </p>
        </Link>
        <div className="text-center pb-4">
          <p className="text-2xl text-center inline">Mapping project by </p>
          <p className="font-bold group text-xl md:text-2xl space-x-2">
            <span className="text-base md:text-lg text-main duration-300 transition ease-in-out">
              programmed by
            </span>
            <Link
              className="font-bold text-main underline hover:text-shade duration-300 ease-in-out transition"
              href="https://kingcode.dev"
            >
              King-Diorr Willsun
            </Link>
            .{" "}
            <span className="text-base md:text-lg text-main">
              Coordinated by
            </span>{" "}
            Dhruv Reddy, and Chris Serrao.
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
      <div className="bg-white px-6 py-4 w-11/12 mx-auto rounded-md text-start">
        <p className="text-lg overflow-y-auto px-10 py-4">
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
                 You can download it here:`} {" "}
                 <Link
                   className="font-bold break-all text-secondaryLightText underline hover:text-shade transition-all duration-300"
                   href={"https://www.nature.com/articles/s43016-022-00573-0"}
                 >{`https://www.nature.com/articles/s43016-022-00573-0`}</Link>
                 <br /> <br />
 <span className="font-bold">                 {`Table 1 of the paper (The Statistics Table on the website)`}  
 </span>   {`summarizes the results. As horrific as the direct effects of nuclear war would be, due to blast, fire, and radioactivity, more than 10 times as many people would die from the indirect effects on agriculture, in places far removed from any targets.`}
<br/>
<br />
Number of weapons on urban targets, yields, direct fatalities from the bomb blasts, and resulting number of people in danger of death due to famine for the different scenarios we studied.  The 5 Tg case scenario is from reference 16 for an India-Pakistan war taking place in 2008; the 16-47 Tg cases are from reference 18 for an India-Pakistan war taking place in 2025; and the 150 Tg case is from reference 52, which assumes attacks on France, Germany, Japan, U.K., U.S., Russia, and China.  The last column is the number of people who would starve by the end of Year 2 when the rest of the population is provided with the minimum amount of food needed to survive, assumed to be a calorie intake of 1911 kcal/capita/day, and for no international trade, from Supplemental Information, Table S5, the Partial Livestock case, in which 50% of livestock grain feed used for human consumption, and 50% of livestock grain feed used to raise livestock, using the latest complete data available, for the year 2010.  For 2010, the world population was 6,703,000,000.  There are many other scenarios in which these amounts of soot could be produced by a nuclear war, and the scenarios we use are only meant to be illustrative examples.  The last column is the case with the fewest number of deaths, and other cases are available in the Supplementary Information

        </p>
        <div className="px-10">

        <Table table={
{
  data: [
    [ '16 Tg', '250', '15 kt', '52,000,000', '926,000,000' ],
    [ '27 Tg', '250', '50 kt', '97,000,000', '1,426,000,000' ],
    [ '37 Tg', '250', '100 kt', '127,000,000', '2,081,000,000' ],
    [ '47 Tg', '500', '100 kt', '164,000,000', '2,512,000,000' ],
    [ '150 Tg', '4400', '100 kt', '360,000,000', '5,341,000,000' ],
    [ '150 Tg', '4400', '100 kt', '360,000,000', '5,081,000,000' ]
  ],
  description: 'Number of weapons on urban targets, yields, direct fatalities from the bomb blasts, and resulting number of people in danger of death due to famine for the different scenarios we studied.  The 5 Tg case scenario is from reference 16 for an India-Pakistan war taking place in 2008; the 16-47 Tg cases are from reference 18 for an India-Pakistan war taking place in 2025; and the 150 Tg case is from reference 52, which assumes attacks on France, Germany, Japan, U.K., U.S., Russia, and China.  The last column is the number of people who would starve by the end of Year 2 when the rest of the population is provided with the minimum amount of food needed to survive, assumed to be a calorie intake of 1911 kcal/capita/day, and for no international trade, from Supplemental Information, Table S5, the Partial Livestock case, in which 50% of livestock grain feed used for human consumption, and 50% of livestock grain feed used to raise livestock, using the latest complete data available, for the year 2010.  For 2010, the world population was 6,703,000,000.  There are many other scenarios in which these amounts of soot could be produced by a nuclear war, and the scenarios we use are only meant to be illustrative examples.  The last column is the case with the fewest number of deaths, and other cases are available in the Supplementary Information.',
  metrics: [
    'Soot',
    'Number of weapons',
    'Yield',
    'Number of direct fatalities',
    'Number of people without food at the end of Year 2'
  ],
  title: 'Statistics',
  unit: '',
  numberedIndex: 1,
  containsCountries: false
}} globalInfo={[]}></Table>
        </div>
      </div>
      <SearchBar />

      <div className="mb-12 px-12 pt-4 pb-8 shadow-xl shadow-shade relative bg-white mt-4 w-11/12 md:w-5/6 lg:w-4/5 rounded-xl mx-auto">
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
                <div className="hover:scale-105 bg-white w-full px-4 py-2 transition duration-300 ease-in-out cursor-pointer mt-12 mx-auto border-b-2 pb-4">
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
