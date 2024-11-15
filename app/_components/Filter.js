'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className='border border-primary-800 flex'>
      <Button
        filter={'all'}
        onClick={() => handleFilter('all')}
        activeFilter={activeFilter}>
        All cabins
      </Button>
      <Button
        filter={'small'}
        onClick={() => handleFilter('small')}
        activeFilter={activeFilter}>
        1&mdash;3 guests
      </Button>
      <Button
        filter={'medium'}
        onClick={() => handleFilter('medium')}
        activeFilter={activeFilter}>
        4&mdash;7 guests
      </Button>
      <Button
        filter={'large'}
        onClick={() => handleFilter('large')}
        activeFilter={activeFilter}>
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ children, onClick, filter, activeFilter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Filter;
