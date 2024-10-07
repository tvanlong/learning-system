import Sidebar from '@/components/layouts/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='wrapper grid grid-cols-[300px_minmax(0,_1fr)] h-screen'>
      <Sidebar />
      <main className='p-5'>{children}</main>
    </div>
  );
};

export default Layout;
