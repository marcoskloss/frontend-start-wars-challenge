import axios from "axios";

const api = axios.create({
  baseURL: "https://swapi.dev/api/",
});

/**
 * Request
 * @param url Request url
 * @param method HTTP method, default GET
 * @param config axios config object
 * @param setIsLoading handle loading state
 * @returns {Promise<Array>}  Tuple with response and error if exists
 */
export async function doRequest({
  url,
  method = "get",
  config,
  setIsLoading = () => {},
}) {
  try {
    setIsLoading(true);
    const data = await api[method.toLowerCase()](url, config);

    return [data, null];
  } catch (error) {
    return [null, error];
  } finally {
    setIsLoading(false);
  }
}
