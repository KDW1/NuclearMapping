import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { countries } from "@/utils/statistics";
import Link from "next/link";
import reactStringReplace from "react-string-replace";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [matchesQuery, setMatchesQuery] = useState([]);
  const [cutoff, setCutoff] = useState(10);
  const router = useRouter();

  useEffect(() => {
    console.log("Query: ", query);
    let matching = [];
    if (query.trim() != "") {
      console.log("Made it");
      for (let i = 0; i < countries.length; i++) {
        let country = countries[i][0];
        // console.log(country)
        if (matching.length >= cutoff) {
          matching.push("...");
          break;
        }
        let index = country.toLowerCase().indexOf(query.toLowerCase());
        if (index != -1) {
          let passingElement = {
            country,
            elem: [
              country.slice(0, index),
              <span key={country} className="text-main font-semibold">
                {country.slice(index, index + query.length)}
              </span>,
              country.slice(index + query.length, country.length),
            ],
          };
          matching.push(passingElement);
          console.log(passingElement);
          console.log("Country: ", country);
        }
      }
    }
    setMatchesQuery(matching);
  }, [query]);

  return (
    <div className="px-12 mb-2 py-4 shadow-xl shadow-shade relative bg-white w-min min-w-max mx-auto rounded-md mt-4  hover:-translate-y-2 ease-in-out transition duration-300">
      <form
        className="mx-auto w-min"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Country: ", query);
          setQuery("");
          router.push(
            `/country/${
              matchesQuery.length == 1 ? matchesQuery[0].country : query
            }`
          ); //Depending on how many results r up we either pass their query or the one match
        }}
      >
        <label
          className="text-center block font-medium text-xl align-baseline"
          for=""
        >
          {!loading ? (
            "Search by Country:"
          ) : (
            <div className="">
              <FontAwesomeIcon
                className="w-5 h-5 mr-2 text-red-300 my-auto animate-spin"
                icon={faSpinner}
              ></FontAwesomeIcon>
              Finding Country
            </div>
          )}
        </label>
        <input
          onChange={(e) => {
            console.log("Keycode: ", e.keyCode);
            setQuery(e.target.value);
          }}
          className="mt-2 mx-auto px-2 py-2 rounded align-baseline border-2"
          value={query}
          type="text"
        />
      </form>
      <div className="flex flex-col mt-2 space-y-2">
        {matchesQuery.map((matching, i) => (
          <button key={`button${matching.country}`}
            onClick={() => {
              setQuery("");
              router.push(`/country/${matching.country}`);
            }}
          >
            <div className="hover:bg-gray-100 rounded px-2 py-1 bg-white duration-300 transition">
              {matching.elem}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
