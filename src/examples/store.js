import { Container } from 'lib';


const user = new Container({
    age: 0,
    repos: [],
});

user.action('increment', () => {
    user.data.age ++;
});

user.action('decrement', () => {
    user.data.age --;
});

user.async('loadGit', async () => {
    const response = await user.axios.get('https://api.github.com/users/casinX/repos');
    user.data.repos = response.data;
});


export default user;