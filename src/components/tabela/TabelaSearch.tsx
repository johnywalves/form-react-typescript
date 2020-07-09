import React from "react";
// boostraps components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

interface TabelaSearchProps {
    text: string
    setText: Function
}

function TabelaSearch({ text, setText }: TabelaSearchProps) {
    return <Form className="box">
        <Row>
            <Col>
                <Form.Group controlId="formName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Digite um texto para pesquisar os cadastros"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </Form.Group>
            </Col>
        </Row>
    </Form>
}

export default TabelaSearch;
