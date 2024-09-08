import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAdminAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAdminAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const checkAdminStatus = () => {
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        if (isAdmin) {
          setVerified(true);
        } else {
          router.replace("/admin");
        }
      };
      checkAdminStatus();
    }, [router]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  WithAdminAuth.displayName = `WithAdminAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAdminAuth;
};

export default withAdminAuth;
