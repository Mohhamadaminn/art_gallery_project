import client from "./client";

export async function getPastEvents() {
    const { data } = await client.get("/pastevents/");
    return data.results ?? data;
}