export default function DetailCard({ Icon, title, value, Selector }) {
  return (
    <div className='flex flex-row items-center justify-between space-x-2 rounded-lg bg-white p-4 text-gray-500 shadow-md'>
      {Icon}
      <div className='flex flex-col items-center justify-center'>
        <span className='text-xs uppercase text-gray-400'>{title}</span>
        <div className='flex flex-row items-center space-x-1'>
          <span className='font-semibold text-gray-800'>{value}</span>
          {Selector}
        </div>
      </div>
    </div>
  );
}
