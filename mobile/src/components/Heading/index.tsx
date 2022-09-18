import { View, Text, ViewProps } from 'react-native';

import { styles } from './styles';

// interface Props extendendo propriedades e recursos do componente ViewProps do react native
interface Props extends ViewProps {
    title: string;
    subtitle: string;
}

// chamando as propriedades explicitas e todo o resto que a viewprops proporciona.
export function Heading({title, subtitle, ...rest}: Props) {
  return (
    <View style={styles.container}{...rest}>
        <Text style={styles.title}>
            {title}
        </Text>
        <Text style={styles.subtitle}>
            {subtitle}
        </Text>
    </View>
  );
}