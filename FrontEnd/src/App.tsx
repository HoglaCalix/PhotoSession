// src/App.tsx
import {AppLayout} from './features/layouts/AppLayout';
import {CatalogSessionsView} from './features/sessions/components/CatalogSessionsView';

function App() {
  return (
    <AppLayout>
      <CatalogSessionsView />
    </AppLayout>
  );
}


export default App