import Link from "next/link"

const AlreadyEnroll = () => {
  return (
    <div className="bg-white rounded-lg p-5 border borderDarkMode lg:sticky lg:right-0 lg:top-20">
        Bạn đã đăng ký khóa học này rồi. Truy cập {' '}
        <Link href='/study' className="text-primary font-bold hover:underline">
          {' '} khu vực học tập {' '}
        </Link> 
        để bắt đầu học.
    </div>
  )
}

export default AlreadyEnroll
