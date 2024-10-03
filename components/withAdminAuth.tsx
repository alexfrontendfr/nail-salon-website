import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { isAdminAuthenticated } from "../utils/adminAuth";

const withAdminAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAdminAuth: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAdminAuthenticated()) {
        router.push("/admin");
      }
    }, [router]);

    if (!isAdminAuthenticated()) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAdminAuth;
};

export default withAdminAuth;
