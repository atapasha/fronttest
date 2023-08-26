import { NextPage } from "next";
import Link from "next/link";

import { dehydrate, QueryClient, useQuery } from "react-query";
import FormComponent from "../components/form";
type SpaceXData = {
  category: string;
  id: number;
  title: string;
};

const getSpaceXData = async () =>
  await (
    await fetch("https://jsonplaceholder.org/posts", {
      next: { revalidate: 10 },
    })
  ).json();

const Home: NextPage = () => {
  const { data, isLoading, isFetching } = useQuery("spacex", getSpaceXData);
  console.log(data);
  return (
    <>
      <h1>Posts list</h1>;
      {data?.map((e: SpaceXData) => {
        return (
          <div className="mainstyle" key={e.id}>
            <Link className="secondstyle" href={`/${e.id}`}>
              <h1 className="thirdstyle">Id:{e.id}</h1>
              <h1 className="thirdstyle">Category: {e.category}</h1>
              <h1 className="thirdstyle"> Title:{e.title}</h1>
            </Link>
            ;
          </div>
        );
      })}
      <FormComponent />
    </>
  );
};

export default Home;

export async function getSaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<SpaceXData>("spacex", getSpaceXData);

  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  };
}
