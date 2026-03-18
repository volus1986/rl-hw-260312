import "@/app/globals.css";
import Providers from "../providers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { postsApi } from "@/entities/posts";

export default async function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const page = 1;
  const limit = 20;

  await queryClient.prefetchQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => postsApi.getPosts(page, limit),
  });

  return (
    <Providers>
      <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
    </Providers>
  );
}
