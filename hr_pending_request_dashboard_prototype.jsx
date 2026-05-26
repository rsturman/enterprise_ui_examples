import React, { useMemo, useState } from 'react';

const today = new Date('2026-05-26T09:00:00');

const employees = [
  { id: 'E-1042', name: 'Maya Chen', title: 'Senior Data Analyst', department: 'Customer Insights', tenure: '3.4 years', manager: 'Richard Sturman', location: 'Seattle', backupApprover: 'Alicia Gomez' },
  { id: 'E-1077', name: 'Jordan Patel', title: 'UX Researcher', department: 'Product Experience', tenure: '1.8 years', manager: 'Richard Sturman', location: 'Seattle', backupApprover: 'Alicia Gomez' },
  { id: 'E-1091', name: 'Samira Okafor', title: 'Program Coordinator', department: 'Operations', tenure: '4.1 years', manager: 'Richard Sturman', location: 'Remote', backupApprover: 'Alicia Gomez' },
  { id: 'E-1103', name: 'Noah Williams', title: 'IT Support Specialist', department: 'Workplace Technology', tenure: '2.2 years', manager: 'Richard Sturman', location: 'Seattle', backupApprover: 'Alicia Gomez' },
  { id: 'E-1124', name: 'Elena Garcia', title: 'Project Manager', department: 'Implementation', tenure: '5.0 years', manager: 'Richard Sturman', location: 'Tacoma', backupApprover: 'Alicia Gomez' },
  { id: 'E-1139', name: 'Priya Nair', title: 'Business Analyst', department: 'Enterprise Systems', tenure: '2.7 years', manager: 'Richard Sturman', location: 'Seattle', backupApprover: 'Alicia Gomez' },
  { id: 'E-1162', name: 'Marcus Lee', title: 'Operations Analyst', department: 'Operations', tenure: '0.9 years', manager: 'Richard Sturman', location: 'Remote', backupApprover: 'Alicia Gomez' },
  { id: 'E-1188', name: 'Richard Sturman', title: 'HR Manager', department: 'People Operations', tenure: '6.6 years', manager: 'Alicia Gomez', location: 'Seattle', backupApprover: 'Alicia Gomez' },
  { id: 'E-1210', name: 'Avery Morgan', title: 'Content Strategist', department: 'Product Experience', tenure: '1.3 years', manager: 'Richard Sturman', location: 'Seattle', backupApprover: 'Alicia Gomez' },
  { id: 'E-1237', name: 'Liam Brooks', title: 'Systems Coordinator', department: 'Enterprise Systems', tenure: '3.1 years', manager: 'Richard Sturman', location: 'Bellevue', backupApprover: 'Alicia Gomez' }
];

const employeeByName = Object.fromEntries(employees.map((e) => [e.name, e]));

