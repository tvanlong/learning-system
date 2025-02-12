import { getRatings } from "@/lib/actions/rating.actions";
import RatingManage from "./RatingManage";
import { ERatingStatus } from "@/types/enums";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ERatingStatus;
  };
}) => {
  const ratings = await getRatings({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status,
  });
  return <RatingManage ratings={ratings} />
};

export default page;