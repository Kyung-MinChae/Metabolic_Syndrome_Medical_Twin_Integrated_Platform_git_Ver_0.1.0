import { ResultCard } from "@/components/ResultCard";
import { Wind } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const respData = Array.from({ length: 61 }, (_, i) => ({
  time: `${i}s`,
  'Estimated Resp. Rate': 16 + Math.sin(i / 10) * 1.5 + (Math.random() - 0.5) * 0.5,
  'Actual Resp. Rate': 16.5 + Math.sin(i / 10 + 0.5) * 1.2,
}));

export const EcgRespirationAlgorithm = () => {
  return (
    <ResultCard title="Estimated Respiratory Rate (SHHS)" icon={<Wind className="text-blue-500" />}>
      <div className="space-y-4">
        <p className="text-center text-gray-600">진폭 기반이 가장 강건한 성능을 보였습니다.</p>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={respData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorEstimated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a8bbf0" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#a8bbf0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Estimated Resp. Rate" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEstimated)" />
              <Area type="monotone" dataKey="Actual Resp. Rate" stroke="#a8bbf0" fillOpacity={1} fill="url(#colorActual)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ResultCard>
  );
};