import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWallet } from "@meshsdk/react";
import { LiveUser } from './atoms/playerAtom';
import { useRecoilValue } from 'recoil';

const PrivateRoute = (WrappedComponent: React.ComponentType) => {
  const WrapperComponent = (props: any) => {
    const { connected } = useWallet();
    const router = useRouter();
    const liveUser = useRecoilValue(LiveUser); 
    const currentDate = new Date();

    useEffect(() => {

      if (!liveUser) {
        const referer = window.location.pathname;
        router.push({
          pathname: '/login',
          query: { referer },
        });
      } else if (liveUser.subscriptionEndDate && (new Date(liveUser.subscriptionEndDate) < currentDate)) {
        router.push('/subscription');
      }
    }, [connected, liveUser, router, currentDate]);

    if (!connected || !liveUser) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default PrivateRoute;
