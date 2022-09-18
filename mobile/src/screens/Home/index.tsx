import { View, Image, FlatList } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard} from '../../components/GameCard'

import { GAMES} from '../../utils/games'

import { styles } from './styles';


// funcao/screen/componente de tela home que será responsável por apresentar os componentes image/heading/grid em tela
export function Home() {
  return (
   <View style={styles.container}>
    {/* componentes dentro da view */}
      <Image
        source={logoImg}
        style={styles.logo}
      />
      {/* Componente heading */}
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar...."
      />

      {/* component GameCard */}
      {/* Flatlist, função para movimentar os cards */}
      <FlatList 
      // dados vindo da importação GAMES da pasta utils
        data={GAMES}
        // separar cada objeto por identificador
        keyExtractor={item => item.id}
        // redenrizar o item passando o card/component GameCard dentro do FlatList
        renderItem={({item}) => (
          <GameCard 
            data={item}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}