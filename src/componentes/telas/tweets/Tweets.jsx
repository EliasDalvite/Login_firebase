import { useState, useEffect } from "react";
import TweetsContext from "./TweetsContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteTweetFirebase, addTweetFirebase, updateTweetFirebase, getTweetsUIDFirebase } from "../../servicos/TweetService";

function Tweets() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        comentarios: '',
        conteudo: '',
        curtidas: '',
        retweets: '',
        user: '',
        uid: ''
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        console.log(user)
        setObjeto({
            comentarios: '0',
            conteudo: '',
            curtidas: '0',
            retweets: '0',
            user: user?.displayName,
            uid: user?.uid
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {

            try {
                await updateTweetFirebase(objeto);
                setAlerta({ status: "success", message: "Tweet atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o tweet:" + err });
            }
        } else { // novo 
            try {
                setObjeto(await addTweetFirebase(objeto))
                setEditar(true);
                setAlerta({ status: "success", message: "Tweet criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o tweet:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deleteTweetFirebase(objeto);
                setAlerta({ status: "success", message: "Tweet removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getTweetsUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, [user]);

    if (user) {
        return (
            <TweetsContext.Provider value={{
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                remover,
                objeto, setObjeto,
                editarObjeto, novoObjeto, acaoCadastrar,
                handleChange, abreDialogo, setAbreDialogo
            }}>
                <Carregando carregando={carregando}>
                    <Tabela />
                </Carregando>
                <Form />
            </TweetsContext.Provider>
        )
    } else {
        // return <Navigate to="/"/>
    }

}

export default Tweets;