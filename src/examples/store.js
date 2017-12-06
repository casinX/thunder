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

user.action('loadGit', async () => {
    const response = await user.request.get('https://api.github.com/users/casinX/repos');
    user.data.respos = response.data;
}, true);


export default user;