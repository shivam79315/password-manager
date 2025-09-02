// OrgCard.js
import React from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

const OrgCard = ({ name, description, onClick, onDelete, logo }) => {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader 
        onClick={onClick} 
        className="cursor-pointer flex flex-col items-center text-center gap-2"
      >
        {logo && (
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-20 h-20 object-contain rounded-full border"
          />
        )}
        <h2 className="text-lg font-semibold">{name}</h2>
      </CardHeader>
      <CardContent className="text-sm text-gray-600 text-center">
        <p>{description}</p>
      </CardContent>
      {onDelete && (
        <CardFooter className="flex justify-end">
          <Button 
            onClick={onDelete} 
            variant="destructive" 
            size="sm" 
            className="flex items-center cursor-pointer gap-1"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default OrgCard