import NavLinksProfile from './NavLinksProfile';
import CompanyIconComponent from './CompanyIconComponent';

export default function SideNav() {
  return (
    <section className='flex h-full flex-col px-3 py-4 md:px-2'>
      <CompanyIconComponent />
      <div className='pb-3'>
        {/* <Search placeholder="Search anything" /> */}
      </div>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinksProfile />
      </div>
    </section>
  );
}
