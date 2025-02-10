"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MovieType } from "../utils/types";

export default function MoviesPage() {
  const [fetchedData, setFetchedData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/movies");
      const { data } = await res.json();
      setFetchedData(data.results);
    };
    getData();
  }, []);
  console.log(fetchedData);
  return (
    <div className="flex flex-wrap gap-8 w-[100vw] h-[100vh] justify-center ">
      {fetchedData?.map((movie: MovieType, index: number) => {
        return (
          <div key={index}>
            <div className="rounded-lg overflow-hidden mt-10 ">
              <div>
                <Image
                  src={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path}
                  alt=""
                  className="h-[340px] w-[230px] "
                  width={500}
                  height={500}
                />
              </div>
              <div className="p-2 flex flex-col items-start w-[230px] bg-slate-300 h-[95px]">
                <h3 className="text-[14px] flex gap-1 mt-1 ">
                  <img src="/star.svg" alt="" />
                  {movie?.vote_average}/10
                </h3>
                <h2 className="text-[18px] ">{movie?.original_title}</h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
