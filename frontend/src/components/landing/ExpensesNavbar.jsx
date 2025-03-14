

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">ExpenseManage</div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a href="#" className="hover:text-gray-400">
            Dashboard
          </a>
          <a href="#" className="hover:text-gray-400">
            Expense Manage
          </a>
          <a href="#" className="hover:text-gray-400">
            Reports
          </a>
          <a href="#" className="hover:text-gray-400">
            Advices
          </a>
        </div>

        {/* Right-side Button */}
        <div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add Expense
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
