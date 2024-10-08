import { countries } from "@/utils/statistics";
import { fullTables } from "@/utils/statistics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const defaultOptions = {
  elements: {
    point: {
      pointStyle: "rect",
    },
  },
  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 16,
          family: "sans-serif",
          weight: "bold",
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value) =>
          [-100, -75, -50, -25, 0, 25, 50, 75, 100].includes(value)
            ? value
            : undefined,
      },
      min: -100,
      max: 100,
    },
  },
};

function tablesOf(country) {
  let t = [];
  console.log("\n\nTables:");
  for (let i = 0; i < fullTables.length; i++) {
    let tab = fullTables[i];
    // console.log(tab.description)
    let result = {
      metrics: JSON.parse(JSON.stringify(tab.metrics)),
      title: JSON.parse(JSON.stringify(tab.title)),
      table: [],
      unit: tab.unit,
      numberedIndex: tab.numberedIndex,
      maxVal: 0,
      minVal: 0,
    };
    for (let j = 0; j < tab.data.length; j++) {
      let dat = tab.data[j];
      let mutable = JSON.parse(JSON.stringify(dat)); //Really have to avoid shallow copies as these are nested
      if (mutable[0].toLowerCase() == country.toLowerCase()) {
        //Matching nation
        // console.log("Matches: ", mutable)
        if (result.metrics[0] == "Nation" || result.metrics[0] == "Nations") {
          console.log("Parameters!!");
          result.metrics.splice(0, 1);
          mutable.splice(0, 1);
          if (result.metrics[0] == "Population") {
            result.metrics.splice(0, 1);
            mutable.splice(0, 1);
          }
        }
        console.log("Mutable: " + mutable);
        let max = Math.max(...mutable);
        let min = Math.min(...mutable);
        result.maxVal = max;
        result.minVal = min;
        result.table = mutable;
        // console.log("Table:");
        // console.log(result);
        // console.log("\n\n")
        t.push(result);
      }
    }
  }
  return t;
}

export const getServerSideProps = async (context) => {
  let { country } = context.query;
  console.log(`Country: ${country}`);
  country = country.replace(/\s+/gm, " ");
  console.log(`Country Trimmed: ${country}`);
  if (country.toLowerCase() == "Taiwan".toLowerCase()) {
    country = "Taiwan, province of China";
  } else if (country.toLowerCase() == "Russian Federation".toLowerCase()) {
    country = "Russia";
  } else if (country.toLowerCase() == "Republic of Korea".toLowerCase()) {
    country = "South Korea";
  } else if (country.toLowerCase() == "Dem. Rep. Korea".toLowerCase()) {
    country = "North Korea";
  } else if (country.toLowerCase() == "Brunei Darussalam".toLowerCase()) {
    country = "Brunei";
  } else if (country.toLowerCase() == "The Gambia".toLowerCase()) {
    country = "Gambia";
  } else if (country.toLowerCase() == "Lao PDR".toLowerCase()) {
    country = "Laos";
  } else if (country.toLowerCase() == "The United States".toLowerCase()) {
    country = "United States";
  }

  let population;
  let countryPresent = false;
  countries.forEach((data) => {
    let countryName = data[0];
    if (countryName.toLowerCase() == country.toLowerCase()) {
      // console.log(data[1])
      population = data[1];
      console.log("Country present!");
      country = data[0];
      countryPresent = true;
      return;
    }
  });
  if (countryPresent) {
    // updateInfo();
    let tablesFound = tablesOf(country);
    // console.log("Tables Found: ", tablesFound);
    return { props: { population, country, tables: tablesFound } };
  } else {
    return { props: { country } };
  }
};

