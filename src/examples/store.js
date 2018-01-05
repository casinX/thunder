import { Container } from 'lib';


const user = new Container({
    age: 0,
    repos: [],
})

.action('increment', () => {
    user.data.age ++;
})

.action('decrement', () => {
    user.data.age --;
})

.async('loadGit', async () => {
    const response = await user.axios.get('https://api.github.com/users/casinX/repos');
    user.data.repos = response.data;
});


export default user;