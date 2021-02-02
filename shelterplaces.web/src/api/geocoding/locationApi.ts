import axios from "../../axios";
import config from "../../config";

export const getLocationOptionList = async (value: string) => {
    const response = await axios(`https://api.locationiq.com/v1/autocomplete.php?key=${config.locationIq.token}&q=Empire`);
    return response.data;
};