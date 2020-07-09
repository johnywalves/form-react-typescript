import React, { useCallback, useState } from "react";
import { CSSTransition } from "react-transition-group";
// boostraps components
import Container from "react-bootstrap/Container";
// components
import Header from "components/header/Header";
import Formulario from "components/formulario/Formulario";
import Tabela from "components/tabela/Tabela";
// interfaces
import IRegister from "interfaces/IRegister";
// assets
import "bootstrap/dist/css/bootstrap.min.css";
import "index.css";

const sortReverseRegister = (a: IRegister, b: IRegister) => a.id && b.id ? b.id - a.id : 0;

const Home = () => {

  const [dataRegisterEdit, setDataRegisterEdit] = useState<IRegister>();
  const [registers, setRegisters] = useState<Array<IRegister>>([]);

  const removeRegister = useCallback((id: number) => {
    const filtered = [...(registers.filter(r => r.id !== id))];
    setRegisters(filtered);
  }, [registers, setRegisters]);

  const editRegister = useCallback((id: number) => {
    const current = registers.find(r => r.id === id);
    setDataRegisterEdit(current);
  }, [registers, setDataRegisterEdit]);

  const saveRegister = useCallback((register: IRegister) => {
    if (!register.id) {
      const sorted = [...registers].sort(sortReverseRegister);
      if (registers.length > 0) {
        const lastOne: IRegister = sorted[0];
        register.id = lastOne ? (lastOne.id || 0) + 1 : 1;
      } else {
        register.id = 1;
      }
      setRegisters([register, ...sorted]);
    } else {
      const filtered = [...registers].filter(r => r.id !== register.id);
      setRegisters([register, ...filtered]);
    }
  }, [registers, setRegisters]);

  return <Container>
    <Header />
    <Formulario editRegister={dataRegisterEdit} setDataRegisterEdit={setDataRegisterEdit} saveRegister={saveRegister} />
    <CSSTransition in={registers.length > 0} timeout={500} unmountOnExit >
      <Tabela list={registers} doEdit={editRegister} doRemove={removeRegister} />
    </CSSTransition>
  </Container >
}

export default Home;
