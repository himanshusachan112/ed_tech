

const Homesidebar = () => {
  return (
    <div className="fixed left-0 h-full w-[15%] z-10 bg-gray-900 text-white shadow-lg flex flex-col rounded-sm">
      <nav className="flex-1 p-4 space-y-4">
        <a href="/home" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded">
            Home
        </a>
        <a href="/dashboard/my-profile" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded">
            Profile
        </a>
        <a href="/my-playlists" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded">
          Playlists
        </a>
        <a href="/my-earnings" className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded">
          Earnings
        </a>
      </nav>
    </div>
  );
};

export default Homesidebar;
