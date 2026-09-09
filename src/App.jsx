import DashboardLayout from "./components/templates/DashboardLayout/DashboardLayout";

import AppRoutes from "./routes/AppRoutes";


function App() {

  return (
    <DashboardLayout>

      <AppRoutes />

    </DashboardLayout>
  );

}


export default App;