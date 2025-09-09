import OrgCard from "@/components/superadmin/orgCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrganizationsList({
  organizations,
  loading,
  error,
  onDelete,
}) {
  return (
    <>
      <div className="w-full p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : organizations.length === 0 ? (
          <p className="text-center text-gray-500">No organizations found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-6">
            {organizations.map((org) => (
                <OrgCard
                  key={org.orgId}
                  logo={org.logoUrl}
                  name={org.orgName}
                  email={org.email}
                  description={org.desc}
                  onDelete={() => onDelete(org.id)}
                />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
