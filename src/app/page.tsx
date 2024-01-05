import Button from "@/components/Button.component";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Heading (XL)</h1>
      <Button type="destructive" size="L">
        Button Primary (L)
      </Button>
    </main>
  );
}
