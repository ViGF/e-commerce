"use client"

import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from 'next-auth/react'

import { LogInIcon, PercentIcon, ListOrderedIcon, HomeIcon, LogOutIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";

export function Header() {
  const { status, data } = useSession()

  const handleLoginClick = async () => {
    await signIn()
  }

  const handleLogOutClick = async () => {
    await signOut()
  }

  return (
    <Card className="flex justify-between items-center p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          {status == 'authenticated' && data.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-2">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && (
                    <AvatarImage src={data.user.image} />
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>

              <Separator />
            </div>
          )}
          <div className="mt-4 flex flex-col gap-2">
            {status === 'unauthenticated' && (
              <Button className="w-full justify-start gap-2" variant="outline" onClick={handleLoginClick}>
                <LogInIcon />
                Fazer Login
              </Button>
            )}
            {status === 'authenticated' && (
              <Button className="w-full justify-start gap-2" variant="outline" onClick={handleLogOutClick}>
                <LogOutIcon />
                Fazer Logout
              </Button>
            )}
            <Button className="w-full justify-start gap-2" variant="outline">
              <HomeIcon size={16} />
              Início
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <PercentIcon size={16} />
              Ofertas
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <ListOrderedIcon size={16} />
              Catálogo
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="font-semibold text-lg">
        <span className="text-primary">FSW</span>{" "}
        Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  )
}