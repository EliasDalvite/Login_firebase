import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getPostsFirebase } from '../../servicos/PostService';
import { getTweetsFirebase } from '../../servicos/TweetService';

function Home() {

    const [listaObjetos, setListaObjetos] = useState([]);

    useEffect(() => {
        getTweetsFirebase(setListaObjetos);
    }, []);
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="div">
                Página Inicial
            </Typography>
            {listaObjetos.length === 0 && <Typography variant="h5" component="div">
                Nenhum registro encontrado
            </Typography>}

            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}

            <Grid container spacing={2}>
                {listaObjetos.length > 0 && (
                    listaObjetos.map(objeto => (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}
                            key={objeto.id}>
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
                                        {objeto.conteudo}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {objeto.user}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Curtidas: {objeto.curtidas}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Comentários: {objeto.comentarios}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Retweets: {objeto.retweets}
                                    </Typography>
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                    ))

                )}
            </Grid>

        </div>
    )
}

export default Home;