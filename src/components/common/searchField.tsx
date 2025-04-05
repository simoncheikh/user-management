interface SearchFieldProps {
  onSearchChange: (searchTerm: string) => void;
}

export const SearchField = ({ onSearchChange }: SearchFieldProps) => {
  return (
    <div className="relative max-w-md w-full">
      <input
        type="text"
        placeholder="Search users..."
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};