import Heading from "@/components/common/Heading";
import UpdateCouponForm from "./UpdateCouponForm";
import { getCouponByCode } from "@/lib/actions/coupon.actions";

const page = async ({
  searchParams,
}: {
  searchParams: {
    code: string;
  };
}) => {
  const couponDetails = await getCouponByCode({ code: searchParams.code });
  if (!couponDetails) return null;
  return (
    <div>
      <Heading className="mb-10">Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm data={couponDetails}></UpdateCouponForm>
    </div>
  );
};

export default page;