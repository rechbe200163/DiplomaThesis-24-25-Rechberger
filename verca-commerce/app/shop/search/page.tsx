export default async function SearchPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className='flex flex-col items-center space-y-4'>
      <h1 className='text-2xl font-semibold'>Search Results</h1>
      <p>Search query: {query}</p>
    </div>
  );
}
