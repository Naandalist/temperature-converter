import axios from 'axios';

export const ConvertF2C = async degrees => {
  try {
    const xmls = `
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <FahrenheitToCelsius xmlns="https://www.w3schools.com/xml/">
            <Fahrenheit>${Number(degrees)}</Fahrenheit>
          </FahrenheitToCelsius>
        </soap12:Body>
      </soap12:Envelope>
    `;

    const response = await axios.post(
      'https://www.w3schools.com/xml/tempconvert.asmx?wsdl',
      xmls,
      {
        headers: {
          'Content-Type': 'text/xml',
        },
      },
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
