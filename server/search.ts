import get from "axios"


const arrayToString = (array: any[]): string => {
  return array.join(",")
}

const searchMovies = async (key: string, category: number[], language: string[]) => {
  const response = await get(
    `https://api.themoviedb.org/3/discover/movie/?api_key=${key}&language=${language}`
  );
  return await response.data.results;
};

export default searchMovies;
