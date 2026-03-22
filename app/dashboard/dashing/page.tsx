"use client";
import { useState } from "react";
import React, { useEffect } from "react";

export default function Resulting() {
  const [data, setData] = useState<(string | number | null)[][]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load_data = async () => {
      const sheet_raw = await fetch("http://localhost:3000/api/sheet");
      const sheet_clean = await sheet_raw.json();
      setData(sheet_clean);
    };
    load_data();
  }, []);
  //console.log(query);

  const filtered_data = data.filter((rows, index) => {
    if (index == 0) return false;
    return rows.join(",").toLowerCase().includes(query.toLowerCase());
  });
  console.log(filtered_data);

  return (
    <div className="pt-20">
      <input
        type="text"
        value={query}
        placeholder="Saba Uy"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </div>
  );
}
