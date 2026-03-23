"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button, Label, Input } from "@/app/shared/ui";
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./error-message.component";

const zodSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

type Inputs = z.infer<typeof zodSchema>;

export default function SignInForm() {
  const t = useTranslations("LoginPage");
  const [isVisible, setIsVisible] = useState(false);
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(zodSchema),
  });

  const handleSubmitSuccess: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const handleSubmitError: SubmitErrorHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitError)}>
      <div className="space-y-1">
        <Label htmlFor="userEmail" className="leading-5">
          {t("emailLabel")}
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                {...field}
                type="text"
                id="userEmail"
                placeholder={t("emailInputPlaceholder")}
              />
              <ErrorMessage message={fieldState?.error?.message} />
            </>
          )}
        />
      </div>

      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5">
          {t("passwordLabel")}
        </Label>
        <div className="relative">
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  id="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="••••••••••••••••"
                  className="pr-9"
                />
                <ErrorMessage message={fieldState?.error?.message} />
              </>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible((prevState) => !prevState)}
            className="text-muted-foreground focus-visible:ring-ring/50 absolute
              inset-y-0 right-0 rounded-l-none hover:bg-transparent">
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isVisible ? t("hidePasswordText") : t("showPasswordText")}
            </span>
          </Button>
        </div>
      </div>

      <Button className="w-full" type="submit">
        Login
      </Button>
    </form>
  );
}
