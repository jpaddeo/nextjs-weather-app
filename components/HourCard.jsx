import Image from 'next/image';

const HourCard = ({ hourData }) => {
  const { time, temp_c, temp_f, condition } = hourData;
  const { icon } = condition;
  const [pDate, pTime] = time.split(' ');

  return (
    <div className='flex flex-col items-center space-y-1 rounded-lg bg-white text-sm text-black shadow-md'>
      <span className='font-semibold'>{pTime}</span>
      <div className='relative h-6 w-6'>
        <Image src={`https://${icon}`} layout='fill' objectFit='contain' />
      </div>
      <span>{temp_c}&deg;C</span>
    </div>
  );
};

export default HourCard;
