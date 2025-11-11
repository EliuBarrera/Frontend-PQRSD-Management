import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { RuteoPrincipal } from "./app/routes/RuteoPrincipal";

function App() {
  return (
    <div className="min-h-screen text-gray-100">
      <BrowserRouter>
        <Suspense fallback={<p className="text-center p-8">Cargando...</p>}>
          <RuteoPrincipal />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;