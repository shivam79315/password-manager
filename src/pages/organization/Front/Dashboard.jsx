import Layout from "~/components/organization/dashboard/Layout";
import { Toaster } from "sonner";

export default function Dashboard() {
  return (
    <>
      <Layout />
      <Toaster
        theme="dark"
        richColors
        position="top-right"
        toastOptions={{
          style: {
            width: "auto",
          },
        }}
      />
    </>
  )
}