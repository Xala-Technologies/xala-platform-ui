import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { WorkflowCatalog } from './pages/WorkflowCatalog';
import { SpecEditor } from './pages/SpecEditor';
import { WorkflowSessionPage } from './pages/WorkflowSessionPage';
import { ApprovalStatus } from './pages/ApprovalStatus';
import { WorkflowSessionProvider } from './context/WorkflowSessionContext';

function App() {
  return (
    <WorkflowSessionProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="workflows" element={<WorkflowCatalog />} />
          <Route path="session" element={<WorkflowSessionPage />} />
          <Route path="specs/:componentName?" element={<SpecEditor />} />
          <Route path="approvals" element={<ApprovalStatus />} />
        </Route>
      </Routes>
    </WorkflowSessionProvider>
  );
}

export default App;
