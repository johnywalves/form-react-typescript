import React, { useEffect, useState } from "react";
// boostraps components
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
// components
import TabelaButton from "./TabelaButton";
import TabelaSearch from "./TabelaSearch";
// interfaces
import IRegister from "interfaces/IRegister";

interface FormularioProps {
    list: Array<IRegister>
    doRemove: Function
    doEdit: Function
}

const pageSize = 10;

const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function Tabela({ list, doRemove, doEdit }: FormularioProps) {

    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<Array<number>>([1]);
    const [results, setResults] = useState<Array<IRegister>>([]);
    const [textSearch, setTextSearch] = useState("");

    useEffect(() => {
        const normalized = normalize(textSearch);
        const filtered = list.filter(register => Object.entries(register)[1].filter(value => normalize(value).includes(normalized)).length > 0);
        setResults(filtered);
    }, [list, textSearch, setResults]);

    useEffect(() => {
        const size = results.length;
        const count = Math.trunc(size / pageSize) + (size % pageSize !== 0 ? 1 : 0);
        const pagination = (new Array(count)).fill(1).map((p, i) => i + 1);
        setPages(pagination);
    }, [results, setPages]);


    return <>
        <TabelaSearch text={textSearch} setText={setTextSearch} />
        <Table striped bordered hover className="box">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Nascimento</th>
                    <th>CPF</th>
                    <th>Celular</th>
                    <th>E-mail</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {results.slice((page - 1) * pageSize, page * pageSize)
                    .map(register => <tr key={register.id}>
                        <td>{register.id}</td>
                        <td>{register.name}</td>
                        <td>{register.birthday}</td>
                        <td>{register.cpf}</td>
                        <td>{register.phone}</td>
                        <td>{register.email}</td>
                        <td className="commands">
                            <TabelaButton icon="edit" action={() => doEdit(register.id)} />
                            <TabelaButton icon="trash" action={() => doRemove(register.id)} />
                        </td>
                    </tr>)}
            </tbody>
        </Table>
        <div className="pagination">
            <Pagination size="lg">
                {pages.map(number => <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)} >{number}</Pagination.Item>)}
            </Pagination>
        </div>
    </>
}

export default Tabela;
