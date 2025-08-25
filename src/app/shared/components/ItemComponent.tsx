import { View, TouchableOpacity, Text } from "react-native";
import { Todo } from "../interfaces/todo";
import { useTheme } from "../context/ThemeContext";

interface ItemComponentProps {
    item: Todo;
    toggleFunction: (id: string) => void;
    deleteFunction: (id: string) => void;
}

export function ItemComponent({ item, toggleFunction, deleteFunction }: ItemComponentProps) {
    const { theme } = useTheme();

    const isDark = theme === "dark"
    const containerBg = isDark ? "bg-zinc-900" : "bg-white"
    const borderColor = isDark ? "border-zinc-800" : "border-zinc-200"
    const textColor = item.done ? (isDark ? "text-zinc-500" : "text-zinc-400") : (isDark ? "text-zinc-100" : "text-zinc-900")


    return (
        <View className={`flex-row items-center ${containerBg} border ${borderColor} rounded-2xl px-4 py-3 my-2 shadow`}>
            <TouchableOpacity
                onPress={() => toggleFunction(item.id)}
                className={`w-6 h-6 rounded-full mr-3 items-center justify-center ${item.done ? "bg-green-600" : ""} ${!item.done ? (isDark ? "border border-zinc-600" : "border border-zinc-300") : ""}`}
            >
                {item.done ? <Text className="text-white text-xs font-bold">✓</Text> : null}
            </TouchableOpacity>

            <Text className={`flex-1 text-base ${item.done ? "line-through opacity-70" : ""} ${textColor}`}>
                {item.text}
            </Text>

            <TouchableOpacity
                onPress={() => deleteFunction(item.id)}
                className={`${isDark ? "bg-zinc-800" : "bg-zinc-100"} px-3 py-2 rounded-xl`}
            >
                <Text className="text-red-500 text-xs font-semibold">Excluir</Text>
            </TouchableOpacity>
        </View>
    )
}
