'use client';

export function RefreshButton({
  handleRefresh,
}: {
  handleRefresh: () => Promise<unknown>;
}) {
  return (
    <button
      style={{ width: '70px', height: '30px', fontSize: '14px' }}
      className='ml-2 rounded bg-blue-500  text-white'
      onClick={handleRefresh}
    >
      Refresh
    </button>
  );
}
