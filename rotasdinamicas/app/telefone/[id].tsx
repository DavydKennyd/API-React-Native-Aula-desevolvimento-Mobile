import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';
import { ItemType } from '@/types';

const globalData = {
  id: '1',
  name: 'Mock 1',
  data: {
    color: 'Cor 1',
    capacity: 'Capacidade 1',
    price: 'R$ 5000,00',
    generation: 'Geração 1',
    year: 2023,
  },
}

//utilizar o endpoint https://api.restful-api.dev/objects/7
export default function TelefoneDetalhe() {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const [telefone, setTelefone] = useState<ItemType | null>(null);
  const [isLoading, setIsLoading] = useState(true)



  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Detalhe do telefone: ${id}`,
    });
  }, [navigation, id]);
  
  useEffect(() => {
    async function buscarCelular() {
      try {
        const response = await axios.get(`https://api.restful-api.dev/objects/${id}`);
        setTelefone(response.data);
      } catch (error) {
        console.error("Erro ao buscar o celular: ", error);
      } finally {
        setIsLoading(false);
      }
    }
      buscarCelular();
    }, [id]);
    
    return (
    <View style={styles.container}>
      {isLoading ? (
        <Text> ESTÁ CARRENDO...</Text>
      ) : telefone ? (
        <>
        <Text variant="titleLarge">{telefone.name}</Text>
        <Text>ID: {telefone.id}</Text>
        <Text>Cor: {telefone.data?.color}</Text>
        <Text>Capacidade: {telefone.data?.Capacity}</Text>
        <Text>Preço: {telefone.data?.Price}</Text>
        <Text>Geração: {telefone.data?.Generation}</Text>
        <Text>Ano: {telefone.data?.year}</Text>
        </>
      ) : (<Text>O telefone não foi encontrado na api.</Text>)}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
});
