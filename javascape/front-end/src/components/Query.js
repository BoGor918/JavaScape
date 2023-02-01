import React, { useEffect, useState } from "react";
import axios from "./Utils/axios";
import { useDebounce } from "use-debounce";

export default function Query() {
    const [query, setQuery] = useState("");
    const [value] = useDebounce(query, 1000);
    const [data, setData] = useState([]);

    const search = async (query) => {
        const { data } = await axios.get("/querySearch?q=" + query);
        return data;
    };

    useEffect(() => {
        search(value).then((data) => {
            setData(data);
        });
    }, [value]);

    return (
        <div>
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
            {data.map((item, i) => {
                return (
                    <div>
                        <div>{i + 1}</div>
                        <div key={i}>{item.title}</div>
                        <div key={i}>{item.description}</div>
                        <div key={i} className="mb-10">{item.link}</div>
                    </div>
                )
            })}
        </div>
    );
}
