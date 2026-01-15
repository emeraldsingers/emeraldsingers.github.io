import { createContext, useContext, useState, type ReactNode } from "react";

type AccentColors = { light: string; dark: string } | null;

interface NavAccentContextValue {
  accentColors: AccentColors;
  setAccentColors: (colors: AccentColors) => void;
}

const NavAccentContext = createContext<NavAccentContextValue | undefined>(undefined);

export const NavAccentProvider = ({ children }: { children: ReactNode }) => {
  const [accentColors, setAccentColors] = useState<AccentColors>(null);

  return (
    <NavAccentContext.Provider value={{ accentColors, setAccentColors }}>
      {children}
    </NavAccentContext.Provider>
  );
};

export const useNavAccent = () => {
  const context = useContext(NavAccentContext);
  if (!context) {
    throw new Error("useNavAccent must be used within NavAccentProvider");
  }
  return context;
};
