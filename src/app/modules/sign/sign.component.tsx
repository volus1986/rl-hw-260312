import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/shared/ui";
import { useTranslations } from "next-intl";

import SignInForm from "./elements/sign-in-form.component";
import SignUpForm from "./elements/sign-up-form.component";

export const SignModule = () => {
  const t = useTranslations("SignPage");

  return (
    <div className="flex mt-80 justify-center items-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">{t("loginTab")}</TabsTrigger>
          <TabsTrigger value="register">{t("registerTab")}</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
