type ActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};

type MenuItemProps = {
  url: string;
  title: string;
  icon?: React.ReactNode;
};

type CreateUserParams = {
  clerkId: string;
  name?: string;
  username: string;
  email: string;
  avatar?: string;
};

export { ActiveLinkProps, MenuItemProps, CreateUserParams };
