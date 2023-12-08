/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lwFe84hRx8y
 */
"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { format } from "date-fns";

export default function ActivityCard({ activity }: { activity: any }) {
  return (
    <Card className="border rounded-lg max-w-sm mx-auto shadow-sm overflow-hidden">
      <CardContent className="flex items-center space-x-4 p-6">
        <Avatar className="relative overflow-visible">
          {/* <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-green-600" /> */}
          <div className="overflow-hidden rounded-full">
            <AvatarImage alt="@jaredpalmer" src={activity.user_picture} />
            <AvatarFallback>{}</AvatarFallback>
          </div>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold capitalize">
              {activity.user_name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {format(new Date(activity.changed_at), "MMM d, yyyy")}
            </CardDescription>
          </div>
          <p className="text-sm mt-2">{activity.message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
