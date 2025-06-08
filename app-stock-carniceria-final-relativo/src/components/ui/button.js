export function Button({ children, onClick, variant }) {
  const style = variant === 'outline'
    ? 'border border-gray-500 text-gray-800 bg-white'
    : 'bg-blue-600 text-white';
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${style}`}>
      {children}
    </button>
  );
}