import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppService from "../../services/app.service";
import { IMovie, IMovieResponse } from "../../interfaces/movie.interface";
import { AxiosResponse } from "axios";
import { ICharacter, ICharacterResponse } from "../../interfaces/character.interface";
import { IQuote, IQuoteRespose } from "../../interfaces/quote.interface";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import './Movie.scss';
import { Link } from "react-router-dom";
import LoadingContainer from "../../components/LoadingContainer/LoadingContainer";
import LoadingFailed from "../../components/LoadingFailed/LoadingFailed";
import { Col, Row } from "react-bootstrap";
import MovieCard from "../../components/MovieCard/MovieCard";
import Quote from "../../components/Quote/Quote";

const Movie = () => {

    const routeParams = useParams();

    // Define state params
    const [quotePage, setQuotePage] = useState(1);
    const [movieId, setMovieId] = useState(routeParams.movieId);
    const [loadingError, setLoadingError] = useState(false);
    const [movie, setMovie] = useState<{
        loading: boolean,
        data: IMovie | undefined,
        characters: { [id: string]: ICharacter }
    }>({
        loading: true,
        data: undefined,
        characters: {},

    });
    const [quotes, setQuotes] = useState<{
        data: IQuote[],
        quotesTotal: number
    }>({
        data: [],
        quotesTotal: 0
    })

    // Fetch movies
    const loadMovieContents = async (movieId: string) => {

        const requests = [
            AppService.fetchMovie(movieId),
            AppService.fetchCharacters()
        ]

        // Bind character details into object map
        const getCharacterMaps = (charactersResponseData: ICharacter[]) => {
            const characterMap: { [id: string]: ICharacter } = {};
            charactersResponseData.forEach((characters: ICharacter) => {
                characterMap[characters._id] = characters
            });
            return characterMap;
        }

        // Send multiple requests to load data
        const [movie, characters] = await AppService.sendMultipleRequests(requests);
        if (!movie || !characters) {
            setLoadingError(true);
            return;
        }

        // Prepare data sets from responses
        const movieResponseData = (movie as AxiosResponse<IMovieResponse>).data.docs;
        const charactersResponseData = (characters as AxiosResponse<ICharacterResponse>).data.docs;

        // Set state
        setMovie({
            loading: false,
            data: movieResponseData.length > 0 ? movieResponseData[0] : undefined,
            characters: getCharacterMaps(charactersResponseData)
        });
    }

    // Change page
    const paginate = (pageNumber: number) => setQuotePage(pageNumber);

    useEffect(() => {
        if (!movieId) return;
        loadMovieContents(movieId);
    }, [movieId])


    useEffect(() => {
        if (!movieId) return;

        const fetchData = async () => {
            const response = await AppService.fetchMovieQuotes(movieId, quotePage);
            if (response) {
                setQuotes({
                    data: response.data.docs,
                    quotesTotal: response.data.total
                })
            } else {
                setLoadingError(true);
            }
        };
        fetchData();

    }, [quotePage]);

    return (
        <>
            {!loadingError ? (
                <div>
                    {movie.loading ? <LoadingContainer /> : (
                        <>
                            <Row>
                                <Col md={4}>
                                    {movie.data && <MovieCard movie={movie.data} className="detail" />}
                                </Col>
                                <Col md={8}>

                                    {quotes.data.length > 0 ? (
                                        <>
                                            <div className="quote-container">
                                                {quotes.data.map((quote: IQuote) => (
                                                    <Quote key={quote._id} quote={quote} character={movie.characters[quote.character]} />
                                                ))}
                                            </div>
                                            <CustomPagination
                                                totalData={quotes.quotesTotal}
                                                currentPage={quotePage}
                                                onPaginate={paginate}
                                            />
                                        </>
                                    ) : (
                                        <div className="error-message">
                                            No Quotes Found!
                                        </div>
                                    )}

                                </Col>
                            </Row>
                        </>
                    )}
                </div>
            ) : <LoadingFailed />}
        </>
    );
}

export default Movie;