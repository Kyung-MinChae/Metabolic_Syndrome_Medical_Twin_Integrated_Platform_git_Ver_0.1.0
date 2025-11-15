import { buildMock, buildCohorts } from "@/demo/shhs_mock_expanded";

const CACHE:any = {};
export const DEMO = import.meta.env.VITE_DEMO_MODE === "true";

export async function getFactsByNsrrid(nsrrid: string){
  if (!CACHE.mock) CACHE.mock = buildMock();
  const { patients, visits } = CACHE.mock;
  const pv = visits.filter((v:any)=>v.nsrrid===nsrrid);
  if (!pv.length) return null;
  const latest = pv.find((v:any)=>v.visit==="SHHS2") || pv[0];
  const p = patients.find((x:any)=>x.nsrrid===nsrrid);
  return {
    nsrrid,
    ahi: latest.ahi, sbp: latest.sbp, bmi: latest.bmi,
    ess: latest.ess, sleepHours: latest.sleepHours,
    age: p?.age, cvd: !!latest.cvd
  };
}

export async function listNsrrids(){
  if (!CACHE.mock) CACHE.mock = buildMock();
  return CACHE.mock.patients.map((p:any)=>p.nsrrid);
}

export async function getCohortSummary(){
  if (!CACHE.mock) CACHE.mock = buildMock();
  if (!CACHE.cohort) CACHE.cohort = buildCohorts(CACHE.mock);
  return CACHE.cohort;
}