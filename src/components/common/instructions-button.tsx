"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen } from "lucide-react"

const instructions = [
  {
    title: "Tạo tài khoản",
    description: "Đăng ký hoặc đăng nhập tài khoản thông qua email hoặc tài khoản google.",
    image: "/account.png",
  },
  {
    title: "Khám phá khóa học",
    description: "Tìm kiếm và chọn khóa học phù hợp với sở thích và mục tiêu học tập của bạn.",
    image: "/explore.png",
  },
  {
    title: "Đăng ký khóa học",
    description: 'Chọn "Mua khóa học" để tiến hành thanh toán và chờ xác nhận từ quản trị viên để bắt đầu học. Khóa học miễn phí không cần xác nhận.',
    image: "/enroll.png",
  },
  {
    title: "Học tập",
    description: "Học qua video, bài giảng, bài tập để hoàn thành khóa học.",
    image: "/study.png",
  },
  {
    title: "Tiến độ học tập",
    description: "Theo dõi tiến độ học tập của bạn qua thanh tiến độ và số bài học đã hoàn thành.",
    image: "/progress.png",
  },
  {
    title: "Tiếp tục học",
    description: "Tiếp tục học từ bài học đã xem trước đó.",
    image: "/continue.png",
  },
  {
    title: "Mã giảm giá",
    description: "Nhập mã giảm giá để nhận ưu đãi khi mua khóa học.",
    image: "/coupon.png",
  },
  {
    title: "Hỏi đáp",
    description: "Đặt câu hỏi hoặc trả lời câu hỏi của người khác trong phần hỏi đáp.",
    image: "/loading.png",
  },
  {
    title: "Đánh giá khóa học",
    description: "Đánh giá khóa học để giúp người khác chọn khóa học phù hợp.",
    image: "/rating.png",
  },
  {
    title: "Giao diện sáng/tối",
    description: "Chuyển đổi giữa chế độ sáng và tối tùy theo sở thích của bạn.",
    image: "/mode.png",
  },
  {
    title: "Thông tin cá nhân",
    description: "Cập nhật thông tin cá nhân và mật khẩu tài khoản.",
    image: "/profile.png",
  }
]

export default function InstructionsButton() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
          <BookOpen className="h-4 w-4" />
           Hướng dẫn hệ thống
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Hướng dẫn dùng hệ thống e-learning
          </DialogTitle>
          <DialogDescription>
            Theo dõi các bước dưới đây để sử dụng hệ thống e-learning một cách hiệu quả.  
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[70vh] pr-4">
          <div className="space-y-8">
            {instructions.map((instruction, index) => (
              <section key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {index + 1}. {instruction.title}
                </h3>
                <Image
                  src={instruction.image || "/placeholder.svg"}
                  alt={`Illustration for ${instruction.title}`}
                  width={300}
                  height={200}
                  className="rounded-lg border"
                />
                <p className="text-sm text-muted-foreground">{instruction.description}</p>
              </section>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

