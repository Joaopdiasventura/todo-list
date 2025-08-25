import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import { ItemComponent } from "./shared/components/ItemComponent";
import { useTheme } from "./shared/context/ThemeContext";
// import { connect } from "../shared/database/db";
import { Todo } from "./shared/interfaces/todo";

export default function Page() {
    const { theme, toggleTheme } = useTheme();

    // const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>("");

    useEffect(() => {
        let isMounted = true;

        // const initDb = async () => {
        //     // const database = await connect();
        //     if (!isMounted) return;
        //     setDb(database);

        //     await database.execAsync(`
        //         CREATE TABLE IF NOT EXISTS todos (
        //         id TEXT PRIMARY KEY NOT NULL,
        //         text TEXT,
        //         done BOOLEAN
        //         );
        //     `);

        //     if (!isMounted) return;
        //     fetchTodos(database);
        // };

        // initDb();

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
        // if (!db || inputText.trim().length == 0) return;

        const newTodo: Todo = {
            id: Date.now().toString(),
            text: inputText,
            done: false,
        };

        try {
            // await db.runAsync(
            //     "INSERT INTO todos (id, text, done) VALUES (?, ?, ?);",
            //     [newTodo.id, newTodo.text, 0]
            // );
            setTodos((prev) => [...prev, newTodo]);
            setInputText("");
        } catch (err) {
            console.error("Erro ao adicionar todo:", err);
        }
    };

    const toggleTodo = async (id: string) => {
        // if (!db) return;

        const updatedTodos = todos.map((todo) =>
            todo.id == id ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);

        const todo = updatedTodos.find((t) => t.id == id);
        if (!todo) return;

        try {
            // await db.runAsync("UPDATE todos SET done = ? WHERE id = ?;", [
            //     todo.done ? 1 : 0,
            //     todo.id,
            // ]);
        } catch (err) {
            console.error("Erro ao atualizar todo:", err);
        }
    };

    const deleteTodo = async (id: string) => {
        // if (!db) return;

        try {
            // await db.runAsync("DELETE FROM todos WHERE id = ?;", [id]);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error("Erro ao deletar todo:", err);
        }
    };

    return (
        <View className={`${theme == "dark" ? "bg-zinc-950" : "bg-zinc-50"} flex-1 p-5`}>
            <View className="flex-row justify-between items-center mb-5">
                <Text className={`${theme == "dark" ? "text-zinc-50" : "text-zinc-900"} text-3xl font-extrabold`}>
                    Todo List
                </Text>
                <TouchableOpacity onPress={toggleTheme} className={`${theme == "dark" ? "bg-zinc-800" : "bg-zinc-100"} px-3 py-2 rounded-full`}>
                    <Text className={`${theme == "dark" ? "text-zinc-100" : "text-zinc-800"} text-sm font-semibold`}>
                        {theme == "dark" ? "Light" : "Dark"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View className={`${theme == "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"} border rounded-2xl p-3 mb-4 shadow`}>
                <View className="flex-row items-center">
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Adicionar tarefa"
                        placeholderTextColor={theme == "dark" ? "#8b8b8b" : "#9ca3af"}
                        className={`flex-1 h-12 px-4 rounded-xl ${theme == "dark" ? "text-zinc-100 bg-zinc-800" : "text-zinc-900 bg-zinc-50"}`}
                        returnKeyType="done"
                    />
                    {inputText?.length ? (
                        <TouchableOpacity onPress={() => setInputText("")} className="ml-2 px-3 h-12 rounded-xl justify-center border border-transparent">
                            <Text className={`${theme == "dark" ? "text-zinc-400" : "text-zinc-500"} text-sm`}>Limpar</Text>
                        </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity
                        onPress={addTodo}
                        disabled={!inputText?.trim()}
                        className={`ml-2 h-12 px-5 rounded-xl justify-center ${!inputText?.trim() ? "opacity-50" : ""} bg-red-500`}
                    >
                        <Text className="text-white font-bold">Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {todos.length == 0 ? (
                <View className={`${theme == "dark" ? "bg-zinc-900" : "bg-white"} border ${theme == "dark" ? "border-zinc-800" : "border-zinc-200"} rounded-2xl p-8 items-center justify-center`}>
                    <Text className={`${theme == "dark" ? "text-zinc-400" : "text-zinc-500"} text-base`}>Sem tarefas. Adicione a primeira acima.</Text>
                </View>
            ) : null}

            <ScrollView className="flex-1" contentContainerClassName="gap-3 pb-6">
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
