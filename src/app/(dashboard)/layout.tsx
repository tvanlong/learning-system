import Sidebar from '@/components/layouts/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='wrapper grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen'>
      <Sidebar />
      <div></div>
      <main className='p-5'>{children}</main>
    </div>
  );
};

export default Layout;
