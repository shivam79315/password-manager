import Topbar from "~/components/organization/dashboard/Topbar"
import Layout from "~/components/organization/dashboard/Layout"

export default function Dashboard() {
  return (
    <div className="w-full h-screen">
      <Topbar />
      <Layout />
    </div>
  )
}