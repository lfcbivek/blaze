import { Button } from "@/components/ui/button"
import FileUpload from "../components/FileUpload";
import { Loader2Icon } from "lucide-react";
export default function Home() {
  return (
    <div className="">
      <h1>Blaze</h1>
      <FileUpload />
    </div>
  );
}
