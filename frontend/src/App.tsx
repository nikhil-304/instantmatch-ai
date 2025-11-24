import { useState } from "react";
import { ConfigProvider } from "antd";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <div className="antialiased bg-gray-50 min-h-screen text-gray-900">
        {!started ? (
          <LandingPage onGetStarted={() => setStarted(true)} />
        ) : (
          <Dashboard />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
