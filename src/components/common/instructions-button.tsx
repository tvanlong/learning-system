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
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, X } from "lucide-react"

const instructions = [
  {
    title: "Create an Account",
    description: "Sign up using your email or social media accounts to access all features.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Browse Courses",
    description: "Explore our wide range of courses using the search bar or category filters.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Enroll in a Course",
    description: 'Click the "Enroll" button on the course page to start learning.',
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Access Course Materials",
    description: "Navigate through video lectures, readings, and quizzes in your course dashboard.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Track Your Progress",
    description: "Monitor your advancement through the course with progress bars and completion certificates.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Participate in Discussions",
    description: "Engage with instructors and peers in course forums to enhance your learning.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Submit Assignments",
    description: "Complete and upload assignments through the designated submission portals.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Get Help",
    description: 'Use the "Help" section or contact support if you encounter any issues.',
    image: "/placeholder.svg?height=200&width=300",
  },
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
          <DialogTitle>E-Learning Website Instructions</DialogTitle>
          <DialogDescription>Follow these steps to make the most of your learning experience.</DialogDescription>
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

