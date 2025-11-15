// Deterministic mock generator (no external libs)
type Patient = { nsrrid: string; age: number; sex: "M"|"F" };
type Visit = {
  nsrrid: string; visit: "SHHS1" | "SHHS2";
  ahi: number; sbp: number; bmi: number; ess: number;
  sleepHours: number; cvd: boolean;
};

function seededRand(seed: number){ // 0..1
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function nrand(seed: number, mean: number, sd: number){ // normal-ish
  const u = seededRand(seed) || 0.5;
  const v = seededRand(seed*7+3) || 0.5;
  const z = Math.sqrt(-2*Math.log(u)) * Math.cos(2*Math.PI*v);
  return mean + sd*z;
}
function clip(x:number, lo:number, hi:number){ return Math.max(lo, Math.min(hi, x)); }

export function buildMock(seedBase = 20251110): {patients: Patient[]; visits: Visit[]} {
  const N = 50;
  const patients: Patient[] = [];
  const visits: Visit[] = [];

  for (let i=1;i<=N;i++){
    const seed = seedBase + i*13;
    const nsrrid = `shhs_${String(i).padStart(4,"0")}`;
    const age = Math.round( clip(nrand(seed, 52, 12), 22, 78) );
    const sex: "M"|"F" = seededRand(seed+5) < 0.52 ? "M" : "F";
    patients.push({ nsrrid, age, sex });

    // Correlated vitals: higher BMI/age -> higher SBP/AHI on average
    const bmi1 = clip(nrand(seed+1, 25.5, 3.8), 18.0, 38.0);
    const ahi1 = clip(nrand(seed+2, 8 + (bmi1-23)*0.9 + (age-50)*0.15, 6.5), 0, 60);
    const sbp1 = clip(nrand(seed+3, 118 + (bmi1-23)*1.8 + (age-50)*0.9, 12), 95, 180);
    const ess1 = Math.round(clip(nrand(seed+4, 7, 3), 0, 24));
    const slp1 = clip(nrand(seed+9, 6.6, 1.0), 3.5, 9.5);

    // SHHS2 slight drift (weight change, treatment/noise)
    const bmi2 = clip(bmi1 + nrand(seed+11, -0.2, 0.9), 18.0, 38.0);
    const ahi2 = clip(ahi1 + nrand(seed+12, -1.0, 3.2), 0, 60);
    const sbp2 = clip(sbp1 + nrand(seed+13, -1.5, 6.0), 95, 180);
    const ess2 = Math.round(clip(ess1 + nrand(seed+14, -0.3, 2.0), 0, 24));
    const slp2 = clip(slp1 + nrand(seed+15, 0.0, 0.6), 3.5, 9.5);

    // crude CVD assignment (for demo only): higher risk -> more likely true
    const risk = (ahi2/60)*0.35 + ((sbp2-110)/70)*0.35 + ((bmi2-22)/16)*0.2 + ((age-45)/35)*0.1;
    const cvd = seededRand(seed+21) < clip(0.03 + risk*0.6, 0.01, 0.45);

    visits.push(
      { nsrrid, visit:"SHHS1", ahi:+ahi1.toFixed(1), sbp:+sbp1.toFixed(0), bmi:+bmi1.toFixed(1), ess:ess1, sleepHours:+slp1.toFixed(1), cvd },
      { nsrrid, visit:"SHHS2", ahi:+ahi2.toFixed(1), sbp:+sbp2.toFixed(0), bmi:+bmi2.toFixed(1), ess:ess2, sleepHours:+slp2.toFixed(1), cvd }
    );
  }
  return { patients, visits };
}

// Aggregates for Results page
export function buildCohorts(data = buildMock()){
  const participants = data.patients.length;
  const pairedVisitsPct = 100.0; // by construction 2 visits each
  const cvdRate = Math.round(
    1000 * (data.patients.filter(p => data.visits.some(v=>v.nsrrid===p.nsrrid && v.cvd)).length / participants)
  ) / 10;

  // AHI histogram bins of width 5 using SHHS2
  const bins: Record<number, number> = {};
  data.visits.filter(v=>v.visit==="SHHS2").forEach(v=>{
    const b = Math.floor(v.ahi/5)*5;
    bins[b] = (bins[b]||0)+1;
  });
  const ahiHist = Object.entries(bins).sort((a,b)=>+a[0]-+b[0]).map(([bin,cnt])=>({bin:+bin, cnt}));

  // CVD rate by AHI bin (SHHS2)
  const grp: Record<number, {n:number; c:number}> = {};
  data.visits.filter(v=>v.visit==="SHHS2").forEach(v=>{
    const b = Math.floor(v.ahi/5)*5;
    if(!grp[b]) grp[b] = {n:0,c:0};
    grp[b].n += 1;
    if(v.cvd) grp[b].c += 1;
  });
  const cvdByAhi = Object.entries(grp).sort((a,b)=>+a[0]-+b[0]).map(
    ([bin,g])=>({bin:+bin, rate: +(g.c/g.n).toFixed(2)})
  );

  return { kpi: { participants, pairedVisitsPct, cvdRate }, ahiHist, cvdByAhi };
}