import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Search, NotFound } from "./view";
import { NavBar } from "./view/components";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div
          className={`dark:bg-main-bg bg-main-bg min-h-screen w-full "flex-2" transition-all duration-500`}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/hashtag-search" element={<Search />} />
            <Route path="*" element={<NotFound />} />

            {/* <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/:username/:slug" element={<Post />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
