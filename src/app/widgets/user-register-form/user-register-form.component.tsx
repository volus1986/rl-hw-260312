"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button, Label, Input } from "@/app/shared/ui";

export default function UserRegisterForm() {
  const t = useTranslations("LoginPage");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1">
        <Label htmlFor="userName" className="leading-5">
          {t("nameLabel")}
        </Label>
        <Input
          type="text"
          id="userName"
          placeholder={t("nameInputPlaceholder")}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="userEmail" className="leading-5">
          {t("emailLabel")}
        </Label>
        <Input
          type="email"
          id="userEmail"
          placeholder={t("emailInputPlaceholder")}
        />
      </div>

      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5">
          {t("passwordLabel")}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="••••••••••••••••"
            className="pr-9"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPasswordVisible((prevState) => !prevState)}
            className="text-muted-foreground focus-visible:ring-ring/50 absolute
              inset-y-0 right-0 rounded-l-none hover:bg-transparent">
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isPasswordVisible
                ? t("hidePasswordText")
                : t("showPasswordText")}
            </span>
          </Button>
        </div>
      </div>

      <div className="w-full space-y-1">
        <Label htmlFor="confirm-password" className="leading-5">
          {t("confirmPasswordLabel")}
        </Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="••••••••••••••••"
            className="pr-9"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setIsConfirmPasswordVisible((prevState) => !prevState)
            }
            className="text-muted-foreground focus-visible:ring-ring/50 absolute
              inset-y-0 right-0 rounded-l-none hover:bg-transparent">
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isPasswordVisible
                ? t("hidePasswordText")
                : t("showPasswordText")}
            </span>
          </Button>
        </div>
      </div>

      <Button className="w-full" type="submit">
        {t("signupButton")}
      </Button>
    </form>
  );
}
