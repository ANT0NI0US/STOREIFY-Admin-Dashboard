import Navigation from "@/navigation/Navigation";
import RoutesProvider from "./RoutesProvider";
import StoreProvider from "./StoreProvider";
import DarkModeProvider from "@/context/DarkModeContext";
import ToasterWrapper from "./ToasterWrapper";

export default function AppProvider() {
  return (
    <DarkModeProvider>
      <StoreProvider>
        <RoutesProvider>
          <Navigation />
        </RoutesProvider>
        <ToasterWrapper />
      </StoreProvider>
    </DarkModeProvider>
  );
}
