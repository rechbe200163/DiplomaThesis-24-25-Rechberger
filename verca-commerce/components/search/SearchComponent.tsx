'use client';

import { PiMagnifyingGlass } from 'react-icons/pi';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from '../ui/input';

export default function SearchComponent({
  placeholder,
}: {
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Reset the path to '/shop/search'
    const newPath = '/shop/search';

    replace(`${newPath}?${params.toString()}`);
  }

  return (
    <div className='relative flex flex-1 flex-shrink-0 max-w-xs'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <Input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <PiMagnifyingGlass className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500' />
    </div>
  );
}
