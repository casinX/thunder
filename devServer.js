import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config, { port, host } from './webpack.config.babel';

config.entry.app.unshift(`webpack-dev-server/client?http://${host}:${port}/`, 'webpack/hot/dev-server');

new WebpackDevServer(webpack(config), config.devServer).listen(port, host, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Listening at ${host}:${port}`);
});
