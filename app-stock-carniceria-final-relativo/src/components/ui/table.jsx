export function Table({ children }) {
  return <table className="min-w-full border">{children}</table>;
}
export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}
export function TableRow({ children }) {
  return <tr className="border-b">{children}</tr>;
}
export function TableHead({ children }) {
  return <th className="text-left p-2">{children}</th>;
}
export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
export function TableCell({ children }) {
  return <td className="p-2">{children}</td>;
}