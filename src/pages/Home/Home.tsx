import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppService from "../../services/app.service";
import { IMovie } from "../../interfaces/movie.interface";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingContainer from "../../components/LoadingContainer/LoadingContainer";
import LoadingFailed from "../../components/LoadingFailed/LoadingFailed";
import { Card, Col, Row } from "react-bootstrap";
import "./Home.scss";

const Home = () => {

    // Define state params
    const [loadingError, setLoadingError] = useState(false);
    const [movies, setMovies] = useState<{ loading: boolean, data: IMovie[] }>({
        loading: true,
        data: []
    });

    // Fetch movies
    const loadMovies = async () => {
        const response = await AppService.fetchMovies();
        if (!response) {
            setLoadingError(true);
            return;
        }
        setMovies({
            loading: false,
            data: response.data.docs
        });
    }

    useEffect(() => {
        loadMovies();
    }, [])

    return (
        <div className="home-page">
            {!loadingError ? (
                <>
                    {movies.loading ? <LoadingContainer /> : (
                        <Row xs={1} md={4} className="g-4">
                            {movies.data.map((movie: IMovie) => (
                                <Col key={movie._id} className="card-container">
                                    <Link className="link" to={`/${movie._id}`}>
                                        <MovieCard movie={movie} className="home" />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            ) : <LoadingFailed />
            }

        </div >
    );
}

export default Home;