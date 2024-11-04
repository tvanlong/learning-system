enum EUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
}

enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EXPERT = 'EXPERT',
}

enum ECourseStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}
enum ECourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}
enum ELessonType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
}

enum EOrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export {
  EUserStatus,
  EUserRole,
  ECourseStatus,
  ECourseLevel,
  ELessonType,
  EOrderStatus,
};
