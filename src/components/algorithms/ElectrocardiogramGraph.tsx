import { ResultCard } from "@/components/ResultCard";
import { Heart } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock ECG data (simulating a few heartbeats)
const generateEcgData = (length: number) => {
  const data = [];
  for (let i = 0; i < length; i++) {
    let value = 0;
    const t = i / 100; // Time in seconds (assuming 100 samples/sec)

    // Simulate a QRS complex roughly every 0.8 seconds (75 bpm)
    const beatPeriod = 80;
    const beatIndex = i % beatPeriod;

    if (beatIndex >= 10 && beatIndex <= 15) { // Q wave
      value = -0.2 * Math.sin((beatIndex - 10) * Math.PI / 5);
    } else if (beatIndex >= 16 && beatIndex <= 20) { // R wave (peak)
      value = 1.5 * Math.sin((beatIndex - 16) * Math.PI / 4);
    } else if (beatIndex >= 21 && beatIndex <= 25) { // S wave
      value = -0.5 * Math.sin((beatIndex - 21) * Math.PI / 4);
    } else if (beatIndex >= 40 && beatIndex <= 50) { // T wave
      value = 0.3 * Math.sin((beatIndex - 40) * Math.PI / 10);
    }
    
    // Add some baseline noise
    value += (Math.random() - 0.5) * 0.05;

    data.push({
      time: t.toFixed(2),
      voltage: value,
    });
  }
  return data;
};

const ecgData = generateEcgData(400); // 4 seconds of data at 100 samples/sec

export const ElectrocardiogramGraph = () => {
  return (
    <ResultCard title="Electrocardiogram Graph (Raw Signal)" icon={<Heart className="text-red-500" />}>
      <div className="space-y-4">
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ecgData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEcg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[-2, 2]} hide />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="voltage" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorEcg)" 
                dot={false}
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ResultCard>
  );
};