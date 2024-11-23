import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useCount } from "../../hook/useCount";
import { useTodos } from "../../hook/useTodos";

const CHARTCOLORS = ["#a7e19b ", "#f35b8e"];

export default function CompletionRateChart() {
  const { count, isLoading: isCountLoading } = useCount();
  const { todos, isLoading: isTodosLoading } = useTodos();

  if (isCountLoading || isTodosLoading) {
    return <div>Loading....</div>;
  }

  const completed = count?.count || 0;
  const total = todos ? todos.length + completed : 0;
  const completionRate = ((completed / total) * 100).toFixed(0);

  const data = [
    { name: "Completed", value: completed },
    { name: "Remaining", value: total - completed },
  ];
  return (
    <div className="md:h-4/6 lg:h-full">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={3}
            labelLine={false}
            startAngle={90}
            endAngle={450}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHARTCOLORS[index % CHARTCOLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value} tasks`} />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-semibold text-gray-700">
            <tspan
              x="50%"
              dy="-2em"
              className="text-xs md:text-sm text-gray-500 completionRate__title">
              To-Do 완료율
            </tspan>
            <tspan x="50%" dy="1.5em" className="completionRate">
              {completionRate}%
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
