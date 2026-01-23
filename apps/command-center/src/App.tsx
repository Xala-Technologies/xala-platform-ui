import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { WorkflowCatalog } from './pages/WorkflowCatalog';
import { SpecEditor } from './pages/SpecEditor';
import { ApprovalStatus } from './pages/ApprovalStatus';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="workflows" element={<WorkflowCatalog />} />
        <Route path="specs/:componentName?" element={<SpecEditor />} />
        <Route path="approvals" element={<ApprovalStatus />} />
      </Route>
    </Routes>
  );
}

export default App;
