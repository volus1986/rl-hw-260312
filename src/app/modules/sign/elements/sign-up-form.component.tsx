"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Button, Label, Input } from "@/app/shared/ui";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./error-message.component";

const zodSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.email().nonempty(),
    password: z.string().min(8, "Required, min length 8 symbols"),
    confirmPassword: z.string().min(8, "Required, min length 8 symbols"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type Inputs = z.infer<typeof zodSchema>;

export default function SignUpForm() {
  const t = useTranslations("LoginPage");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
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
        <Label htmlFor="userName" className="leading-5">
          {t("nameLabel")}
        </Label>

        <Input
          {...register("name")}
          id="userName"
          placeholder={t("nameInputPlaceholder")}
        />
        <ErrorMessage message={formState.errors.name?.message} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="userEmail" className="leading-5">
          {t("emailLabel")}
        </Label>
        <Input
          {...register("email")}
          id="userEmail"
          placeholder={t("emailInputPlaceholder")}
        />
        <ErrorMessage message={formState.errors.email?.message} />
      </div>

      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5">
          {t("passwordLabel")}
        </Label>
        <div className="relative">
          <Input
            {...register("password")}
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="••••••••••••••••"
            className="pr-9"
          />
          <Button
            type="button"
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
        <ErrorMessage message={formState.errors.password?.message} />
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
            {...register("confirmPassword")}
          />
          <Button
            type="button"
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
        <ErrorMessage message={formState.errors.confirmPassword?.message} />
      </div>

      <Button className="w-full" type="submit">
        {t("signupButton")}
      </Button>
    </form>
  );
}
