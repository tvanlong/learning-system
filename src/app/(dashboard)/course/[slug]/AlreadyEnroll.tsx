import Link from "next/link"

const AlreadyEnroll = () => {
  return (
    <div className="bg-white rounded-lg p-5 border borderDarkMode lg:sticky lg:right-0 lg:top-20">
        Bạn đã đăng ký khóa học này rồi. Vui lòng nhấn vào {""}
        <Link href='/study' className="text-primary font-bold hover:underline">
          Khu vực học tập
        </Link>
    </div>
  )
}

export default AlreadyEnroll
