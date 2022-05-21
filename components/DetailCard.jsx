const DetailCard = ({ current }) => {
  const { temp_c } = current;
  return (
    <div className='container mb-auto flex h-1/3 items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
      <div className='my-auto'>
        <p className='mb-2 text-5xl font-bold text-pink-800'>
          {Math.round(temp_c)}&deg;C
        </p>
        <p className='text-4xl tracking-widest text-gray-800'>{}</p>
      </div>
    </div>
  );
};

export default DetailCard;
