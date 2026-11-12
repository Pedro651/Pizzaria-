import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { Order } from "@/types";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Dashboard() {
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const [tableNumber, setableNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  async function handleOpenTable(){

      if (!tableNumber) {
      Alert.alert("Atenção", "Digite um numero da mesa válido.");
      return;
    }
    //Converter para numero pq ele vem como text
    const table =parseInt(tableNumber)

    //Verifica se ele mandou um numero ou isNaN:É quando manda uma letra
    if(isNaN(table)|| table <=0){
      Alert.alert("Atenção","Digite um numero da mesa válido")
      return
    }
    try{
      //Abre a mesa
      setLoading(true)

      const response = await api.post<Order>("/order",{
        table:table
      })
      router.push({
        pathname:"/(authenticated)/order",
        //Aqui você está enviando dados para a próxima tela e la vc vai receber os dois pelo useLocalSearchParams()
        params:{table: response.data.table.toString(), order_id:response.data.id}
      })

    }catch(err){
      console.log(err)
      Alert.alert("Error","Falha ao abrir mesa, tente mais tarde")
    }finally{
      setLoading(false)
    }
    //finally serve para executar um bloco de código sempre, independentemente 
    //de o try dar certo ou de o catch capturar um erro.
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.background} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        //Se eu tiver no ios eu uso o padding ,Se for Android, diminui a altura da tela quando o teclado abrir
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
        //Ele estiliza o conteúdo que fica dentro do ScrollView
          contentContainerStyle={styles.scrollContent}
         //Quando vc tiver com teclado aberto e clicar num item da lista o teclado fecha
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.header, { paddingTop: insets.top + 24 }]}/*
          -insets.top: Serve pra ajusta o componente na de acordo com cada celular
          pq cada celular tem um tamanho diferente
          - +24: Serve se vc quiser ajustar ainda mais
          */
          >
            <TouchableOpacity style={styles.signoutButton} onPress={signOut}>
              <Text style={styles.signoutText}>Sair</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>
                <Text style={styles.logoBrand}>Pizzaria</Text>
              </Text>
            </View>

            <Text style={styles.title}>Novo pedido</Text>
            <Input
              placeholder="Numero da mesa..."
              style={styles.input}
              placeholderTextColor={colors.gray}
              value={tableNumber}
              onChangeText={setableNumber}
              //O teclado so ficar com numeros
              keyboardType="numeric"
              />

            <Button title="Abrir mesa" onPress={handleOpenTable} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  signoutButton: {
    backgroundColor: colors.red,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  signoutText: {
    color: colors.primary,
    fontSize: fontSize.md,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  logoText: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.primary,
  },
  logoBrand: {
    color: colors.brand,
  },
  title: {
    fontSize: fontSize.xl,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.md,
  },
});
