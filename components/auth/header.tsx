import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface HeaderProps {
  title: string;
  label: string;
  link: string;
}

export default function Header({ title, label, link }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {link !== "disabled" ? (
        <Link href={link}>
          {" "}
          <h1
            className={cn(
              "text-3xl font-semibold text-center cursor-pointer hover:text-sky-500",
              font.className
            )}
          >
            {title}
          </h1>
        </Link>
      ) : (
        <h1
          className={cn("text-3xl font-semibold text-center", font.className)}
        >
          {title}
        </h1>
      )}

      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
