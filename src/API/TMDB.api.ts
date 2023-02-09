import { request } from "./api.config";

export type MovieTrendingList = {
    page: number;
    total_results: number;
    total_pages: number;
    results: [
        poster_path: string | null,
        adult: boolean,
        overview: string,
        release_date: string,
        genre_ids: number[],
        id: number,
        original_title: string,
        original_language: string,
        title: string,
        backdrop_path: string | null,
        popularity: number,
        vote_count: number,
        video: boolean,
        vote_average: number
    ];
    dates: [maximum: string, minimum: string];
};

const api_key = process.env.TMDB_KEY;
const api_adress = "https://api.themoviedb.org/3";
const language = "pt-BR";

async function getTopRated(page: string): Promise<MovieTrendingList> {

    const result = await request.get(
        `${api_adress}/movie/top_rated?api_key=${api_key}&language=${language}&page=${page}`
    );
    if (!result.data) return null;

    return result.data as MovieTrendingList;
}

const TMDB = {
    getTopRated,
};

export default TMDB;
