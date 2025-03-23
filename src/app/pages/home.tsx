import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import { ItemComponent } from "../shared/components/ItemComponent";
import { useTheme } from "../shared/context/ThemeContext";
import { connect } from "../shared/database/db";
import { Todo } from "../shared/interfaces/todo";

export default function Page() {
    const { theme, toggleTheme } = useTheme();

    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>("");

    useEffect(() => {
        let isMounted = true;

        const initDb = async () => {
            const database = await connect();
            if (!isMounted) return;
            setDb(database);

            await database.execAsync(`
                CREATE TABLE IF NOT EXISTS todos (
                id TEXT PRIMARY KEY NOT NULL,
                text TEXT,
                done BOOLEAN
                );
            `);

            if (!isMounted) return;
            fetchTodos(database);
        };

        initDb();

        return () => {
            isMounted = false;
        };
    }, []);

    const fetchTodos = async (database: SQLiteDatabase) => {
        try {
            const results = await database.getAllAsync<Todo>("SELECT * FROM todos");
            setTodos(results);
        } catch (err) {
            console.error("Erro ao buscar todos:", err);
        }
    };

    const addTodo = async () => {
        if (!db || inputText.trim().length == 0) return;

        const newTodo: Todo = {
            id: Date.now().toString(),
            text: inputText,
            done: false,
        };

        try {
            await db.runAsync(
                "INSERT INTO todos (id, text, done) VALUES (?, ?, ?);",
                [newTodo.id, newTodo.text, 0]
            );
            setTodos((prev) => [...prev, newTodo]);
            setInputText("");
        } catch (err) {
            console.error("Erro ao adicionar todo:", err);
        }
    };

    const toggleTodo = async (id: string) => {
        if (!db) return;

        const updatedTodos = todos.map((todo) =>
            todo.id == id ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);

        const todo = updatedTodos.find((t) => t.id == id);
        if (!todo) return;

        try {
            await db.runAsync("UPDATE todos SET done = ? WHERE id = ?;", [
                todo.done ? 1 : 0,
                todo.id,
            ]);
        } catch (err) {
            console.error("Erro ao atualizar todo:", err);
        }
    };

    const deleteTodo = async (id: string) => {
        if (!db) return;

        try {
            await db.runAsync("DELETE FROM todos WHERE id = ?;", [id]);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error("Erro ao deletar todo:", err);
        }
    };

    return (
        <View className={`${theme == "dark" ? "bg-black" : "bg-white"} flex-1 p-4`}>
            <View className="flex-row justify-between items-center mb-4">
                <Text className={`${theme == "dark" ? "text-white" : "text-black"} text-2xl font-bold`}>
                    Todo List
                </Text>
                <TouchableOpacity className="p-2 justify-center" onPress={toggleTheme}>
                    <Text className="text-red-500">{theme == "dark" ? "Light" : "Dark"}</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row mb-4">
                <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Adicionar tarefa"
                    placeholderTextColor={theme == "dark" ? "#888" : "#999"}
                    className={`flex-1 border rounded p-2 mr-2 ${theme == "dark"
                        ? "border-gray-600 text-white bg-gray-800"
                        : "border-gray-300 text-black bg-white"
                        }`}
                />
                <TouchableOpacity
                    onPress={addTodo}
                    className="bg-red-500 rounded p-2 justify-center"
                >
                    <Text className="text-white font-bold">Add</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex flex-col w-full gap-[1vh]" showsVerticalScrollIndicator={false}>
                {todos.map((todo) => (
                    <ItemComponent
                        key={todo.id}
                        item={todo}
                        toggleFunction={toggleTodo}
                        deleteFunction={deleteTodo}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
