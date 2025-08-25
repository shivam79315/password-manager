import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizations } from "@/features/superadmin/orgSlice";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ViewOrganizations() {
  const dispatch = useDispatch();
  const { items: organizations, loading, error } = useSelector(
    (state) => state.organizations
  );

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  return (
    <div className="w-full bg-muted p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        All Organizations
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : organizations.length === 0 ? (
        <p className="text-center text-gray-500">No organizations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <Card key={org.orgId} className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {org.orgName}
                  <Badge
                    variant={
                      org.isActive === "active" ? "default" : "destructive"
                    }
                  >
                    {org.isActive}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">
                  <strong>Domain:</strong> {org.orgDomain}
                </p>
                <p className="text-sm mb-2">
                  <strong>Created By:</strong> {org.createdBy || "Unknown"}
                </p>
                {org.logoUrl && (
                  <img
                    src={org.logoUrl}
                    alt="Logo"
                    className="h-12 w-12 object-contain mt-2"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
