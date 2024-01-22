"use client";
import { ReactNode, useEffect } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useGetRequest } from "@/hooks/useGetRequest";
import { redirect } from "next/navigation";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

export type ProfileResponse = {
  first_name: string;
  last_name: string;
  _id: string;
  email: string;
  roles: string[];
};

export default function Layout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useIsAuthenticated();

  if (isAuthenticated) {
    const { data } = useGetRequest<ProfileResponse>("/users/profile");
    const headerProps = {
      first_name: data?.first_name,
      last_name: data?.last_name,
    };
    return (
      <div className={`flex`}>
        <SideBar />
        <div className='w-full'>
          <Header {...headerProps} />
          {children}
        </div>
      </div>
    );
  } else {
    redirect("/login");
  }
}
