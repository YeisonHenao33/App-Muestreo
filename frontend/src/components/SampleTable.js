import React from 'react';
import { Table, Card, Alert, Button } from 'react-bootstrap';

const SampleTable = ({ sampleResult, onExport, exporting }) => {
    if (!sampleResult) {
        return null; // Don't render anything if there's no sample
    }

    const { sample_data, column_names, sample_size, population_size } = sampleResult;

    return (
        <Card className="mt-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0"><h5><i className="bi bi-grid-3x3-gap-fill"></i> Muestra Generada</h5></Card.Title>
                <Button variant="success" onClick={onExport} disabled={exporting}>
                    <i className="bi bi-download"></i> {exporting ? 'Exportando...' : 'Exportar a CSV'}
                </Button>
            </Card.Header>
            <Card.Body>
                <Alert variant="success">
                    Se ha generado una muestra de <strong>{sample_size}</strong> registros a partir de una población de <strong>{population_size}</strong>.
                </Alert>
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            {column_names.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sample_data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {column_names.map((col, colIndex) => (
                                    <td key={colIndex}>{row[col]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default SampleTable;
