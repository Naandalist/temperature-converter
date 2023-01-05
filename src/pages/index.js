import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Layout,
  Text,
  IndexPath,
  Select,
  SelectItem,
  Input,
} from '@ui-kitten/components';
import {Gap} from '../components';
import {DOMParser} from 'xmldom';
import {ConvertC2F, ConvertF2C} from '../service';
import {showError, showSuccess} from '../utils';

const data = ['Fahrenheit', 'Celcius'];

export default function HomeScreen() {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const temperatureType = data[selectedIndex.row];

  const [result, setResult] = useState(0);
  const [degrees, setDegrees] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onPressConvert = async () => {
    try {
      setIsLoading(true);
      let response;
      let temperatureTag;

      if (temperatureType === 'Celcius') {
        response = await ConvertC2F(degrees);
        temperatureTag = 'CelsiusToFahrenheitResult';
      } else {
        response = await ConvertF2C(degrees);
        temperatureTag = 'FahrenheitToCelsiusResult';
      }

      const xml = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml);
      const temperature =
        doc.getElementsByTagName(temperatureTag)[0].textContent;

      showSuccess('Convert success');

      setIsLoading(false);

      setResult(temperature);
    } catch (error) {
      showError('Convert error');
      setIsLoading(false);
      console.error(error);
    }
  };

  const renderOption = (title, index) => (
    <SelectItem key={index} title={title} />
  );

  return (
    <Layout style={{alignItems: 'center'}}>
      <Gap height={16} />
      <Text category="h3">Temperature Converter</Text>
      <Gap height={16} />
      <Layout style={styles.container} level="1">
        <Input
          label="Degrees"
          keyboardType="number-pad"
          style={styles.input}
          placeholder="Degrees"
          value={degrees}
          onChangeText={val => setDegrees(val)}
        />
        <Select
          label="Type"
          style={styles.select}
          placeholder="Default"
          value={temperatureType}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>
      </Layout>
      <Gap height={8} />
      <Layout style={styles.container} level="1">
        <Input
          label="Result"
          style={styles.input}
          placeholder="Result"
          value={temperatureType === 'Celcius' ? `${result}°F` : `${result}°C`}
        />
      </Layout>
      <Gap height={16} />
      <Button
        style={{width: '90%', borderRadius: 10}}
        disabled={isLoading}
        onPress={() => onPressConvert()}>
        Convert to {temperatureType === 'Celcius' ? 'Fahrenheit' : 'Celcius'}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
  },
  select: {
    flex: 1,
    marginHorizontal: 4,
  },
});
