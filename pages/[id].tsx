import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

type PS = {
  id: number;
  category: string;
  title: string;
};
type Props = {
  ps: PS;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;

  const result = await axios
    .get(`https://jsonplaceholder.org/posts/${params.id}`)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("error");
      console.log(error);
    });

  console.log(result);
  return {
    props: {
      ps: result,
    },
  };
};

const PS: NextPage<Props> = (props) => {
  return (
    <>
      <div className="mainstyle">
        <h1>ps{props.ps.id}</h1>;<h1>ps{props.ps.title}</h1>;
        <h1>ps{props.ps.category}</h1>
      </div>
    </>
  );
};

export default PS;
