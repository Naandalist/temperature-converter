import axios from 'axios';

export const ConvertC2F = async degrees => {
  try {
    const xmls = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:web="https://www.w3schools.com/xml/">
        <soapenv:Header/>
        <soapenv:Body>
          <web:CelsiusToFahrenheit>
            <web:Celsius>${Number(degrees)}</web:Celsius>
          </web:CelsiusToFahrenheit>
        </soapenv:Body>
      </soapenv:Envelope>
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
