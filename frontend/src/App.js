import { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Spinner, Alert, Card } from 'react-bootstrap';
import FileUploader from './components/FileUploader';
import DataTable from './components/DataTable';
import OptionsPanel from './components/OptionsPanel';
import SampleTable from './components/SampleTable';
import './App.css';

function App() {
  const [summary, setSummary] = useState(null);
  const [sample, setSample] = useState(null);
  const [lastParams, setLastParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sampling, setSampling] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSample = async (params) => {
    setSampling(true);
    setError('');
    setSample(null);
    try {
      const response = await axios.post('http://localhost:8000/sample/', params);
      setSample(response.data);
      setLastParams(params); // Save the params for export
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Error al generar la muestra.';
      setError(errorMessage);
    } finally {
      setSampling(false);
    }
  };

  const handleExport = async () => {
    if (!lastParams) {
      setError('No hay parámetros de la última muestra generada para exportar.');
      return;
    }
    setExporting(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/export/', lastParams, {
        responseType: 'blob', // Important for file downloads
      });
      // Create a link and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'muestra.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Error al exportar el archivo.';
      setError(errorMessage);
    } finally {
      setExporting(false);
    }
  };

  const handleUploadStart = () => {
    setLoading(true);
    setSummary(null);
    setError('');
    setSample(null);
    setLastParams(null);
  };

  const handleUploadSuccess = (data) => {
    setSummary(data);
    setLoading(false);
  };

  const handleUploadError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home"><i className="bi bi-magic"></i> Herramienta de Muestreo Estadístico</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <OptionsPanel 
              disabled={!summary || sampling}
              columnNames={summary ? summary.column_names : []}
              onGenerateSample={handleGenerateSample}
            />
          </Col>
          <Col md={8}>
            <Card>
              <Card.Header><h5><i className="bi bi-cloud-upload"></i> Carga de Datos</h5></Card.Header>
              <Card.Body>
                <FileUploader 
                  onUploadStart={handleUploadStart}
                  onUploadSuccess={handleUploadSuccess} 
                  onUploadError={handleUploadError} 
                />
              </Card.Body>
            </Card>
            
            <div className="mt-4">
              {loading && <div className="text-center"><Spinner animation="border" /> <p>Analizando archivo...</p></div>}
              {error && !loading && <Alert variant="danger">{error}</Alert>}
              {!loading && summary && !sample && <DataTable summary={summary} />}
              {sampling && <div className="text-center mt-4"><Spinner animation="border" variant="primary"/> <p>Generando muestra...</p></div>}
              {!sampling && sample && <SampleTable sampleResult={sample} onExport={handleExport} exporting={exporting} />}
              {!loading && !summary && !error && <Alert variant="secondary">Los resultados aparecerán aquí.</Alert>}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;





