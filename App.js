import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [compromisso, setCompromisso] = useState('');
  const [data, setData] = useState(''); // Estado para armazenar a data
  const [hora, setHora] = useState(''); // Estado para armazenar a hora
  const [compromissos, setCompromissos] = useState([]);
  const [indiceEditando, setIndiceEditando] = useState(null);

  const adicionarCompromisso = () => {
    if (compromisso.trim() === '') return;

    const novoCompromisso = `${compromisso} - Data: ${data} - Hora: ${hora}`;
    const novosCompromissos = [...compromissos];
    if (indiceEditando !== null) {
      novosCompromissos[indiceEditando] = novoCompromisso;
    } else {
      novosCompromissos.push(novoCompromisso);
    }
    setCompromissos(novosCompromissos);
    setCompromisso('');
    setData(''); // Limpa a data
    setHora(''); // Limpa a hora
    setIndiceEditando(null);
  };

  const editarCompromisso = (indice) => {
    const compromissoAtual = compromissos[indice];
    const partes = compromissoAtual.split(' - ');
    setCompromisso(partes[0]);
    setData(partes[1].replace('Data: ', '')); // Extrai a data
    setHora(partes[2].replace('Hora: ', '')); // Extrai a hora
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
        <TextInput
          style={styles.input}
          placeholder="Data"
          value={data}
          onChangeText={(text) => setData(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora"
          value={hora}
          onChangeText={(text) => setHora(text)}
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
            <TouchableOpacity style={styles.botaoEditar} onPress={() => editarCompromisso(index)}>
              <Text style={styles.botaoTexto}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirCompromisso(index)}>
              <Text style={styles.botaoTexto}>Excluir</Text>
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
    flexDirection: 'row',
  },
  botaoTexto: {
    color: 'white',
  },
  botaoImagem: {
    width: 40,
    height: 40,
    marginRight: 5,
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
    width: 60,
    backgroundColor: 'green',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoExcluir: {
    width: 60,
    backgroundColor: 'red',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
