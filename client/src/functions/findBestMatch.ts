import { TMDB_API_KEY } from '../global';


interface IKeyword {
    id: number;
    name: string;
}
interface IGenre {
    id: number;
    name: string;
}
interface IMovies {
    keywords: IKeyword[];
    genres: IGenre[];
}

const settings = {
    numberOfKeywords: 4
}

const findBestMatch = async (ids: number[]) => {
    // const [moviesData, setMoviesData] = useState<IMovies>({ genres });
    let moviesData: IMovies = {
        genres: [],
        keywords: []
    };
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const responseKeywords = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        );
        const responseDetails = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        );
        const dataKeywords = await responseKeywords.json();
        const dataDetails = await responseDetails.json();
        console.log(dataDetails.original_title)
        moviesData.keywords.push(...dataKeywords.keywords.slice(0, settings.numberOfKeywords))
        moviesData.genres.push(...dataDetails.genres)

    }
    console.log(moviesData)

    const data = await fetch(
        `https://api.themoviedb.org/3/movie/${ids[0]}/similar?api_key=${TMDB_API_KEY}`
    )
    // const data = await fetch(
    //     `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=${moviesData.genres.join(",")}&with_keywords=${moviesData.keywords.join(",")}&with_watch_monetization_types=flatrate`
    // )
    // const response = await data.json()
    // console.log(response)
    return await data.json()
}
// const findBestMatch = async (ids: number[]) => {
//     // const [moviesData, setMoviesData] = useState<IMovies>({ genres });
//     const [moviesKeywords, setMoviesKeywords] = useState<IKeyword[]>([]);
//     const [moviesDetails, setMoviesDetails] = useState<IKeyword[]>([]);
//     for (let i = 0; i < ids.length; i++) {
//         const id = ids[i];
//         console.log(id)
//         const responseKeywords = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${TMDB_API_KEY}&external_source=imdb_id`
//         );
//         const responseDetails = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
//         );
//         const dataKeywords = await responseKeywords.json();
//         setMoviesKeywords((oldMoviesKeywords: IKeyword[]) => {
//             let newMoviesKeywords = oldMoviesKeywords;
//             newMoviesKeywords.push(...dataKeywords.keywords.slice(0, settings.numberOfKeywords));
//             return newMoviesKeywords
//         })
//         const dataDetails = await responseDetails.json();
//         setMoviesDetails((oldMoviesDetails: IKeyword[]) => {
//             let newMoviesDetails = oldMoviesDetails;
//             newMoviesDetails.push(...dataDetails.genres);
//             return newMoviesDetails
//         })
//     }
//     console.log(moviesDetails)
//     console.log(moviesKeywords)
//     return null
// }

export default findBestMatch;
