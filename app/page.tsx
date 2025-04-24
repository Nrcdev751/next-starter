// import Image from "next/image";
import Hello from './components/Hello'

export default function Home() {
  console.log("What am i doing here? -- SERVER/CLIENT");

  return (
      <>
        <h1>Welcome to Next.js</h1>
        <Hello/>
      </>
  );
}
