import { Link } from "@/i18n/navigation";

export default function RootPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Link href={"items"}>Items</Link>
      </div>
      <div>
        <Link href={"login"}>Login</Link>
      </div>
    </div>
  );
}