export default function Page({ population, country, tables }) {
  const tableData = [];
  // useEffect(() => {
  //     console.log("Tables: ", tables)
  if (tables) {
    for (let i = 0; i < tables.length; i++) {
      let table = tables[i];
      let copiedData = [...table.table];
      let unit = table.unit;
      let options = JSON.parse(JSON.stringify(defaultOptions)); //Avoid errors altering ref obj
      // console.log("Unit: ", unit)
      if (table.unit == "million people") {
        copiedData = copiedData.map((data) => {
          return (data / population) * 100;
        });
        unit = "% of population";
        options.scales.y.min = 0; //There can't be negative % of pop.
        // console.log(`Table${i} Data`, table.table)
      } else {
        console.log(`Min: ${table.minVal}, Max: ${table.maxVal}`);
        if (table.minVal < options.scales.y.min)
          options.scales.y.min = Math.round(table.minVal / 100) * 100 - 50;
        if (table.maxVal > options.scales.y.max)
          options.scales.y.max = Math.round(table.maxVal / 100) * 100 + 50;
      }

      let obj = {
        labels: table.metrics,
        datasets: [
          {
            label: unit,
            data: copiedData,
            borderWidth: 1,
            borderColor: "#f55142",
            backgroundColor: "#f5f242",
            color: "#73342e",
          },
        ],
      };
      tableData.push({ data: obj, options });
    }
  }
  // }, [])

  return (
    <>
      <div className="flex space-x-4 mx-auto w-min min-w-max">
        <Link className="mx-auto w-min mt-4 min-w-max" href="/">
          <FontAwesomeIcon
            className="p-3 cursor-pointer hover:-rotate-12 hover:-translate-x-2 hover:-translate-y-1 transition duration-300 bg-white rounded-xl"
            icon={faHome}
          ></FontAwesomeIcon>
        </Link>
        <Link className="mx-auto w-min mt-4 min-w-max" href={`/worldMap`}>
          <FontAwesomeIcon
            className="p-3 cursor-pointer hover:-rotate-12 hover:-translate-x-2 hover:-translate-y-1 transition duration-300 bg-white rounded-xl"
            icon={faGlobe}
          ></FontAwesomeIcon>
        </Link>
      </div>
      <p className="block sm:hidden text-center text-lg mt-4 font-semibold w-3/4 mx-auto relative text-noBgColor">
        <strong>*</strong> Best quality can be seen on bigger screens....
      </p>
      <SearchBar />
      {tables ? (
        <>
          <div className="mb-4 shadow-xl shadow-shade relative mx-auto px-8 py-4 w-5/6 sm:w-1/2 bg-white rounded-xl">
            <p className="text-3xl font-semibold text-center">{country}</p>
            {population != "Not provided" ? (
              <p className="text-base text-center">
                {population >= 1000 ? (
                  <> <span className="font-semibold text-lg text-shade">
                    {(population/1000).toString().substring(0,5)}</span> billion people</>
                ) : (
                  <> <span className="font-semibold text-lg text-shade">
                    {population}</span> million people</>
                )}
              </p>
            ) : (
              <p className="text-base text-center">
                <span className="font-bold">*</span>Not provided
              </p>
            )}
            <p className="mt-2 text-base text-center">
              <strong>*</strong>You can click on a table name to see all other
              tables like it
            </p>
          </div>
          {tables.map((data, i) => (
            <>
              <Link
                key={`table${data.numberedIndex}`}
                href={`../worldTable/${data.numberedIndex}`}
              >
                <div className="cursor-pointer mb-6 shadow-xl shadow-shade relative mx-auto px-8 py-4 w-5/6 sm:w-1/2 bg-white rounded-xl hover:scale-105 transition-all duration-300">
                  <p className="text-3xl font-semibold text-start line-clamp-2 w-3/4">
                    {data.title}
                  </p>
                  <p className="text-xl mt-2 text-start mb-2">
                    Table {data.numberedIndex}
                  </p>
                  <Line
                    options={tableData[i].options}
                    data={tableData[i].data}
                  />
                </div>
              </Link>
            </>
            // <!-- <pre><%= JSON.stringify(locals.tables, undefined, 2) %></pre> -->
          ))}
        </>
      ) : (
        <p className="text-center text-3xl mt-4 font-bold relative text-noBgColor">
          Sorry, the country {`${country}`} {"isn't"} listed...
        </p>
      )}
    </>
  );
}
