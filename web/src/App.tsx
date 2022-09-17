//  criando as propriedades/atributos necessários no componente
interface ButtonPros{
    title: string
}
// component/funcao button
function Button(props: ButtonPros) {
    return(
        <button>
            {props.title}
        </button>
    )
}

// component/funcao App chamando os buttons
function App() {
  return (
    <div>
        <Button title="send 1"/>
        <Button title="send 2"/>
        <Button title="send 3"/>
    </div>
  )
}

export default App