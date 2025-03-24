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

    const containerBg = theme == "dark" ? "bg-zinc-800" : "bg-zinc-100";
    const textColor = item.done
        ? theme == "dark"
            ? "text-zinc-500"
            : "text-zinc-400"
        : theme == "dark"
            ? "text-white"
            : "text-black";

    return (
        <View className={`flex-row justify-between items-center ${containerBg} p-4 my-2 rounded`}>

            <TouchableOpacity onPress={() => toggleFunction(item.id)} className="ml-2">
                <Text className="text-green-600 font-semibold mr-[1.2rem]">
                    {item.done ? "Refazer" : "Concluir"}
                </Text>
            </TouchableOpacity>


            <Text className={`flex-1 text-lg ${item.done ? "line-through" : ""} ${textColor}`}>
                {item.text}
            </Text>

            <TouchableOpacity onPress={() => deleteFunction(item.id)} className="ml-2">
                <Text className="text-red-500 ml-[1.2rem]">Excluir</Text>
            </TouchableOpacity>
        </View>
    );
}
