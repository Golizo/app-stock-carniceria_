export function Table({ children }) {
  return <table className="w-full border mt-4">{children}</table>;
}
export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}
export function TableRow({ children }) {
  return <tr className="border-t">{children}</tr>;
}
export function TableHead({ children }) {
  return <th className="text-left p-2">{children}</th>;
}
export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
export function TableCell({ children }) {
  return <td className="p-2 border-t">{children}</td>;
}