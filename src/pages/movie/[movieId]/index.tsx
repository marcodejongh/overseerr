import MovieDetails from '@app/components/MovieDetails';
import axios from '@app/marcoshax/axiosproxy';
import type { MovieDetails as MovieDetailsType } from '@server/models/Movie';
import type { GetServerSideProps, NextPage } from 'next';

interface MoviePageProps {
  movie?: MovieDetailsType;
}

const MoviePage: NextPage<MoviePageProps> = ({ movie }) => {
  return <MovieDetails movie={movie} />;
};

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async (
  ctx
) => {
  const response = await axios.get<MovieDetailsType>(
    `http://localhost:${process.env.PORT || 5055}/api/v1/movie/${
      ctx.query.movieId
    }`,
    {
      headers: ctx.req?.headers?.cookie
        ? { cookie: ctx.req.headers.cookie }
        : undefined,
    }
  );

  return {
    props: {
      movie: response.data,
    },
  };
};

export default MoviePage;
