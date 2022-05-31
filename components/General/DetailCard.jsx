export default function DetailCard({ Icon, title, value, Selector }) {
  return (
    <div className='flex flex-row items-center justify-between space-x-2 rounded-lg bg-slate-500 p-4 text-white shadow-md'>
      {Icon}
      <div className='flex flex-col items-center justify-center'>
        <span className='text-xs uppercase'>{title}</span>
        <div className='flex flex-row items-center space-x-1'>
          <span className='font-semibold'>{value}</span>
          {Selector}
        </div>
      </div>
    </div>
  );
}
