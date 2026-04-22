import { BrokenButton } from "./BrokenButton";
import { BrokenImage } from "./BrokenImage";

export function App() {
  return (
    <main>
      <h1>a11yscout fixture</h1>
      <BrokenButton />
      <BrokenImage />
      <a href="#">{/* empty link - 2.4.4 / 4.1.2 violation */}</a>
    </main>
  );
}
