import { BarChart3, CalendarDays, CarFront, ClipboardList, FileClock, LayoutDashboard, LogOut, MessageSquare, Settings, Sparkles, Users, X } from 'lucide-react';
import './Sidebar.css';

const navigation=[
 {label:'Overview',icon:LayoutDashboard,path:'/admin'},
 {label:'Inventory',icon:CarFront,path:'/admin/inventory'},
 {label:'Customers',icon:Users,path:'/admin/customers'},
 {label:'Appointments',icon:CalendarDays,path:'/admin/appointments'},
 {label:'Analytics',icon:BarChart3,path:'/admin/analytics'},
];
const management=[
 {label:'Leads / CRM',icon:MessageSquare,path:'/admin/leads'},
 {label:'Test Drives',icon:ClipboardList,path:'/admin/test-drives'},
 {label:'Sell Requests',icon:CarFront,path:'/admin/sell-requests'},
 {label:'Activity Log',icon:FileClock,path:'/admin/activity-log'},
 {label:'AI Assistant',icon:Sparkles,path:'/admin/ai-assistant'},
];

export default function Sidebar({activePath='/admin',collapsed=false,mobileOpen=false,onToggle,onClose,onNavigate,onLogout}){
 const go=(path)=>{onNavigate?.(path);onClose?.()};
 const item=(x)=><button key={x.path} className={`sidebar-nav-item ${activePath===x.path?'active':''}`} onClick={()=>go(x.path)} title={collapsed?x.label:''}><span className="sidebar-nav-icon"><x.icon size={16}/></span>{!collapsed&&<><span className="sidebar-nav-label">{x.label}</span>{activePath===x.path&&<span className="sidebar-active-dot"/>}</>}</button>;
 return <>{mobileOpen&&<div className="sidebar-mobile-overlay" onClick={onClose}/>}<aside className={`motora-sidebar ${collapsed?'sidebar-collapsed':''} ${mobileOpen?'sidebar-mobile-open':''}`}><div className="sidebar-brand"><button className="sidebar-brand-logo" onClick={()=>go('/')} title="Go to Motora Home">M</button>{!collapsed&&<div className="sidebar-brand-text"><strong>MOTORA</strong><span>ADMIN CONSOLE</span></div>}<button className="sidebar-mobile-close" onClick={onClose} aria-label="Close sidebar"><X size={17}/></button></div><nav className="sidebar-navigation"><span className="sidebar-section-label">{!collapsed&&'WORKSPACE'}</span><div className="sidebar-nav-group">{navigation.map(item)}</div><span className="sidebar-section-label management-label">{!collapsed&&'MANAGEMENT'}</span><div className="sidebar-nav-group">{management.map(item)}</div></nav><div className="sidebar-footer"><button className={`sidebar-nav-item ${activePath==='/admin/settings'?'active':''}`} onClick={()=>go('/admin/settings')}><span className="sidebar-nav-icon"><Settings size={16}/></span>{!collapsed&&<><span className="sidebar-nav-label">Settings</span>{activePath==='/admin/settings'&&<span className="sidebar-active-dot"/>}</>}</button><div className="sidebar-user"><div className="sidebar-user-avatar">JN</div>{!collapsed&&<div><strong>Admin</strong><span>Administrator</span></div>}<button className="sidebar-logout" title="Logout" onClick={onLogout}><LogOut size={14}/></button></div></div></aside></>;
}