const initialRequests = [
  {
    id: 'REQ-4821', employeeName: 'Maya Chen', type: 'Equipment', dateSubmitted: '2026-05-22', slaDeadline: '2026-05-24', amount: 7500, status: 'Pending', priority: 'Overdue', summary: 'High-performance workstation and dual-monitor setup for analytics modeling work.', vpName: 'Alicia Gomez', documentation: 'Vendor quote attached. Budget code CX-471.', history: [
      ['2026-04-11', 'Expense', 'Approved'], ['2026-03-04', 'PTO', 'Approved'], ['2026-01-28', 'Equipment', 'Approved']
    ], comments: ['Employee: Current machine fails during large Tableau extracts.', 'IT: Hardware request aligns with analytics workload.']
  },
  {
    id: 'REQ-4827', employeeName: 'Jordan Patel', type: 'PTO', dateSubmitted: '2026-05-23', slaDeadline: '2026-05-25', amount: null, status: 'Pending', priority: 'Overdue', summary: 'Duplicate PTO request for June 13-14. Same dates already approved in Workday.', duplicate: true, documentation: 'Potential duplicate detected by policy rule PTO-DUP-02.', history: [
      ['2026-05-20', 'PTO', 'Approved'], ['2026-04-02', 'Expense', 'Approved'], ['2026-02-14', 'PTO', 'Rejected']
    ], comments: ['System: Similar PTO request exists for same employee and date range.']
  },
  {
    id: 'REQ-4830', employeeName: 'Noah Williams', type: 'Expense', dateSubmitted: '2026-05-22', slaDeadline: '2026-05-24', amount: 680, status: 'Pending', priority: 'Overdue', summary: 'Conference registration reimbursement for endpoint security workshop.', documentation: 'Receipt attached. Budget code WT-219.', history: [
      ['2026-04-18', 'Equipment', 'Approved'], ['2026-03-19', 'Expense', 'Approved'], ['2026-02-07', 'PTO', 'Approved']
    ], comments: ['Employee: Workshop supports quarterly security operations goals.']
  },
  {
    id: 'REQ-4833', employeeName: 'Samira Okafor', type: 'Role Change', dateSubmitted: '2026-05-25', slaDeadline: '2026-05-27', amount: null, status: 'Pending', priority: 'Due Today', summary: 'Temporary lead assignment for summer onboarding coverage.', documentation: 'Business justification and team coverage plan attached.', history: [
      ['2026-04-26', 'PTO', 'Approved'], ['2026-03-30', 'Expense', 'Approved'], ['2026-01-18', 'Role Change', 'Approved']
    ], comments: ['HRBP: Confirm title and compensation impact before approval.']
  },
  {
    id: 'REQ-4838', employeeName: 'Elena Garcia', type: 'Expense', dateSubmitted: '2026-05-25', slaDeadline: '2026-05-27', amount: 1240, status: 'Pending', priority: 'Due Today', summary: 'Client-site travel expense reimbursement for implementation workshop.', documentation: 'Hotel and airfare receipts attached.', history: [
      ['2026-05-03', 'Expense', 'Approved'], ['2026-03-09', 'PTO', 'Approved'], ['2026-01-25', 'Equipment', 'Approved']
    ], comments: ['Employee: Travel was approved by project sponsor.']
  },
  {
    id: 'REQ-4840', employeeName: 'Priya Nair', type: 'Equipment', dateSubmitted: '2026-05-26', slaDeadline: '2026-05-28', amount: 890, status: 'Pending', priority: 'Due This Week', summary: 'Docking station, keyboard, and monitor for hybrid work setup.', documentation: 'Standard equipment bundle requested.', history: [
      ['2026-04-15', 'PTO', 'Approved'], ['2026-03-07', 'Expense', 'Approved'], ['2026-02-11', 'Equipment', 'Rejected']
    ], comments: ['Employee: Current shared monitor setup creates scheduling conflicts.']
  },
  {
    id: 'REQ-4845', employeeName: 'Marcus Lee', type: 'PTO', dateSubmitted: '2026-05-26', slaDeadline: '2026-05-28', amount: null, status: 'Pending', priority: 'Due This Week', summary: 'PTO request for family event June 6.', documentation: 'Team coverage entered in staffing plan.', history: [
      ['2026-03-31', 'PTO', 'Approved'], ['2026-02-18', 'Expense', 'Rejected'], ['2026-01-12', 'PTO', 'Approved']
    ], comments: ['Employee: Shift coverage confirmed with Elena.']
  },
  {
    id: 'REQ-4848', employeeName: 'Richard Sturman', type: 'Expense', dateSubmitted: '2026-05-26', slaDeadline: '2026-05-28', amount: 310, status: 'Pending', priority: 'Due This Week', summary: 'Professional membership reimbursement submitted by current manager.', documentation: 'Self-submitted request requires alternate approval.', history: [
      ['2026-04-22', 'Expense', 'Approved'], ['2026-03-12', 'PTO', 'Approved'], ['2026-02-16', 'Equipment', 'Approved']
    ], comments: ['System: Request submitter matches logged-in approver.']
  },
  { id: 'REQ-4811', employeeName: 'Avery Morgan', type: 'PTO', dateSubmitted: '2026-05-19', slaDeadline: '2026-05-21', amount: null, status: 'Approved', priority: 'Completed', summary: 'PTO request approved earlier this week.', documentation: 'Coverage confirmed.', history: [], comments: [] },
  { id: 'REQ-4816', employeeName: 'Liam Brooks', type: 'Equipment', dateSubmitted: '2026-05-20', slaDeadline: '2026-05-22', amount: 420, status: 'Approved', priority: 'Completed', summary: 'Replacement headset and webcam.', documentation: 'Standard bundle.', history: [], comments: [] },
  { id: 'REQ-4818', employeeName: 'Maya Chen', type: 'Expense', dateSubmitted: '2026-05-21', slaDeadline: '2026-05-23', amount: 175, status: 'Approved', priority: 'Completed', summary: 'Data conference virtual pass.', documentation: 'Receipt attached.', history: [], comments: [] },
  { id: 'REQ-4820', employeeName: 'Elena Garcia', type: 'Role Change', dateSubmitted: '2026-05-21', slaDeadline: '2026-05-23', amount: null, status: 'Approved', priority: 'Completed', summary: 'Temporary project lead designation.', documentation: 'Sponsor approval attached.', history: [], comments: [] },
  { id: 'REQ-4807', employeeName: 'Jordan Patel', type: 'PTO', dateSubmitted: '2026-05-18', slaDeadline: '2026-05-20', amount: null, status: 'Rejected', priority: 'Completed', summary: 'PTO request rejected because it duplicated an existing approved request.', documentation: 'Duplicate identified.', history: [], comments: [] }
];

