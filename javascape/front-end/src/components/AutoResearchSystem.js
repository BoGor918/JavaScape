import React, { useEffect, useState } from "react";
import axios from "./Utils/axios";
import { useLocation } from "react-router-dom"

export default function AutoResearchSystem() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const query = params.get("question")
    const [data, setData] = useState([]);

    const search = async (query) => {
        const { data } = await axios.get("/querySearch?q=" + query);
        return data;
    };

    useEffect(() => {
        search(query).then((data) => {
            setData(data);
        });
    }, [query]);

    return (
        <div>
            {data.map((item, i) => {
                return (
                    <div key={i}>
                        <div>{i + 1}</div>
                        <div>{item.title}</div>
                        <div>{item.description}</div>
                        <div className="mb-10">{item.link}</div>
                    </div>
                )
            })}
        </div>
    );
}
