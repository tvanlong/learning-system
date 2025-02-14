enum EUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED'
}

enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EXPERT = 'EXPERT'
}

enum ECourseStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}
enum ECourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}
enum ELessonType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT'
}

enum EOrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

enum ECouponType {
  PERCENT = 'PERCENT',
  AMOUNT = 'AMOUNT'
}

// Rating
enum ERatingStatus {
  ACTIVE = 'ACTIVE',
  UNACTIVE = 'UNACTIVE'
}

// Comment
enum ECommentStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export {
  EUserStatus,
  EUserRole,
  ECourseStatus,
  ECourseLevel,
  ELessonType,
  EOrderStatus,
  ECouponType,
  ERatingStatus,
  ECommentStatus
}
