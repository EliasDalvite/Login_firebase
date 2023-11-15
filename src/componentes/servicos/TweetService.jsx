import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

export const getTweetsFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'tweets'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                comentarios: doc.data().comentarios,
                conteudo: doc.data().conteudo,
                curtidas: doc.data().curtidas,
                retweets: doc.data().retweets,
                user: doc.data().user,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getTweetsUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "tweets");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                comentarios: doc.data().comentarios,
                conteudo: doc.data().conteudo,
                curtidas: doc.data().curtidas,
                retweets: doc.data().retweets,
                user: doc.data().user,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteTweetFirebase = async objeto => {
    try {
        const tweetDocRef = doc(db, 'tweets', objeto.id)
        await deleteDoc(tweetDocRef);
    } catch (err) {
        throw err;
    }
}

export const addTweetFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'tweets'),
            {
                comentarios: objeto.comentarios,
                conteudo: objeto.conteudo,
                curtidas: objeto.curtidas,
                retweets: objeto.retweets,
                user: objeto.user,
                uid: objeto.uid
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updateTweetFirebase = async objeto => {
    try {
        const tweetDocRef = doc(db, 'tweets', objeto.id)
        await updateDoc(tweetDocRef, {
            comentarios: objeto.comentarios,
            conteudo: objeto.conteudo,
            curtidas: objeto.curtidas,
            retweets: objeto.retweets,
            user: objeto.user,
            uid: objeto.uid
        })
    } catch (err) {
        throw err;
    }
}



