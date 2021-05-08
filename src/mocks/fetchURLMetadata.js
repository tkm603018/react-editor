import response from "./response.json";

// It mocks the api response of the twitter private api:
// https://caps.twitter.com/v2/cards/preview.json
// You might replace it with another service to parse the open graph metadata of a web page
export const fetchURLMetadata = async (url) => Promise.resolve(response.card);
