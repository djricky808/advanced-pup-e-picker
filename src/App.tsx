import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";

export function App() {
  
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        <Dogs></Dogs>
      </Section>
    </div>
  );
}
