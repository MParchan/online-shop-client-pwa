import { cn } from "@/libs/twMerge.lib";

interface LoaderProps {
  className?: string;
}
export default function Loader({ className }: LoaderProps) {
  return <div className={cn("loader", { className })} />;
}
