import { Routes, RouterModule }  from '@angular/router';
import {LaFinance} from "./lafinance.component";
import {AccountConst} from "./components/actconst/accountconst.component";
import {AccountConstEdit} from "./components/actconst/accountconstEdit.component";
import {AccountPosition} from "./components/actposition/accountposition.component";
import {AccountPositionEdit} from "./components/actposition/accountpositionEdit.component";
import {AccountItemQuery} from "./components/actitem/accountItem.component";
import {AccountItemEdit} from "./components/actitem/accountItemEdit.component";
import {AccountPositionView} from "./components/actposition/accountpositionView.component";
import {AccountPositionItemEdit} from "./components/actposition/accountpositionItemEdit.component";
import {CorpExpeseInvoice} from "./components/expense/expeseinvoice.component";
import {CorpExpeseInvoiceEdit} from "./components/expense/expeseinvoiceEdit.component";
import {CorpExpeseInvoiceView} from "./components/expense/expeseinvoiceView.component";
import {CorpExpeseMonthItemEdit} from "./components/expense/expeseItemEdit.component";
import {UserAccountDeposit} from "./components/deposit/depositinvoice.component";
import {UserAccountDepositView} from "./components/deposit/depositinvoiceView.component";
import {UserAccountBorrow} from "./components/borrow/borrowinvoice.component";
import {UserAccountBorrowEdit} from "./components/borrow/borrowinvoiceEdit.component";
import {UserAccountBorrowView} from "./components/borrow/borrowinvoiceView.component";
import {CorpSalaryInvoice} from "./components/salary/salaryinvoice.component";
import {CorpSalaryInvoiceEdit} from "./components/salary/salaryinvoiceEdit.component";
import {CorpSalaryInvoiceView} from "./components/salary/salaryinvoiceView.component";
import {CorpExpeseInvoiceApply} from "./components/expense/expeseinvoiceApply.component";
import {CorpExpeseInvoiceApproved} from "./components/expense/expeseinvoiceApproved.component";
import {UserAccountBorrowApply} from "./components/borrow/borrowinvoiceApply.component";
import {UserAccountBorrowApproved} from "./components/borrow/borrowinvoiceApproved.component";
import {CorpSalaryInvoiceApply} from "./components/salary/salaryinvoiceApply.component";
import {CorpSalaryInvoiceApproved} from "./components/salary/salaryinvoiceApproved.component";
import {EmployeeWorkDay} from "./components/workday/employeeWorkDay.component";
import {EmployeeMeal} from "./components/meal/employeeMeal.component";
import {ManageCostInvoice} from "./components/managecost/managecostinvoice.component";
import {ManageCostInvoiceEdit} from "./components/managecost/managecostinvoiceEdit.component";
import {ManageCostInvoiceView} from "./components/managecost/managecostinvoiceView.component";
import {ManageCostInvoiceApply} from "./components/managecost/managecostinvoiceApply.component";
import {ManageCostInvoiceApproved} from "./components/managecost/managecostinvoiceApproved.component";
import {ManageCostMonthItemEdit} from "./components/managecost/managecostItemEdit.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaFinance,
    children: [
      { path: 'accountconst', component: AccountConst },
      { path: 'accountconstedit', component: AccountConstEdit },
      { path: 'accountposition', component: AccountPosition },
      { path: 'accountpositionedit', component: AccountPositionEdit },
      { path: 'accountitem', component: AccountItemQuery },
      { path: 'accountitemedit', component: AccountItemEdit },
      { path: 'accountpositionview', component:AccountPositionView  },
      { path: 'accountpositionitemedit', component:AccountPositionItemEdit  },
      { path: 'expeseinvoice', component:CorpExpeseInvoice  },
      { path: 'expeseinvoiceedit', component:CorpExpeseInvoiceEdit  },
      { path: 'expeseinvoiceview', component:CorpExpeseInvoiceView  },
      { path: 'expeseinvoiceapply', component:CorpExpeseInvoiceApply },
      { path: 'expeseinvoiceapproved', component:CorpExpeseInvoiceApproved },
      { path: 'expesemonthitemedit', component:CorpExpeseMonthItemEdit},
      { path: 'depositinvoice', component:UserAccountDeposit  },
      { path: 'depositinvoiceview', component:UserAccountDepositView  },
      { path: 'borrowinvoice', component:UserAccountBorrow  },
      { path: 'borrowinvoiceedit', component:UserAccountBorrowEdit  },
      { path: 'borrowinvoiceview', component:UserAccountBorrowView  },
      { path: 'borrowinvoiceapply', component:UserAccountBorrowApply  },
      { path: 'borrowinvoiceapproved', component:UserAccountBorrowApproved },
      { path: 'salaryinvoice', component:CorpSalaryInvoice  },
      { path: 'salaryinvoiceedit', component:CorpSalaryInvoiceEdit  },
      { path: 'salaryinvoiceview', component:CorpSalaryInvoiceView },
      { path: 'salaryinvoiceapply', component:CorpSalaryInvoiceApply },
      { path: 'salaryinvoiceapproved', component:CorpSalaryInvoiceApproved },
      { path: 'employeeworkday', component:EmployeeWorkDay },
      { path: 'employeemeal', component:EmployeeMeal },
      { path: 'costinvoice', component:ManageCostInvoice },
      { path: 'costinvoiceedit', component:ManageCostInvoiceEdit  },
      { path: 'costinvoiceview', component:ManageCostInvoiceView  },
      { path: 'costinvoiceapply', component:ManageCostInvoiceApply },
      { path: 'costinvoiceapproved', component:ManageCostInvoiceApproved},
      { path: 'costmonthitemedit', component:ManageCostMonthItemEdit},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
