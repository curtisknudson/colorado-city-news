import React, { createContext, useEffect, useState } from "react";
// Types
import { MediatorInterface } from "types/mediator/mediator";
// Hooks
import makeContextHook from "hooks/makeContextHooks";
import { Mediator } from "mediator/user/userMediator";
import { useApi } from "../api/userApiProvider";

const MediatorContext = createContext<MediatorInterface | undefined>(undefined);
export const useMediator = makeContextHook(MediatorContext);

const MediatorProvider: React.FC = ({ children }) => {
  const api = useApi();
  const [mediator] = useState(() => new Mediator(api));

  useEffect(() => {
    return () => {
      mediator.dispose();
    };
  }, [mediator]);
  return (
    <MediatorContext.Provider value={mediator}>
      {children}
    </MediatorContext.Provider>
  );
};

export default MediatorProvider;
