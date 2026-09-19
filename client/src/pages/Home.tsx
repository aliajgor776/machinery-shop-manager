// @ts-nocheck
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Download,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlus,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type Language = "en" | "bn";
type Section = "dashboard" | "inventory" | "sales" | "expenses" | "staff" | "reports";

type Product = {
  id: number;
  sku: string;
  name: string;
  nameBn: string;
  category: string;
  stock: number;
  threshold: number;
  cost: number;
  price: number;
  unit: string;
};

type Sale = {
  id: number;
  productId: number;
  product: string;
  qty: number;
  total: number;
  profit: number;
  staff: string;
  date: string;
};

type Expense = { id: number; category: string; note: string; amount: number; date: string };
type StaffMember = { id: number; name: string; phone: string; role: "Manager" | "Sales"; sales: number; revenue: number; active: boolean };

const initialProducts: Product[] = [
  { id: 1, sku: "HYD-2201", name: "Hydraulic Pump 22MPa", nameBn: "হাইড্রোলিক পাম্প ২২MPa", category: "Hydraulics", stock: 12, threshold: 5, cost: 18500, price: 24900, unit: "pcs" },
  { id: 2, sku: "BRG-6205", name: "Bearing 6205 ZZ", nameBn: "বিয়ারিং ৬২০৫ ZZ", category: "Bearings", stock: 4, threshold: 8, cost: 720, price: 1050, unit: "pcs" },
  { id: 3, sku: "MTR-3PH-5", name: "3-Phase Motor 5HP", nameBn: "৩-ফেজ মোটর ৫HP", category: "Motors", stock: 8, threshold: 3, cost: 42000, price: 53500, unit: "pcs" },
  { id: 4, sku: "BLT-M16-80", name: "Hex Bolt M16 × 80mm", nameBn: "হেক্স বোল্ট M16 × ৮০mm", category: "Fasteners", stock: 86, threshold: 25, cost: 68, price: 110, unit: "pcs" },
  { id: 5, sku: "VLV-2W-50", name: "Industrial Valve 2-inch", nameBn: "ইন্ডাস্ট্রিয়াল ভালভ ২-ইঞ্চি", category: "Valves", stock: 6, threshold: 4, cost: 6800, price: 8900, unit: "pcs" },
  { id: 6, sku: "BELT-B42", name: "V-Belt B42", nameBn: "ভি-বেল্ট B42", category: "Belts", stock: 3, threshold: 6, cost: 940, price: 1400, unit: "pcs" },
];

const initialSales: Sale[] = [
  { id: 101, productId: 3, product: "3-Phase Motor 5HP", qty: 1, total: 53500, profit: 11500, staff: "Rahim Uddin", date: "2026-09-20" },
  { id: 102, productId: 1, product: "Hydraulic Pump 22MPa", qty: 2, total: 49800, profit: 12800, staff: "Admin", date: "2026-09-20" },
  { id: 103, productId: 4, product: "Hex Bolt M16 × 80mm", qty: 30, total: 3300, profit: 1260, staff: "Nusrat Jahan", date: "2026-09-19" },
  { id: 104, productId: 5, product: "Industrial Valve 2-inch", qty: 2, total: 17800, profit: 4200, staff: "Rahim Uddin", date: "2026-09-18" },
  { id: 105, productId: 2, product: "Bearing 6205 ZZ", qty: 12, total: 12600, profit: 3960, staff: "Admin", date: "2026-09-17" },
];

const initialExpenses: Expense[] = [
  { id: 201, category: "Transport", note: "Supplier pickup", amount: 2450, date: "2026-09-20" },
  { id: 202, category: "Utilities", note: "Electricity bill", amount: 6800, date: "2026-09-19" },
  { id: 203, category: "Office", note: "Printing & stationery", amount: 1200, date: "2026-09-18" },
];

const initialStaff: StaffMember[] = [
  { id: 301, name: "Rahim Uddin", phone: "01711-245689", role: "Sales", sales: 26, revenue: 284600, active: true },
  { id: 302, name: "Nusrat Jahan", phone: "01819-556782", role: "Sales", sales: 18, revenue: 162300, active: true },
  { id: 303, name: "Admin", phone: "01700-000000", role: "Manager", sales: 14, revenue: 119800, active: true },
];

