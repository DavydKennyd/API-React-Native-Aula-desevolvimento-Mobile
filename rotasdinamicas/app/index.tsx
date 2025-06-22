import axios from 'axios';
import { Link } from "expo-router";
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { ItemType } from '../types';

// ajusta as dimensões do card para o tamanho da tela
// não esqueça de dar um F5 no navegador para ver as mudanças
const CARD_MARGIN = 8;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH / 2 - CARD_MARGIN * 3;



export default function Index() {

  const [data, setData] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function buscarDados() {
    setIsLoading(true)
    const resultado = await axios.get('https://api.restful-api.dev/objects')
    setData(resultado.data)
    setIsLoading(false)
  }

  useEffect(() => {
    buscarDados()
  },[])

  const renderItem = ({ item }: { item: ItemType }) => (
    <Link href={{
      pathname: '/telefone/[id]',
      params: { id: item.id}
      }} style={{ flex: 1 }}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">{item.name}</Text>
        </Card.Content>
      </Card>
    </Link>
  );

  if (isLoading) {
    return (
      <View style={styles.carregando}>
        <Text variant="bodyLarge">Carregando...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: CARD_MARGIN,
  },
  card: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
  },
});
