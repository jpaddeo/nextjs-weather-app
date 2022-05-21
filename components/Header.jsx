const Header = () => {
  return (
    <ul className='ml-auto flex w-full font-bold'>
      <li className='text- xs border-t-1 ml-auto mr-6 cursor-pointer border-b-2 border-green-400 text-gray-800'>
        Weather
      </li>
      <li className='text- xs alert-notice mr-6 cursor-pointer border-b-2 text-gray-800 hover:border-green-400'>
        Alerts
      </li>
      <li className='text- xs mr-6 cursor-pointer border-b-2 text-gray-800 hover:border-green-400'>
        Map
      </li>
    </ul>
  );
};

export default Header;
