import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { countries } from "@/utils/statistics";
import Link from "next/link";
import reactStringReplace from "react-string-replace";

export default function SearchBar() {
  const WAIT_TIME = 500;
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [matchesQuery, setMatchesQuery] = useState([]);
  const [cutoff, setCutoff] = useState(8);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("Query: ", query);
    let matching = [];
    if (query.trim() != "") {
      console.log("Made it");
      for (let i = 0; i < countries.length; i++) {
        let country = countries[i][0];
        // console.log(country)
        let index = country.toLowerCase().indexOf(query.toLowerCase());
        if (index != -1) {
          let passingElement = {
            country,
            elem: [
              country.slice(0, index),
              <span key={country} className="text-shade font-semibold">
                {country.slice(index, index + query.length)}
              </span>,
              country.slice(index + query.length, country.length),
            ],
            index
          };
          matching.push(passingElement);
          console.log(passingElement);
          console.log("Country: ", country);
        }
      }
    }

    //Sort by where the found query actually is
    matching.sort((a, b) => a.index - b.index)
    let passingArr = []
    if(matching.length >= cutoff) {
      passingArr.push("...")
    }
    passingArr= [...matching.slice(0, cutoff), ...passingArr]
    setMatchesQuery(passingArr);
  }, [query]);

  return (
    <div className="px-12 mb-2 py-4 shadow-xl shadow-shade relative bg-white w-11/12 md:w-2/3 lg:w-1/3 mx-auto rounded-md mt-4  hover:-translate-y-2 ease-in-out transition duration-300">
      <form
        className="mx-auto w-min"
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          console.log("Country: ", query);
          setQuery("");
          setTimeout(async () => {
            await router.push(
              `/country/${
                matchesQuery.length == 1 ? matchesQuery[0].country : query
              }`
            ); //Depending on how many results r up we either pass their query or the one match
            setLoading(false);
          }, WAIT_TIME);
        }}
      >
        <label
          className="text-center block font-medium text-xl align-baseline"
          for=""
        >
          {!loading ? (
            "Search by Country:"
          ) : (
            <div>
              <FontAwesomeIcon
                className="w-5 h-5 mr-2 text-secondaryLightText my-auto animate-spin"
                icon={faSpinner}
              ></FontAwesomeIcon>
              <span className="animate-bounce">Finding Country</span>
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
      <div className="flex flex-col overflow-y-auto max-h-44 space-y-2">
        {matchesQuery.map((matching, i) => (
          <button
            className={`${i != cutoff ? "mt-2" : ""}`}
            key={`button${matching.country ?? "Default"}`}
            onClick={async () => {
              setQuery("");
              setLoading(true);
              setTimeout(async () => {
                if (matching.country) await router.push(`/country/${matching.country}`);
                setLoading(false);
              }, WAIT_TIME); //Make it seem like its loading
            }}
          >
            <div className="hover:bg-mainLight rounded px-2 py-1 bg-white duration-300 transition">
              {matching.elem ?? matching}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
