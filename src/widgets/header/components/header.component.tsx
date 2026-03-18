import { LanguageSwitcher } from "@/features/language-switcher";

export default function Header() {
  return (
    <header className="w-full h-10 bg-amber-200">
      <LanguageSwitcher />
    </header>
  );
}
