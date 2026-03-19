"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/shared/ui";

export default function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/items");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mb-6">Incorrect Item Id</p>
      <Button size="lg" className="rounded-lg text-base" onClick={handleClick}>
        Go to the items page
      </Button>
    </div>
  );
}
