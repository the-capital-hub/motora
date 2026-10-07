import { useEffect, useMemo, useState } from 'react';
import { BarChart3, CalendarDays, RefreshCw, TrendingUp } from 'lucide-react';
import { adminGet } from './adminApi';
import './Analytics.css';

const monthName = (year, month) => new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'short' });
const normalize = (rows = []) => new Map(rows.map((x) => [`${x._id.year}-${x._id.month}`, x.count]));

export default function Analytics() {
  const [data, setData] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = async () => { try { setError(''); setLoading(true); setData(await adminGet('/admin/analytics?months=6')); } catch(e){ setError(e.message); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const trend = useMemo(() => {
    if (!data) return [];
    const maps = { leads: normalize(data.trends.leads), testDrives: normalize(data.trends.testDrives), sellRequests: normalize(data.trends.sellRequests) };
    const keys = [...new Set([...data.trends.leads, ...data.trends.testDrives, ...data.trends.sellRequests].map((x) => `${x._id.year}-${x._id.month}`))].sort();
    return keys.map((key) => { const [year, month] = key.split('-').map(Number); return { label: `${monthName(year, month)} ${String(year).slice(-2)}`, leads: maps.leads.get(key)||0, testDrives: maps.testDrives.get(key)||0, sellRequests: maps.sellRequests.get(key)||0 }; });
  }, [data]);

  if (loading && !data) return <div className="p4-page"><div className="p4-state">Loading analytics…</div></div>;
  if (error && !data) return <div className="p4-page"><div className="p4-state"><strong>Unable to load analytics</strong><span>{error}</span><button onClick={load}>Retry</button></div></div>;
  const max = Math.max(1, ...trend.flatMap((x) => [x.leads,x.testDrives,x.sellRequests]));
  const inventoryTotal = data.inventoryByType.reduce((sum,x)=>sum+x.count,0)||1;

  return <div className="p4-page"><header className="p4-header"><div><span className="p4-eyebrow">MOTORA / BUSINESS INTELLIGENCE</span><h1>Analytics</h1><p>Live operational metrics calculated from the Motora database.</p></div><button className="p4-btn secondary" onClick={load}><RefreshCw size={15}/> Refresh</button></header>
    <section className="p4-kpis"><article className="p4-kpi"><div className="p4-kpi-top"><span>LEADS</span><BarChart3 size={17}/></div><strong>{data.totals.totalLeads}</strong></article><article className="p4-kpi"><div className="p4-kpi-top"><span>CONVERTED LEADS</span><TrendingUp size={17}/></div><strong>{data.totals.convertedLeads}</strong></article><article className="p4-kpi"><div className="p4-kpi-top"><span>CONVERSION RATE</span><TrendingUp size={17}/></div><strong>{data.conversionRate}%</strong></article><article className="p4-kpi"><div className="p4-kpi-top"><span>PERIOD</span><CalendarDays size={17}/></div><strong>{data.months} mo</strong></article></section>
    <section className="p4-grid-2"><article className="p4-panel analytics-chart"><div className="p4-panel-head"><div><span>REQUEST TREND</span><h2>Monthly activity</h2></div></div><div className="bar-chart">{trend.map((item)=><div className="bar-group" key={item.label}><div className="bars"><i style={{height:`${(item.leads/max)*100}%`}} title={`Leads ${item.leads}`}/><i style={{height:`${(item.testDrives/max)*100}%`}} title={`Test drives ${item.testDrives}`}/><i style={{height:`${(item.sellRequests/max)*100}%`}} title={`Sell requests ${item.sellRequests}`}/></div><span>{item.label}</span></div>)}</div><div className="chart-legend"><span>Leads</span><span>Test drives</span><span>Sell requests</span></div></article>
      <article className="p4-panel"><div className="p4-panel-head"><div><span>INVENTORY MIX</span><h2>By vehicle type</h2></div></div><div className="mix-list">{data.inventoryByType.map((item)=><div key={item._id}><div><span>{item._id}</span><strong>{item.count}</strong></div><div className="mix-track"><i style={{width:`${(item.count/inventoryTotal)*100}%`}}/></div></div>)}</div></article></section>
    <section className="p4-grid-2"><article className="p4-panel"><div className="p4-panel-head"><div><span>CAR STATUS</span><h2>Inventory status</h2></div></div><div className="analytics-status">{data.statusBreakdown.cars.map(x=><div key={x._id}><span>{x._id}</span><strong>{x.count}</strong></div>)}</div></article><article className="p4-panel"><div className="p4-panel-head"><div><span>LEAD STATUS</span><h2>CRM pipeline</h2></div></div><div className="analytics-status">{data.statusBreakdown.leads.map(x=><div key={x._id}><span>{x._id}</span><strong>{x.count}</strong></div>)}</div></article></section>
  </div>;
}
