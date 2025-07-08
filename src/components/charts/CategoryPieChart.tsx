import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA64FA', '#FF6699', '#33CC99', '#FF4444'];

export default function CategoryPieChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Category-wise Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie dataKey="amount" data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
