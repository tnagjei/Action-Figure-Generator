'use client';
import {createContext, useContext, useState} from "react";
import {useSession} from "next-auth/react";
import {useInterval} from "ahooks";

interface UserData {
  user_id?: string;
  name?: string;
  email?: string;
  image?: string;
}

interface CommonContextType {
  userData: UserData;
  setUserData: (data: UserData) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  showLoadingModal: boolean;
  setShowLoadingModal: (show: boolean) => void;
  showGeneratingModal: boolean;
  setShowGeneratingModal: (show: boolean) => void;
  showPricingModal: boolean;
  setShowPricingModal: (show: boolean) => void;
  commonText: any;
  authText: any;
  menuText: any;
  pricingText: any;
}

const CommonContext = createContext<CommonContextType | undefined>(undefined);

export const CommonProvider = ({
                                 children,
                                 commonText,
                                 authText,
                                 menuText,
                                 pricingText
                               }) => {

  const {data: session, status} = useSession();
  const [userData, setUserData] = useState<UserData>({});
  const [intervalUserData, setIntervalUserData] = useState(1000);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showGeneratingModal, setShowGeneratingModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);


  useInterval(() => {
    init();
  }, intervalUserData);

  async function init() {
    if (status === 'authenticated') {
      const userData: UserData = {
        user_id: session?.user?.id as string,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      }
      setUserData(userData);
      setShowLoginModal(false);
      setIntervalUserData(undefined);
    }
  }

  return (
    <CommonContext.Provider
      value={{
        userData,
        setUserData,
        showLoginModal,
        setShowLoginModal,
        showLogoutModal,
        setShowLogoutModal,
        showLoadingModal,
        setShowLoadingModal,
        showGeneratingModal,
        setShowGeneratingModal,
        showPricingModal,
        setShowPricingModal,
        commonText,
        authText,
        menuText,
        pricingText,
      }}
    >
      {children}
    </CommonContext.Provider>
  );

}

export const useCommonContext = () => {
  const context = useContext(CommonContext);
  if (context === undefined) {
    throw new Error('useCommonContext must be used within a CommonProvider');
  }
  return context;
}
