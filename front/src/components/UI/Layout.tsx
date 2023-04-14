import React, {PropsWithChildren} from 'react';
import AppToolbar from "@/components/UI/AppToolbar";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <AppToolbar/>
      {children}
    </div>
  );
};

export default Layout;