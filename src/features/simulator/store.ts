import { create } from 'zustand';
import type { SimInput, SimOutput } from './types';
import { computeRisk } from './risk';
import { getFactsByNsrrid } from '@/ontology/demo';
import { getStaticRecommendations } from '@/features/simulator/staticRecommendations';

const defaultInput: SimInput = {
  bmi: 24.5,
  weightDeltaKg: 2,
  ahi: 10,
  sbp: 130,
  ageGroup: '40',
  sleepHours: 6,
};

// Maps ontology facts to simulator input state
function mapFactsToInput(facts: any, currentInput: SimInput): SimInput {
  const age = facts.age;
  let ageGroup: SimInput['ageGroup'] = '40';
  if (age < 30) ageGroup = "20";
  else if (age < 40) ageGroup = "30";
  else if (age < 50) ageGroup = "40";
  else if (age < 60) ageGroup = "50";
  else if (age < 70) ageGroup = "60";
  else ageGroup = "70";
  
  return {
    ...currentInput,
    bmi: facts.bmi,
    ahi: facts.ahi,
    sbp: facts.sbp,
    sleepHours: facts.sleepHours,
    ageGroup: ageGroup,
  };
}

interface SimulatorState {
  input: SimInput;
  output: SimOutput & { facts?: any } | null;
  isLoading: boolean;
  error: string | null;
  selectedNsrrid: string | null;
  setInput: (field: keyof SimInput, value: any) => void;
  selectNsrrid: (nsrrid: string | null) => Promise<void>;
  runSimulation: () => Promise<void>;
  reset: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  input: defaultInput,
  output: null,
  isLoading: false,
  error: null,
  selectedNsrrid: null,
  setInput: (field, value) => {
    set((state) => ({ input: { ...state.input, [field]: value } }));
  },
  selectNsrrid: async (nsrrid) => {
    if (!nsrrid) {
      set({ selectedNsrrid: null });
      return;
    }
    set({ selectedNsrrid: nsrrid, isLoading: true });
    const facts = await getFactsByNsrrid(nsrrid);
    if (facts) {
      const currentInput = get().input;
      const hydratedInput = mapFactsToInput(facts, currentInput);
      set({ input: hydratedInput });
    }
    set({ isLoading: false });
  },
  runSimulation: async () => {
    set({ isLoading: true, error: null, output: null });
    const input = get().input;
    const nsrrid = get().selectedNsrrid;
    try {
      const facts = nsrrid ? await getFactsByNsrrid(nsrrid) : null;
      const riskResult = computeRisk(input);
      
      // Use static script instead of external API call
      const recs = getStaticRecommendations(input, facts);
      
      set({
        output: { ...riskResult, recs, facts },
        isLoading: false,
      });
    } catch (e) {
      console.error(e);
      set({ isLoading: false, error: "An unexpected error occurred during simulation." });
    }
  },
  reset: () => {
    set({ input: defaultInput, output: null, error: null, selectedNsrrid: null });
  },
}));