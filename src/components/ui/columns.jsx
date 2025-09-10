// columns.js
export const columns = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original
      return (
        <button
          onClick={() => alert(`Edit ${user.username}`)}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
        >
          Edit
        </button>
      )
    },
  },
]