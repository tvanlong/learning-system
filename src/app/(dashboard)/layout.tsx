import Header from '@/components/layouts/Header'
import Sidebar, { MenuItem } from '@/components/layouts/Sidebar'
import { menuItems } from '@/constants'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='block pb-20 lg:pb-0 lg:grid lg:grid-cols-[300px,minmax(0,1fr)]'>
        <Sidebar />
        <Header />
        <ul className='flex p-3 bgDarkMode border borderDarkMode lg:hidden fixed bottom-0 left-0 z-10 w-full justify-center gap-5 h-16'>
          {menuItems.map((item, index) => (
            <MenuItem key={index} url={item.url} title={item.title} icon={item.icon} onlyIcon></MenuItem>
          ))}
        </ul>
        <div className='hidden lg:block'></div>
        <main className='px-5 pt-5 lg:pb-5 lg:pt-20'>{children}</main>
      </div>
    </>
  )
}

export default Layout
