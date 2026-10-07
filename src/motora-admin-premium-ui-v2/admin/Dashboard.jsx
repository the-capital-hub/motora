import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, CalendarDays, CarFront, Clock3, MessageSquare, Plus, RefreshCw, UserRound, Users } from 'lucide-react';
import { adminGet } from './adminApi';
import './Dashboard.css';

const money = (value = 0) => `₹${Number(value).toLocaleString('en-IN')}`;
const dateText = (value) => value ? new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try { setError(''); setLoading(true); setData(await adminGet('/admin/stats')); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  if (loading && !data) return <div className="p4-page"><div className="p4-state">Loading dashboard…</div></div>;
  if (error && !data) return <div className="p4-page"><div className="p4-state"><strong>Unable to load dashboard</strong><span>{error}</span><button onClick={load}>Retry</button></div></div>;

  const cards = [
    ['TOTAL CARS', data.cars, CarFront],
    ['CUSTOMERS', data.users, Users],
    ['TEST DRIVES', data.testDrives, CalendarDays],
    ['NEW LEADS', data.newLeads, MessageSquare],
  ];

  return (
    <div className="p4-page">
      <header className="p4-header">
        <div><span className="p4-eyebrow">MOTORA / ADMIN</span><h1>Dashboard</h1><p>Live overview of inventory, customers and incoming activity.</p></div>
        <div className="p4-actions"><button className="p4-btn secondary" onClick={load}><RefreshCw size={15}/> Refresh</button><a className="p4-btn primary" href="/admin/inventory"><Plus size={15}/> Add New Car</a></div>
      </header>

      <section className="p4-kpis">
        {cards.map(([label, value, Icon]) => <article className="p4-kpi" key={label}><div className="p4-kpi-top"><span>{label}</span><Icon size={17}/></div><strong>{value}</strong></article>)}
      </section>

      <section className="p4-grid-3">
        <article className="p4-panel"><div className="p4-panel-head"><div><span>INVENTORY</span><h2>Vehicle status</h2></div><CarFront size={18}/></div><div className="p4-status-list"><div><span>Available</span><strong>{data.available}</strong></div><div><span>Reserved</span><strong>{data.reserved}</strong></div><div><span>Sold</span><strong>{data.sold}</strong></div></div></article>
        <article className="p4-panel"><div className="p4-panel-head"><div><span>REQUESTS</span><h2>Needs attention</h2></div><Activity size={18}/></div><div className="p4-status-list"><div><span>Pending test drives</span><strong>{data.pendingTestDrives}</strong></div><div><span>New sell requests</span><strong>{data.newSellRequests}</strong></div><div><span>New leads</span><strong>{data.newLeads}</strong></div></div></article>
        <article className="p4-panel"><div className="p4-panel-head"><div><span>INVENTORY MIX</span><h2>Top brands</h2></div><ArrowUpRight size={18}/></div><div className="p4-brand-list">{data.inventory.brands.slice(0, 5).map((item) => <div key={item._id}><span>{item._id || 'Other'}</span><strong>{item.count}</strong></div>)}{!data.inventory.brands.length && <small>No inventory data yet.</small>}</div></article>
      </section>

      <section className="p4-grid-2">
        <article className="p4-panel"><div className="p4-panel-head"><div><span>RECENT INVENTORY</span><h2>Latest cars</h2></div><a href="/admin/inventory">View all</a></div><div className="p4-table-wrap"><table><thead><tr><th>Vehicle</th><th>Year</th><th>Price</th><th>Status</th><th>Added</th></tr></thead><tbody>{data.recent.cars.map((car) => <tr key={car._id}><td><strong>{car.brand} {car.model}</strong></td><td>{car.year}</td><td>{money(car.price)}</td><td><span className={`p4-badge ${car.status.toLowerCase()}`}>{car.status}</span></td><td>{dateText(car.createdAt)}</td></tr>)}</tbody></table></div></article>
        <article className="p4-panel"><div className="p4-panel-head"><div><span>RECENT ACTIVITY</span><h2>Latest enquiries</h2></div><a href="/admin/leads">View all</a></div><div className="p4-activity">{data.recent.leads.map((lead) => <div className="p4-activity-item" key={lead._id}><div className="p4-avatar"><UserRound size={15}/></div><div><strong>{lead.name}</strong><span>{lead.car ? `${lead.car.brand} ${lead.car.model}` : lead.type}</span></div><time><Clock3 size={12}/>{dateText(lead.createdAt)}</time></div>)}{!data.recent.leads.length && <div className="p4-empty">No leads yet.</div>}</div></article>
      </section>
    </div>
  );
}
