import { openDatabaseAsync } from "expo-sqlite";

export async function connect() {
  return await openDatabaseAsync("todos.db");
}
