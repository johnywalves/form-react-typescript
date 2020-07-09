import React, { useCallback, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
// boostraps components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// interfaces 
import IRegister, { initial } from "interfaces/IRegister";

interface FormularioProps {
  editRegister?: IRegister
  setDataRegisterEdit: Function
  saveRegister: Function
}

function Formulario({ editRegister, setDataRegisterEdit, saveRegister }: FormularioProps) {

  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, errors, reset } = useForm<IRegister>();

  const [current, setCurrent] = useState<IRegister>(initial);

  const onReset = useCallback(() => {
    setCurrent({ ...initial });
    setDataRegisterEdit(initial);
    reset();
  }, [reset, setCurrent, setDataRegisterEdit]);

  const onSubmit = useCallback((data: any) => {
    const save = { id: current.id, ...data };
    saveRegister(save);
    onReset();
  }, [current, saveRegister, onReset]);

  useEffect(() => {
    setCurrent(editRegister ? editRegister : initial);
  }, [editRegister, setCurrent]);

  return <Form ref={formRef} className="box" onSubmit={handleSubmit(onSubmit)}>
    <Row>
      <Col>
        <Form.Group controlId="formName">
          <Form.Label>Nome <span className="required">*</span></Form.Label>
          <Form.Control
            ref={register({ required: true })}
            type="text"
            name="name"
            defaultValue={current.name}
            placeholder="Informe o nome"
          />
          {errors.name && <>
            {errors.name.type === "required" && <Form.Text className="text-muted">Nome é obrigatório</Form.Text>}
          </>}
        </Form.Group>
      </Col>
    </Row>

    <Row>
      <Col>
        <Form.Group controlId="formBirthday">
          <Form.Label>Nascimento <span className="required">*</span></Form.Label>
          <Form.Control
            ref={register({ required: true, pattern: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i })}
            className="form-control"
            type="text"
            name="birthday"
            defaultValue={current.birthday}
          />
          {errors.birthday && <>
            {errors.birthday.type === "required" && <Form.Text className="text-muted">Nascimento é obrigatório</Form.Text>}
            {errors.birthday.type === "pattern" && <Form.Text className="text-muted">Por favor informe uma data de nascimento válido</Form.Text>}
          </>}
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="formCPF">
          <Form.Label>CPF <span className="required">*</span></Form.Label>
          <Form.Control
            ref={register({ required: true, pattern: /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/i })}
            type="text"
            name="cpf"
            defaultValue={current.cpf}
          />
          {errors.cpf && <>
            {errors.cpf.type === "required" && <Form.Text className="text-muted">CPF é obrigatório</Form.Text>}
            {errors.cpf.type === "pattern" && <Form.Text className="text-muted">Por favor informe um CPF válido com o padrão XXX.XXX.XXX-XX</Form.Text>}
          </>}
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="formPhone">
          <Form.Label>Celular <span className="required">*</span></Form.Label>
          <Form.Control
            ref={register({ required: true })}
            type="text"
            name="phone"
            defaultValue={current.phone}
          />
          {errors.phone && <>
            {errors.phone.type === "required" && <Form.Text className="text-muted">Celular é obrigatório</Form.Text>}
            {errors.phone.type === "pattern" && <Form.Text className="text-muted">Por favor informe um telefone válido com o padrão (XX) 9XXXX-XXXX</Form.Text>}
          </>}
        </Form.Group>
      </Col>
    </Row>

    <Row>
      <Col>
        <Form.Group controlId="formEmail">
          <Form.Label>E-mail <span className="required">*</span></Form.Label>
          <Form.Control
            ref={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i })}
            type="email"
            name="email"
            defaultValue={current.email}
            placeholder="Informe um e-mail válido"
          />
          {errors.email && <>
            {errors.email.type === "required" && <Form.Text className="text-muted">E-mail é obrigatório</Form.Text>}
            {errors.email.type === "pattern" && <Form.Text className="text-muted">Por favor informe um e-mail válido</Form.Text>}
          </>}
        </Form.Group>
      </Col>
    </Row>

    <Row>
      <Col>
        <Form.Group controlId="formBirthday">
          <Form.Label>Observação</Form.Label>
          <Form.Control
            ref={register({ maxLength: 300 })}
            as="textarea"
            name="obs"
            rows={3}
            defaultValue={current.obs}
            placeholder="Campo livre para observações extras (max 300)"
          />
        </Form.Group>
        {errors.obs && <>
          <Form.Text className="text-muted">Observação é obrigatório</Form.Text>
        </>}
      </Col>
    </Row >

    <Row>
      <Col>
        <Button className="spaced" variant="primary" type="submit">
          Salvar
        </Button>
        <Button className="spaced" variant="danger" onClick={onReset}>
          Cancelar
        </Button>
      </Col>
    </Row>
  </Form>
}

export default Formulario;