function daysBetween(dateString) {
  const date = new Date(`${dateString}T09:00:00`);
  return Math.ceil((today - date) / (1000 * 60 * 60 * 24));
}

function slaStatus(request) {
  if (request.status !== 'Pending') return 'Completed';
  const deadline = new Date(`${request.slaDeadline}T17:00:00`);
  const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  if (deadline < today) return 'Overdue';
  if (diffDays <= 1) return 'Due Today';
  return 'Due This Week';
}

function formatCurrency(value) {
  if (!value) return '—';
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function StatusTag({ status }) {
  const className = status === 'Approved' ? 'tag green' : status === 'Rejected' ? 'tag red' : 'tag blue';
  return <span className={className}>{status}</span>;
}

function EmptyIllustration() {
  return (
    <div className="empty-illustration" aria-hidden="true">
      <div className="empty-box" />
      <div className="empty-line short" />
      <div className="empty-line" />
      <div className="empty-check">✓</div>
    </div>
  );
}

export default function HRPendingRequestDashboard() {
  const [theme, setTheme] = useState('light');
  const [requests, setRequests] = useState(initialRequests);
  const [statusScope, setStatusScope] = useState('Pending');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('slaDeadline');
  const [sortDir, setSortDir] = useState('asc');
  const [modal, setModal] = useState(null);
  const [approveComment, setApproveComment] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectComment, setRejectComment] = useState('');
  const [reviewNote, setReviewNote] = useState('');
  const [toast, setToast] = useState('');

  const activeRequest = modal?.request;

  const counts = useMemo(() => {
    const pending = requests.filter((r) => r.status === 'Pending');
    return {
      pending: pending.length,
      overdue: pending.filter((r) => slaStatus(r) === 'Overdue').length,
      approved: requests.filter((r) => r.status === 'Approved').length,
      rejected: requests.filter((r) => r.status === 'Rejected').length
    };
  }, [requests]);

  const visibleRequests = useMemo(() => {
    let rows = [...requests];
    if (statusScope !== 'All') rows = rows.filter((r) => r.status === statusScope);
    if (statusScope === 'Overdue') rows = rows.filter((r) => r.status === 'Pending' && slaStatus(r) === 'Overdue');
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) => r.employeeName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }
    if (typeFilter !== 'All') rows = rows.filter((r) => r.type === typeFilter);
    if (urgencyFilter !== 'All') rows = rows.filter((r) => slaStatus(r) === urgencyFilter);
    rows.sort((a, b) => {
      const valueA = new Date(`${a[sortBy]}T00:00:00`).getTime();
      const valueB = new Date(`${b[sortBy]}T00:00:00`).getTime();
      return sortDir === 'asc' ? valueA - valueB : valueB - valueA;
    });
    return rows;
  }, [requests, statusScope, search, typeFilter, urgencyFilter, sortBy, sortDir]);

  function resetModal() {
    setModal(null);
    setApproveComment('');
    setRejectReason('');
    setRejectComment('');
    setReviewNote('');
  }

  function clearFilters() {
    setSearch('');
    setTypeFilter('All');
    setUrgencyFilter('All');
    setStatusScope('Pending');
  }

  function switchSort(column) {
    if (sortBy === column) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortBy(column);
      setSortDir('asc');
    }
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  function approveRequest() {
    if (!activeRequest) return;
    const employee = employeeByName[activeRequest.employeeName];
    if (activeRequest.employeeName === 'Richard Sturman') {
      showToast(`You cannot approve your own requests. This request has been routed to ${employee.backupApprover}.`);
      resetModal();
      return;
    }
    setRequests((prev) => prev.map((r) => r.id === activeRequest.id ? { ...r, status: 'Approved', comments: [...r.comments, `Manager: ${approveComment || 'Approved.'}`] } : r));
    showToast(`${activeRequest.id} approved${activeRequest.amount > 5000 ? ` and routed to ${activeRequest.vpName} for final sign-off` : ''}.`);
    resetModal();
  }

  function rejectRequest() {
    if (!activeRequest || rejectComment.trim().length < 20 || !rejectReason) return;
    setRequests((prev) => prev.map((r) => r.id === activeRequest.id ? { ...r, status: 'Rejected', comments: [...r.comments, `Manager rejection: ${rejectReason}. ${rejectComment}`] } : r));
    showToast(`${activeRequest.id} rejected. Employee notified immediately.`);
    resetModal();
  }

  function requestRevision() {
    if (!activeRequest) return;
    setRequests((prev) => prev.map((r) => r.id === activeRequest.id ? { ...r, status: 'Returned', comments: [...r.comments, `Manager requested revision: ${reviewNote || 'Please revise and resubmit.'}`] } : r));
    showToast(`${activeRequest.id} returned to employee for revision.`);
    resetModal();
  }

  function exportCsv() {
    const headers = ['Request ID', 'Employee Name', 'Department', 'Request Type', 'Date Submitted', 'SLA Deadline', 'Dollar Amount', 'Status', 'SLA Status'];
    const body = visibleRequests.map((r) => {
      const emp = employeeByName[r.employeeName] || {};
      return [r.id, r.employeeName, emp.department || '', r.type, r.dateSubmitted, r.slaDeadline, r.amount || '', r.status, slaStatus(r)]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',');
    }).join('\n');
    const blob = new Blob([`${headers.join(',')}\n${body}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hr-pending-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV export downloaded for current filtered view.');
  }

  const hasNoPending = requests.filter((r) => r.status === 'Pending').length === 0;
  const filterActive = search || typeFilter !== 'All' || urgencyFilter !== 'All' || statusScope !== 'Pending';

  return (
    <div className={`app ${theme}`}>
      <style>{styles}</style>
      <header className="shell-bar">
        <div className="shell-product"><span className="hamburger">☰</span><strong>IBM Carbon HR</strong><span>Pending Request Dashboard</span></div>
        <div className="shell-actions">
          <span className="manager-chip">HR Manager · Richard Sturman</span>
          <button className="ghost shell-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle light and dark theme">{theme === 'light' ? 'Dark' : 'Light'} theme</button>
        </div>
      </header>

      <div className="layout">
        <aside className="side-nav" aria-label="Left navigation">
          {['Dashboard', 'Employees', 'Reports', 'Projects', 'Org Chart', 'Workforce Intelligence'].map((item) => (
            <button key={item} className={item === 'Dashboard' ? 'nav-item active' : 'nav-item'} onClick={() => item !== 'Dashboard' && showToast(`${item} is coming soon.`)}>{item}</button>
          ))}
        </aside>

        <main className="content">
          <section className="page-header">
            <div>
              <p className="eyebrow">People Operations</p>
              <h1>Pending Request Dashboard</h1>
              <p className="lede">Scan time-sensitive HR requests, prioritize SLA risk, and act without leaving the dashboard.</p>
            </div>
            <button className="primary" onClick={exportCsv}>Export current view</button>
          </section>

          <section className="kpi-grid" aria-label="Dashboard summary tiles">
            <button className={`kpi ${statusScope === 'Pending' ? 'selected' : ''}`} onClick={() => setStatusScope('Pending')}>
              <span>Pending Requests</span><strong>{counts.pending}</strong><em>Awaiting your action</em>
            </button>
            <button className={`kpi overdue ${counts.overdue > 3 ? 'error' : counts.overdue > 0 ? 'warning' : ''} ${statusScope === 'Overdue' ? 'selected' : ''}`} onClick={() => { setStatusScope('Overdue'); setUrgencyFilter('All'); }}>
              <span>Overdue</span><strong>{counts.overdue}</strong><em>Past 48-hour SLA</em>
            </button>
            <button className={`kpi ${statusScope === 'Approved' ? 'selected' : ''}`} onClick={() => setStatusScope('Approved')}>
              <span>Approved This Week</span><strong>{counts.approved}</strong><em>Completed decisions</em>
            </button>
            <button className={`kpi ${statusScope === 'Rejected' ? 'selected' : ''}`} onClick={() => setStatusScope('Rejected')}>
              <span>Rejected This Week</span><strong>{counts.rejected}</strong><em>Employee notified</em>
            </button>
          </section>

          <section className="panel">
            <div className="table-toolbar">
              <div>
                <h2>{statusScope === 'Overdue' ? 'Overdue Requests' : `${statusScope} Requests`}</h2>
                <p>{visibleRequests.length} request{visibleRequests.length === 1 ? '' : 's'} shown</p>
              </div>
              <div className="filters">
                <label>Search<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Employee or request ID" /></label>
                <label>Type<select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option>All</option><option>PTO</option><option>Expense</option><option>Equipment</option><option>Role Change</option></select></label>
                <label>Urgency<select value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)}><option>All</option><option>Overdue</option><option>Due Today</option><option>Due This Week</option></select></label>
                <button className="secondary" onClick={clearFilters}>Clear filters</button>
              </div>
            </div>

            {hasNoPending && statusScope === 'Pending' ? (
              <div className="empty-state"><EmptyIllustration /><h3>No pending requests. You're all caught up.</h3><p>New requests will appear here when they require your approval.</p></div>
            ) : visibleRequests.length === 0 ? (
              <div className="empty-state"><EmptyIllustration /><h3>No requests match your filters</h3><p>Try adjusting the search, type, urgency, or summary tile filter.</p><button className="primary" onClick={clearFilters}>Clear filters</button></div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Employee</th><th>Request type</th><th><button onClick={() => switchSort('dateSubmitted')}>Date submitted {sortBy === 'dateSubmitted' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</button></th><th><button onClick={() => switchSort('slaDeadline')}>SLA deadline {sortBy === 'slaDeadline' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</button></th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {visibleRequests.map((r) => {
                      const emp = employeeByName[r.employeeName];
                      const status = slaStatus(r);
                      return (
                        <tr key={r.id} className={status === 'Overdue' ? 'row-overdue' : ''}>
                          <td><strong>{r.employeeName}</strong><span>{r.id} · {emp?.department}</span></td>
                          <td>{r.type}{r.duplicate && <span className="tag amber">Duplicate</span>}</td>
                          <td>{formatDate(r.dateSubmitted)}</td>
                          <td>{status === 'Overdue' ? <strong className="overdue-text">Overdue by {daysBetween(r.slaDeadline)} days</strong> : <><span>{formatDate(r.slaDeadline)}</span><small>{status}</small></>}</td>
                          <td>{formatCurrency(r.amount)}</td>
                          <td><StatusTag status={r.status} /></td>
                          <td className="row-actions">
                            <button className="small primary" disabled={r.status !== 'Pending'} onClick={() => setModal({ type: 'approve', request: r })}>Approve</button>
                            <button className="small secondary" onClick={() => setModal({ type: 'review', request: r })}>Review</button>
                            <button className="small danger" disabled={r.status !== 'Pending'} onClick={() => setModal({ type: 'reject', request: r })}>Reject</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>

      {toast && <div className="toast" role="status">{toast}</div>}

      {modal?.type === 'approve' && activeRequest && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <button className="close" onClick={resetModal}>×</button>
            <p className="eyebrow">Confirm approval</p><h2>{activeRequest.id}: {activeRequest.type}</h2>
            <div className="summary-card"><strong>{activeRequest.employeeName}</strong><span>{employeeByName[activeRequest.employeeName]?.title} · {employeeByName[activeRequest.employeeName]?.department}</span><p>{activeRequest.summary}</p><p><strong>Amount:</strong> {formatCurrency(activeRequest.amount)}</p></div>
            {activeRequest.employeeName === 'Richard Sturman' && <div className="inline-error">You cannot approve your own requests. This request has been routed to {employeeByName[activeRequest.employeeName].backupApprover}.</div>}
            {activeRequest.amount > 5000 && <div className="inline-warning">Requests over $5,000 require VP approval. This will be routed to {activeRequest.vpName} for final sign-off.</div>}
            <label>Approval comment {activeRequest.amount > 5000 ? <strong>(required)</strong> : <span>(optional)</span>}<textarea value={approveComment} onChange={(e) => setApproveComment(e.target.value)} placeholder="Add decision rationale or routing notes." /></label>
            <div className="modal-actions"><button className="secondary" onClick={resetModal}>Cancel</button><button className="primary" disabled={activeRequest.amount > 5000 && approveComment.trim().length === 0} onClick={approveRequest}>Approve request</button></div>
          </div>
        </div>
      )}

      {modal?.type === 'review' && activeRequest && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal wide">
            <button className="close" onClick={resetModal}>×</button>
            <p className="eyebrow">Request review</p><h2>{activeRequest.id}: {activeRequest.summary}</h2>
            <div className="review-grid">
              <div className="summary-card"><h3>Request information</h3><p><strong>Type:</strong> {activeRequest.type}</p><p><strong>Submitted:</strong> {formatDate(activeRequest.dateSubmitted)}</p><p><strong>SLA:</strong> {formatDate(activeRequest.slaDeadline)} · {slaStatus(activeRequest)}</p><p><strong>Amount:</strong> {formatCurrency(activeRequest.amount)}</p><p><strong>Documentation:</strong> {activeRequest.documentation}</p></div>
              <div className="summary-card"><h3>Employee profile</h3><p><strong>{activeRequest.employeeName}</strong></p><p>{employeeByName[activeRequest.employeeName]?.title}</p><p>{employeeByName[activeRequest.employeeName]?.department} · {employeeByName[activeRequest.employeeName]?.location}</p><p>Tenure: {employeeByName[activeRequest.employeeName]?.tenure}</p></div>
              <div className="summary-card"><h3>Last 3 requests</h3>{(activeRequest.history.length ? activeRequest.history : [['2026-05-01', activeRequest.type, activeRequest.status]]).map((h, idx) => <p key={idx}>{formatDate(h[0])} · {h[1]} · <strong>{h[2]}</strong></p>)}</div>
              <div className="summary-card"><h3>Comment thread</h3>{activeRequest.comments.map((c, idx) => <p key={idx}>{c}</p>)}</div>
            </div>
            <label>Manager notes<textarea value={reviewNote} onChange={(e) => setReviewNote(e.target.value)} placeholder="Add internal notes or explain what needs revision." /></label>
            <div className="modal-actions"><button className="secondary" onClick={resetModal}>Close</button><button className="primary" disabled={activeRequest.status !== 'Pending'} onClick={requestRevision}>Request Revision</button></div>
          </div>
        </div>
      )}

      {modal?.type === 'reject' && activeRequest && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <button className="close" onClick={resetModal}>×</button>
            <p className="eyebrow">Reject request</p><h2>{activeRequest.id}: {activeRequest.type}</h2>
            <div className="inline-error">This action cannot be undone. The employee will be notified immediately.</div>
            <label>Rejection reason<select value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}><option value="">Select a reason</option><option>Budget Constraints</option><option>Insufficient Documentation</option><option>Policy Violation</option><option>Duplicate Request</option><option>Other</option></select></label>
            <label>Required comment <span>{rejectComment.length}/20 minimum</span><textarea value={rejectComment} onChange={(e) => setRejectComment(e.target.value)} placeholder="Explain the decision clearly enough for the employee to understand next steps." /></label>
            <div className="modal-actions"><button className="secondary" onClick={resetModal}>Cancel</button><button className="danger" disabled={!rejectReason || rejectComment.trim().length < 20} onClick={rejectRequest}>Reject request</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = `
:root { font-family: 'IBM Plex Sans', Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
* { box-sizing: border-box; }
body { margin: 0; }
button, input, select, textarea { font: inherit; }
.app { min-height: 100vh; --bg: #f4f4f4; --panel: #ffffff; --text: #161616; --muted: #525252; --border: #e0e0e0; --hover: #e8e8e8; --shell: #161616; --shellText: #f4f4f4; --blue: #0f62fe; --red: #da1e28; --yellow: #f1c21b; background: var(--bg); color: var(--text); }
.app.dark { --bg: #262626; --panel: #393939; --text: #f4f4f4; --muted: #c6c6c6; --border: #525252; --hover: #4c4c4c; --shell: #000000; --shellText: #f4f4f4; }
.shell-bar { height: 48px; background: var(--shell); color: var(--shellText); display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; position: sticky; top: 0; z-index: 10; }
.shell-product, .shell-actions { display: flex; align-items: center; gap: 1rem; }
.hamburger { font-size: 1.25rem; }
.manager-chip { color: #c6c6c6; font-size: .875rem; }
.layout { display: grid; grid-template-columns: 260px 1fr; min-height: calc(100vh - 48px); }
.side-nav { background: var(--panel); border-right: 1px solid var(--border); padding-top: .5rem; }
.nav-item { width: 100%; border: 0; background: transparent; color: var(--text); text-align: left; padding: .9rem 1.25rem; cursor: pointer; }
.nav-item:hover, .nav-item.active { background: var(--hover); }
.nav-item.active { border-left: 4px solid var(--blue); font-weight: 700; }
.content { padding: 2rem; max-width: 1480px; width: 100%; }
.page-header { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; align-items: flex-start; }
h1 { font-size: 2.25rem; margin: .2rem 0 .5rem; font-weight: 400; }
h2 { font-size: 1.25rem; margin: 0 0 .25rem; }
h3 { margin: 0 0 .75rem; }
.eyebrow { margin: 0; color: var(--muted); font-size: .8rem; letter-spacing: .06em; text-transform: uppercase; }
.lede { margin: 0; color: var(--muted); max-width: 760px; }
.kpi-grid { display: grid; grid-template-columns: repeat(4, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
.kpi { border: 1px solid var(--border); border-top: 4px solid transparent; background: var(--panel); color: var(--text); text-align: left; padding: 1rem; min-height: 132px; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; }
.kpi:hover, .kpi.selected { outline: 2px solid var(--blue); }
.kpi span { color: var(--muted); }
.kpi strong { font-size: 2.5rem; font-weight: 400; }
.kpi em { font-style: normal; color: var(--muted); font-size: .875rem; }
.kpi.warning { border-top-color: var(--yellow); background: color-mix(in srgb, var(--yellow) 12%, var(--panel)); }
.kpi.error { border-top-color: var(--red); background: color-mix(in srgb, var(--red) 10%, var(--panel)); }
.panel { background: var(--panel); border: 1px solid var(--border); }
.table-toolbar { padding: 1rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; gap: 1rem; align-items: end; }
.table-toolbar p { margin: 0; color: var(--muted); }
.filters { display: flex; gap: .75rem; align-items: end; flex-wrap: wrap; justify-content: flex-end; }
label { display: grid; gap: .35rem; color: var(--muted); font-size: .8rem; }
input, select, textarea { border: 0; border-bottom: 1px solid #8d8d8d; background: var(--bg); color: var(--text); min-height: 40px; padding: 0 .75rem; min-width: 160px; }
textarea { min-height: 96px; padding: .75rem; resize: vertical; border: 1px solid var(--border); }
button.primary, .primary { background: var(--blue); color: white; border: 1px solid var(--blue); min-height: 40px; padding: .65rem 1rem; cursor: pointer; }
button.secondary, .secondary, button.ghost, .ghost { background: transparent; color: var(--text); border: 1px solid #8d8d8d; min-height: 40px; padding: .65rem 1rem; cursor: pointer; }
.shell-toggle { color: var(--shellText); border-color: #525252; }
button.danger, .danger { background: var(--red); color: white; border: 1px solid var(--red); min-height: 40px; padding: .65rem 1rem; cursor: pointer; }
button:disabled { opacity: .45; cursor: not-allowed; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 1020px; }
th { color: var(--muted); font-weight: 600; text-align: left; font-size: .8rem; background: var(--bg); }
th, td { padding: .85rem 1rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
th button { border: 0; background: transparent; color: inherit; padding: 0; cursor: pointer; font-weight: 600; }
td span, td small { display: block; color: var(--muted); font-size: .82rem; margin-top: .2rem; }
.row-overdue { border-left: 4px solid var(--red); }
.row-overdue td:first-child { padding-left: calc(1rem - 4px); }
.overdue-text { color: var(--red); }
.row-actions { display: flex; gap: .5rem; white-space: nowrap; }
.small { min-height: 32px !important; padding: .35rem .65rem !important; font-size: .85rem; }
.tag { display: inline-flex; padding: .15rem .55rem; border-radius: 999px; font-size: .75rem; margin-left: .25rem; }
.tag.green { background: #defbe6; color: #0e6027; }
.tag.red { background: #ffd7d9; color: #a2191f; }
.tag.blue { background: #d0e2ff; color: #0043ce; }
.tag.amber { background: #fcf4d6; color: #684e00; }
.empty-state { min-height: 320px; display: grid; place-items: center; text-align: center; padding: 2rem; color: var(--muted); }
.empty-state h3 { color: var(--text); margin-top: 1rem; }
.empty-illustration { width: 140px; height: 100px; position: relative; border: 1px dashed var(--border); background: var(--bg); }
.empty-box { width: 60px; height: 48px; border: 2px solid var(--muted); position: absolute; left: 20px; top: 25px; }
.empty-line { height: 2px; width: 48px; background: var(--muted); position: absolute; right: 18px; top: 42px; opacity: .6; }
.empty-line.short { width: 34px; top: 58px; }
.empty-check { position: absolute; right: 28px; bottom: 12px; font-size: 1.5rem; color: var(--blue); }
.toast { position: fixed; right: 1rem; bottom: 1rem; background: #262626; color: #f4f4f4; padding: 1rem 1.25rem; box-shadow: 0 8px 20px rgba(0,0,0,.25); z-index: 30; max-width: 460px; }
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: grid; place-items: center; padding: 1rem; z-index: 20; }
.modal { width: min(680px, 96vw); max-height: 90vh; overflow: auto; background: var(--panel); color: var(--text); padding: 1.5rem; position: relative; box-shadow: 0 20px 48px rgba(0,0,0,.35); }
.modal.wide { width: min(1000px, 96vw); }
.close { position: absolute; top: .6rem; right: .6rem; border: 0; background: transparent; color: var(--text); font-size: 1.6rem; cursor: pointer; }
.summary-card { border: 1px solid var(--border); background: var(--bg); padding: 1rem; margin: 1rem 0; }
.summary-card p { margin: .35rem 0; color: var(--muted); }
.summary-card strong { color: var(--text); }
.inline-warning, .inline-error { padding: 1rem; margin: 1rem 0; border-left: 4px solid; }
.inline-warning { background: #fcf4d6; color: #3d2e00; border-color: var(--yellow); }
.inline-error { background: #ffd7d9; color: #750e13; border-color: var(--red); }
.review-grid { display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap: 1rem; }
.review-grid .summary-card { margin: 0; }
.modal-actions { display: flex; gap: .75rem; justify-content: flex-end; margin-top: 1rem; }
@media (max-width: 980px) { .layout { grid-template-columns: 1fr; } .side-nav { display: flex; overflow-x: auto; border-right: 0; border-bottom: 1px solid var(--border); } .nav-item { width: auto; white-space: nowrap; } .kpi-grid { grid-template-columns: repeat(2, 1fr); } .table-toolbar, .page-header { flex-direction: column; align-items: stretch; } .filters { justify-content: flex-start; } .review-grid { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .content { padding: 1rem; } .kpi-grid { grid-template-columns: 1fr; } .shell-product span:last-child { display: none; } .manager-chip { display: none; } }
`;
