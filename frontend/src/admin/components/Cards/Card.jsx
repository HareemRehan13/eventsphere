export default function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
