import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Modal } from 'react-bootstrap';

const ParamInfoModal = ({ show, handleClose }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title><i className="bi bi-info-circle-fill"></i> Guía de Parámetros Estadísticos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>Nivel de Confianza</h6>
            <p><strong>En simple:</strong> Es tu 'nivel de certeza'. Si repitieras el muestreo 100 veces, un nivel de confianza del 95% significa que en 95 de esas veces, tu muestra reflejaría con precisión a la población.</p>
            <p><strong>Guía práctica:</strong> Para investigaciones académicas o serias, se usa <strong>95%</strong> o <strong>99%</strong>. Para sondeos rápidos o exploratorios, 90% puede ser suficiente. Un nivel más alto requiere una muestra más grande.</p>
            <hr />
            <h6>Margen de Error</h6>
            <p><strong>En simple:</strong> Es el 'margen de maniobra' o el 'más/menos' que le das a tus resultados. Si tu resultado es que el 50% de las personas prefieren el producto A con un margen de error del 5%, significa que tienes confianza en que el valor real en la población está entre el 45% y el 55%.</p>
            <p><strong>Guía práctica:</strong> Un margen de error más pequeño (ej. 3%) da resultados más precisos, pero exige una muestra mucho más grande. Un <strong>5%</strong> es el compromiso más común entre precisión y coste/esfuerzo.</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Entendido
            </Button>
        </Modal.Footer>
    </Modal>
);

const SamplingInfoModal = ({ show, handleClose }) => {
    const svgStyles = { width: '100%', height: '120px', border: '1px solid #dee2e6', borderRadius: '4px' };
    const populationColor = "#e9ecef";
    const sampleColor = "#0d6efd";
    const strataColors = ["#f8f9fa", "#e9ecef", "#dee2e6"];

    return (
    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
            <Modal.Title><i className="bi bi-info-circle-fill"></i> Guía de Tipos de Muestreo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className="align-items-center mb-4">
                <Col md={4}>
                    <svg style={svgStyles} viewBox="0 0 200 100">
                        <rect width="200" height="100" fill={populationColor} />
                        <circle cx="30" cy="25" r="5" fill={sampleColor} />
                        <circle cx="170" cy="75" r="5" fill={sampleColor} />
                        <circle cx="100" cy="50" r="5" fill={sampleColor} />
                        <circle cx="60" cy="80" r="5" fill={sampleColor} />
                        <circle cx="140" cy="20" r="5" fill={sampleColor} />
                    </svg>
                </Col>
                <Col md={8}>
                    <h6>Aleatorio Simple</h6>
                    <p>Úsalo cuando tu población es homogénea. Es como sacar nombres de un sombrero; garantiza que cada individuo tiene la misma probabilidad de ser elegido.</p>
                </Col>
            </Row>
            <hr />
            <Row className="align-items-center mb-4">
                <Col md={4}>
                    <svg style={svgStyles} viewBox="0 0 200 100">
                        <rect width="200" height="33" y="0" fill={strataColors[0]} />
                        <rect width="200" height="34" y="33" fill={strataColors[1]} />
                        <rect width="200" height="33" y="67" fill={strataColors[2]} />
                        <circle cx="40" cy="18" r="5" fill={sampleColor} />
                        <circle cx="150" cy="22" r="5" fill={sampleColor} />
                        <circle cx="90" cy="50" r="5" fill={sampleColor} />
                        <circle cx="180" cy="85" r="5" fill={sampleColor} />
                    </svg>
                </Col>
                <Col md={8}>
                    <h6>Estratificado</h6>
                    <p>Perfecto cuando tu población se divide en subgrupos claros (estratos) y quieres asegurar que cada grupo esté representado. <strong>Ejemplo:</strong> Si tienes clientes de 'Madrid' y 'Barcelona', este método asegura que obtengas una muestra proporcional de cada ciudad.</p>
                </Col>
            </Row>
            <hr />
            <Row className="align-items-center mb-4">
                <Col md={4}>
                     <svg style={svgStyles} viewBox="0 0 200 100">
                        <rect width="200" height="100" fill={populationColor} />
                        {[...Array(10)].map((_, i) => <circle key={i} cx={15 + i * 20} cy="25" r="5" fill={i === 1 || i === 6 ? sampleColor : '#adb5bd'} />)}
                        {[...Array(10)].map((_, i) => <circle key={i} cx={15 + i * 20} cy="50" r="5" fill={i === 1 || i === 6 ? sampleColor : '#adb5bd'} />)}
                        {[...Array(10)].map((_, i) => <circle key={i} cx={15 + i * 20} cy="75" r="5" fill={i === 1 || i === 6 ? sampleColor : '#adb5bd'} />)}
                    </svg>
                </Col>
                <Col md={8}>
                    <h6>Sistemático</h6>
                     <p>Útil para poblaciones grandes y ordenadas. Se elige un punto de partida al azar y luego se selecciona cada k-ésimo elemento (ej. cada 5º individuo). Es más fácil de ejecutar que el aleatorio simple.</p>
                </Col>
            </Row>
             <hr />
            <Row className="align-items-center">
                <Col md={4}>
                    <svg style={svgStyles} viewBox="0 0 200 100">
                        <rect width="200" height="100" fill={populationColor} />
                        <g fill={sampleColor}>
                            <circle cx="40" cy="30" r="5"/>
                            <circle cx="55" cy="45" r="5"/>
                            <circle cx="35" cy="50" r="5"/>
                        </g>
                        <g fill={sampleColor}>
                            <circle cx="150" cy="60" r="5"/>
                            <circle cx="165" cy="75" r="5"/>
                            <circle cx="145" cy="80" r="5"/>
                        </g>
                        <rect x="20" y="15" width="50" height="50" fill="none" stroke={sampleColor} strokeDasharray="4"/>
                        <rect x="130" y="50" width="50" height="50" fill="none" stroke={sampleColor} strokeDasharray="4"/>
                    </svg>
                </Col>
                <Col md={8}>
                    <h6>Conglomerados</h6>
                    <p>Ideal para poblaciones muy dispersas. En lugar de muestrear individuos, muestreas grupos enteros (conglomerados). <strong>Ejemplo:</strong> Para estudiar colegios, eliges 10 colegios al azar y entrevistas a *todos* los alumnos de esos 10 colegios.</p>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Entendido
            </Button>
        </Modal.Footer>
    </Modal>
)};

