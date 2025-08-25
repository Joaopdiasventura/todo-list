import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "./shared/context/ThemeContext";

export default function InfoPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme == "dark";

  return (
    <View className={`${isDark ? "bg-zinc-950" : "bg-zinc-50"} flex-1 p-6`}>
      <View className="flex-row justify-between items-center mb-10">
        <Text className={`${isDark ? "text-zinc-50" : "text-zinc-900"} text-3xl font-extrabold`}>
          Bem vindo
        </Text>
        <TouchableOpacity
          onPress={toggleTheme}
          className={`${isDark ? "bg-zinc-800" : "bg-zinc-100"} px-3 py-2 rounded-full`}
        >
          <Text className={`${isDark ? "text-zinc-100" : "text-zinc-800"} text-sm font-semibold`}>
            {isDark ? "Light" : "Dark"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className={`${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"} 
        border rounded-2xl p-8 items-center justify-center shadow`}
      >
        <Text
          className={`${isDark ? "text-zinc-200" : "text-zinc-800"} text-lg font-medium text-center mb-6`}
        >
          Organize suas tarefas de forma simples e produtiva.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="h-12 px-6 rounded-xl justify-center bg-red-500 shadow"
        >
          <Text className="text-white font-bold text-base">Adicione suas tarefas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
