import { UserLoginForm } from "@/widgets";
import { UserRegisterForm } from "@/widgets";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("LoginPage");

  return (
    <div className="flex mt-80 justify-center items-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">{t("loginTab")}</TabsTrigger>
          <TabsTrigger value="register">{t("registerTab")}</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <UserLoginForm />
        </TabsContent>
        <TabsContent value="register">
          <UserRegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
