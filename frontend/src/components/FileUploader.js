import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const FileUploader = ({ onUploadSuccess, onUploadStart, onUploadError }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        setLoading(true);
        onUploadStart(); // Notify parent that upload is starting

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/uploadfile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (response.data.error) {
                throw new Error(response.data.error);
            }

            onUploadSuccess(response.data);
        } catch (err) {
            const errorMessage = err.response?.data?.detail || err.message || 'Error al subir el archivo.';
            setError(errorMessage);
            onUploadError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h4>Cargar Archivo</h4>
            <Form>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={handleFileChange} accept=".csv,.xlsx,.xls" />
                </Form.Group>
                <Button variant="primary" onClick={handleUpload} disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Subir y Analizar'}
                </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </div>
    );
};

export default FileUploader;
