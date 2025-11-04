import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Client } from "@/app/client";
import { getQueryClient, trpc } from "@/trpc/server";

const Page = async () => {
  // const users = await caller.getUsers();
  //
  // const trpc = useTRPC();
  // const { data: users } = useQuery(trpc.getUsers.queryOptions());

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback="Loading...">
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
