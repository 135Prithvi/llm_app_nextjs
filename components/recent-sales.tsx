import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  export function RecentSales({data}) {
    const formatter = new Intl.NumberFormat("en-US", {
      notation:"compact"
    });
    return (
      <div className="space-y-8">
        {data.map((item) => (
            <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://pbs.twimg.com/profile_images/1663819132234784770/2A7NJSJg_400x400.jpg" alt="Avatar" />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Elon Musk</p>
              <p className="text-sm text-muted-foreground">
               {item.content}
              </p>
            </div>
            <div className="ml-auto font-medium">{formatter.format(item.impressions)}</div>
          </div>
        ))}
{/*       
        <div className="flex items-center">
          <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Jackson Lee</p>
            <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
          </div>
          <div className="ml-auto font-medium">+$39.00</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
            <p className="text-sm text-muted-foreground">
              isabella.nguyen@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">+$299.00</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>WK</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">William Kim</p>
            <p className="text-sm text-muted-foreground">will@email.com</p>
          </div>
          <div className="ml-auto font-medium">+$99.00</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/05.png" alt="Avatar" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Sofia Davis</p>
            <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
          </div>
          <div className="ml-auto font-medium">+$39.00</div>
        </div> */}
      </div>
    )
  }