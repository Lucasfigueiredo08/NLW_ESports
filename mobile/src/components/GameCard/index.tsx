import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, TouchableOpacity, ImageSourcePropType, TouchableOpacityProps, Text } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

// interface exportada para ser reutilizada
export interface GameCardProps {
  id: string,
  name: string,
  ads: string,
  cover: ImageSourcePropType
}

// interface interna constando a interface GameCardProps em data e extendendo o recurso do rn TouchableOpacityProps
interface Props extends TouchableOpacityProps {
  data: GameCardProps
}
// passando as propriedades do props e mais o resto de touchable para data e ...rest e injetando no touchableopacity
export function GameCard({data, ...rest}: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
        <ImageBackground
          style={styles.cover}
          source={data.cover}
        >

        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.name}
          </Text>
          
          <Text style={styles.ads}>
            {data.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}