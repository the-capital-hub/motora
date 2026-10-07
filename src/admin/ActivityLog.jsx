import { useEffect, useState } from 'react';
import { ClipboardList, RefreshCw, Search } from 'lucide-react';
import { adminGet } from './adminApi';
import './ActivityLog.css';

const formatDate=(v)=>v?new Date(v).toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):'—';

export default function ActivityLog(){
 const [items,setItems]=useState([]),[search,setSearch]=useState(''),[entity,setEntity]=useState(''),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const load=async()=>{try{setLoading(true);setError('');const q=new URLSearchParams({limit:'100'});if(search)q.set('search',search);if(entity)q.set('entity',entity);const data=await adminGet(`/admin/audit-logs?${q}`);setItems(data.items||[])}catch(e){setError(e.message)}finally{setLoading(false)}};
 useEffect(()=>{const t=setTimeout(load,250);return()=>clearTimeout(t)},[search,entity]);
 return <div className="p4-page"><header className="p4-header"><div><span className="p4-eyebrow">MOTORA / ADMIN / AUDIT</span><h1>Activity Log</h1><p>Review important actions performed from the admin console.</p></div><button className="p4-btn secondary" onClick={load}><RefreshCw size={15}/> Refresh</button></header>
 <section className="activity-toolbar"><div className="activity-search"><Search size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search activity"/></div><select value={entity} onChange={e=>setEntity(e.target.value)}><option value="">All modules</option><option value="Car">Inventory</option><option value="User">Customers</option><option value="AdminProfile">Admin Profile</option><option value="TestDrive">Test Drives</option><option value="SellCarRequest">Sell Requests</option><option value="Lead">Leads</option></select></section>
 {error&&<div className="activity-error">{error}</div>}
 <section className="p4-panel"><div className="activity-list">{loading?<div className="activity-empty">Loading activity…</div>:items.map(log=><article className="activity-row" key={log._id}><div className="activity-icon"><ClipboardList size={15}/></div><div className="activity-main"><strong>{log.summary}</strong><span>{log.action} · {log.entity}{log.actor?.name?` · by ${log.actor.name}`:''}</span></div><time>{formatDate(log.createdAt)}</time></article>)}{!loading&&!items.length&&<div className="activity-empty">No admin activity found.</div>}</div></section>
 </div>;
}
