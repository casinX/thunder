import { Container } from 'lib';


const store = new Container({
    repos: [],
})

.async('loadGit', async () => {
    const response = await store.axios.get('https://api.github.com/users/casinX/repos');
    store.data.repos = response.data;
});


export default store;