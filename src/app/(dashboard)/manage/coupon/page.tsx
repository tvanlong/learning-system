import { BouncedLink, StatusBadge } from "@/components/common";
import Heading from "@/components/common/Heading";
import PaginationBtn from "@/components/common/PaginationBtn";
import TableAction from "@/components/common/TableAction";
import TableActionItem from "@/components/common/TableActionItem";
import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCoupons } from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/types/enums";
import ActionDeleteCoupon from "./ActionDeleteCoupon";
import CouponManage from "./CouponManage";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    active: boolean;
  };
}) => {
  const coupons = await getCoupons({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    active: searchParams.active,
  });

  return <CouponManage coupons={coupons} />
};

export default page;