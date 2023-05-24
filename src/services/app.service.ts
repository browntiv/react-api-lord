import axios, { AxiosResponse } from "axios";
import { IMovieResponse } from "../interfaces/movie.interface";
import { ICharacterResponse } from "../interfaces/character.interface";
import { IQuoteRespose } from "../interfaces/quote.interface";

const BASE_URL = "https://the-one-api.dev/v2";
const ACCESS_TOKEN = "kD8QlPtXrdvytJv98dn9";
export const QUOTES_LIMIT = 10;

const API_URLS = {
    MOVIES: "/movie",
    CHARACTERS: "/character"
}

// axios instance with authentication token
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
    }
});

// Error handler
axiosInstance.interceptors.response.use((response) => response, (error) => {
    console.log(error.message);
});

const AppService = {

    // Fetch characters list 
    fetchCharacters: (): Promise<AxiosResponse<ICharacterResponse>> => axiosInstance.get(`${BASE_URL}${API_URLS.CHARACTERS}`),

    // Fetch movie list 
    fetchMovies: (): Promise<AxiosResponse<IMovieResponse>> => axiosInstance.get<IMovieResponse>(`${BASE_URL}${API_URLS.MOVIES}`),

    // Fetch single movie 
    fetchMovie: (id: string): Promise<AxiosResponse<IMovieResponse>> => axiosInstance.get<IMovieResponse>(`${BASE_URL}${API_URLS.MOVIES}/${id}`),

    // Fetch movie quotes 
    fetchMovieQuotes: (id: string, page: number): Promise<AxiosResponse<IQuoteRespose>> => axiosInstance.get<IQuoteRespose>(`${BASE_URL}${API_URLS.MOVIES}/${id}/quote?page=${page}&limit=${QUOTES_LIMIT}`),

    // Send multiple requests
    sendMultipleRequests: (requests: unknown[]) => axios.all(requests)
}

export default AppService