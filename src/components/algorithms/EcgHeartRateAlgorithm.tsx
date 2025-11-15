import { ResultCard } from "@/components/ResultCard";
import { HeartPulse } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const hrData = Array.from({ length: 61 }, (_, i) => ({
  time: `${i}s`,
  'Predicted HR': 70 + Math.sin(i / 5) * 5 + (Math.random() - 0.5) * 2,
  'Ground Truth HR': 72 + Math.sin(i / 5 + 0.5) * 4,
}));

const f1Data = [
  { name: 'Step 1', 'F1 Score': 0.85 },
  { name: 'Step 2', 'F1 Score': 0.88 },
  { name: 'Step 3', 'F1 Score': 0.87 },
  { name: 'Step 4', 'F1 Score': 0.91 },
  { name: 'Step 5', 'F1 Score': 0.89 },
];

export const EcgHeartRateAlgorithm = () => {
  return (
    <ResultCard title="ECG Heartbeat Detection" icon={<HeartPulse className="text-red-500" />}>
      <div className="space-y-8">
        <div>
          <h4 className="font-semibold mb-2">성능 지표</h4>
          <div className="grid grid-cols-2 gap-4 text-center p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm text-gray-500">정렬 정확도</span>
              <p className="text-2xl font-bold">99.5%</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">심박수 정확도</span>
              <p className="text-2xl font-bold">±1.2 bpm</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">예측 vs 정답 HR 추이</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hrData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTruth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Predicted HR" stroke="#8884d8" fillOpacity={1} fill="url(#colorPredicted)" />
                <Area type="monotone" dataKey="Ground Truth HR" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTruth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">단계별 F1 스코어</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={f1Data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="F1 Score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};