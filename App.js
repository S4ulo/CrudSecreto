import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [compromisso, setCompromisso] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [indiceEditando, setIndiceEditando] = useState(null);

  const adicionarCompromisso = () => {
    if (compromisso.trim() === '') return;

    const novosCompromissos = [...compromissos];
    if (indiceEditando !== null) {
      novosCompromissos[indiceEditando] = compromisso;
    } else {
      novosCompromissos.push(compromisso);
    }
    setCompromissos(novosCompromissos);
    setCompromisso('');
    setIndiceEditando(null);
  };

  const editarCompromisso = (indice) => {
    setCompromisso(compromissos[indice]);
    setIndiceEditando(indice);
  };

  const excluirCompromisso = (indice) => {
    const novosCompromissos = [...compromissos];
    novosCompromissos.splice(indice, 1);
    setCompromissos(novosCompromissos);
    setIndiceEditando(null);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./imagens/TituloAgenda.png')} style={styles.titulo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Novo Compromisso"
          value={compromisso}
          onChangeText={(text) => setCompromisso(text)}
        />
        <TouchableOpacity style={styles.botao} onPress={adicionarCompromisso}>
          <Image source={require('./imagens/livroSecreto.png')} style={styles.botaoImagem} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={compromissos}
        renderItem={({ item, index }) => (
          <View style={styles.itemCompromisso}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => editarCompromisso(index)}>
              <Image source={require('./imagens/lampada.png')} style={styles.botaoEditar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => excluirCompromisso(index)}>
              <Image source={require('./imagens/explosao.png')} style={styles.botaoExcluir} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#BDB76B',
  },
  titulo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginRight: 8,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
  },
  botao: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  botaoImagem: {
    width: 40,
    height:40,
  },
  itemCompromisso: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  botaoEditar: {
    width:40,
    height: 30,
  },
  botaoExcluir: {
    width: 25,
    height: 25,
  },
});
