"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { logout } from "@/libs/redux/features/auth/authSlice";

export default function PrivateRoute({
  children,
  isAdmin
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const pathname = usePathname();

  useEffect(() => {
    sessionStorage.setItem("path", pathname);
  }, [pathname]);

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      router.push("/auth/login");
    } else {
      const decodedToken = jwtDecode(token) as { exp: number; user: { role: string } };
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        dispatch(logout());
        router.push("/auth/login");
      }

      if (isAdmin) {
        if (decodedToken.user.role !== "Admin") {
          router.push("/");
        }
      }
    }
  }, [token, isAdmin, router, dispatch]);

  return token ? children : null;
}
