import React from 'react';
import { Table, Card, Alert } from 'react-bootstrap';

const DataTable = ({ summary }) => {
    if (!summary) {
        return <Alert variant="info">Aún no se han cargado datos. Sube un archivo para ver un resumen aquí.</Alert>;
    }

    const { filename, rows, columns, column_names, head } = summary;

    return (
        <Card>
            <Card.Header>
                <Card.Title>Resumen del Archivo: {filename}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    El archivo tiene <strong>{rows}</strong> filas y <strong>{columns}</strong> columnas.
                </Card.Text>
                <h5>Primeras 5 Filas:</h5>
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            {column_names.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {head.map((row, rowIndex) => (
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

export default DataTable;
