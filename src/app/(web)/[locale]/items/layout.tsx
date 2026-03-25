import Providers from '@/app/providers';

export default async function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