const money = (value: number) => `৳${Math.round(value).toLocaleString("en-IN")}`;
const dateLabel = (value: string) => new Date(`${value}T08:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const copy = {
  en: {
    dashboard: "Dashboard", inventory: "Inventory", sales: "Sales", expenses: "Expenses", staff: "Staff", reports: "Reports",
    overview: "Business overview", overviewSub: "A clear view of your machinery shop, today and every day.",
    today: "Today", thisMonth: "This month", totalSales: "Total sales", grossProfit: "Gross profit", expensesLabel: "Expenses", netProfit: "Net profit",
    comparison: "vs previous period", salesTrend: "Sales trend", recentSales: "Recent sales", lowStock: "Low stock alert", viewInventory: "View inventory",
    addProduct: "Add product", recordSale: "Record sale", addExpense: "Add expense", addStaff: "Add staff", search: "Search products...", allCategories: "All categories",
    product: "Product", sku: "SKU", category: "Category", stock: "Stock", cost: "Cost", price: "Sale price", status: "Status", action: "Action", low: "Low stock", healthy: "Healthy",
    saleHistory: "Sales history", expenseHistory: "Expense history", soldBy: "Sold by", qty: "Qty", amount: "Amount", profit: "Profit", date: "Date", delete: "Delete",
    performance: "Staff performance", staffName: "Staff member", phone: "Phone", role: "Role", revenue: "Revenue", active: "Active", inactive: "Inactive",
    dateRange: "Date range", custom: "Custom range", export: "Export Excel", reportTitle: "Performance reports", reportSub: "Compare any period with the previous period of the same length.",
    login: "Staff access", logout: "Sign out", welcome: "Good morning, Admin", demo: "Demo workspace", name: "Name", cancel: "Cancel", save: "Save", required: "Required fields are marked with *",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড", inventory: "ইনভেন্টরি", sales: "বিক্রয়", expenses: "খরচ", staff: "স্টাফ", reports: "রিপোর্ট",
    overview: "ব্যবসার সারসংক্ষেপ", overviewSub: "আজ এবং প্রতিদিন আপনার মেশিনারি দোকানের স্পষ্ট চিত্র।",
    today: "আজ", thisMonth: "এই মাস", totalSales: "মোট বিক্রয়", grossProfit: "মোট লাভ", expensesLabel: "খরচ", netProfit: "নিট লাভ",
    comparison: "আগের সময়ের তুলনায়", salesTrend: "বিক্রয়ের ধারা", recentSales: "সাম্প্রতিক বিক্রয়", lowStock: "কম স্টক সতর্কতা", viewInventory: "ইনভেন্টরি দেখুন",
    addProduct: "পণ্য যোগ করুন", recordSale: "বিক্রয় রেকর্ড", addExpense: "খরচ যোগ করুন", addStaff: "স্টাফ যোগ করুন", search: "পণ্য খুঁজুন...", allCategories: "সব ক্যাটাগরি",
    product: "পণ্য", sku: "SKU", category: "ক্যাটাগরি", stock: "স্টক", cost: "ক্রয়মূল্য", price: "বিক্রয়মূল্য", status: "স্ট্যাটাস", action: "অ্যাকশন", low: "কম স্টক", healthy: "স্বাভাবিক",
    saleHistory: "বিক্রয় ইতিহাস", expenseHistory: "খরচের ইতিহাস", soldBy: "বিক্রয় করেছেন", qty: "পরিমাণ", amount: "পরিমাণ", profit: "লাভ", date: "তারিখ", delete: "মুছুন",
    performance: "স্টাফ পারফরম্যান্স", staffName: "স্টাফের নাম", phone: "ফোন", role: "ভূমিকা", revenue: "বিক্রয়", active: "সক্রিয়", inactive: "নিষ্ক্রিয়",
    dateRange: "তারিখ বাছাই", custom: "কাস্টম রেঞ্জ", export: "এক্সেল এক্সপোর্ট", reportTitle: "পারফরম্যান্স রিপোর্ট", reportSub: "যেকোনো সময়ের সাথে সমান দৈর্ঘ্যের আগের সময় তুলনা করুন।",
    login: "স্টাফ প্রবেশ", logout: "সাইন আউট", welcome: "শুভ সকাল, অ্যাডমিন", demo: "ডেমো ওয়ার্কস্পেস", name: "নাম", cancel: "বাতিল", save: "সেভ করুন", required: "* চিহ্নিত ঘরগুলো পূরণ করুন",
  },
} as const;

type IconType = typeof LayoutDashboard;

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [section, setSection] = useState<Section>("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [sales, setSales] = useState(initialSales);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [staff, setStaff] = useState(initialStaff);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [dateRange, setDateRange] = useState<"today" | "month" | "custom">("today");
  const [modal, setModal] = useState<"product" | "sale" | "expense" | "staff" | "login" | null>(null);
  const [notice, setNotice] = useState("");
  const t = copy[lang];

  const today = "2026-09-20";
  const periodSales = useMemo(() => dateRange === "today" ? sales.filter((sale) => sale.date === today) : sales, [sales, dateRange]);
  const totalSales = periodSales.reduce((sum, sale) => sum + sale.total, 0);
  const grossProfit = periodSales.reduce((sum, sale) => sum + sale.profit, 0);
  const totalExpenses = (dateRange === "today" ? expenses.filter((expense) => expense.date === today) : expenses).reduce((sum, expense) => sum + expense.amount, 0);
  const lowStockProducts = products.filter((item) => item.stock <= item.threshold);
  const filteredProducts = products.filter((item) => {
    const matchesQuery = `${item.name} ${item.nameBn} ${item.sku}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "All" || item.category === category);
  });
  const categories = ["All", ...Array.from(new Set(products.map((item) => item.category)))];

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const exportCsv = () => {
    const rows = [
      ["Date", "Product", "Qty", "Amount", "Profit", "Sold by"],
      ...sales.map((sale) => [sale.date, sale.product, String(sale.qty), String(sale.total), String(sale.profit), sale.staff]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "machinery-shop-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify(lang === "en" ? "Report exported successfully" : "রিপোর্ট এক্সপোর্ট হয়েছে");
  };

  const navigation: { key: Section; label: string; icon: IconType }[] = [
    { key: "dashboard", label: t.dashboard, icon: LayoutDashboard },
    { key: "inventory", label: t.inventory, icon: Boxes },
    { key: "sales", label: t.sales, icon: ShoppingCart },
    { key: "expenses", label: t.expenses, icon: WalletCards },
    { key: "staff", label: t.staff, icon: Users },
    { key: "reports", label: t.reports, icon: BarChart3 },
  ];

  const handleSection = (next: Section) => {
    setSection(next);
    setMobileNav(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><Settings2 size={20} /></div>
          <div><strong>Machinery</strong><span>SHOP MANAGER</span></div>
          <button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={19} /></button>
        </div>
        <div className="workspace-pill"><span className="status-dot" />{t.demo}<ChevronDown size={14} /></div>
        <div className="nav-label">WORKSPACE</div>
        <nav className="main-nav">
          {navigation.map(({ key, label, icon: Icon }) => <button key={key} className={section === key ? "nav-item active" : "nav-item"} onClick={() => handleSection(key)}><Icon size={18} /><span>{label}</span>{key === "inventory" && lowStockProducts.length > 0 && <em>{lowStockProducts.length}</em>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="secure-card"><ShieldCheck size={17} /><div><strong>Secure workspace</strong><span>Role-based access enabled</span></div></div>
          <button className="user-card" onClick={() => setModal("login")}><div className="avatar">AD</div><div><strong>Admin</strong><span>Owner account</span></div><ChevronDown size={15} /></button>
        </div>
      </aside>
      {mobileNav && <button className="sidebar-overlay" onClick={() => setMobileNav(false)} aria-label="Close menu" />}
      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="breadcrumbs"><span>Machinery Shop</span><b>/</b><strong>{navigation.find((item) => item.key === section)?.label}</strong></div>
          <div className="topbar-actions">
            <button className="language-switch" onClick={() => setLang(lang === "en" ? "bn" : "en")}><span className={lang === "en" ? "selected" : ""}>EN</span><i /> <span className={lang === "bn" ? "selected" : ""}>বাং</span></button>
            <button className="icon-button notification" onClick={() => notify(lang === "en" ? "You have 3 low-stock alerts" : "আপনার ৩টি কম স্টক সতর্কতা আছে")} aria-label="Notifications"><Bell size={18} /><span /></button>
            <button className="top-user" onClick={() => setModal("login")}><div className="avatar small">AD</div><span>Admin</span><ChevronDown size={14} /></button>
          </div>
        </header>
        <div className="page-wrap">
          {notice && <div className="toast"><span className="toast-check">✓</span>{notice}<button onClick={() => setNotice("")}><X size={15} /></button></div>}
          {section === "dashboard" && <DashboardView t={t} lang={lang} totalSales={totalSales} grossProfit={grossProfit} totalExpenses={totalExpenses} periodSales={periodSales} lowStockProducts={lowStockProducts} sales={sales} onSection={handleSection} dateRange={dateRange} setDateRange={setDateRange} onModal={setModal} />}
          {section === "inventory" && <InventoryView t={t} lang={lang} products={filteredProducts} categories={categories} query={query} setQuery={setQuery} category={category} setCategory={setCategory} onModal={setModal} onDelete={(id) => { setProducts(products.filter((item) => item.id !== id)); notify(lang === "en" ? "Product archived" : "পণ্য আর্কাইভ করা হয়েছে"); }} />}
          {section === "sales" && <SalesView t={t} sales={sales} onModal={setModal} onDelete={(id) => { setSales(sales.filter((sale) => sale.id !== id)); notify(lang === "en" ? "Sale record removed" : "বিক্রয় রেকর্ড মুছে ফেলা হয়েছে"); }} />}
          {section === "expenses" && <ExpensesView t={t} expenses={expenses} onModal={setModal} onDelete={(id) => { setExpenses(expenses.filter((expense) => expense.id !== id)); notify(lang === "en" ? "Expense record removed" : "খরচের রেকর্ড মুছে ফেলা হয়েছে"); }} />}
          {section === "staff" && <StaffView t={t} staff={staff} onModal={setModal} onDelete={(id) => { setStaff(staff.filter((member) => member.id !== id)); notify(lang === "en" ? "Staff access revoked" : "স্টাফের অ্যাক্সেস বন্ধ করা হয়েছে"); }} />}
          {section === "reports" && <ReportsView t={t} lang={lang} sales={sales} staff={staff} dateRange={dateRange} setDateRange={setDateRange} exportCsv={exportCsv} />}
        </div>
      </main>
      {modal === "product" && <ProductModal t={t} onClose={() => setModal(null)} onSave={(product) => { setProducts([{ ...product, id: Date.now() }, ...products]); setModal(null); notify(lang === "en" ? "Product added to inventory" : "ইনভেন্টরিতে পণ্য যোগ হয়েছে"); }} />}
      {modal === "sale" && <SaleModal t={t} products={products} onClose={() => setModal(null)} onSave={(sale) => { setSales([{ ...sale, id: Date.now() }, ...sales]); setModal(null); notify(lang === "en" ? "Sale recorded and stock updated" : "বিক্রয় রেকর্ড হয়েছে এবং স্টক আপডেট হয়েছে"); }} />}
      {modal === "expense" && <ExpenseModal t={t} onClose={() => setModal(null)} onSave={(expense) => { setExpenses([{ ...expense, id: Date.now() }, ...expenses]); setModal(null); notify(lang === "en" ? "Expense added" : "খরচ যোগ হয়েছে"); }} />}
      {modal === "staff" && <StaffModal t={t} onClose={() => setModal(null)} onSave={(member) => { setStaff([{ ...member, id: Date.now(), sales: 0, revenue: 0, active: true }, ...staff]); setModal(null); notify(lang === "en" ? "Staff access created" : "স্টাফ অ্যাক্সেস তৈরি হয়েছে"); }} />}
      {modal === "login" && <LoginModal t={t} onClose={() => setModal(null)} />}
    </div>
  );
}

function PageHeading({ title, subtitle, action, onAction }: { title: string; subtitle: string; action?: string; onAction?: () => void }) {
  return <div className="page-heading"><div><h1>{title}</h1><p>{subtitle}</p></div>{action && <button className="primary-button" onClick={onAction}><Plus size={17} />{action}</button>}</div>;
}

function DashboardView({ t, lang, totalSales, grossProfit, totalExpenses, periodSales, lowStockProducts, sales, onSection, dateRange, setDateRange, onModal }: any) {
  const chart = [42, 58, 44, 66, 52, 78, 65, 84, 72, 91, 79, 96];
  const cards = [
    { label: t.totalSales, value: money(totalSales), change: "+18.6%", icon: CircleDollarSign, color: "teal", up: true },
    { label: t.grossProfit, value: money(grossProfit), change: "+12.4%", icon: TrendingUp, color: "blue", up: true },
    { label: t.expensesLabel, value: money(totalExpenses), change: "-6.2%", icon: WalletCards, color: "amber", up: false },
    { label: t.netProfit, value: money(grossProfit - totalExpenses), change: "+21.8%", icon: BarChart3, color: "violet", up: true },
  ];
  return <>
    <PageHeading title={t.overview} subtitle={t.overviewSub} />
    <div className="heading-toolbar"><div className="period-tabs"><button className={dateRange === "today" ? "active" : ""} onClick={() => setDateRange("today")}>{t.today}</button><button className={dateRange === "month" ? "active" : ""} onClick={() => setDateRange("month")}>{t.thisMonth}</button><button className={dateRange === "custom" ? "active" : ""} onClick={() => setDateRange("custom")}><CalendarDays size={14} />{t.custom}</button></div><span className="date-context">20 Sep 2026 <ChevronDown size={14} /></span></div>
    <div className="metric-grid">{cards.map((card) => <div className="metric-card" key={card.label}><div className={`metric-icon ${card.color}`}><card.icon size={19} /></div><div className="metric-copy"><span>{card.label}</span><strong>{card.value}</strong><small className={card.up ? "positive" : "negative"}>{card.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{card.change} <em>{t.comparison}</em></small></div></div>)}</div>
    <div className="dashboard-grid">
      <section className="panel trend-panel"><div className="panel-heading"><div><h2>{t.salesTrend}</h2><p>Revenue performance across the selected period</p></div><button className="ghost-button"><BarChart3 size={16} />{t.reports}</button></div><div className="chart-legend"><span><i className="legend-dot teal-dot" />Revenue</span><span><i className="legend-dot purple-dot" />Profit</span></div><div className="chart-area"><div className="chart-y"><span>৳60k</span><span>৳40k</span><span>৳20k</span><span>৳0</span></div><div className="chart-lines"><div className="grid-line" /><div className="grid-line" /><div className="grid-line" /><div className="grid-line" /><div className="bars">{chart.map((height, index) => <div className="bar-group" key={index}><div className="bar revenue-bar" style={{ height: `${height}%` }} /><div className="bar profit-bar" style={{ height: `${Math.max(height - 26, 15)}%` }} /></div>)}</div><div className="chart-x">{["Sep 01", "Sep 04", "Sep 07", "Sep 10", "Sep 13", "Sep 16", "Sep 20"].map((label) => <span key={label}>{label}</span>)}</div></div></div></section>
      <section className="panel quick-panel"><div className="panel-heading"><div><h2>Quick actions</h2><p>Keep your day moving</p></div></div><div className="quick-actions"><button onClick={() => onModal("sale")}><span className="quick-icon teal"><ShoppingCart size={18} /></span><span><strong>{t.recordSale}</strong><small>Create a new sales record</small></span><Plus size={16} /></button><button onClick={() => onModal("product")}><span className="quick-icon blue"><PackagePlus size={18} /></span><span><strong>{t.addProduct}</strong><small>Update your inventory</small></span><Plus size={16} /></button><button onClick={() => onModal("expense")}><span className="quick-icon amber"><WalletCards size={18} /></span><span><strong>{t.addExpense}</strong><small>Log business expenses</small></span><Plus size={16} /></button></div></section>
    </div>
    <div className="dashboard-grid lower-grid">
      <section className="panel"><div className="panel-heading"><div><h2>{t.recentSales}</h2><p>Latest transactions from your team</p></div><button className="text-button" onClick={() => onSection("sales")}>{t.sales} <ArrowUpRight size={14} /></button></div><div className="table-wrap"><table><thead><tr><th>{t.product}</th><th>{t.soldBy}</th><th>{t.amount}</th><th>{t.profit}</th><th>{t.date}</th></tr></thead><tbody>{sales.slice(0, 4).map((sale: Sale) => <tr key={sale.id}><td><div className="product-cell"><span className="product-thumb">{sale.product.slice(0, 2).toUpperCase()}</span><div><strong>{sale.product}</strong><small>{sale.qty} units</small></div></div></td><td>{sale.staff}</td><td><strong>{money(sale.total)}</strong></td><td><span className="profit-pill">+{money(sale.profit)}</span></td><td>{dateLabel(sale.date)}</td></tr>)}</tbody></table></div></section>
      <section className="panel low-stock-panel"><div className="panel-heading"><div><h2>{t.lowStock}</h2><p>Restock these items soon</p></div><span className="alert-count">{lowStockProducts.length}</span></div><div className="stock-list">{lowStockProducts.slice(0, 4).map((item: Product) => <div className="stock-row" key={item.id}><div className="stock-product"><span className="product-thumb warning">{item.name.slice(0, 2).toUpperCase()}</span><div><strong>{lang === "bn" ? item.nameBn : item.name}</strong><small>{item.sku}</small></div></div><div className="stock-level"><strong>{item.stock} <small>/ {item.threshold} min</small></strong><div className="stock-track"><i style={{ width: `${Math.min(item.stock / item.threshold * 100, 100)}%` }} /></div></div></div>)}{lowStockProducts.length === 0 && <div className="empty-state">All stock levels are healthy.</div>}</div><button className="outline-button full" onClick={() => onSection("inventory")}>{t.viewInventory} <ArrowUpRight size={15} /></button></section>
    </div>
  </>;
}

function InventoryView({ t, lang, products, categories, query, setQuery, category, setCategory, onModal, onDelete }: any) {
  return <><PageHeading title={t.inventory} subtitle="Track stock, pricing, and reorder points in one place." action={t.addProduct} onAction={() => onModal("product")} /><div className="panel inventory-panel"><div className="filter-row"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} /></div><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item: string) => <option value={item} key={item}>{item === "All" ? t.allCategories : item}</option>)}</select><button className="filter-button"><Settings2 size={15} /> Filters</button></div><div className="table-wrap"><table><thead><tr><th>{t.product}</th><th>{t.sku}</th><th>{t.category}</th><th>{t.stock}</th><th>{t.cost}</th><th>{t.price}</th><th>{t.status}</th><th>{t.action}</th></tr></thead><tbody>{products.map((item: Product) => <tr key={item.id}><td><div className="product-cell"><span className="product-thumb">{item.name.slice(0, 2).toUpperCase()}</span><div><strong>{lang === "bn" ? item.nameBn : item.name}</strong><small>{item.unit}</small></div></div></td><td><code>{item.sku}</code></td><td>{item.category}</td><td><strong>{item.stock}</strong> <span className="muted">{item.unit}</span></td><td>{money(item.cost)}</td><td><strong>{money(item.price)}</strong></td><td><span className={`status-pill ${item.stock <= item.threshold ? "warning" : "success"}`}>{item.stock <= item.threshold ? <AlertTriangle size={12} /> : <span className="status-dot" />}{item.stock <= item.threshold ? t.low : t.healthy}</span></td><td><button className="table-icon danger" onClick={() => onDelete(item.id)} aria-label={t.delete}><Trash2 size={15} /></button></td></tr>)}</tbody></table></div>{products.length === 0 && <div className="empty-state">No products match your search.</div>}</div></>;
}

function SalesView({ t, sales, onModal, onDelete }: any) {
  return <><PageHeading title={t.saleHistory} subtitle="Every transaction is linked to the staff member who made the sale." action={t.recordSale} onAction={() => onModal("sale")} /><div className="panel"><div className="filter-row report-filter"><div className="search-box"><Search size={17} /><input placeholder="Search sale records..." /></div><button className="outline-button"><CalendarDays size={15} /> {t.dateRange}</button><button className="outline-button"><Download size={15} /> {t.export}</button></div><div className="table-wrap"><table><thead><tr><th>{t.date}</th><th>{t.product}</th><th>{t.soldBy}</th><th>{t.qty}</th><th>{t.amount}</th><th>{t.profit}</th><th>{t.action}</th></tr></thead><tbody>{sales.map((sale: Sale) => <tr key={sale.id}><td>{dateLabel(sale.date)}</td><td><div className="product-cell"><span className="product-thumb">{sale.product.slice(0, 2).toUpperCase()}</span><strong>{sale.product}</strong></div></td><td><span className="staff-chip"><span className="mini-avatar">{sale.staff.slice(0, 2).toUpperCase()}</span>{sale.staff}</span></td><td>{sale.qty}</td><td><strong>{money(sale.total)}</strong></td><td><span className="profit-pill">+{money(sale.profit)}</span></td><td><button className="table-icon danger" onClick={() => onDelete(sale.id)} aria-label={t.delete}><Trash2 size={15} /></button></td></tr>)}</tbody></table></div></div></>;
}

function ExpensesView({ t, expenses, onModal, onDelete }: any) {
  return <><PageHeading title={t.expenseHistory} subtitle="Log operating costs to see your real daily net profit." action={t.addExpense} onAction={() => onModal("expense")} /><div className="panel"><div className="filter-row report-filter"><button className="outline-button"><CalendarDays size={15} /> {t.dateRange}</button><div className="summary-chip"><span>Total expenses</span><strong>{money(expenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0))}</strong></div></div><div className="table-wrap"><table><thead><tr><th>{t.date}</th><th>Category</th><th>Note</th><th>Added by</th><th>{t.amount}</th><th>{t.action}</th></tr></thead><tbody>{expenses.map((expense: Expense) => <tr key={expense.id}><td>{dateLabel(expense.date)}</td><td><span className="category-badge">{expense.category}</span></td><td>{expense.note}</td><td>Admin</td><td><strong>{money(expense.amount)}</strong></td><td><button className="table-icon danger" onClick={() => onDelete(expense.id)} aria-label={t.delete}><Trash2 size={15} /></button></td></tr>)}</tbody></table></div></div></>;
}

function StaffView({ t, staff, onModal, onDelete }: any) {
  return <><PageHeading title={t.performance} subtitle="Manage access and understand who is driving your sales." action={t.addStaff} onAction={() => onModal("staff")} /><div className="staff-cards">{staff.map((member: StaffMember) => <div className="staff-card" key={member.id}><div className="staff-card-head"><div className="avatar staff-avatar">{member.name.slice(0, 2).toUpperCase()}</div><div><h3>{member.name}</h3><p>{member.role} · {member.phone}</p></div><span className={`status-pill ${member.active ? "success" : "warning"}`}>{member.active ? t.active : t.inactive}</span></div><div className="staff-stats"><div><span>Sales made</span><strong>{member.sales}</strong></div><div><span>Revenue</span><strong>{money(member.revenue)}</strong></div><div><span>Avg. ticket</span><strong>{money(member.sales ? member.revenue / member.sales : 0)}</strong></div></div><div className="staff-card-actions"><button className="outline-button"><Settings2 size={14} /> Manage access</button><button className="table-icon danger" onClick={() => onDelete(member.id)} aria-label={t.delete}><Trash2 size={15} /></button></div></div>)}</div></>;
}

function ReportsView({ t, lang, sales, staff, dateRange, setDateRange, exportCsv }: any) {
  const byStaff = staff.map((member: StaffMember) => ({ ...member, current: sales.filter((sale: Sale) => sale.staff === member.name).reduce((sum: number, sale: Sale) => sum + sale.total, 0) }));
  return <><PageHeading title={t.reportTitle} subtitle={t.reportSub} action={t.export} onAction={exportCsv} /><div className="heading-toolbar report-toolbar"><div className="period-tabs"><button className={dateRange === "today" ? "active" : ""} onClick={() => setDateRange("today")}>{t.today}</button><button className={dateRange === "month" ? "active" : ""} onClick={() => setDateRange("month")}>{t.thisMonth}</button><button className={dateRange === "custom" ? "active" : ""} onClick={() => setDateRange("custom")}><CalendarDays size={14} />{t.custom}</button></div><button className="outline-button" onClick={exportCsv}><Download size={15} /> {t.export}</button></div><div className="report-grid"><div className="panel report-highlight"><span className="eyebrow">{lang === "bn" ? "নির্বাচিত সময়ের বিক্রয়" : "SELECTED PERIOD SALES"}</span><strong>{money(sales.reduce((sum: number, sale: Sale) => sum + sale.total, 0))}</strong><p><ArrowUpRight size={14} /> 18.6% vs previous period</p><div className="sparkline"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="panel report-highlight purple"><span className="eyebrow">{lang === "bn" ? "শীর্ষ বিক্রয়কর্মী" : "TOP SALES PERFORMER"}</span><strong>{byStaff.sort((a, b) => b.current - a.current)[0]?.name}</strong><p>{money(byStaff.sort((a, b) => b.current - a.current)[0]?.current || 0)} revenue generated</p><div className="leader-avatar">{byStaff.sort((a, b) => b.current - a.current)[0]?.name.slice(0, 2).toUpperCase()}</div></div></div><section className="panel"><div className="panel-heading"><div><h2>{t.performance}</h2><p>Revenue contribution by team member</p></div></div><div className="performance-list">{byStaff.map((member) => <div className="performance-row" key={member.id}><div className="staff-chip"><span className="mini-avatar">{member.name.slice(0, 2).toUpperCase()}</span><strong>{member.name}</strong></div><div className="performance-bar"><span style={{ width: `${Math.max(12, member.current / Math.max(...byStaff.map((item) => item.current || 1)) * 100)}%` }} /></div><strong>{money(member.current)}</strong><span className="positive">+{member.sales} sales</span></div>)}</div></section></>;
}

function ModalShell({ title, subtitle, children, onClose }: { title: string; subtitle: string; children: React.ReactNode; onClose: () => void }) {
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal-card"><div className="modal-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button onClick={onClose} className="modal-close" aria-label="Close"><X size={18} /></button></div>{children}</div></div>;
}

function ProductModal({ t, onClose, onSave }: any) {
  const [name, setName] = useState(""); const [sku, setSku] = useState(""); const [category, setCategory] = useState("Hydraulics"); const [stock, setStock] = useState("0"); const [cost, setCost] = useState(""); const [price, setPrice] = useState("");
  return <ModalShell title={t.addProduct} subtitle="Add product details, cost, and selling price." onClose={onClose}><form className="modal-form" onSubmit={(event) => { event.preventDefault(); if (!name || !sku || !cost || !price) return; onSave({ name, nameBn: name, sku, category, stock: Number(stock), threshold: 5, cost: Number(cost), price: Number(price), unit: "pcs" }); }}><div className="form-grid"><label>{t.product} *<input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Hydraulic Hose 1m" /></label><label>{t.sku} *<input value={sku} onChange={(event) => setSku(event.target.value)} required placeholder="HOS-1001" /></label><label>{t.category}<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Hydraulics</option><option>Bearings</option><option>Motors</option><option>Fasteners</option><option>Valves</option></select></label><label>Opening stock *<input type="number" min="0" value={stock} onChange={(event) => setStock(event.target.value)} /></label><label>{t.cost} *<input type="number" min="0" value={cost} onChange={(event) => setCost(event.target.value)} required placeholder="0" /></label><label>{t.price} *<input type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} required placeholder="0" /></label></div><div className="modal-footer"><span>{t.required}</span><button type="button" className="outline-button" onClick={onClose}>{t.cancel}</button><button className="primary-button" type="submit">{t.save}</button></div></form></ModalShell>;
}

function SaleModal({ t, products, onClose, onSave }: any) {
  const [productId, setProductId] = useState(String(products[0]?.id || "")); const [qty, setQty] = useState("1"); const [staff, setStaff] = useState("Admin"); const product = products.find((item: Product) => item.id === Number(productId)); const quantity = Number(qty); const isOver = product && quantity > product.stock;
  return <ModalShell title={t.recordSale} subtitle="Stock availability is checked before saving this record." onClose={onClose}><form className="modal-form" onSubmit={(event) => { event.preventDefault(); if (!product || isOver) return; const total = product.price * quantity; onSave({ productId: product.id, product: product.name, qty: quantity, total, profit: (product.price - product.cost) * quantity, staff, date: "2026-09-20" }); }}><label>{t.product} *<select value={productId} onChange={(event) => setProductId(event.target.value)}>{products.map((item: Product) => <option key={item.id} value={item.id}>{item.name} · {item.stock} in stock</option>)}</select></label><div className="form-grid"><label>{t.qty} *<input type="number" min="1" value={qty} onChange={(event) => setQty(event.target.value)} /></label><label>{t.soldBy} *<select value={staff} onChange={(event) => setStaff(event.target.value)}><option>Admin</option><option>Rahim Uddin</option><option>Nusrat Jahan</option></select></label></div>{isOver && <div className="form-alert"><AlertTriangle size={16} /><span>Only {product.stock} units available. Please reduce the quantity.</span></div>}<div className="sale-total"><span>Total amount <small>{quantity} × {money(product?.price || 0)}</small></span><strong>{money((product?.price || 0) * quantity)}</strong></div><div className="modal-footer"><span>{t.required}</span><button type="button" className="outline-button" onClick={onClose}>{t.cancel}</button><button className="primary-button" type="submit" disabled={Boolean(isOver || !product)}>{t.save}</button></div></form></ModalShell>;
}

function ExpenseModal({ t, onClose, onSave }: any) {
  const [category, setCategory] = useState("Transport"); const [amount, setAmount] = useState(""); const [note, setNote] = useState("");
  return <ModalShell title={t.addExpense} subtitle="Record a business cost for accurate net profit." onClose={onClose}><form className="modal-form" onSubmit={(event) => { event.preventDefault(); if (!amount) return; onSave({ category, note, amount: Number(amount), date: "2026-09-20" }); }}><div className="form-grid"><label>Category *<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Transport</option><option>Utilities</option><option>Office</option><option>Rent</option><option>Salary</option><option>Other</option></select></label><label>Amount *<input type="number" min="0" value={amount} onChange={(event) => setAmount(event.target.value)} required placeholder="0" /></label></div><label>Note<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="What was this expense for?" rows={3} /></label><div className="modal-footer"><span>{t.required}</span><button type="button" className="outline-button" onClick={onClose}>{t.cancel}</button><button className="primary-button" type="submit">{t.save}</button></div></form></ModalShell>;
}

function StaffModal({ t, onClose, onSave }: any) {
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [role, setRole] = useState<"Manager" | "Sales">("Sales");
  return <ModalShell title={t.addStaff} subtitle="Create staff access and track performance by name." onClose={onClose}><form className="modal-form" onSubmit={(event) => { event.preventDefault(); if (!name || !phone) return; onSave({ name, phone, role }); }}><div className="form-grid"><label>{t.name} *<input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Staff full name" /></label><label>{t.phone} *<input value={phone} onChange={(event) => setPhone(event.target.value)} required placeholder="01XXX-XXXXXX" /></label></div><label>{t.role}<select value={role} onChange={(event) => setRole(event.target.value as "Manager" | "Sales")}><option>Sales</option><option>Manager</option></select></label><div className="password-hint"><ShieldCheck size={16} /><span>Each staff member gets a password-protected account. Access can be revoked when they leave.</span></div><div className="modal-footer"><span>{t.required}</span><button type="button" className="outline-button" onClick={onClose}>{t.cancel}</button><button className="primary-button" type="submit">{t.save}</button></div></form></ModalShell>;
}

function LoginModal({ t, onClose }: any) {
  return <ModalShell title={t.login} subtitle="Manage your secure account session." onClose={onClose}><div className="login-panel"><div className="login-icon"><ShieldCheck size={27} /></div><h3>Admin workspace</h3><p>You are signed in as the shop owner. Staff accounts can be managed from the Staff page.</p><div className="login-account"><div className="avatar">AD</div><div><strong>Admin</strong><span>Owner · Full access</span></div><span className="status-pill success">Active</span></div></div><div className="modal-footer"><button className="outline-button" onClick={onClose}>{t.cancel}</button><button className="primary-button" onClick={onClose}><ShieldCheck size={15} /> {t.logout}</button></div></ModalShell>;
}
