import { Button } from "@/components/ui/button"
import FileUpload from "../components/FileUpload";
import { Loader2Icon } from "lucide-react";
import Image from 'next/image'

export default function Home() {
  return (
    <div className="">
      <Image src="/static/blaze2.png" width={80} height={60} alt="Blaze" />
      <FileUpload />
    </div>
  );
}
