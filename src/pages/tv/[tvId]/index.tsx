import TvDetails from '@app/components/TvDetails';
import axios from '@app/marcoshax/axiosproxy';
import type { TvDetails as TvDetailsType } from '@server/models/Tv';
import type { GetServerSideProps, NextPage } from 'next';

interface TvPageProps {
  tv?: TvDetailsType;
}

const TvPage: NextPage<TvPageProps> = ({ tv }) => {
  return <TvDetails tv={tv} />;
};

export const getServerSideProps: GetServerSideProps<TvPageProps> = async (
  ctx
) => {
  const response = await axios.get<TvDetailsType>(
    `http://localhost:${process.env.PORT || 5055}/api/v1/tv/${ctx.query.tvId}`,
    {
      headers: ctx.req?.headers?.cookie
        ? { cookie: ctx.req.headers.cookie }
        : undefined,
    }
  );

  return {
    props: {
      tv: response.data,
    },
  };
};

export default TvPage;
