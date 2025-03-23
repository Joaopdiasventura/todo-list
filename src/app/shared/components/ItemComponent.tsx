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

    const containerBg = theme == "dark" ? "bg-gray-800" : "bg-gray-100";
    const textColor = item.done
        ? theme == "dark"
            ? "text-gray-500"
            : "text-gray-400"
        : theme == "dark"
            ? "text-white"
            : "text-black";

    return (
        <View className={`flex-row justify-between items-center ${containerBg} p-4 my-2 rounded`}>
            <Text className={`flex-1 text-lg ${item.done ? "line-through" : ""} ${textColor}`}>
                {item.text}
            </Text>

            <TouchableOpacity onPress={() => toggleFunction(item.id)} className="ml-2">
                <Text className="text-green-600 font-semibold">
                    {item.done ? "Refazer" : "Concluir"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteFunction(item.id)} className="ml-2">
                <Text className="text-red-500">Excluir</Text>
            </TouchableOpacity>
        </View>
    );
}
