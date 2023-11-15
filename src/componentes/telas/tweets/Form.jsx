import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import TweetsContext from "./TweetsContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(TweetsContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Tweet"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="tweet"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtConteudo" label=""
                    tipo="text" name="conteudo" value={objeto.conteudo}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Tweet OK"
                    msginvalido="Informe o tweet" />
            </Dialogo>
        </>
    )

}

export default Form;