const fs = require('fs');

const filesToFix = [
  { path: 'src/app/photographers/[id]/page.tsx', var: 'amount' },
  { path: 'src/components/dashboard/accounting/GeneralLedgerAccounting.tsx', var: 'amount' },
  { path: 'src/components/dashboard/crm/CRMLeadPipeline.tsx', var: 'val' },
  { path: 'src/components/dashboard/customer/ContactDetailsView.tsx', var: 'val' },
  { path: 'src/components/dashboard/customer/ContactDirectoryTable.tsx', var: 'val' },
  { path: 'src/components/dashboard/overview/DashboardOverviewHome.tsx', var: 'v' },
  { path: 'src/components/dashboard/products/MenuDesigner.tsx', var: 'n' },
  { path: 'src/components/dashboard/products/PackageDesigner.tsx', var: 'n' },
  { path: 'src/components/dashboard/products/ProductsList.tsx', var: 'n' },
  { path: 'src/components/dashboard/sales/DocumentGeneratorAndViewer.tsx', var: 'amount' },
  { path: 'src/components/dashboard/sales/ERPSalesOrderConsole.tsx', var: 'amt', replaceRegex: /Rs:\s*\);/g },
  { path: 'src/components/dashboard/sales/FullscreenQuotationBuilder.tsx', var: 'n' },
  { path: 'src/components/dashboard/sales/FullViewQuotationConsole.tsx', var: 'amount' },
  { path: 'src/components/dashboard/sales/SalesBillingConsole.tsx', var: 'n' },
  { path: 'src/components/dashboard/studio/AccountingView.tsx', var: 'amount' },
  { path: 'src/components/dashboard/studio/PaymentsView.tsx', var: 'amount' },
  { path: 'src/components/dashboard/venue/BookingsView.tsx', var: 'amount', replaceRegex: /Rs:\s*/g },
  { path: 'src/components/dashboard/venue/EventFinancialLedger.tsx', var: 'val' }
];

let changed = 0;
filesToFix.forEach(f => {
  if (fs.existsSync(f.path)) {
    let content = fs.readFileSync(f.path, 'utf8');
    // Replace broken syntax `Rs: ;` or `return Rs: ;` etc
    // The previous script wrote something like: return Rs: ; or just Rs: ;
    let regex = f.replaceRegex || /return Rs:\s*;/g;
    if (f.path.includes('DashboardOverviewHome')) regex = /Rs:\s*;/g;
    if (f.path.includes('Designer') || f.path.includes('ProductsList') || f.path.includes('SalesBilling') || f.path.includes('FullscreenQuotation')) regex = /Rs:\s*;/g;
    if (f.path.includes('BookingsView')) regex = /return Rs:\s*/g;
    
    let fix = `return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(${f.var});`;
    
    // Check if it's an arrow function without braces
    if (f.path.includes('DashboardOverviewHome.tsx')) fix = `'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(${f.var});`;
    if (f.path.includes('ProductsList.tsx')) fix = `'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(${f.var});`;
    if (f.path.includes('PackageDesigner.tsx') || f.path.includes('MenuDesigner.tsx') || f.path.includes('FullscreenQuotation') || f.path.includes('SalesBilling')) {
        fix = `'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(${f.var});`;
    }
    if (f.path.includes('ERPSalesOrderConsole.tsx')) {
        fix = `'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(Math.round(${f.var}));`;
    }
    
    if (regex.test(content)) {
      content = content.replace(regex, fix);
      fs.writeFileSync(f.path, content, 'utf8');
      changed++;
    } else {
      // Fallback greedy regex
      content = content.replace(/Rs:\s*;?/g, fix);
      fs.writeFileSync(f.path, content, 'utf8');
      changed++;
    }
  }
});

console.log('Fixed ' + changed + ' files.');
