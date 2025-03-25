import { useState } from "react";
import "./index.css";

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [form, setForm] = useState({ nome: "", email: "", idade: "", telefone: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const novasPessoas = pessoas.map((pessoa, i) =>
        i === editIndex ? form : pessoa
      );
      setPessoas(novasPessoas);
      setEditIndex(null);
    } else {
      setPessoas([...pessoas, form]);
    }

    setForm({ nome: "", email: "", idade: "", telefone: "" });
  };

  const handleEdit = (index) => {
    setForm(pessoas[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const novasPessoas = pessoas.filter((_, i) => i !== index);
    setPessoas(novasPessoas);
  };

  return (
    <div className="container">
      <h1>Cadastro de Pessoas</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
        <input type="number" name="idade" placeholder="Idade" value={form.idade} onChange={handleChange} required />
        <button type="submit">{editIndex !== null ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.length === 0 ? (
            <tr>
              <td colSpan="5">Nenhuma pessoa cadastrada.</td>
            </tr>
          ) : (
            pessoas.map((p, i) => (
              <tr key={i}>
                <td>{p.nome}</td>
                <td>{p.email}</td>
                <td>{p.telefone}</td>
                <td>{p.idade}</td>
                <td>
                  <button className="editar" onClick={() => handleEdit(i)} aria-label="Editar">Editar</button>
                  <button className="excluir" onClick={() => handleDelete(i)} aria-label="Excluir">Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