const OptionsPanel = ({ disabled, columnNames, onGenerateSample }) => {
    const [samplingType, setSamplingType] = useState('simple');
    const [sizeMode, setSizeMode] = useState('auto');
    const [confidenceLevel, setConfidenceLevel] = useState('95');
    const [marginOfError, setMarginOfError] = useState(0.05);
    const [manualSize, setManualSize] = useState(100);
    const [stratifyColumn, setStratifyColumn] = useState('');
    const [clusterColumn, setClusterColumn] = useState('');
    const [numClusters, setNumClusters] = useState(10);
    const [showParamInfoModal, setShowParamInfoModal] = useState(false);
    const [showSamplingInfoModal, setShowSamplingInfoModal] = useState(false);

    const handleGenerateClick = () => {
        const params = {
            samplingType,
            sizeMode,
            confidenceLevel,
            marginOfError,
            manualSize,
            stratifyColumn,
            clusterColumn,
            numClusters
        };
        onGenerateSample(params);
    };

    const isCluster = samplingType === 'cluster';

    return (
        <>
            <Card className={disabled ? 'bg-light' : ''}>
                <Card.Header>
                    <h5><i className="bi bi-sliders"></i> Parámetros de Muestreo</h5>
                </Card.Header>
                <Card.Body>
                    <fieldset disabled={disabled}>
                        <Form.Group as={Row} className="mb-3" controlId="samplingType">
                            <Form.Label column sm={5}>
                                Tipo de Muestreo
                                <Button variant="link" size="sm" className="p-0 ms-1" onClick={() => setShowSamplingInfoModal(true)}>
                                    <i className="bi bi-info-circle"></i>
                                </Button>
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Select value={samplingType} onChange={e => setSamplingType(e.target.value)}>
                                    <option value="simple">Aleatorio Simple</option>
                                    <option value="stratified">Estratificado</option>
                                    <option value="systematic">Sistemático</option>
                                    <option value="cluster">Conglomerados</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {samplingType === 'stratified' && (
                            <Form.Group as={Row} className="mb-3" controlId="stratifyColumn">
                                <Form.Label column sm={5}>Columna de Estrato</Form.Label>
                                <Col sm={7}>
                                    <Form.Select value={stratifyColumn} onChange={e => setStratifyColumn(e.target.value)}>
                                        <option value="">Selecciona una columna...</option>
                                        {columnNames.map(col => <option key={col} value={col}>{col}</option>)}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        )}

                        {isCluster && (
                            <Form.Group as={Row} className="mb-3" controlId="clusterColumn">
                                <Form.Label column sm={5}>Columna de Conglomerado</Form.Label>
                                <Col sm={7}>
                                    <Form.Select value={clusterColumn} onChange={e => setClusterColumn(e.target.value)}>
                                        <option value="">Selecciona una columna...</option>
                                        {columnNames.map(col => <option key={col} value={col}>{col}</option>)}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        )}

                        <hr />

                        <h6>
                            <i className="bi bi-bar-chart-steps"></i> {isCluster ? 'Número de Conglomerados' : 'Tamaño de Muestra'}
                            {!isCluster && 
                                <Button variant="link" size="sm" className="p-0 ms-2" onClick={() => setShowParamInfoModal(true)}>
                                    <i className="bi bi-info-circle"></i>
                                </Button>
                            }
                        </h6>
                        
                        {!isCluster ? (
                            <>
                                <Form.Check type="radio" name="sizeMode" label="Automático" value="auto" checked={sizeMode === 'auto'} onChange={() => setSizeMode('auto')} />
                                <Form.Check type="radio" name="sizeMode" label="Manual" value="manual" checked={sizeMode === 'manual'} onChange={() => setSizeMode('manual')} />

                                <div className={`mt-2 ps-4 ${sizeMode === 'manual' ? 'text-muted' : ''}`}>
                                    <Form.Group as={Row} className="mb-2">
                                        <Form.Label column sm={6}>Nivel de Confianza</Form.Label>
                                        <Col sm={6}>
                                            <Form.Select disabled={sizeMode === 'manual'} value={confidenceLevel} onChange={e => setConfidenceLevel(e.target.value)}>
                                                <option value="90">90%</option>
                                                <option value="95">95%</option>
                                                <option value="99">99%</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>Margen de Error</Form.Label>
                                        <Col sm={6}>
                                            <Form.Select disabled={sizeMode === 'manual'} value={marginOfError} onChange={e => setMarginOfError(parseFloat(e.target.value))}>
                                                <option value={0.01}>1%</option>
                                                <option value={0.03}>3%</option>
                                                <option value={0.05}>5%</option>
                                                <option value={0.10}>10%</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </div>

                                <div className={`mt-2 ps-4 ${sizeMode === 'auto' ? 'text-muted' : ''}`}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={6}>Tamaño Manual</Form.Label>
                                        <Col sm={6}>
                                            <Form.Control disabled={sizeMode === 'auto'} type="number" value={manualSize} onChange={e => setManualSize(parseInt(e.target.value, 10))} />
                                        </Col>
                                    </Form.Group>
                                </div>
                            </>
                        ) : (
                            <Form.Group as={Row}>
                                <Form.Label column sm={6}># de Conglomerados</Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="number" value={numClusters} onChange={e => setNumClusters(parseInt(e.target.value, 10))} />
                                </Col>
                            </Form.Group>
                        )}

                        <div className="d-grid mt-4">
                            <Button variant="primary" onClick={handleGenerateClick}>
                                <i className="bi bi-gear-fill"></i> Generar Muestra
                            </Button>
                        </div>
                    </fieldset>
                </Card.Body>
            </Card>
            <ParamInfoModal show={showParamInfoModal} handleClose={() => setShowParamInfoModal(false)} />
            <SamplingInfoModal show={showSamplingInfoModal} handleClose={() => setShowSamplingInfoModal(false)} />
        </>
    );
};

export default OptionsPanel;
