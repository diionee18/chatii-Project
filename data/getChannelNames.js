import { API_URL } from "./constants";
const getChannelNames = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    console.log(API_URL + "/channels");
    const response = await fetch(API_URL + "/channels", options);
    if (response.status !== 200) {
        console.log("Error fetching channels");
        return;
    }
    const data = await response.json();
    console.log("Response: ", data);
    return data;
};

export { getChannelNames };
