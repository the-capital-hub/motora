import { useEffect, useState } from 'react';
import { CheckCircle2, RefreshCw, Save, Shield } from 'lucide-react';
import { adminGet, adminPatch } from './adminApi';
import './Settings.css';

export default function Settings(){
 const [form,setForm]=useState({name:'',phone:'',email:''}),[loading,setLoading]=useState(true),[saving,setSaving]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');
 const load=async()=>{try{setLoading(true);setError('');setMessage('');const data=await adminGet('/admin/profile');setForm({name:data.name||'',phone:data.phone||'',email:data.email||''})}catch(e){setError(e.message)}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const save=async(e)=>{e.preventDefault();try{setSaving(true);setError('');setMessage('');const data=await adminPatch('/admin/profile',{name:form.name,phone:form.phone});setForm(p=>({...p,name:data.name||'',phone:data.phone||'',email:data.email||p.email}));setMessage('Admin profile updated successfully.')}catch(e){setError(e.message)}finally{setSaving(false)}};
 return <div className="p4-page"><header className="p4-header"><div><span className="p4-eyebrow">MOTORA / ADMIN / SETTINGS</span><h1>Settings</h1><p>Manage the profile used for admin activity and audit records.</p></div><button className="p4-btn secondary" onClick={load}><RefreshCw size={15}/> Refresh</button></header>
 <section className="settings-grid"><article className="p4-panel settings-card"><div className="settings-title"><Shield size={18}/><div><span>ADMIN PROFILE</span><h2>Account information</h2></div></div>{loading?<div className="settings-loading">Loading profile…</div>:<form onSubmit={save}><label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label><label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><label>Email<input value={form.email} readOnly/></label>{error&&<div className="settings-error">{error}</div>}{message&&<div className="settings-success"><CheckCircle2 size={15}/>{message}</div>}<button className="p4-btn primary" disabled={saving}><Save size={15}/>{saving?'Saving…':'Save profile'}</button></form>}</article></section>
 </div>;
}
