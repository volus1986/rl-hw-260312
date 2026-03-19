"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/shared/ui";

export function PreviousPageButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return <Button onClick={handleClick}>Go to previous page</Button>;
}
