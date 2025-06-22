import { Stack } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#111111", // Cor padrão do texto
    primary: "#6200ee", // Cor principal
    background: "#ffffff", // Cor de fundo
    surface: "#f5f5f5", // Fundo de cards, etc.
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack></Stack>
    </PaperProvider>
  );
}
