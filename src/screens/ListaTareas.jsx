import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, addTodo } from "../store/todosslice.js";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ListaTareas() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  // Agrega tareas de ejemplo si la lista está vacía
  function seedTodos() {
    const ejemplos = [
      {
        id: "1",
        text: "Revisar catálogo de productos Lumine",
        completed: false,
      },
      {
        id: "2",
        text: "Actualizar fotos de la colección otoño",
        completed: false,
      },
      { id: "3", text: "Confirmar stock con proveedor", completed: false },
      { id: "4", text: "Responder mensajes de clientes", completed: false },
      { id: "5", text: "Preparar descuentos de temporada", completed: false },
    ];
    ejemplos.forEach((t) => dispatch(addTodo(t)));
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskCard, item.completed && styles.taskCardDone]}
      onPress={() => dispatch(toggleTodo(item.id))}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, item.completed && styles.checkboxDone]}>
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.taskText, item.completed && styles.taskTextDone]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lumine</Text>
      <Text style={styles.subtitle}>Lista de tareas · Redux</Text>

      <View style={styles.statsRow}>
        <View style={styles.statChip}>
          <Text style={styles.statNum}>{todos.length}</Text>
          <Text style={styles.statLabel}>total</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={styles.statNum}>
            {todos.filter((t) => t.completed).length}
          </Text>
          <Text style={styles.statLabel}>completadas</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={styles.statNum}>
            {todos.filter((t) => !t.completed).length}
          </Text>
          <Text style={styles.statLabel}>pendientes</Text>
        </View>
      </View>

      {todos.length === 0 ? (
        <TouchableOpacity style={styles.seedBtn} onPress={seedTodos}>
          <Text style={styles.seedBtnText}>Cargar tareas de ejemplo</Text>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8F2",
    padding: 20,
    paddingTop: 60,
  },
  title: { color: "#C4704F", fontSize: 26, fontWeight: "bold" },
  subtitle: { color: "#9C7B65", fontSize: 13, marginBottom: 24 },

  statsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  statChip: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0CEBC",
    elevation: 2,
  },
  statNum: { color: "#C4704F", fontSize: 22, fontWeight: "bold" },
  statLabel: { color: "#9C7B65", fontSize: 11 },

  list: { gap: 10 },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0CEBC",
    elevation: 2,
  },
  taskCardDone: { backgroundColor: "#FAF3EA", borderColor: "#D4B896" },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#C4704F",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxDone: { backgroundColor: "#C4704F", borderColor: "#C4704F" },
  checkmark: { color: "#FFF", fontSize: 13, fontWeight: "bold" },
  taskText: { flex: 1, color: "#5C3D2E", fontSize: 15 },
  taskTextDone: { color: "#B89880", textDecorationLine: "line-through" },

  seedBtn: {
    backgroundColor: "#C4704F",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  seedBtnText: { color: "#FFF", fontWeight: "bold", fontSize: 15 },
});
