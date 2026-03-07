import s from "./App.module.css";
import { ImageCircle } from "./components/ImageCircle";

function App() {
  return (
    <section className={s.container}>
      <ImageCircle />
      <article>Hi. I'm a software developer</article>
    </section>
  );
}

export default App;
