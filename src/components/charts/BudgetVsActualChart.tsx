import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BudgetVsActualChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Budget vs Actual</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#093FB4" name="Budget" />
          <Bar dataKey="actual" fill="#FF4F4F" name="Actual Spend" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
