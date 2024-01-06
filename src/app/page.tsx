import Button from "@/components/Button.component";
import { CheckBox } from "@/components/SubtaskCheckbox.component";

export default function Home() {
  const clickhandler = async () => {
    "use server";
    console.log("first");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        type="destructive"
        size="S"
        mode="dark"
        clickhandler={clickhandler}
      >
        Submit
      </Button>

      <CheckBox mode="dark">
        Create applicationapplicationapplicationapplicationapplication
      </CheckBox>
    </main>
  );
}
